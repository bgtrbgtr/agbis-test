import { observer } from "mobx-react-lite";
import store from "../stores/TodoStore.ts";
import { TodoItem } from ".";

store.loadTodos();

const TodoList = () => {
  return (
    <div className="mb-20">
      <section className="mt-3 flex flex-col justify-between gap-5">
        <div className="w-full overflow-y-auto">
          {store.todos.length > 0 ? (
            <div className="mb-3 rounded-md bg-gray-100/75 p-2">
              {store.todos.map((todo) => (
                <TodoItem todo={todo} key={todo.id} />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

const ObservedTodoList = observer(TodoList);

export default ObservedTodoList;
