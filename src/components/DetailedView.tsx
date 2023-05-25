import { observer } from "mobx-react-lite";
import store, { Todo } from "../stores/TodoStore";
import loclzStore from "../stores/LocalizationStore";
import closeImgUrl from "../assets/close.svg";

// Component let user to view full details on todo-item
const DetailView = () => {
  const detailedTodo = store.todos.find((todo) => todo.isDetailed);
  const todo = detailedTodo as Todo;

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 mx-2 mb-3 mt-3 overflow-y-hidden rounded-md bg-gray-100/95 p-2 sm:top-1/4 sm:mx-12 sm:mb-20 sm:h-fit sm:bg-gray-100/95 md:relative md:top-0 md:mx-0 md:bg-gray-100/75">
      <section className="absolute top-0 p-3 sm:relative">
        <button
          type="button"
          aria-label={`${loclzStore.setTranslation(
            "ariaLabels.closeDetailedView"
          )}`}
          onClick={() => store.putOnDetailedView(todo)}
        >
          <img className="absolute right-0 top-0 h-6 w-6" src={closeImgUrl} />
        </button>
        <h2 className="mb-3 break-words font-bold underline md:text-2xl lg:text-5xl">
          {todo.title}
        </h2>
        <p className="break-words md:text-xl lg:text-2xl">{todo.description}</p>
      </section>
    </div>
  );
};

const ObservedDetailView = observer(DetailView);

export default ObservedDetailView;
