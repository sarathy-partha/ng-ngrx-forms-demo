import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from '@app/app.component';

import { HomeComponent } from '@app/home/home.component';

import { CoreModule } from '@app/core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';

import { AngularFirestoreModule } from 'angularfire2/firestore';

import { reducers } from '@app/app.reducer';

import { environment } from '@env/environment';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    CoreModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
