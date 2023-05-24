import { observer } from "mobx-react-lite";
import { TodoCounter } from ".";

const Header = () => {
  return (
    <div className="flex justify-start">
      <h1 className="text-3xl font-extralight text-white">To Do List</h1>
      <TodoCounter />
      <div className="ml-auto flex gap-1 text-sm">
        <button
          type="button"
          className="active:black text-white hover:font-black"
        >
          En
        </button>
        <button
          type="button"
          className="active:black text-white hover:font-black"
        >
          Ru
        </button>
      </div>
    </div>
  );
};

const ObservedHeader = observer(Header);

export default ObservedHeader;
