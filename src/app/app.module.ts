import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from '@app/app.component';
import { HeaderComponent } from '@app/header/header.component';
import { LeftNavComponent } from '@app/nav/left-nav/left-nav.component';
import { HomeComponent } from '@app/home/home.component';

import { MoviesService } from '@app/movies/movies.service';
import { AuthService } from '@app/auth/auth.service';
import { SearchMoviesService } from '@app/movies/search-movies/search-movies.service';
import { ToDoService } from '@app/todo/todo.service';
import { UIControlService } from '@app/common/uicontrol.service';

import { MaterialModule } from '@app/material.module';
import { AuthModule } from '@app/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';

import { AngularFirestoreModule } from 'angularfire2/firestore';

import { reducers } from '@app/app.reducer';

import { environment } from '@env/environment';

@NgModule({
  declarations: [HeaderComponent, LeftNavComponent, AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [MoviesService, AuthService, SearchMoviesService, ToDoService, UIControlService],
  bootstrap: [AppComponent]
})
export class AppModule {}
