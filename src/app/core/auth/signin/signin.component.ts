import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material';
import * as appReducer from '../../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  hide = true;
  signinForm: FormGroup;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<{ ui: appReducer.State }>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(appReducer.getIsLoading);
    this.signinForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
