import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LeftNavComponent } from './nav/left-nav/left-nav.component';
import { HomeComponent } from './home/home.component';

import { MoviesService } from './movies/movies.service';
import { AuthService } from './auth/auth.service';
import { SearchMoviesService } from './movies/search-movies/search-movies.service';
import { ToDoService } from './todo/todo.service';
import { UIControlService } from './common/uicontrol.service';

import { MaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    HeaderComponent,
    LeftNavComponent,
    AppComponent,
    HomeComponent,
  ],
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
  ],
  providers: [MoviesService, AuthService, SearchMoviesService, ToDoService, UIControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
