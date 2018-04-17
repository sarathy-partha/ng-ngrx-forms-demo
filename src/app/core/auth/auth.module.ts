import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from '../../app-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [SignupComponent, SigninComponent],
  imports: [SharedModule, AngularFireAuthModule, AuthRoutingModule, AppRoutingModule],
  exports: []
})
export class AuthModule {}
