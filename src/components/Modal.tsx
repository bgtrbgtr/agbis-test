import { action } from "mobx";
import { observer } from "mobx-react-lite";
import store from "../stores/TodoStore.ts";
import uiStore from "../stores/UIStore.ts";
import loclzStore from "../stores/LocalizationStore.ts";
import closeImgUrl from "../assets/close.svg";

const Modal = () => {
  const todoInEdit = store.todoInEdit;

  return (
    <>
      {uiStore.isModalOpen ? (
        <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/50">
          <div className="flex h-full items-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto my-auto flex h-[400px] w-10/12 flex-col rounded-md bg-gray-200 p-3 md:w-8/12 lg:w-8/12"
            >
              <button
                className="ml-auto w-5"
                aria-label={`${loclzStore.setTranslation(
                  "ariaLabels.closeModal"
                )}`}
                type="button"
                onClick={() => {
                  uiStore.openModal();
                }}
              >
                <img className="h-5 w-5" src={closeImgUrl}></img>
              </button>
              <label className="text font-light">{`${loclzStore.setTranslation(
                "labels.inputTitle"
              )}`}</label>
              <input
                placeholder={`${loclzStore.setTranslation(
                  "placeholders.newTitle"
                )}`}
                value={todoInEdit.title}
                onChange={(e) =>
                  todoInEdit
                    ? action(() => {
                        todoInEdit.title = e.target.value;
                      })()
                    : null
                }
                className="mb-2 rounded-md p-1 text-sm outline-none placeholder:font-thin placeholder:text-gray-600"
              ></input>
              <label className="text font-light">{`${loclzStore.setTranslation(
                "labels.inputDescription"
              )}`}</label>
              <textarea
                placeholder={`${loclzStore.setTranslation(
                  "placeholders.newDescription"
                )}`}
                value={todoInEdit.description}
                onChange={(e) =>
                  todoInEdit
                    ? action(() => {
                        todoInEdit.description = e.target.value;
                      })()
                    : null
                }
                className="mb-3 h-3/5 resize-none overflow-y-auto whitespace-pre-wrap break-words rounded-md p-1 text-sm outline-none placeholder:font-thin placeholder:text-gray-600"
              ></textarea>
              <button
                type="button"
                aria-label={`${loclzStore.setTranslation(
                  "ariaLabels.saveModal"
                )}`}
                onClick={(e) => {
                  e.preventDefault();
                  store.saveChanges();
                }}
                className="w-3/6 self-center rounded-md bg-white p-2 text-xs font-thin hover:bg-blue-600 hover:text-white active:bg-blue-700 sm:w-1/6 lg:w-2/6"
              >
                {`${loclzStore.setTranslation("buttons.saveModal")}`}
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
