import {Component, OnInit, OnDestroy, Inject, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Todo} from './todo.model';

import {Subscription} from 'rxjs';
import {TodoService} from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoComponent implements OnInit, OnDestroy {

  todos: Todo[];
  onTodosChangedSubscrition: Subscription;

  constructor(@Inject('todoService') private service: TodoService,
              private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.service.getRecords();
    this.onTodosChangedSubscrition = this.service.onTodosChangedSubject.subscribe((todo) => {
      console.log(todo.items);
      this.todos = todo.items;
    });
  }

  addTodo(todo: Todo) {
    this.service.addTodo(todo);
  }

  toggleTodo(todo: Todo) {
    this.service.toggleTodo(todo);
  }

  removeTodo(todo: Todo) {
    // this.service.deleteTodo(todo);
  }

  toggleAll() {
    // this.service.toggleAll();
  }

  clearCompleted() {
    // this.service.clearCompleted();
  }

  ngOnDestroy() {
    this.onTodosChangedSubscrition.unsubscribe();
  }
}
