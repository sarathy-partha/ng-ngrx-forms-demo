import { Injectable } from "@angular/core";
import { Status, ToDo } from "./todo.model";
import { AngularFirestore } from "angularfire2/firestore";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { UIControlService } from "../common/uicontrol.service";
import * as UI from '../common/reducers/ui.actions';
import * as appReducer from '../app.reducer';
import { Store } from "@ngrx/store";

@Injectable()

export class ToDoService {
    todoStatus: Status[];
    todo: ToDo[];
    todoStatusChanged = new Subject<Status[]>();
    todosChanged = new Subject<ToDo[]>();

    constructor(
        private todoDb: AngularFirestore,
        private uiControlService: UIControlService,
        private store: Store<appReducer.State>,
    ) { }

    fbSubs: Subscription[] = [];

    getToDoStatus() {
        //this.uiControlService.loadingState.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.fbSubs.push(this.todoDb
            .collection('Status')
            .snapshotChanges()
            .map(resData => {
                return resData.map(data => {
                    return {
                        id: data.payload.doc.data().id,
                        status: data.payload.doc.data().status,
                    }
                });
            })
            .subscribe((todoStatus: Status[]) => {
                //this.uiControlService.loadingState.next(false);
                this.store.dispatch(new UI.StartLoading());
                this.todoStatus = todoStatus;
                this.todoStatusChanged.next([...this.todoStatus]);
            }, error => {
                this.todoStatusChanged.next(null);
                //this.uiControlService.loadingState.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.uiControlService.showMessage("Error fetching ToDo Status, please try again", null, 3000);
            }));
    }


    getToDos() {
        //this.uiControlService.loadingState.next(true);
        this.store.dispatch(new UI.StartLoading());
        this.fbSubs.push(this.todoDb
            .collection('ToDo')
            .snapshotChanges()
            .map(resData => {
                return resData.map(res => {
                    const data = res.payload.doc.data() as ToDo;
                    data.id = res.payload.doc.id;
                    return data;
                });
            })
            .subscribe((todo: ToDo[]) => {
                //this.uiControlService.loadingState.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.todo = todo;
                this.todosChanged.next([...this.todo]);
            }, error => {
                this.todosChanged.next(null);
                //this.uiControlService.loadingState.next(false);
                this.store.dispatch(new UI.StopLoading());
                this.uiControlService.showMessage("Error fetching ToDos, please try again", null, 3000);
            }));
    }

    cancelFBSubscriptions() {
        this.fbSubs.forEach(subs => subs.unsubscribe());
    }

    addToDoToDatabase(todo: ToDo) {
        this.todoDb.collection('ToDo').add(todo);
    }

}