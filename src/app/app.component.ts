import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';

import * as appReducer from './app.reducer';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mobileQuery: MediaQueryList;
  theme$: Observable<string>;

  private _mobileQueryListener: () => void;

  constructor(private authservice: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private store: Store<{ ui: appReducer.State }>) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.authservice.initiAuthListerner();
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.theme$ = this.store.select(appReducer.getCurrentTheme);
  }

  title = 'app';
}
