import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import * as appReducer from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  mobileQuery: MediaQueryList;
  theme$: Observable<string>;

  private _mobileQueryListener: () => void;

  constructor(
    private authservice: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private store: Store<{ ui: appReducer.State }>
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.authservice.initiAuthListerner();
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.theme$ = this.store.select(appReducer.getCurrentTheme);
  }
}
