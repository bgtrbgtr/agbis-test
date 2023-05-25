import { observer } from "mobx-react-lite";
import { FilterSelect, TodoCounter } from ".";

const Header = () => {
  return (
    <div className="col-span-2 flex max-h-20 justify-start">
      <h1 className="text-3xl font-extralight text-white">To Do List</h1>
      <TodoCounter />
      <FilterSelect />
      <div className="ml-auto flex gap-1 align-top text-sm">
        <button
          type="button"
          className="active:black text-2xl font-light text-white hover:font-black"
        >
          En
        </button>
        <button
          type="button"
          className="active:black text-2xl font-light text-white hover:font-black"
        >
          Ru
        </button>
      </div>
    </div>
  );
};

const ObservedHeader = observer(Header);

export default ObservedHeader;
