import { TodoList, AddTodo, Header, Modal } from ".";

function App() {
  return (
    <>
      <main className="h-auto min-h-screen w-screen bg-gradient-to-t from-white to-blue-700 bg-fixed p-10">
        <Header />
        <TodoList />
        <AddTodo />
        <Modal />
      </main>
    </>
  );
}

export default App;
