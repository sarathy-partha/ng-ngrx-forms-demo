import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Store } from '@ngrx/store';
import { MoviesComponent } from './movies.component';

describe('MoviesComponent', () => {
  let comp: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;

  beforeEach(() => {
    const moviesServiceStub = {
      getMovies: () => ({})
    };
    const storeStub = {
      select: () => ({})
    };
    TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MoviesService, useValue: moviesServiceStub },
        { provide: Store, useValue: storeStub }
      ]
    });
    fixture = TestBed.createComponent(MoviesComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  // it('MOVIE_URL defaults to: http://image.tmdb.org/t/p/w185/', () => {
  //   expect(comp.MOVIE_IMAGE_URL).toEqual('http://image.tmdb.org/t/p/w185/');
  // });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      spyOn(comp, 'getMovies');
      spyOn(storeStub, 'select');
      comp.ngOnInit();
      expect(comp.getMovies).toHaveBeenCalled();
      expect(storeStub.select).toHaveBeenCalled();
    });
  });

  describe('showMovies', () => {
    it('makes expected calls', () => {
      const moviesServiceStub: MoviesService = fixture.debugElement.injector.get(
        MoviesService
      );
      spyOn(moviesServiceStub, 'getMovies');
      comp.getMovies();
      expect(moviesServiceStub.getMovies).toHaveBeenCalled();
    });
  });
});
