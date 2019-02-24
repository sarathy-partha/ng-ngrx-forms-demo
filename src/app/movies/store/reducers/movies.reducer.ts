import * as fromMovies from '../actions/movies.actions';
import { Movie } from '../../models/movies.model';

export interface UpcomingMoviesState {
  entities: Movie[];
  loaded: boolean;
  loading: boolean;
}

const initialState: UpcomingMoviesState = {
  entities: [],
  loaded: false,
  loading: false
};

export function moviesReducer(
  state = initialState,
  action: fromMovies.MoviesActions
): UpcomingMoviesState {
  switch (action.type) {
    case fromMovies.LOAD_UPCOMING_MOVIES: {
      return {
        ...state,
        loading: true
      };
    }
    case fromMovies.LOAD_UPCOMING_MOVIES_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: action.payload
      };
    }
    case fromMovies.LOAD_UPCOMING_MOVIES_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    default:
      return state;
  }
}

export const getUpComingMovies = (state: UpcomingMoviesState) => state.entities;
export const getUpComingMoviesLoading = (state: UpcomingMoviesState) =>
  state.loading;
export const getUpComingMoviesLoaded = (state: UpcomingMoviesState) =>
  state.loaded;
