import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '@app/core/auth/auth.service';
import { Store } from '@ngrx/store';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let mediaMatcher: FakeMediaMatcher;

  beforeEach(() => {
    const mediaMatcherStub = {
      matchMedia: () => ({})
    };
    const changeDetectorRefStub = {
      detectChanges: () => ({})
    };
    const authServiceStub = {
      initiAuthListerner: () => ({})
    };
    const storeStub = {
      select: () => ({})
    };
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MediaMatcher, useClass: FakeMediaMatcher },
        { provide: ChangeDetectorRef, useValue: changeDetectorRefStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide: Store, useValue: storeStub }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('title defaults to: app', () => {
    expect(comp.title).toEqual('app');
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      spyOn(authServiceStub, 'initiAuthListerner');
      spyOn(storeStub, 'select');
      comp.ngOnInit();
      expect(authServiceStub.initiAuthListerner).toHaveBeenCalled();
      expect(storeStub.select).toHaveBeenCalled();
    });
  });

  describe('test mediaQuery patch', () => {
    it('test whether addListener is patched', () => {
      const mobileQuery = window.matchMedia('min-width:500px');
      if (mobileQuery && mobileQuery['addListener']) {
        expect((mobileQuery as any)['addListener']).toBeTruthy();
      }
    });
  });
});

export class FakeMediaQueryList implements MediaQueryList {
  /** The callback for change events. */
  addListenerCallback?: (mql: MediaQueryList) => void;

  constructor(public matches, public media) {}

  /** Toggles the matches state and "emits" a change event. */
  setMatches(matches: boolean) {
    this.matches = matches;
    this.addListenerCallback!(this);
  }

  /** Registers the callback method for change events. */
  addListener(callback: (mql: MediaQueryList) => void) {
    this.addListenerCallback = callback;
  }

  /** Noop, but required for implementing MediaQueryList. */
  removeListener() {}
}

@Injectable()
export class FakeMediaMatcher {
  /** A map of match media queries. */
  private queries: Map<string, FakeMediaQueryList> = new Map();

  /** The number of distinct queries created in the media matcher during a test. */
  get queryCount(): number {
    return this.queries.size;
  }

  /** Fakes the match media response to be controlled in tests. */
  matchMedia(query: string): FakeMediaQueryList {
    let mql = new FakeMediaQueryList(true, query);
    this.queries.set(query, mql);
    return mql;
  }

  /** Clears all queries from the map of queries. */
  clear() {
    this.queries.clear();
  }

  /** Toggles the matching state of the provided query. */
  setMatchesQuery(query: string, matches: boolean) {
    if (this.queries.has(query)) {
      this.queries.get(query)!.setMatches(matches);
    }
  }
}
