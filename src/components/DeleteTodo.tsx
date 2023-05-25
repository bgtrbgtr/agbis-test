import { observer } from "mobx-react-lite";
import store from "../stores/TodoStore.ts";

interface DeleteTodoProps {
  id: number;
}

const DeleteTodo = (props: DeleteTodoProps) => {
  return (
    <button
      type="button"
      aria-label="Удалить запись"
      className="h-8 w-8 rounded-full bg-white p-1.5 hover:bg-blue-300 active:bg-blue-400"
      onClick={() => store.removeTodo(props.id)}
    >
      <img
        className="h-5 w-5"
        src="/src/assets/trashbin.svg"
        alt="Удалить запись"
      />
    </button>
  );
};

const ObservedDeleteTodo = observer(DeleteTodo);

export default ObservedDeleteTodo;