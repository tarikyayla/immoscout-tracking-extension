import { StorageKeys } from "./constants";

interface WithId {
  id: string;
}

type StorageKeyType = keyof typeof StorageKeys;

export interface IApi {
  get: <T>(key: StorageKeyType, fallbackValue?: any) => Promise<T>;
  set: <T>(key: StorageKeyType, value: T) => Promise<T>;
}

export const StorageApi: IApi = {
  async get<T>(key: StorageKeyType, fallbackValue: any = []) {
    const storage = await chrome.storage.local.get(StorageKeys[key]);
    return (storage?.[StorageKeys[key]] as T) ?? fallbackValue;
  },
  async set<T>(key: StorageKeyType, value: T) {
    await chrome.storage.local.set({
      [StorageKeys[key]]: value
    });

    return await Promise.resolve(value);
  }
};

export const LocalStorageApi: IApi = {
  async get<T>(key: StorageKeyType, fallbackValue: any = []) {
    const stringItem = localStorage.getItem(StorageKeys[key]);
    const returnValue =
      stringItem != null ? JSON.parse(stringItem) : fallbackValue;
    return await Promise.resolve(returnValue as T);
  },
  async set<T>(key: StorageKeyType, value: T) {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(StorageKeys[key], stringValue);
    return await Promise.resolve(value);
  }
};

export interface IStorage {
  append: (key: StorageKeyType, item: any) => Promise<any[]>;
  insert: (key: StorageKeyType, item: any) => Promise<void>;
  deleteFrom: <T extends WithId>(
    key: StorageKeyType,
    id: string
  ) => Promise<T[]>;
}

export class Storage implements IStorage {
  api: IApi;
  constructor(api: IApi) {
    this.api = api;
  }

  async append<T extends any[]>(key: StorageKeyType, item: any): Promise<T> {
    const items = await this.api.get<T>(key, []);
    const newItems = [...items, { ...item, date: new Date().toJSON() }];

    return await this.api.set<T>(key, newItems as T);
  }

  async insert(key: StorageKeyType, item: any): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async deleteFrom<T extends WithId>(
    key: StorageKeyType,
    id: string
  ): Promise<T[]> {
    const items = await this.api.get<T[]>(key, []);
    const newItems = items.filter((item) => item.id !== id);
    return await this.api.set(key, newItems);
  }
}

export const storage = new Storage(StorageApi);
