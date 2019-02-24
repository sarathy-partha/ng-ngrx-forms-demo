import { Action } from '@ngrx/store';
import { Movie } from '../../models/movies.model';

export const LOAD_UPCOMING_MOVIES = '[Movies] Load Upcoming Movies';
export const LOAD_UPCOMING_MOVIES_SUCCESS =
  '[Movies] Load Upcoming Movies Success';
export const LOAD_UPCOMING_MOVIES_FAIL = '[Movies] Load Upcoming Movies Fail';

export class LoadUpcomingMovies implements Action {
  readonly type = LOAD_UPCOMING_MOVIES;
}

export class LoadUpcomingMoviesSuccess implements Action {
  readonly type = LOAD_UPCOMING_MOVIES_SUCCESS;
  constructor(public payload: Movie[]) {}
}

export class LoadUpcomingMoviesFail implements Action {
  readonly type = LOAD_UPCOMING_MOVIES_FAIL;
  constructor(public payload: any) {}
}

export type MoviesActions =
  | LoadUpcomingMovies
  | LoadUpcomingMoviesSuccess
  | LoadUpcomingMoviesFail;
