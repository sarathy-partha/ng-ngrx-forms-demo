import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromMovies from './movies.reducer';
import * as fromRoot from '../../../app.reducer';

export interface MoviesState {
  upComingMovies: fromMovies.UpcomingMoviesState;
}

export const reducers: ActionReducerMap<MoviesState> = {
  upComingMovies: fromMovies.moviesReducer
};

export const getMoviesState = createFeatureSelector<MoviesState>('Movies');
