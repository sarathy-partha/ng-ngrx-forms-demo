import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../movies.model';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import * as _ from 'lodash';
import { config } from '../../common/config';

const MOVIES_URL = config.movies.POPULAR_MOVIES_URL;
const CASTCREW_URL = config.movies.CASTCREW_URL;
const API_KEY = config.movies.API_KEY;

@Injectable()
export class SearchMoviesService {
  movies;
  constructor(private http: HttpClient) { }

  getMovies(page): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${MOVIES_URL}${API_KEY}&language=en-IN&region=IN&page=${page + 1}`)
  }
}
