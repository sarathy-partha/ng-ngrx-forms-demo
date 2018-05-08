import { MoviesListComponent } from './components/movies-list.component';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { moviesReducer } from '../movies/reducers/movies.reducer';
import { SharedModule } from '../shared/shared.module';
import { CastCrewComponent } from './cast-crew/cast-crew.component';
import { MoviesComponent } from './containers/movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesService } from './movies.service';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { SearchMoviesService } from './search-movies/search-movies.service';

@NgModule({
  declarations: [
    MoviesComponent,
    CastCrewComponent,
    SearchMoviesComponent,
    MoviesListComponent
  ],
  imports: [
    SharedModule,
    MoviesRoutingModule,
    StoreModule.forFeature('Movies', moviesReducer)
  ],
  providers: [MoviesService, SearchMoviesService],
  exports: []
})
export class MoviesModule {}
