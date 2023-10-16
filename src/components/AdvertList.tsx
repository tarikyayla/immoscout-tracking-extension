import { useContext } from "preact/hooks";
import {
  type ImmoAdvertLocalStorageItemType,
  type ImmoAdvertPictureType,
  type ImmoAdvertsLocalStorageType
} from "../shared/types";
import { type FunctionalComponent } from "preact";
import { MainContext } from "../context/MainContext";
import { IMMO_AD_URL } from "../shared/constants";
import { DownArrow, UpArrow } from "../icons";

export interface AdvertListProps {
  items: ImmoAdvertsLocalStorageType;
  addItem: (items: ImmoAdvertsLocalStorageType) => void;
  deleteItem: (id: string) => void;
}

interface IAdvertProps {
  data: ImmoAdvertLocalStorageItemType;
  isSelected: boolean;
  onClick: (id: string) => void;
  index: number;
  deleteFrom: (id: string) => void;
}

export const Pictures: FunctionalComponent<{
  pictures: ImmoAdvertPictureType;
}> = ({ pictures }) => {
  const onClick = (): void => {
    pictures.forEach((picture) => {
      chrome.tabs.create({
        url: picture!
      });
    });
  };

  return (
    <>
      <div className={"ad-item-pictures"}>
        {pictures
          .filter((picture) => picture != null)
          .map((picture) => (
            <a href={picture!} target={"_blank"}>
              <img
                onClick={() => window.open(picture!, "_blank")}
                src={picture as string}
              />
            </a>
          ))}
      </div>
      <span onClick={onClick}>Click to open all</span>
    </>
  );
};

export const Details: FunctionalComponent<{
  data: ImmoAdvertLocalStorageItemType;
}> = ({ data }) => {
  return (
    <div className={"ad-item-details"}>
      <a href={`${IMMO_AD_URL}${data.id}`} target={"_blank"}>
        Go to URL
      </a>
      <div className={"ad-item-details--row"}>
        <span className={"label"}>Kalt Miete:</span>
        <span className={"value"}>{data.kaltMiete}</span>
      </div>
      <div className={"ad-item-details--row"}>
        <span className={"label"}>Warm Miete:</span>
        <span className={"value"}>{data.warmMiete}</span>
      </div>
      <div className={"ad-item-details--row"}>
        <span className={"label"}>Address:</span>
        <span className={"value"}>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(
              data.address
            )}`}
            target={"_blank"}
          >
            {data.address}
          </a>
        </span>
      </div>
      <div className={"ad-item-details--row"}>
        <span className={"label"}>Flache:</span>
        <span className={"value"}>{data.flache}</span>
      </div>
      <div className={"ad-item-details--row"}>
        <span className={"label"}>Zimmer:</span>
        <span className={"value"}>{data.zimmer}</span>
      </div>
      <div className={"ad-item-details--row"}>
        <span className={"label"}>Etage:</span>
        <span className={"value"}>{data.etage}</span>
      </div>
      <div className={"ad-item-details--row"}>
        <span className={"label"}>m2 Price:</span>
        <span className={"value"}>{data.m2price}</span>
      </div>

      <Pictures pictures={data.pictures} />
    </div>
  );
};

export const Advert: FunctionalComponent<IAdvertProps> = ({
  onClick,
  data,
  isSelected,
  index,
  deleteFrom
}) => {
  const { id, title } = data;
  return (
    <>
      <div
        className={"ad-item"}
        key={index}
        onClick={() => {
          onClick(id);
        }}
      >
        {isSelected ? <UpArrow /> : <DownArrow />}
        <span className={"advert-title"}>{title}</span>
        <button
          className={"delete-button"}
          onClick={() => {
            deleteFrom(id);
          }}
        >
          X
        </button>
      </div>
      {isSelected && <Details data={data} />}
    </>
  );
};

export const AdvertList: FunctionalComponent = () => {
  const {
    adverts: [ads],
    selectedAd: [selectedAd, setSelectedAd],
    deleteFrom
  } = useContext(MainContext);

  const AdvertOnClick = (id: string): void => {
    console.log(ads.find((ad) => ad.id === id));
    if (id === selectedAd) {
      setSelectedAd(undefined);
      return;
    }

    setSelectedAd(id);
  };

  return (
    <div className="ad-list">
      {ads?.map((ad: ImmoAdvertLocalStorageItemType, index: number) => (
        <Advert
          index={index}
          data={ad}
          isSelected={selectedAd === ad.id}
          onClick={AdvertOnClick}
          deleteFrom={deleteFrom}
        />
      ))}
    </div>
  );
};
