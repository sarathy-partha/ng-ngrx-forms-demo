import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movies.model';
import { Observable, throwError } from 'rxjs';
import { config } from '../../shared/config';
import { Store } from '@ngrx/store';

import * as moviesReducer from '../store/reducers/movies.reducer';
import { UIControlService } from '../../shared/uicontrol.service';
import { catchError } from 'rxjs/operators';

const MOVIES_URL = config.movies.MOVIES_URL;
const CASTCREW_URL = config.movies.CASTCREW_URL;
const API_KEY = config.movies.API_KEY;

@Injectable()
export class MoviesService {
  movies;

  constructor(
    private http: HttpClient,
    private uiControlService: UIControlService,
    private moviesStore: Store<moviesReducer.UpcomingMoviesState>
  ) {}

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(MOVIES_URL + API_KEY)
      .pipe(catchError((error: any) => throwError(error.json())));
  }
}
