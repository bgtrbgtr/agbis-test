import { makeAutoObservable, action } from "mobx";
import uiStore from "./UIStore";

// Interfaces:
export interface Todo {
  id: number;
  completed: boolean;
  title: string;
  description: string;
  isDetailed: boolean;
  isDisplayed: boolean;
}

export interface NewTodo {
  title: string;
  description: string;
}

// Functions for mobx-actions:
const addTodo = (todos: Todo[], newTodo: NewTodo): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id)) + 1),
    title: newTodo.title,
    description: newTodo.description,
    completed: false,
    isDetailed: false,
    isDisplayed: uiStore.filterSelection === "Completed" ? false : true, //add condition to prevent new todo from displaying when filter is on
  },
];

const removeTodo = (todos: Todo[], id: number): Todo[] => {
  return todos.filter((todo) => todo.id !== id);
};

const handleFilterList = (todos: Todo[], completed: boolean): Todo[] => {
  return todos.map((todo) => {
    if (todo.completed === completed) {
      todo.isDisplayed = true;
    } else {
      todo.isDisplayed = false;
    }
    return todo;
  });
};

// Mobx store and actions:
class TodoStore {
  todos: Todo[] = [];
  newTodo: NewTodo = { title: "", description: "" };
  todoInEdit: Todo = {
    id: 1,
    title: "",
    description: "",
    completed: false,
    isDetailed: false,
    isDisplayed: true,
  };

  constructor() {
    makeAutoObservable(this);
  }

  addTodo() {
    this.todos = addTodo(this.todos, this.newTodo);
    this.newTodo = { title: "", description: "" };
  }

  editTodo(todo: Todo) {
    this.todoInEdit = { ...todo };
    uiStore.openModal();
  }

  saveChanges() {
    this.todos.map((todo) => {
      if (todo.id === this.todoInEdit.id) {
        todo.title = this.todoInEdit.title;
        todo.description = this.todoInEdit.description;
      } else {
        return todo;
      }
    });
    uiStore.openModal();
  }

  removeTodo(id: number) {
    this.todos = removeTodo(this.todos, id);
  }

  handleNewTodoTitleChange(title: string) {
    this.newTodo.title = title;
  }

  handleNewTodoDescriptionChange(description: string) {
    this.newTodo.description = description;
  }

  completeTodo(todo: Todo) {
    todo.completed = !todo.completed;
  }

  putOnDetailedView(todo: Todo) {
    this.todos = this.todos.map((element) =>
      element.id === todo.id
        ? (element = { ...element, isDetailed: !element.isDetailed })
        : (element = { ...element, isDetailed: false })
    );
  }

  //For downloading some todos for demonstration
  loadTodos() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((res: Todo[]) => {
        res.slice(0, 3).forEach((todo: Todo) => {
          todo.isDisplayed = true;
          todo.description =
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam velit deleniti provident mollitia sint eligendi impedit.Cum illum suscipit sit, ipsam delectus necessitatibus tenetur doloribus totam facere porro, dolore vel";
          action(() => {
            store.todos.push(todo);
          })();
        });
      });
  }

  filterList() {
    const filterValue = uiStore.filterSelection;
    if (filterValue === "Completed") {
      this.todos = handleFilterList(this.todos, true);
    } else if (filterValue === "Incompleted") {
      this.todos = handleFilterList(this.todos, false);
    } else {
      this.todos.map((todo) => {
        todo.isDisplayed = true;
        return todo;
      });
    }
  }
}

const store = new TodoStore();

export default store;
