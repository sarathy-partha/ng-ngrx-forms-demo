import { Component, OnInit } from '@angular/core';
import { menuItems } from './left-nav.data';
import { RouterLink } from '@angular/router';

import * as UI from '../../common/reducers/ui.actions';
import * as appReducer from '@app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})

export class LeftNavComponent implements OnInit {
  options: {};
  menuItems = menuItems;
  theme: string;
  theme$: Observable<string>;

  constructor(
    private store: Store<{ ui: appReducer.State }>
  ) { }

  ngOnInit() {
  }

  setTheme(theme) {
    this.store.dispatch(new UI.SetTheme(theme));
    this.theme$ = this.store.select(appReducer.getCurrentTheme);
  }
}
