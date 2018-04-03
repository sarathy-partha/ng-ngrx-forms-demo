import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';

import { ToDoService } from '../todo/todo.service';
import { UIControlService } from '../common/uicontrol.service';
import { Store } from '@ngrx/store';
import * as appReducer from '../app.reducer';
import * as UI from '../common/reducers/ui.actions';
import * as AUTH from './actions/auth.actions';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<User>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private todoservice: ToDoService,
    private uiControlService: UIControlService,
    private store: Store<{ ui: appReducer.State }>
  ) {}

  initiAuthListerner() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new AUTH.SetAuthenticated());
        // this.router.navigate(['/home']);
      } else {
        this.todoservice.cancelFBSubscriptions();
        this.store.dispatch(new AUTH.SetUnAuthenticated());
        this.router.navigate(['/signin']);
      }
    });
  }

  checkAuthStatus() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new AUTH.SetAuthenticated());
      } else {
        this.todoservice.cancelFBSubscriptions();
        this.store.dispatch(new AUTH.SetUnAuthenticated());
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.uiControlService.showMessage(error.message, null, 3000);
        this.store.dispatch(new UI.StopLoading());
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
        this.router.navigate(['/home']);
      })
      .catch(error => {
        this.uiControlService.showMessage(error.message, null, 3000);
        this.store.dispatch(new UI.StopLoading());
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.initiAuthListerner();
  }
}
