import { TestBed, inject } from '@angular/core/testing';

import { SearchMoviesService } from './search-movies.service';

describe('SearchMoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchMoviesService]
    });
  });

  it(
    'should be created',
    inject([SearchMoviesService], (service: SearchMoviesService) => {
      expect(service).toBeTruthy();
    })
  );
});
