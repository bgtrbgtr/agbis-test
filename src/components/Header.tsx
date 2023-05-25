import { observer } from "mobx-react-lite";
import loclzStore from "../stores/LocalizationStore";
import { FilterSelect, TodoCounter } from ".";

const Header = () => {
  return (
    <header className="grid-rows-auto mt-6 grid max-h-20 grid-cols-2 justify-start sm:col-span-2 sm:flex sm:flex-row">
      <h1 className="text-3xl font-extralight text-white">{`${loclzStore.setTranslation(
        "titles.main"
      )}`}</h1>
      <TodoCounter />
      <FilterSelect />
      <div className="ml-auto flex gap-1 align-top text-sm">
        <button
          type="button"
          aria-label={`${loclzStore.setTranslation("ariaLabels.setEnglish")}`}
          className={`active:black text-2xl ${
            loclzStore.language === "EN" ? "font-black" : "font-light"
          } text-white hover:font-black`}
          onClick={() => loclzStore.setLanguage("EN")}
        >
          En
        </button>
        <button
          type="button"
          aria-label={`${loclzStore.setTranslation("ariaLabels.setRussian")}`}
          className={`active:black text-2xl ${
            loclzStore.language === "RU" ? "font-black" : "font-light"
          } text-white hover:font-black`}
          onClick={() => loclzStore.setLanguage("RU")}
        >
          Ru
        </button>
      </div>
    </header>
  );
};

const ObservedHeader = observer(Header);

export default ObservedHeader;
