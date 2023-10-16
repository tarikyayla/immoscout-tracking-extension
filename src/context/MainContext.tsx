import { type FunctionalComponent, createContext } from "preact";
import { type IStorage, getAdId, noop, asyncNoop } from "../shared";
import { storage } from "../shared";
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
  storage,
  url: "",
  tab: undefined
};
export const MainContext = createContext<IMainContext>(defaultMainContext);

export const MainContextProvider: FunctionalComponent = ({ children }) => {
  const [ads, setAds] = useState<ImmoAdvertsLocalStorageType>([]);
  const [selectedAd, setSelectedAd] = useState<string>();
  const [url, setUrl] = useState<string>("");

  const id = useMemo(() => getAdId(url), [url]);

  useEffect(() => {
    chrome.tabs
      .query({
        active: true,
        lastFocusedWindow: true
      })
      .then((tabs) => {
        if (tabs?.[0].url !== undefined) {
          setUrl(tabs[0].url);
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
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    });

    if (tab?.id === undefined) return;

    const item = await chrome.tabs.sendMessage(tab.id, {
      type: EVENT_TYPES.FETCH_AD
    });

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
