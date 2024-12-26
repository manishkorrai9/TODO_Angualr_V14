import { Injectable } from '@angular/core';
import { Todo } from './to-do.modal';
@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  private todos: Todo[] = [];

  constructor() {
    this.loadingTodos();
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo)  {
    this.todos.push(todo);
    this.saveTodos();
  }

  updateTodo(updatedTodo: Todo) {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.saveTodos();
    }
  }
  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.saveTodos();
  }

  private loadingTodos() {
    const data = localStorage.getItem('todos');
    this.todos = data ? JSON.parse(data) : [];
  }

  private saveTodos()  {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }


}
