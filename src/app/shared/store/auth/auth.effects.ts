import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { mergeMap } from 'rxjs'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import {
  registerFailure,
  registerRequest,
  registerSuccess
} from './auth.actions'

@Injectable()
export class AuthEffects {
  constructor (private authService: AuthService, private actions$: Actions) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerRequest),
      mergeMap(async action => {
        return await this.authService
          .register(
            action.data.credentials.email,
            action.data.credentials.password
          )
          .then(user => {
            return registerSuccess({ data: user })
          })
          .catch(error => {
            return registerFailure(error)
          })
      })
    )
  )
}
