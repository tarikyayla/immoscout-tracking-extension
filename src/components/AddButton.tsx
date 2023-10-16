import { type FunctionalComponent } from "preact";
import { useCallback, useContext, useMemo } from "preact/hooks";
import { isImmobilienscout } from "../shared";
import { MainContext } from "../context";

export const AddButton: FunctionalComponent = () => {
  const {
    adverts: [ads],
    url,
    id,
    addNew,
    deleteFrom
  } = useContext(MainContext);
  const isImmoUrl = useMemo(() => isImmobilienscout(url), [url]);

  const isExists = useMemo(
    () => ads.find((item) => item.id === id) !== undefined,
    [ads, id]
  );

  const onClick = useCallback(() => {
    if (isExists) {
      deleteFrom();
      return;
    }

    addNew();
  }, [isExists]);

  return (
    <button disabled={!isImmoUrl} className="button" onClick={onClick}>
      {isExists ? "Delete" : "Add"}
    </button>
  );
};
