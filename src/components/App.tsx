import { observer } from "mobx-react-lite";
import { TodoList, AddTodo, Header, Modal, DetailedView } from ".";
import store from "../stores/TodoStore";

function App() {
  //Search for todo with "isDetailed" attribute to demonstate on page
  const detailedTodo = store.todos.find((todo) => todo.isDetailed);
  return (
    <>
      <main className="h-auto min-h-screen w-screen bg-gradient-to-t from-white to-blue-700 bg-fixed p-2 sm:p-10 md:grid md:grid-cols-2 md:gap-3">
        <Header />
        <TodoList />
        {detailedTodo ? <DetailedView /> : null}
        <AddTodo />
        <Modal />
      </main>
    </>
  );
}

const ObservedApp = observer(App);

export default ObservedApp;
