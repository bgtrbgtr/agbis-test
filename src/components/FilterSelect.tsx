import store from "../stores/TodoStore";
import { observer } from "mobx-react-lite";

const FilterSelect = () => {
  return (
    <div className="relative w-[200px]">
      <select
        id="filter-select"
        onChange={(e) => store.filterList(e.target.value)}
        className="ml-3 h-10 w-full appearance-none border-b-2 border-gray-200 bg-transparent px-2 font-mono text-white outline-none hover:cursor-pointer"
      >
        <option value="">Filter</option>
        <option value="option1">Completed</option>
        <option value="option2">Incompleted</option>
      </select>
      <div className="pointer-events-none absolute right-1 top-3 flex items-center px-2 hover:cursor-pointer">
        <img className="self-middle h-4 w-4" src="src/assets/arrow.svg" />
      </div>
    </div>
  );
};

const ObservedFilterSelect = observer(FilterSelect);

export default ObservedFilterSelect;
