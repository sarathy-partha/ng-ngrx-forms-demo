import { Action } from "@ngrx/store";
import { Movie } from "../movies.model";

export const SET_UPCOMING_MOVIES = '[Movies] Set Upcoming Movies';

export class SetUpcomingMovies implements Action {
    readonly type = SET_UPCOMING_MOVIES;

    constructor(public payload: Movie[]) { }
}

export type MoviesActions = SetUpcomingMovies;
