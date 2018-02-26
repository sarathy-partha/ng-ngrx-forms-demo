import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movies.model';
import { Observable } from 'rxjs/Observable';
import { config } from '../common/config';
import { Store } from '@ngrx/store';

import * as moviesReducer from './reducers/movies.reducer';
import * as Movies from './actions/movies.actions';

const MOVIES_URL = config.movies.MOVIES_URL;
const CASTCREW_URL = config.movies.CASTCREW_URL;
const API_KEY = config.movies.API_KEY;

@Injectable()

export class MoviesService {
  movies;

  constructor(
    private http: HttpClient,
    private moviesStore: Store<moviesReducer.State>,
  ) { }

  getMovies() {
     this.http
      .get<Movie[]>(MOVIES_URL + API_KEY)
      .subscribe(
        (movies: Movie[]) => {
          this.moviesStore.dispatch(new Movies.SetUpcomingMovies(movies['results']))
        });
  }
}
