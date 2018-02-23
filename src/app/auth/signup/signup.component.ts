import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UIControlService } from '../../common/uicontrol.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  hide = true;
  maxDate;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(
    private authService: AuthService,
    private uiControlService: UIControlService,
  ) { }

  ngOnInit() {
    this.loadingSubs = this.uiControlService.loadingState.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }


  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.loadingSubs)
      this.loadingSubs.unsubscribe();
  }

}
