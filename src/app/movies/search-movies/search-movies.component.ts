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
import * as UI from '../../common/reducers/ui.actions';
import * as appReducer from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { UIControlService } from '../../common/uicontrol.service';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit, AfterViewInit {
  MOVIE_URL = 'http://image.tmdb.org/t/p/w185/';
  movie: Movie[];
  movieDatabase: SearchMoviesService | null;
  displayedColumns = ['title', 'popularity', 'id', 'release_date'];
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults$: Observable<boolean>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http: HttpClient,
    private uiControlService: UIControlService,
    private store: Store<{ ui: appReducer.State }>
  ) {}

  ngOnInit() {
    this.isLoadingResults$ = this.store.select(appReducer.getIsLoading);
    this.showMovies();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showMovies() {
    this.movieDatabase = new SearchMoviesService(this.http);

    this.paginator.page
      .pipe(
        startWith({}),
        switchMap(() => {
          this.store.dispatch(new UI.StartLoading());
          return this.movieDatabase.getMovies(this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.store.dispatch(new UI.StopLoading());
          this.resultsLength = data['total_results'];
          return data['results'];
        }),
        catchError(() => {
          this.store.dispatch(new UI.StopLoading());
          this.uiControlService.showMessage('Error fetching movies, please try again', null, 3000);
          return observableOf([]);
        })
      )
      .subscribe(data => (this.dataSource.data = data));
  }
}
