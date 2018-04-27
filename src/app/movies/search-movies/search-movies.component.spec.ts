import { MaterialModule } from './../../material.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { UIControlService } from '../../shared/uicontrol.service';
import { SearchMoviesComponent } from './search-movies.component';

describe('SearchMoviesComponent', () => {
  let comp: SearchMoviesComponent;
  let fixture: ComponentFixture<SearchMoviesComponent>;

  beforeEach(() => {
    const httpClientStub = {};
    const storeStub = {
      select: () => ({}),
      dispatch: () => ({})
    };
    const uIControlServiceStub = {
      showMessage: () => ({})
    };
    TestBed.configureTestingModule({
      declarations: [SearchMoviesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MaterialModule],
      providers: [
        { provide: HttpClient, useValue: httpClientStub },
        { provide: Store, useValue: storeStub },
        { provide: UIControlService, useValue: uIControlServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SearchMoviesComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('MOVIE_URL defaults to: http://image.tmdb.org/t/p/w185/', () => {
    expect(comp.MOVIE_URL).toEqual('http://image.tmdb.org/t/p/w185/');
  });

  it("displayedColumns defaults to: ['title', 'popularity', 'id', 'release_date']", () => {
    expect(comp.displayedColumns).toEqual(['title', 'popularity', 'id', 'release_date']);
  });

  it('resultsLength defaults to: 0', () => {
    expect(comp.resultsLength).toEqual(0);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      spyOn(comp, 'showMovies');
      spyOn(storeStub, 'select');
      comp.ngOnInit();
      expect(comp.showMovies).toHaveBeenCalled();
      expect(storeStub.select).toHaveBeenCalled();
    });
  });

  describe('showMovies', () => {
    it('makes expected calls', () => {
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      const uIControlServiceStub: UIControlService = fixture.debugElement.injector.get(UIControlService);
      spyOn(storeStub, 'dispatch');
      spyOn(uIControlServiceStub, 'showMessage');
      comp.showMovies();
      expect(storeStub.dispatch).toHaveBeenCalled();
      expect(uIControlServiceStub.showMessage).toHaveBeenCalled();
    });
  });
});
