import { convertDomToImage, downloadAdvertPage, getAdId } from "./shared";
import { EVENT_TYPES } from "./shared/constants";
import type { SendResponseType } from "./shared";

chrome.runtime.onMessage.addListener(function (
  request,
  sender: chrome.runtime.MessageSender,
  sendResponse: SendResponseType
) {
  if (request.type === EVENT_TYPES.FETCH_AD) {
    const id = getAdId();

    convertDomToImage(document.body, (blob) => {
      if (blob == null) {
        alert("An error happened");
        return;
      }

      downloadAdvertPage(id, blob).then((details) => {
        sendResponse(details);
      });
    });
  }

  return true;
});
