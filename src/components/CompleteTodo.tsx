import { observer } from "mobx-react-lite";
import { Todo } from "../stores/TodoStore.ts";
import store from "../stores/TodoStore.ts";
import loclzStore from "../stores/LocalizationStore.ts";

interface CompleteTodoProps {
  todo: Todo;
}

const CompleteTodo = (props: CompleteTodoProps) => {
  return (
    <button
      type="button"
      onClick={() => {
        store.completeTodo(props.todo);
        store.filterList();
      }}
      aria-label={`${loclzStore.setTranslation("ariaLabels.completeTodo")}`}
      className="h-8 w-8 rounded-full bg-white p-1.5 hover:bg-blue-300 active:bg-blue-400"
    >
      <img
        className="h-5 w-5"
        src={
          props.todo.completed
            ? "/src/assets/incomplete.svg"
            : "/src/assets/complete.svg"
        }
      />
    </button>
  );
};

const ObservedCompleteTodo = observer(CompleteTodo);

export default ObservedCompleteTodo;
