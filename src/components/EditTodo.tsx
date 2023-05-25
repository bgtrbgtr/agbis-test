import { observer } from "mobx-react-lite";
import store, { Todo } from "../stores/TodoStore.ts";
import loclzStore from "../stores/LocalizationStore.ts";

interface EditTodoProps {
  todo: Todo;
}

const EditTodo = (props: EditTodoProps) => {
  return (
    <button
      type="button"
      aria-label={`${loclzStore.setTranslation("ariaLabels.editTodo")}`}
      className="h-8 w-8 rounded-full bg-white p-1.5 hover:bg-blue-300 active:bg-blue-400"
      onClick={() => store.editTodo(props.todo)}
    >
      <img className="h-4 w-5" src="/src/assets/edit.svg" />
    </button>
  );
};

const ObservedEditTodo = observer(EditTodo);

export default ObservedEditTodo;
