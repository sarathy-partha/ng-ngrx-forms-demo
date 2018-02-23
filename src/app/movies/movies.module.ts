import { NgModule } from "@angular/core";

import { MoviesComponent } from "./movies.component";
import { CastCrewComponent } from "./cast-crew/cast-crew.component";
import { SharedModule } from "../common/shared.module";
import { MoviesRoutingModule } from "./movies-routing.module";
import { SearchMoviesComponent } from "./search-movies/search-movies.component";

@NgModule({
    declarations: [
        MoviesComponent,
        CastCrewComponent,
        SearchMoviesComponent
    ],
    imports: [
        SharedModule,
        MoviesRoutingModule,
    ],
    exports: [

    ]
})

export class MoviesModule { }