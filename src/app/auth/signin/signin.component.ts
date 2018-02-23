import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from "@angular/router";
import { MatButton } from '@angular/material';
import { UIControlService } from '../../common/uicontrol.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit, OnDestroy {
  hide = true;
  signinForm: FormGroup;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private router: Router,
    private authService: AuthService,
    private uiControlService: UIControlService
  ) { }

  ngOnInit() {
    this.loadingSubs = this.uiControlService.loadingState.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
    this.signinForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    })
  }

  onSubmit(form: NgForm) {
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    })
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.loadingSubs)
      this.loadingSubs.unsubscribe();
  }

}
