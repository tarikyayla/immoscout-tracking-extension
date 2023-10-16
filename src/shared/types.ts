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

export type SendResponseType = (returnVal?: unknown) => void;

export interface ZipFileType {
  fileName: string;
  data: Blob;
}
