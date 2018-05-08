import { config } from './../../shared/config';
import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../models/movies.model';

@Component({
  selector: 'app-movies-list',
  templateUrl: 'movies-list.component.html',
  styleUrls: ['movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  @Input() detail: Movie;

  MOVIE_IMAGE_URL = config.movies.MOVIE_IMAGE_URL;
  constructor() {}

  ngOnInit(): void {}
}
