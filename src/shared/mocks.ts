import { type IChromeExtensionApi, type IApi, type IStorage } from "./api";
import { type WithId, type EventMessageType } from "./types";

export const noop = (): void => {};
export const asyncNoop = async (): Promise<void> => {};

export const mockedApi: IApi = {
  get: async function <T>(key: "IMMO_ADS", fallbackValue?: any): Promise<T> {
    throw new Error("Function not implemented.");
  },
  set: async function <T>(key: "IMMO_ADS", value: T): Promise<T> {
    throw new Error("Function not implemented.");
  }
};
export const mockedStorage: IStorage = {
  append: async function (key: "IMMO_ADS", item: any): Promise<any[]> {
    throw new Error("Function not implemented.");
  },
  insert: async function (key: "IMMO_ADS", item: any): Promise<void> {
    throw new Error("Function not implemented.");
  },
  deleteFrom: async function <T extends WithId>(
    key: "IMMO_ADS",
    id: string
  ): Promise<T[]> {
    throw new Error("Function not implemented.");
  },
  api: mockedApi
};

export const mockedChromeExtensionApi: IChromeExtensionApi = {
  async getActiveTab() {
    return undefined;
  },
  sendMessage: async function (
    message: EventMessageType,
    tab?: chrome.tabs.Tab | undefined
  ): Promise<any> {
    return null;
  }
};
