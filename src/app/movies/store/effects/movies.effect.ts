import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as moviesActions from '../actions/movies.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as fromServices from '../../services';
import { of, from } from 'rxjs';

@Injectable()
export class MoviesEffects {
  constructor(
    private action$: Actions,
    private moviesService: fromServices.MoviesService
  ) {}

  @Effect()
  loadUpComingMovies$ = this.action$.pipe(
    ofType(moviesActions.LOAD_UPCOMING_MOVIES),
    switchMap(() => {
      return this.moviesService.getMovies().pipe(
        map(
          upComingMovies =>
            new moviesActions.LoadUpcomingMoviesSuccess(
              upComingMovies['results']
            )
        ),
        catchError(error => of(new moviesActions.LoadUpcomingMoviesFail(error)))
      );
    })
  );
}
