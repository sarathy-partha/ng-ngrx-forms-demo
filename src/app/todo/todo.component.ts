import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from '@firebase/util';
import { Status, ToDo } from './todo.model';
import { Subscription } from 'rxjs/Subscription';
import { ToDoService } from './todo.service';
import { UIControlService } from '../common/uicontrol.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  todoStatus: Status[];
  todoSubscription; todoStatusSubscription: Subscription;
  todos: ToDo[];
  loadingSubs: Subscription;
  isLoading = true;

  constructor(
    private todoService: ToDoService,
    private uiControlService: UIControlService,
  ) { }

  ngOnInit() {
    this.loadingSubs = this.uiControlService.loadingState.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
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
    if (this.loadingSubs)
      this.loadingSubs.unsubscribe();
  }
}