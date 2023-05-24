import { observer } from "mobx-react-lite";
import store from "../stores/TodoStore";

const TodoCounter = () => {
  const completed = store.todos.filter((todo) => todo.completed);

  return (
    <p className="ml-3 text-3xl font-extralight text-white">{`${completed.length}/${store.todos.length}`}</p>
  );
};

const ObservedTodoCounter = observer(TodoCounter);

export default ObservedTodoCounter;
