import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { mergeMap } from 'rxjs'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import {
  googleLoginFailure,
  googleLoginRequest,
  googleLoginSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
  signOutFailure,
  signOutRequest,
  signOutSuccess
} from './auth.actions'

@Injectable()
export class AuthEffects {
  constructor (
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerRequest),
      mergeMap(async ({ credentials: { email, password } }) => {
        return await this.authService
          .register(email, password)
          .then(user => {
            this.router.navigateByUrl('/segmentator')
            return registerSuccess({ user: user })
          })
          .catch(error => {
            return registerFailure(error)
          })
      })
    )
  )

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRequest),
      mergeMap(async ({ credentials: { email, password } }) => {
        return await this.authService
          .logIn(email, password)
          .then(user => {
            this.router.navigateByUrl('/segmentator')
            return loginSuccess({ user: user })
          })
          .catch(error => {
            return loginFailure(error)
          })
      })
    )
  )

  public signout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signOutRequest),
      mergeMap(async () => {
        return this.authService
          .signOut()
          .then(() => {
            this.router.navigateByUrl('/login')
            return signOutSuccess()
          })
          .catch(e => {
            return signOutFailure({ error: e })
          })
      })
    )
  })

  googleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(googleLoginRequest),
      mergeMap(async () => {
        return await this.authService
          .googleLogIn()
          .then(user => {
            this.router.navigateByUrl('/segmentator')
            return googleLoginSuccess({ user: user })
          })
          .catch(error => {
            return googleLoginFailure(error)
          })
      })
    )
  )
}
