import { Component, OnInit, state } from '@angular/core';
import { MoviesService } from './movies.service';
import { Movie } from './movies.model';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as moviesReducer from './reducers/movies.reducer';
import * as Movies from './actions/movies.actions';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {

  MOVIE_URL = "http://image.tmdb.org/t/p/w185/";

  movie$: Observable<Movie[]>;
  upComingMovies$: Observable<boolean>;

  constructor(
    private movieService: MoviesService,
    private moviesStore: Store<moviesReducer.State>,
  ) { }

  ngOnInit() {
    this.upComingMovies$ = this.moviesStore.select(moviesReducer.isUpComingMovies);
    this.movie$ = this.moviesStore.select(moviesReducer.getUpComingMovies);
    this.showMovies();
  }

  showMovies() {
    this.movieService.getMovies();
  }
}
