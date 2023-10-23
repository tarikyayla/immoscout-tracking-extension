import {
  type IStorage,
  Storage,
  LocalStorageApi,
  StorageApi,
  type IChromeExtensionApi,
  chromeExtensionApi
} from "./api";
import { isLocalUrl } from "./utils";
import testData from "./testData.json";
import { mockedChromeExtensionApi } from "./mocks";
type SetupEnvironmentType = () => {
  storage: IStorage;
  extensionApi: IChromeExtensionApi;
};

export const setupEnvironment: SetupEnvironmentType = () => {
  const isLocal = isLocalUrl();
  if (isLocal) {
    return {
      storage: new Storage(LocalStorageApi, testData),
      extensionApi: mockedChromeExtensionApi
    };
  }

  return {
    storage: new Storage(StorageApi),
    extensionApi: chromeExtensionApi
  };
};
