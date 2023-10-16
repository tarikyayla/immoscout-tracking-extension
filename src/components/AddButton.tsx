import { type FunctionalComponent } from "preact";
import { useCallback, useContext, useMemo, useState } from "preact/hooks";
import { isImmobilienscout } from "../shared";
import { MainContext } from "../context";
import { Button } from "./Button";

export const AddButton: FunctionalComponent = () => {
  const {
    adverts: [ads],
    url,
    id,
    addNew,
    deleteFrom
  } = useContext(MainContext);

  const [isLoading, setIsLoading] = useState(false);

  const isImmoUrl = useMemo(() => isImmobilienscout(url), [url]);

  const isExists = useMemo(
    () => ads.find((item) => item.id === id) !== undefined,
    [ads, id]
  );

  const onClick = useCallback(() => {
    const action = isExists ? deleteFrom : addNew;

    setIsLoading(true);

    action()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [isExists]);

  return (
    <Button isLoading={isLoading} isDisabled={!isImmoUrl} onClick={onClick}>
      {isExists ? "Delete" : "Add"}
    </Button>
  );
};
