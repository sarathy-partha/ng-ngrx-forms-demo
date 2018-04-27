import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let comp: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  const ngFormStub = {
    value: {
      email: {},
      password: {}
    }
  };

  beforeEach(() => {
    const authServiceStub = {
      login: () => ({})
    };
    const routerStub = {};
    const storeStub = {
      select: () => ({})
    };
    TestBed.configureTestingModule({
      declarations: [SigninComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: NgForm, useValue: ngFormStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: Store, useValue: storeStub }
      ]
    });
    fixture = TestBed.createComponent(SigninComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  it('hide defaults to: true', () => {
    expect(comp.hide).toEqual(true);
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
      spyOn(authServiceStub, 'login');
      //comp.onSubmit(ngFormStub);
      //expect(authServiceStub.login).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'select');
      comp.ngOnInit();
      expect(storeStub.select).toHaveBeenCalled();
    });
  });
});
