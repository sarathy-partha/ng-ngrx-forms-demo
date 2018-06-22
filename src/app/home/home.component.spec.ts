import { AdalService } from 'adal-angular4';
import { StoreModule } from '@ngrx/store';
import { reducers } from '@app/app.reducer';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CoreModule } from '@app/core/core.module';
import { environment } from './../../environments/environment.prod';
import { AngularFireModule } from 'angularfire2';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../core/auth/auth.service';

import { AppRoutingModule } from '../app-routing.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        AuthService,
        { provide: APP_BASE_HREF, useValue: '/' },
        AdalService
      ],
      imports: [
        RouterTestingModule,
        CoreModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        StoreModule.forRoot(reducers)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
