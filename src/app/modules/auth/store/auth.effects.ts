import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of } from 'rxjs'
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
  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router
  ) {}

  private handleSuccess<
    T extends
      | typeof registerSuccess
      | typeof googleLoginSuccess
      | typeof loginSuccess
  >(user: firebase.default.User, action: T) {
    const userModel: User = { uid: user.uid, email: user.email }
    this.router.navigateByUrl('/annotator')
    return action({ user: userModel })
  }

  private handleError<
    T extends
      | typeof registerFailure
      | typeof googleLoginFailure
      | typeof loginFailure
      | typeof signOutFailure
  >(error: string, action: T) {
    return of(action({ error }))
  }

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserRequest),
      mergeMap(() =>
        this.authService.getUser().pipe(
          map(user => ({ uid: user.uid, email: user.email })),
          map(userModel => getUserSuccess({ user: userModel })),
          catchError(() => of(getUserFailure()))
        )
      )
    )
  )

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerRequest),
      mergeMap(({ credentials: { email, password } }) =>
        this.authService.register(email, password).pipe(
          map(user => this.handleSuccess(user, registerSuccess)),
          catchError(error => this.handleError(error.message, registerFailure))
        )
      )
    )
  )

  googleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(googleLoginRequest),
      mergeMap(() =>
        this.authService.googleLogIn().pipe(
          map(user => this.handleSuccess(user, googleLoginSuccess)),
          catchError(error =>
            this.handleError(error.message, googleLoginFailure)
          )
        )
      )
    )
  )

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRequest),
      mergeMap(({ credentials: { email, password } }) =>
        this.authService.logIn(email, password).pipe(
          map(user => this.handleSuccess(user, loginSuccess)),
          catchError(error => this.handleError(error.message, loginFailure))
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
          catchError(error => this.handleError(error.message, signOutFailure))
        )
      )
    )
  )
}
