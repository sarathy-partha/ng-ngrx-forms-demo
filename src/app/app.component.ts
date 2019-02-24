import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/auth/auth.service';
import { Store, select } from '@ngrx/store';
import { Observable, interval } from 'rxjs';
import * as appReducer from './app.reducer';
import { AdalService } from 'adal-angular4';
import { environment } from '@env/environment';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  mobileQuery: MediaQueryList;
  theme$: Observable<string>;

  private readonly _mobileQueryListener: () => void;

  constructor(
    private authservice: AuthService,
    private adalService: AdalService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public update: SwUpdate,
    private snackbar: MatSnackBar,
    private store: Store<{ ui: appReducer.State }>
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    adalService.init(environment.config);
  }

  ngOnInit() {
    this.authservice.initiAuthListerner();
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.theme$ = this.store.pipe(select(appReducer.getCurrentTheme));
    // Check for new App Version and update
    if (this.update.isEnabled) {
      interval(6 * 60 * 60).subscribe(() =>
        this.update
          .checkForUpdate()
          .then(() => console.log('checking for updates'))
      );
    }
    this.update.available.subscribe(event => {
      console.log('Current version is', event.current);
      console.log('Available version is', event.available);
      const snack = this.snackbar.open(
        'You have an update',
        'Refresh / Reload'
      );
      snack.onAction().subscribe(() => {
        window.location.reload();
      });
    });
    this.update.activated.subscribe(event => {
      console.log('Old version was', event.previous);
      console.log('New version is', event.current);
    });
  }
}
