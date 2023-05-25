import { observer } from "mobx-react-lite";
import store from "../stores/TodoStore.ts";
import uiStore from "../stores/UIStore.ts";
import loclzStore from "../stores/LocalizationStore.ts";
import ValidationError from "../errors/ValidationError.ts";

const AddTodo = () => {
  //limit the number of lines in a textarea while changing
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
    <div className="mb-2 flex flex-col sm:bottom-4 sm:left-10 sm:right-10 md:fixed">
      <form
        name="AddNewTodo"
        className="flex flex-col justify-between gap-2 rounded-md bg-gray-200/75 p-2 sm:flex-row"
      >
        <input
          type="text"
          form="AddNewTodo"
          value={store.newTodo.title}
          onChange={(e) => {
            store.handleNewTodoTitleChange(e.target.value);
            uiStore.clearErrorMessage();
          }}
          placeholder={`${loclzStore.setTranslation("placeholders.newTitle")}`}
          className="rounded-md p-1 align-top text-sm outline-none placeholder:font-thin placeholder:text-gray-600 sm:w-3/12"
        ></input>
        <textarea
          id="textarea"
          placeholder={`${loclzStore.setTranslation(
            "placeholders.newDescription"
          )}`}
          value={store.newTodo.description}
          onChange={(e) => {
            handleNewTodoInput(e);
            store.handleNewTodoDescriptionChange(e.target.value);
          }}
          className="h-10 resize-none overflow-y-auto whitespace-pre-wrap break-words rounded-md p-1 pt-[10px] text-sm outline-none placeholder:font-thin placeholder:text-gray-600 sm:w-6/12"
        ></textarea>
        <button
          type="submit"
          aria-label={`${loclzStore.setTranslation("ariaLabels.addNewTodo")}`}
          className="mx-auto rounded-md bg-white p-2 text-xs font-light hover:bg-blue-600 hover:text-white active:bg-blue-700 sm:w-3/12"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            const textarea = document.querySelector("#textarea");
            try {
              e.preventDefault();
              // Sort of validation for title-input
              if (!store.newTodo.title) {
                throw new ValidationError(
                  `${loclzStore.setTranslation("errorMessages.validation")}`
                );
              }
              store.addTodo();
              // Return textarea height to default value in case it was increased by input
              textarea?.setAttribute("style", "height: 40px");
            } catch (e) {
              const error = e as ValidationError;
              uiStore.setErrorMessage(error.message);
            }
          }}
        >
          {`${loclzStore.setTranslation("buttons.addNewTodo")}`}
        </button>
      </form>
      {/* Element for displaying error message */}
      <span
        className={`${
          uiStore.errorMessage ? "opacity-100" : "opacity-0"
        } mx-auto font-black text-rose-600 transition-opacity duration-1000 ease-in-out sm:ml-3`}
      >
        {loclzStore.setTranslation("errorMessages.validation")}
      </span>
    </div>
  );
};

const ObservedAddTodo = observer(AddTodo);

export default ObservedAddTodo;
