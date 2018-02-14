import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';
import { Movie } from './movies.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})

export class MoviesComponent implements OnInit {

  MOVIE_URL = "http://image.tmdb.org/t/p/w185/";

  movie: Movie[];

  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    this.showMovies();
  }

  showMovies() {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movie = movies;
        return this.movie;
      }
    }
    );
  }
}
