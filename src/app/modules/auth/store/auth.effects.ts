import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of, switchMap } from 'rxjs'
import { AuthService } from 'src/app/modules/auth/services/auth.service'
import {
  getUserFailure,
  getUserRequest,
  getUserSuccess,
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
import { User } from '../models/User'

@Injectable()
export class AuthEffects {
  constructor (
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserRequest),
      mergeMap(() =>
        this.authService.getUser().pipe(
          map(user => {
            const userModel: User = {
              uid: user.uid,
              email: user.email
            }
            return getUserSuccess({ user: userModel })
          }),
          catchError(error => of(getUserFailure(error)))
        )
      )
    )
  )

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerRequest),
      mergeMap(({ credentials: { email, password } }) =>
        this.authService.register(email, password).pipe(
          map(user => {
            const userModel: User = {
              uid: user.uid,
              email: user.email
            }
            this.router.navigateByUrl('/segmentator')
            return registerSuccess({ user: userModel })
          }),
          catchError(error => of(registerFailure(error)))
        )
      )
    )
  )

  googleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(googleLoginRequest),
      switchMap(() =>
        this.authService.googleLogIn().pipe(
          map(user => {
            const userModel: User = {
              uid: user.uid,
              email: user.email
            }
            this.router.navigateByUrl('/segmentator')
            return googleLoginSuccess({ user: userModel })
          }),
          catchError(error => of(googleLoginFailure(error)))
        )
      )
    )
  )

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRequest),
      mergeMap(({ credentials: { email, password } }) =>
        this.authService.logIn(email, password).pipe(
          map(user => {
            const userModel: User = {
              uid: user.uid,
              email: user.email
            }
            this.router.navigateByUrl('/segmentator')
            return loginSuccess({ user: userModel })
          }),
          catchError(error => of(loginFailure(error)))
        )
      )
    )
  )

  signout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOutRequest),
      mergeMap(() =>
        this.authService.signOut().pipe(
          map(() => {
            this.router.navigateByUrl('/login')
            return signOutSuccess()
          }),
          catchError(error => of(signOutFailure(error)))
        )
      )
    )
  )
}
