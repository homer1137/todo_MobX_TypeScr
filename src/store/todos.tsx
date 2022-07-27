import { makeAutoObservable } from "mobx";

class Todos {
  todos = [
    { id: 1, text: "Тестовое задание2", done: false },
    { id: 2, text: "Прекрасный код2", done: true },
    { id: 3, text: "Покрытие тестами", done: false },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(todo: { id: number; text: string; done: boolean }) {
    this.todos.push(todo);
  }

  removeTodo() {
    this.todos = this.todos.filter((item) => item.done !== true);
  }

  completeTodo(id: number) {
    this.todos[id].done = !this.todos[id].done;
  }
}

export default new Todos();
