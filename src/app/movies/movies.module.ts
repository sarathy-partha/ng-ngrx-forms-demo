import { MoviesService } from './movies.service';
import { SearchMoviesService } from './search-movies/search-movies.service';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { MoviesComponent } from './movies.component';
import { CastCrewComponent } from './cast-crew/cast-crew.component';
import { SharedModule } from '../shared/shared.module';
import { MoviesRoutingModule } from './movies-routing.module';
import { SearchMoviesComponent } from './search-movies/search-movies.component';

import { moviesReducer } from '../movies/reducers/movies.reducer';

@NgModule({
  declarations: [MoviesComponent, CastCrewComponent, SearchMoviesComponent],
  imports: [SharedModule, MoviesRoutingModule, StoreModule.forFeature('Movies', moviesReducer)],
  providers: [MoviesService, SearchMoviesService],
  exports: []
})
export class MoviesModule {}
