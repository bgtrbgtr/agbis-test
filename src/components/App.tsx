import { observer } from "mobx-react-lite";
import { TodoList, AddTodo, Header, Modal, DetailedView } from ".";
import store from "../stores/TodoStore";

function App() {
  const detailedTodo = store.todos.find((todo) => todo.isDetailed);
  return (
    <>
      <main className="grid h-auto min-h-screen w-screen grid-cols-2 gap-3 bg-gradient-to-t from-white to-blue-700 bg-fixed p-10">
        <Header />
        <TodoList />
        {detailedTodo ? (
          <div className="mb-20 mt-3 h-fit rounded-md bg-gray-100/75 p-2">
            <DetailedView />
          </div>
        ) : null}
        <AddTodo />
        <Modal />
      </main>
    </>
  );
}

const ObservedApp = observer(App);

export default ObservedApp;
