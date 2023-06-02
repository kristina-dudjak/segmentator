import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { environment } from '../environments/environment'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { provideFirestore, getFirestore } from '@angular/fire/firestore'
import { provideStorage, getStorage } from '@angular/fire/storage'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FIREBASE_OPTIONS } from '@angular/fire/compat'
import { SharedModule } from './shared/shared.module'
import { authFeatureKey } from './modules/auth/store/auth.actions'
import { authReducer } from './modules/auth/store/auth.reducer'
import { AuthEffects } from './modules/auth/store/auth.effects'
import { SegmentatorEffects } from './modules/segmentator/store/segmentator.effects'
import { segmentatorFeatureKey } from './modules/segmentator/store/segmentator.actions'
import { segmentatorReducer } from './modules/segmentator/store/segmentator.reducer'
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    BrowserAnimationsModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
    EffectsModule.forFeature([SegmentatorEffects]),
    StoreModule.forFeature(segmentatorFeatureKey, segmentatorReducer)
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule {}
