import { type FunctionalComponent, createContext } from "preact";
import {
  type IStorage,
  getAdId,
  type IChromeExtensionApi,
  chromeExtensionApi
} from "../shared";
import {
  type ImmoAdvertLocalStorageItemType,
  type ImmoAdvertsLocalStorageType
} from "../shared/types";
import {
  type StateUpdater,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "preact/hooks";
import { EVENT_TYPES } from "../shared/constants";
import { asyncNoop, mockedStorage, noop } from "../shared/mocks";

type UseStateType<T> = [T, StateUpdater<T>];

interface IMainContext {
  storage: IStorage;
  tab?: chrome.tabs.Tab;
  url: string;
  adverts: UseStateType<ImmoAdvertsLocalStorageType>;
  selectedAd: UseStateType<string | undefined>;
  addNew: () => Promise<void>;
  deleteFrom: (id?: string) => Promise<void>;
  id: string;
}

const defaultMainContext: IMainContext = {
  addNew: asyncNoop,
  adverts: [[], noop],
  deleteFrom: asyncNoop,
  id: "",
  selectedAd: [undefined, noop],
  storage: mockedStorage,
  url: "",
  tab: undefined
};
export const MainContext = createContext<IMainContext>(defaultMainContext);

export interface MainContextProviderProps {
  storage: IStorage;
  extensionApi: IChromeExtensionApi;
}

export const MainContextProvider: FunctionalComponent<
  MainContextProviderProps
> = ({ children, storage, extensionApi }) => {
  const [ads, setAds] = useState<ImmoAdvertsLocalStorageType>([]);
  const [selectedAd, setSelectedAd] = useState<string>();
  const [url, setUrl] = useState<string>("");

  const id = useMemo(() => getAdId(url), [url]);

  useEffect(() => {
    extensionApi
      .getActiveTab()
      .then((tab) => {
        if (tab?.url !== undefined) {
          setUrl(tab.url);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    storage.api
      .get<ImmoAdvertsLocalStorageType>("IMMO_ADS")
      .then((value) => {
        setAds(value ?? []);

        if (value?.length > 0 && value.find((ad) => ad.id === id) != null) {
          setSelectedAd(id);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const addNew = useCallback(async () => {
    const item = await chromeExtensionApi.sendMessage({
      type: EVENT_TYPES.FETCH_AD
    });

    if (item !== undefined)
      storage.append("IMMO_ADS", item).then((item) => {
        setAds(item);
      });
  }, [storage]);

  const deleteFrom = useCallback(
    async (innerId?: string) => {
      if (confirm("Silmek istedigine emin misin?")) {
        const deleteId = innerId ?? id;
        storage
          .deleteFrom<ImmoAdvertLocalStorageItemType>("IMMO_ADS", deleteId)
          .then((item) => {
            setAds(item);
            if (deleteId === selectedAd) setSelectedAd(undefined);
          });
      }
    },
    [storage, id]
  );

  return (
    <MainContext.Provider
      value={{
        storage,
        url,
        id,
        adverts: [ads, setAds],
        selectedAd: [selectedAd, setSelectedAd],
        deleteFrom,
        addNew
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
