import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Movie } from '../movies.model';
import { MoviesService } from '../movies.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SearchMoviesService } from './search-movies.service';
import { merge } from 'rxjs/observable/merge';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { of as observableOf } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit, AfterViewInit {
  MOVIE_URL = "http://image.tmdb.org/t/p/w185/";
  movie: Movie[];
  movieDatabase: SearchMoviesService | null;
  displayedColumns = ['title', 'popularity', 'id', 'release_date'];
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.showMovies();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.dataSource);
  }

  showMovies() {
    /*     this.movieService.getMovies(this.paginator.pageIndex).subscribe({
          next: (movies) => {
            this.movie = movies;
            this.dataSource.data = this.movie['results'];
            this.isLoadingResults = false;
            this.resultsLength = this.movie['total_results'];
          }
        }
        );
     */
    this.movieDatabase = new SearchMoviesService(this.http);

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.movieDatabase!.getMovies(this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data['total_results'];
          return data['results'];
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe(data => this.dataSource.data = data);
  }
}
