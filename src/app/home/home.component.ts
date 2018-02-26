import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';

import * as appReducer from '../app.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  isAuth$: Observable<boolean>;
  
  constructor(
    private authService: AuthService,
    private store: Store<appReducer.State>,
  ) { }

  ngOnInit() {
    this.authService.checkAuthStatus();
    this.isAuth$ = this.store.select(appReducer.getAuthStatus);
  }
}
