import { NgModule } from '@angular/core';
import { Routes, RouterModule, LoadChildren } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'movies',
    loadChildren: './movies/movies.module#MoviesModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'todo',
    loadChildren: './todo/todo.module#ToDoModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  } // catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
