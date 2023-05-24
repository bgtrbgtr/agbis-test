import { observer } from "mobx-react-lite";
import store from "../stores/TodoStore.ts";
import uiStore from "../stores/UIStore.ts";

const Modal = () => {
  const todoInEdit = store.todoInEdit;

  return (
    <>
      {uiStore.isModalOpen ? (
        <div className="absolute left-0 top-0 z-10 h-full w-screen bg-black/50">
          <div className="flex h-screen items-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto my-auto flex h-2/5 w-1/2 flex-col rounded-md bg-gray-200 p-3"
            >
              <button
                className="ml-auto w-5"
                type="button"
                onClick={() => {
                  uiStore.openModal();
                }}
              >
                <img className="h-5 w-5" src="/src/assets/close.svg"></img>
              </button>
              <label className="text font-light">New title:</label>
              <input
                placeholder="Title"
                value={todoInEdit.title}
                onChange={(e) =>
                  todoInEdit ? (todoInEdit.title = e.target.value) : null
                }
                className="mb-2 rounded-md p-1 text-sm outline-none placeholder:font-thin placeholder:text-gray-600"
              ></input>
              <label className="text font-light">New description:</label>
              <textarea
                placeholder="Brief description"
                value={todoInEdit.description}
                onChange={(e) =>
                  todoInEdit ? (todoInEdit.description = e.target.value) : null
                }
                className="mb-3 h-3/5 resize-none overflow-y-auto whitespace-pre-wrap break-words rounded-md p-1 text-sm outline-none placeholder:font-thin placeholder:text-gray-600"
              ></textarea>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  store.saveChanges();
                }}
                className="w-1/6 self-center rounded-md bg-white p-2 text-xs font-thin hover:bg-blue-600 hover:text-white active:bg-blue-700"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

const ObservedModal = observer(Modal);

export default ObservedModal;
