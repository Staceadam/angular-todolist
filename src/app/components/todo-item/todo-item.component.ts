import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { TodoService } from "src/app/services/todo.service";

import { Todo } from "src/app/models/Todo";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"]
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoSvc: TodoService) {}

  ngOnInit(): void {}

  setClass() {
    return {
      todo: true,
      "is-complete": this.todo.completed
    };
  }

  onToggle(todo) {
    //toggle in UI
    todo.completed = !todo.completed;
    //toggle on server
    this.todoSvc.toggleCompleted(todo).subscribe(todo => {
      console.log("this is the todo", todo);
    });
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }
}
