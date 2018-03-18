import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Route } from "@angular/compiler/src/core";

import * as appReducer from '../app.reducer';
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private authService: AuthService,
        private router: Router,
        private store: Store<{ auth: appReducer.State }>,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(appReducer.getAuthStatus).pipe(take(1));
    }

    canLoad(route: Route) {
        console.log("Routing success");
        return this.store.select(appReducer.getAuthStatus).pipe(take(1));
    }
}