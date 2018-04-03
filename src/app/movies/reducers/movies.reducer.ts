import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { MoviesActions, SET_UPCOMING_MOVIES } from '../actions/movies.actions';
import { Movie } from '../movies.model';
import * as appReducer from '../../app.reducer';

export interface UpcomingMoviesState {
  upComingMovies: Movie[];
}

export interface State extends appReducer.State {
  Movies: UpcomingMoviesState;
}

const initialState: UpcomingMoviesState = {
  upComingMovies: []
};

export function moviesReducer(state = initialState, action: MoviesActions) {
  switch (action.type) {
    case SET_UPCOMING_MOVIES: {
      return {
        ...state,
        upComingMovies: action.payload
      };
    }
    default:
      return state;
  }
}

export const getUpComingMoviesState = createFeatureSelector<UpcomingMoviesState>('Movies');

export const getUpComingMovies = createSelector(
  getUpComingMoviesState,
  (state: UpcomingMoviesState) => state.upComingMovies
);
export const isUpComingMovies = createSelector(
  getUpComingMoviesState,
  (state: UpcomingMoviesState) => state.upComingMovies != null
);
