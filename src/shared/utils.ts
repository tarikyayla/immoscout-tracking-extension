import { IMMO_AD_URL, type StorageKeys } from "./constants";

export const trimStr = (str?: string | null): string => {
  if (str == null) return "";

  return str.split("\n").join("").split("  ").join("");
};

export const getField = (selector: string): string => {
  const el = document.querySelector(selector);
  return trimStr(el?.textContent);
};

export const noCorsUri = (url: string): string =>
  `https://corsproxy.io/?${encodeURIComponent(url)}`;

export const noCorsFetch = async (
  url: string,
  init?: RequestInit
): Promise<Response> =>
  await fetch(noCorsUri(url), {
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    ...init
  });

export function base64ToBlob(dataURL: string): Blob {
  const byteCharacters = atob(dataURL.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: "image/jpeg" });
}

export const getAdId = (url?: string): string => {
  const websiteUrl = url ?? location.href;

  return websiteUrl
    .replace(IMMO_AD_URL, "")
    .replaceAll("/", "")
    .replaceAll("#", "")
    .split("?")[0];
};

export const isLocalUrl = (): boolean => {
  const { hostname } = window.location;
  const localUrls = ["127.0.0.1", "localhost"];

  return localUrls.includes(hostname);
};

export type StorageKeyType = keyof typeof StorageKeys;
