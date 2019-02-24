import { MoviesListComponent } from './components/movies-list.component';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
import { SharedModule } from '../shared/shared.module';
import { CastCrewComponent } from './cast-crew/cast-crew.component';
import { MoviesComponent } from './containers/movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { SearchMoviesComponent } from './search-movies/search-movies.component';

import * as fromServices from './services';

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
    StoreModule.forFeature('Movies', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [fromServices.services],
  exports: []
})
export class MoviesModule {}
