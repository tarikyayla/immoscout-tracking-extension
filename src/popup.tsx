import { render } from "preact";
import { AdvertList } from "./components/AdvertList";
import { AddButton } from "./components/AddButton";
import { MainContextProvider } from "./context/MainContext";
import { type JSXInternal } from "preact/src/jsx";
import { setupEnvironment } from "./shared/setup";
const appDiv = document.getElementById("app");

const MainComponent = (): JSXInternal.Element => {
  const contextProps = setupEnvironment();
  return (
    <MainContextProvider {...contextProps}>
      <AdvertList />
      <footer>
        <AddButton />
      </footer>
    </MainContextProvider>
  );
};

render(<MainComponent />, appDiv!);
