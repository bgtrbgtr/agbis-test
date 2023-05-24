import { makeAutoObservable } from "mobx";
import uiStore from "./UIStore";

// Interfaces:
export interface Todo {
  id: number;
  completed: boolean;
  title: string;
  description: string;
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
  },
];

const removeTodo = (todos: Todo[], id: number): Todo[] => {
  return todos.filter((todo) => todo.id !== id);
};

const filterList = (todos: Todo[], completed: boolean): Todo[] => {
  return todos.filter((todo) => todo.completed === completed);
};

// Mobx store and actions:
class TodoStore {
  todos: Todo[] = [];
  newTodo: NewTodo = { title: "", description: "" };
  todoInEdit: Todo = { id: 1, title: "", description: "", completed: false };
  unfilteredList: Todo[] = [...this.todos];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo() {
    this.todos = addTodo(this.todos, this.newTodo);
    this.unfilteredList = this.todos;
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
    this.unfilteredList = this.todos;
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

  loadTodos() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((res) => {
        res.slice(0, 3).forEach((todo: Todo) => {
          todo.description =
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.Nam velit deleniti provident mollitia sint eligendi impedit.Cum illum suscipit sit, ipsam delectus necessitatibus tenetur doloribus totam facere porro, dolore vel";
          store.todos.push(todo);
        });
      });
  }

  filterList(completed: boolean) {
    this.todos = filterList(this.todos, completed);
  }

  resetFilter() {
    this.todos = this.unfilteredList;
  }
}

const store = new TodoStore();

export default store;
