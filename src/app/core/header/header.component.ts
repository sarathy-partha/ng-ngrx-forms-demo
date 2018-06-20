import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AdalService } from 'adal-angular4';
import * as appReducer from '../../app.reducer';

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
    private adalService: AdalService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/github.svg')
    );
  }

  ngOnInit() {
    this.isAuth$ = this.store.select(appReducer.getAuthStatus);
    this.adalService.handleWindowCallback();
  }

  logout() {
    this.authService.logout();
    this.adalService.logOut();
  }

  azureADSignIn() {
    this.adalService.login();
  }
}
