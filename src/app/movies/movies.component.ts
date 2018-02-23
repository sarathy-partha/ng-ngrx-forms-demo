import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from './movies.service';
import { Movie } from './movies.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit, OnDestroy {

  MOVIE_URL = "http://image.tmdb.org/t/p/w185/";

  movie: Movie[];
  movieSubs: Subscription;

  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    this.showMovies();
  }

  showMovies() {
    this.movieSubs = this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movie = movies['results'];
      }
    }
    );
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.movieSubs) {
      this.movieSubs.unsubscribe();
    }
  } 
}
