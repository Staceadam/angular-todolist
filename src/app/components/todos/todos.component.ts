import { Component, OnInit } from "@angular/core";
import { TodoService } from "../../services/todo.service";

import { Todo } from "../../models/Todo";

@Component({
  selector: "app-todos",
  templateUrl: "./todos.component.html",
  styleUrls: ["./todos.component.css"]
})
export class TodosComponent implements OnInit {
  todos: Todo[];

  constructor(private todoSvc: TodoService) {}

  ngOnInit(): void {
    this.todoSvc.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.todoSvc.deleteTodo(todo).subscribe();
  }

  addTodo(todo: Todo) {
    this.todoSvc.addTodo(todo).subscribe(x => {
      this.todos.push(x);
    });
  }
}
