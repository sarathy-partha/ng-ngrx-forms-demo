import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { menuItems } from './left-nav.data';
import { RouterLink } from '@angular/router';

import * as UI from '@app/shared/store/ui.actions';
import * as appReducer from '@app/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {
  options: {};
  menuItems = menuItems;
  theme = 'container';
  theme$: Observable<string>;

  constructor(private store: Store<{ ui: appReducer.State }>) {}

  ngOnInit() {
    this.store.dispatch(new UI.SetTheme(this.theme));
    this.theme$ = this.store.select(appReducer.getCurrentTheme);
  }

  setTheme(theme) {
    this.store.dispatch(new UI.SetTheme(theme));
    this.theme$ = this.store.select(appReducer.getCurrentTheme);
  }
}
