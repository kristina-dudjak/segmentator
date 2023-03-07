import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module'
import { LoginComponent } from './views/login/login.component'
import { RegisterComponent } from './views/register/register.component'

import { SharedModule } from 'src/app/shared/shared.module'
import { TogglePasswordDirective } from './directives/toggle-password.directive'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { AuthEffects } from './store/auth.effects'
import { authReducer } from './store/auth.reducer'
import { authFeatureKey } from './store/auth.actions'

@NgModule({
  declarations: [LoginComponent, RegisterComponent, TogglePasswordDirective],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthModule {}
