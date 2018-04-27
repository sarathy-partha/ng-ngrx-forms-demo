import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let comp: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  const ngFormStub = {
    value: {
      email: {},
      password: {}
    }
  };
  beforeEach(() => {
    const authServiceStub = {
      registerUser: () => ({})
    };
    const storeStub = {
      select: () => ({})
    };
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [
        { provide: NgForm, useValue: ngFormStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide: Store, useValue: storeStub }
      ]
    });
    fixture = TestBed.createComponent(SignupComponent);
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
      spyOn(authServiceStub, 'registerUser');
      comp.onSubmit(ngFormStub);
      expect(authServiceStub.registerUser).toHaveBeenCalled();
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
