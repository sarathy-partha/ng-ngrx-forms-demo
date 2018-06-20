import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad
} from '@angular/router';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Route } from '@angular/compiler/src/core';

import * as appReducer from '../../app.reducer';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { AdalService } from 'adal-angular4';
@Injectable()
export class AuthGuard implements CanActivate, CanLoad, OnInit {
  authStatus = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{ auth: appReducer.State }>,
    private afAuth: AngularFireAuth,
    private adalService: AdalService
  ) {}

  ngOnInit() {
    this.adalService.handleWindowCallback();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return (
      this.adalService.userInfo.authenticated ||
      this.afAuth.authState
        .take(1)
        .map(user => !!user)
        .do(loggedIn => {
          if (!loggedIn) {
            console.log('access denied');
            this.router.navigate(['/signin']);
          }
        })
    );
  }

  canLoad(route: Route): Observable<boolean> | boolean {
    return (
      this.adalService.userInfo.authenticated ||
      this.afAuth.authState
        .take(1)
        .map(user => !!user)
        .do(loggedIn => {
          if (!loggedIn) {
            console.log('access denied');
            this.router.navigate(['/signin']);
          }
        })
    );
  }
}
