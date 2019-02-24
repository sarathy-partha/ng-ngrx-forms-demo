import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromMovies from '../reducers/movies.reducer';

import { Movie } from '../../models/movies.model';

export const getUpComingMoviesState = createSelector(
  fromFeature.getMoviesState,
  (state: fromFeature.MoviesState) => state.upComingMovies
);

export const getUpcomingMoviesEntities = createSelector(
  getUpComingMoviesState,
  fromMovies.getUpComingMovies
);

export const getUpComingMoviesLoading = createSelector(
  getUpComingMoviesState,
  fromMovies.getUpComingMoviesLoading
);

export const getUpComingMoviesLoaded = createSelector(
  getUpComingMoviesState,
  fromMovies.getUpComingMoviesLoaded
);
