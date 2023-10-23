import { type EVENT_TYPES } from "./constants";

export type ImmoAdvertPictureType = Array<string | null>;

export interface ImmoAdvertDetailsType {
  id: string;
  title: string;
  address: string;
  warmMiete: string;
  kaltMiete: string;
  pictures: ImmoAdvertPictureType;
  flache: string;
  etage: string;
  m2price: string;
  longTexts: string[];
  zimmer: string;
}

export type ImmoAdvertLocalStorageItemType = ImmoAdvertDetailsType & {
  date: string;
};

export type ImmoAdvertsLocalStorageType = ImmoAdvertLocalStorageItemType[];

export interface IChromeExtensionApi {
  getActiveTab: () => Promise<chrome.tabs.Tab | undefined>;
  sendMessage: SendMessageType;
}

export type EventMessageType =
  | {
      type: typeof EVENT_TYPES.FETCH_AD;
    }
  | {
      type: typeof EVENT_TYPES.SHOW_PICS;
      payload: ImmoAdvertPictureType;
    };

export type SendMessageType = (
  message: EventMessageType,
  tab?: chrome.tabs.Tab
) => Promise<any>;

export type SendResponseType = (returnVal?: unknown) => void;

export interface ZipFileType {
  fileName: string;
  data: Blob;
}

export interface WithId {
  id: string;
}
