import { MoviesService } from './movies.service';
import { SearchMoviesService } from './search-movies.service';

export const services: any[] = [MoviesService, SearchMoviesService];

export * from './movies.service';
export * from './search-movies.service';
