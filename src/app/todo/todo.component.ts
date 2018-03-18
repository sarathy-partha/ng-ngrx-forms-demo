import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { Status, ToDo } from './todo.model';
import { Subscription } from 'rxjs/Subscription';
import { ToDoService } from './todo.service';
import * as appReducer from '../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  todoStatus: Status[];
  todoSubscription; todoStatusSubscription: Subscription;
  todos: ToDo[];
  isLoading$: Observable<boolean>;

  constructor(
    private todoService: ToDoService,
    private store: Store<appReducer.State>,
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(appReducer.getIsLoading);
    this.todoStatusSubscription = this.todoService.todoStatusChanged.subscribe(todoStatus => this.todoStatus = todoStatus);
    this.todoService.getToDoStatus();
    this.todoSubscription = this.todoService.todosChanged.subscribe(todo => this.todos = todo);
    this.showToDo();
  }

  showToDo() {
    this.todoService.getToDos();
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.todoSubscription)
      this.todoSubscription.unsubscribe();
    if (this.todoStatusSubscription)
      this.todoStatusSubscription.unsubscribe();
  }
}