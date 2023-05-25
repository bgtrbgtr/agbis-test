import { observer } from "mobx-react-lite";
import store from "../stores/TodoStore.ts";
import { TodoItem } from ".";

store.loadTodos();

const TodoList = () => {
  return (
    <div className="sm:mb-20">
      <section className="mt-16 flex flex-col justify-between gap-5 sm:mt-3">
        <div className="w-full overflow-y-auto">
          {store.todos.length > 0 ? (
            <div
              className={`mb-3 rounded-md bg-gray-100/75 ${
                store.todos.find((todo) => todo.isDisplayed) ? "p-2" : ""
              }`}
            >
              {store.todos.map((todo) => {
                if (todo.isDisplayed) {
                  return <TodoItem todo={todo} key={todo.id} />;
                } else {
                  return null;
                }
              })}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

const ObservedTodoList = observer(TodoList);

export default ObservedTodoList;
