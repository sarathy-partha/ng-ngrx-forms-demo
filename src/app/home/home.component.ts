import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkAuthStatus();
    this.authSubscription = this.authService.authStatus.subscribe(authStatus => {
      this.isAuth = authStatus;
      console.log(this.isAuth);
    })
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.authSubscription)
      this.authSubscription.unsubscribe();
  }

}
