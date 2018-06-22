import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { AdalService } from 'adal-angular4';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let comp: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    const domSanitizerStub = {
      bypassSecurityTrustResourceUrl: () => ({})
    };
    const matIconRegistryStub = {
      addSvgIcon: () => ({})
    };
    const authServiceStub = {
      logout: () => ({})
    };
    const adalServiceStub = {
      logOut: () => ({}),
      handleWindowCallback: () => ({})
    };
    const storeStub = {
      select: () => ({})
    };
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: DomSanitizer, useValue: domSanitizerStub },
        { provide: MatIconRegistry, useValue: matIconRegistryStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide: AdalService, useValue: adalServiceStub },
        { provide: Store, useValue: storeStub }
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    comp = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(comp).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const storeStub: Store<any> = fixture.debugElement.injector.get(Store);
      spyOn(storeStub, 'select');
      comp.ngOnInit();
      expect(storeStub.select).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      const adalServiceStub: AdalService = fixture.debugElement.injector.get(
        AdalService
      );
      spyOn(authServiceStub, 'logout');
      spyOn(adalServiceStub, 'logOut');
      comp.logout();
      expect(authServiceStub.logout).toHaveBeenCalled();
      expect(adalServiceStub.logOut).toHaveBeenCalled();
    });
  });
});
