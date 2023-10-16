import { IMMO_AD_URL } from "./constants";
import { type ImmoAdvertsLocalStorageType } from "./types";

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

export const testData: ImmoAdvertsLocalStorageType = [
  {
    address: "Uferstraße 19,Gesundbrunnen, 13357 Berlin",
    date: "2023-10-09T21:27:40.233Z",
    etage: "5 von 6",
    flache: "82,95m²",
    id: "146481966",
    kaltMiete: "938 €",
    longTexts: [
      "Sehr gut angebunden. Relativ ruhige Gegend. Schöne Ausstattung. Großer sonniger Balkon. Einbauküche muss übernommen werden (ca. 2.000€). Sofortiger Nettogehaltsnachweis (mind. 3.600€ Netto-Familieneinkommen), Mietschuldenfreiheit + Schufa erforderlich umKündigung mit Nachmieter noch bis Ende Oktober zu schaffen.weiterlesen…",
      "Die Immobilie befindet sich in belebter Wohnlage in Berlin. In unmittelbarer Umgebung der Immobilie gibt es einige Buslinien und die U-Bahnlinie U9. Zu Fuß erreichen Sie verschiedene Cafés, Restaurants, Supermärkte, Ärzte und Bäckereien. Außerdem gibt es einige Bars, Grün- und Parkanlagen, Fitnessstudios, Modegeschäfte und eine Buchhandlung.weiterlesen…"
    ],
    m2price: "11,31 €/m²Kalkuliert von ImmoScout24 ",
    pictures: [
      "https://pictures.immobilienscout24.de/listings/955cb10a-37a4-4697-ac43-6b4522f5f087-1659371864.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
      "https://pictures.immobilienscout24.de/listings/7550143e-a375-40ef-b224-310caab69f84-1659371865.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
      "https://pictures.immobilienscout24.de/listings/e57e55c9-7704-4bec-b72e-8af6d1cb9ade-1659371866.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
      "https://pictures.immobilienscout24.de/listings/fb8d7b28-9b3c-4923-aa46-469eb8077861-1659371868.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
      "https://pictures.immobilienscout24.de/listings/a2be0016-c50c-4c5a-812e-eb85c3f43ac2-1659371871.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
      "https://pictures.immobilienscout24.de/listings/5b669546-cb8e-4a92-93c0-1c95aacc8427-1659371873.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
      "https://pictures.immobilienscout24.de/listings/102d5b65-0422-4693-ab0d-a6233d2b8e7d-1659371874.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
      "https://pictures.immobilienscout24.de/listings/592793fb-6132-4b59-9552-2bae2584e637-1659371876.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73"
    ],
    title:
      "Exklusive 3,5-Zimmer-Wohnung mit Balkon und EBK in Wedding (Nachmieter gesucht)",
    warmMiete: "1.198,78 €",
    zimmer: "3,5"
  },
  {
    address: "ZWISCHENMIETE 11,Baumschulenweg, 12437 Berlin",
    date: "2023-10-09T21:31:22.053Z",
    etage: "4 von 4",
    flache: "68m²",
    id: "146504229",
    kaltMiete: "850 €",
    longTexts: [
      "ZWISCHENMIETE(!) für zwei Monate (November + Dezember) gesucht. Zum 31.10.2023 kann die Wohnung, die im vierten OG liegt, bezogen werden und muss spätestens am 31.12.2023 wieder verlassen werden. In der Wohnung gibt es drei Zimmer, zwei ca. 20m², eines etwa 12m². Eine Einbauküche mit Kühlschrank und Herd ist vorhanden. Es gibt einen Keller.Bei Bedarf können eine Matratze, ein Tisch, zwei Stühle, Töpfe etwas Geschirr zur Verfügung gestellt werden.weiterlesen…",
      "ZWISCHENMIETE!!! Der S-Bahnhof Baumschulenweg ist in 12min zu Fuß, die M41-Haltestelle Sonnenallee/Baumschulenstraße in 2min zu Fuß erreichbar. Der Mauerweg ist gleich hinterm Haus. Königsheide und Plänterwald sind auch um die Ecke.weiterlesen…"
    ],
    m2price: "12,50 €/m²Kalkuliert von ImmoScout24 ",
    pictures: [
      "https://pictures.immobilienscout24.de/listings/863d8d96-070b-48b0-a52f-78ffd13109d5-1659754131.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
      "https://pictures.immobilienscout24.de/listings/3d93f8e2-960b-4dd2-995a-28860625e486-1659754128.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
      "https://pictures.immobilienscout24.de/listings/9e9c659d-330e-434b-8ad4-b3e57d608f21-1659754132.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
      "https://pictures.immobilienscout24.de/listings/cfc0b25e-0b75-4684-8a74-a69d1b78a56d-1659754134.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
      "https://pictures.immobilienscout24.de/listings/f77c0c12-b3b5-4c74-b612-f38372faed12-1659754136.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
      "https://pictures.immobilienscout24.de/listings/0884c52d-e60e-4a55-97d1-86b767529ce4-1659754137.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73",
      "https://pictures.immobilienscout24.de/listings/f49e0f4d-1489-4b43-8a14-0d6255a12d31-1659754139.jpg/ORIG/resize/1106x830%3E/format/webp/quality/73"
    ],
    title: "ZWISCHENMIETE!!! (11/23-12/23) 3-Zimmer-Wohnung in Baumschulenweg",
    warmMiete: "1.050 €",
    zimmer: "3"
  }
];

export const noop = (): void => {};
