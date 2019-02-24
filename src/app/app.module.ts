import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '@app/app.component';
import { reducers } from '@app/app.reducer';
import { CoreModule } from '@app/core/core.module';
import { HomeComponent } from '@app/home/home.component';
import { environment } from '@env/environment';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AdalService, AdalGuard } from 'adal-angular4';
import { ServiceWorkerModule } from '@angular/service-worker';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { EffectsModule } from '@ngrx/effects';

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CoreModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    environment.development ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [AdalService, AdalGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
