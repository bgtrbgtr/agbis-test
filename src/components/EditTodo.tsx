import { observer } from "mobx-react-lite";
import store from "../stores/TodoStore.ts";
import { Todo } from "../stores/TodoStore.ts";

interface EditTodoProps {
  todo: Todo;
}

const EditTodo = (props: EditTodoProps) => {
  return (
    <button
      type="button"
      aria-label="Редактировать запись"
      className="h-8 w-8 rounded-full bg-white p-1.5 hover:bg-blue-300 active:bg-blue-400"
      onClick={() => store.editTodo(props.todo)}
    >
      <img
        className="h-4 w-5"
        src="/src/assets/edit.svg"
        alt="Редактировать запись"
      />
    </button>
  );
};

const ObservedEditTodo = observer(EditTodo);

export default ObservedEditTodo;
