import { getField, noCorsFetch, trimStr } from "./utils";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import {
  type ImmoAdvertDetailsType,
  type ImmoAdvertPictureType,
  type ZipFileType
} from "./types";
import html2canvas from "html2canvas";
import { IMMO_AD_URL } from "./constants";

export const isImmobilienscout = (url?: string): boolean => {
  const websiteUrl = url ?? window.location.href;
  return websiteUrl.startsWith(IMMO_AD_URL);
};

export const fetchImmoDetails = (id: string): ImmoAdvertDetailsType => {
  const pictures =
    Array.from(document.querySelectorAll(".sp-image")).map((i) =>
      i.getAttribute("data-src")
    ) ?? [];
  const address = getField(".address-block");
  const kaltMiete = getField(".is24qa-kaltmiete-main");
  const flache = getField(".is24qa-flaeche-main");
  const zimmer = getField(".is24qa-zi-main");
  const warmMiete = getField(".is24qa-warmmiete-main");
  const etage = getField(".is24qa-etage");
  const m2price = getField(".is24qa-preism²");
  const title = getField("#expose-title");
  // const id = getField('.is24-scoutid__content');

  const longTexts = Array.from(
    document.querySelectorAll(".is24-long-text-attribute")
  ).map((el) => trimStr(el.textContent));

  return {
    id,
    title,
    address,
    kaltMiete,
    flache,
    zimmer,
    warmMiete,
    etage,
    m2price,
    pictures,
    longTexts
  };
};

export const convertDomToImage = (
  el: HTMLElement,
  callback: BlobCallback
): void => {
  html2canvas(el, {
    proxy: "https://corsproxy.io/?"
  }).then((canvas) => {
    canvas.toBlob(callback);
  });
};

export const createAndDownloadZip = async (
  items: ZipFileType[],
  title: string
): Promise<void> => {
  const zip = new JSZip();
  items.forEach((item) => zip.file(item.fileName, item.data));
  zip
    .generateAsync({
      type: "blob"
    })
    .then(function (blob) {
      saveAs(blob, `${title}.zip`);
    });
};

export const fetchImages = async (
  imageUrls: ImmoAdvertPictureType
): Promise<ZipFileType[]> => {
  const imgRequests = imageUrls
    .filter((url) => url != null && url.length > 0)
    .map(
      async (url, index) =>
        await noCorsFetch(url!).then(async (value: Response) => ({
          fileName: `img-${index}.jpg`,
          data: await value.blob()
        }))
    );

  const imageData = await Promise.all(imgRequests);

  return imageData;
};

export const downloadAdvertPage = async (
  id: string,
  pageScreenshot: Blob
): Promise<ImmoAdvertDetailsType> => {
  const details = fetchImmoDetails(id);
  const images = await fetchImages(details.pictures);
  await createAndDownloadZip(
    [
      ...images,
      {
        data: pageScreenshot,
        fileName: "ad-detail.png"
      }
    ],
    details.title
  );

  return details;
};
