import { observer } from "mobx-react-lite";
import store, { Todo } from "../stores/TodoStore";

const DetailView = () => {
  const detailedTodo = store.todos.find((todo) => todo.isDetailed);
  const todo = detailedTodo as Todo;

  return (
    <section className="p-3">
      <h2 className="text-lg font-bold">{todo.title}</h2>
      <p>{todo.description}</p>
    </section>
  );
};

const ObservedDetailView = observer(DetailView);

export default ObservedDetailView;
