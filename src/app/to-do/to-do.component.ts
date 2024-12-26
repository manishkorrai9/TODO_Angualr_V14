import { Component, OnInit } from '@angular/core';
import { Todo } from '../to-do.modal';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
})
export class ToDoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = { id: 0, title: '', description: '', isCompleted: false };
  isEditing: boolean = false;

  constructor(private todoService: ToDoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  addTodo(): void {
    if (this.isEditing) {
      this.todoService.updateTodo(this.newTodo);
    } else {
      this.newTodo.id = Date.now(); 
      this.todoService.addTodo(this.newTodo);
    }
    this.resetForm();
    this.todos = this.todoService.getTodos();
  }

  toggleComplete(todo: Todo): void {
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo);
  }

  editTodo(todo: Todo): void {
    this.newTodo = { ...todo };
    this.isEditing = true;
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
    this.todos = this.todoService.getTodos();
  }

  resetForm(): void {
    this.newTodo = { id: 0, title: '', description: '', isCompleted: false };
    this.isEditing = false;
  }
}
