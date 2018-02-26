import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';

import * as appReducer from '../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isAuth$: Observable<boolean>;
  
  constructor(
    private authService: AuthService,
    private store: Store<{ auth: appReducer.State }>,
  ) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(appReducer.getAuthStatus);
  }

  logout() {
    this.authService.logout();
  }
}
