import { observer } from "mobx-react-lite";
import { Todo } from "../stores/TodoStore.ts";
import { CompleteTodo, DeleteTodo, EditTodo } from ".";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = (props: TodoItemProps) => {
  const todo = props.todo;
  return (
    <div
      key={todo.id}
      className={`${
        todo.completed ? "bg-gray-100" : ""
      } flex flex-col border-b border-gray-300 p-3 last:border-none`}
    >
      <p
        className={`${
          todo.completed ? "text-gray-200" : ""
        } text-middle w-3/12 font-medium`}
      >
        {todo.title}
      </p>
      <p
        className={`${
          todo.completed ? "text-gray-200" : ""
        } mb-2 max-h-12 w-6/12 overflow-y-hidden whitespace-pre-wrap break-words font-light`}
      >
        {todo.description}
      </p>
      <div className="flex gap-3">
        <CompleteTodo todo={todo} />
        <DeleteTodo id={todo.id} />
        <EditTodo todo={todo} />
      </div>
    </div>
  );
};

const ObservedTodoItem = observer(TodoItem);

export default ObservedTodoItem;
