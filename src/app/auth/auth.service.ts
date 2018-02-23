import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from 'rxjs/Subject';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { AngularFireAuth } from "angularfire2/auth";
import { ToDoService } from "../todo/todo.service";
import { UIControlService } from "../common/uicontrol.service";

@Injectable()
export class AuthService {
    authStatus = new Subject<boolean>();
    private isAuth = false;

    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private todoservice: ToDoService,
        private uiControlService: UIControlService
    ) { }

    initiAuthListerner() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuth = true;
                this.authStatus.next(true);
                this.router.navigate(['']);
            } else {
                this.todoservice.cancelFBSubscriptions();
                this.isAuth = false;
                this.authStatus.next(false);
                this.router.navigate(['/signin']);
            }
        });
    }

    checkAuthStatus() {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuth = true;
                this.authStatus.next(true);
            } else {
                this.todoservice.cancelFBSubscriptions();
                this.isAuth = false;
                this.authStatus.next(false);
            }
        });
    }

    registerUser(authData: AuthData) {
        this.uiControlService.loadingState.next(true);
        this.afAuth.auth
            .createUserWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiControlService.loadingState.next(false);
            })
            .catch(error => {
                this.uiControlService.showMessage(error.message, null, 3000);
                this.uiControlService.loadingState.next(false);
            })
    }

    login(authData: AuthData) {
        this.uiControlService.loadingState.next(true);
        this.afAuth.auth
            .signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                this.uiControlService.loadingState.next(false);
            })
            .catch(error => {
                this.uiControlService.showMessage(error.message, null, 3000);
                this.uiControlService.loadingState.next(false);
            });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuthenticated() {
        return this.isAuth;
    }
}