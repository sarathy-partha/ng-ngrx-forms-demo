import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movies.model';
import { Store, select } from '@ngrx/store';
import * as fromStore from '../store';

import {
  trigger,
  style,
  transition,
  animate,
  query,
  stagger
} from '@angular/animations';

import * as Movies from '../store/actions/movies.actions';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '100ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('100ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class MoviesComponent implements OnInit {
  upComingMovies$: Observable<Movie[]>;

  constructor(private moviesStore: Store<fromStore.MoviesState>) {}

  ngOnInit() {
    this.upComingMovies$ = this.moviesStore.select(
      fromStore.getUpcomingMoviesEntities
    );
    this.moviesStore.dispatch(new fromStore.LoadUpcomingMovies());
  }
}
