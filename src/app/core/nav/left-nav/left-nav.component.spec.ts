import { Store } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeftNavComponent } from './left-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LeftNavComponent', () => {
  let component: LeftNavComponent;
  let fixture: ComponentFixture<LeftNavComponent>;

  beforeEach(() => {
    const storeStub = {
      select: () => ({})
    };

    TestBed.configureTestingModule({
      declarations: [LeftNavComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Store, useValue: storeStub }]
    });

    fixture = TestBed.createComponent(LeftNavComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
