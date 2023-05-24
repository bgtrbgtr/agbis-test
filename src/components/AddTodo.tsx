import { observer } from "mobx-react-lite";
import store from "../stores/TodoStore.ts";
import uiStore from "../stores/UIStore.ts";
import ValidationError from "../errors/ValidationError.ts";

const AddTodo = () => {
  //limit the number of lines in a textarea
  const handleNewTodoInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    event.target.style.height = "auto";
    event.target.style.height =
      Math.min(
        event.target.scrollHeight - 14,
        5 * parseInt(getComputedStyle(event.target).lineHeight)
      ) + "px";
  };

  return (
    <>
      <form
        name="AddNewTodo"
        className="flex justify-between gap-2 rounded-md bg-gray-200/75 p-2"
      >
        <input
          type="text"
          form="AddNewTodo"
          value={store.newTodo.title}
          onChange={(e) => store.handleNewTodoTitleChange(e.target.value)}
          placeholder="Title"
          className="w-4/12 rounded-md p-1 align-top text-sm outline-none placeholder:font-thin placeholder:text-gray-600"
        ></input>
        <textarea
          placeholder="Brief Description"
          value={store.newTodo.description}
          onChange={(e) => {
            handleNewTodoInput(e);
            store.handleNewTodoDescriptionChange(e.target.value);
          }}
          className="h-10 w-6/12 resize-none overflow-y-auto whitespace-pre-wrap break-words rounded-md p-1 pt-[10px] text-sm outline-none placeholder:font-thin placeholder:text-gray-600"
        ></textarea>
        <button
          type="submit"
          className="ml-auto w-2/12 rounded-md bg-white p-2 text-xs font-thin hover:bg-blue-600 hover:text-white active:bg-blue-700"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            try {
              e.preventDefault();
              if (!store.newTodo.description || !store.newTodo.title) {
                throw new ValidationError("Fields cannot be empty");
              }
              store.addTodo();
            } catch (e) {
              const error = e as ValidationError;
              uiStore.setErrorMessage(error.message);
            }
          }}
        >
          Add new task
        </button>
      </form>
      {uiStore.errorMessage ? (
        <span className="duration 2000 ml-3 animate-pulse font-black text-rose-600 opacity-0 transition-opacity ease-out">
          {uiStore.errorMessage}
        </span>
      ) : null}
    </>
  );
};

const ObservedAddTodo = observer(AddTodo);

export default ObservedAddTodo;
