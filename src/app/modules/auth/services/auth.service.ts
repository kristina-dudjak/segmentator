import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { catchError, from, map, of, switchMap, throwError } from 'rxjs'
import firebase from 'firebase/compat/app'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private fbAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  getUser() {
    return this.fbAuth.authState.pipe(
      catchError(error => throwError(() => error))
    )
  }

  register(email: string, password: string) {
    return from(
      this.fbAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      switchMap(({ user }) => {
        return from(
          this.db
            .collection('users')
            .doc(user.uid)
            .set({ email }, { merge: true })
        ).pipe(
          map(() => user),
          catchError(error => throwError(() => error))
        )
      }),
      catchError(error => throwError(() => error))
    )
  }

  logIn(email: string, password: string) {
    return from(this.fbAuth.signInWithEmailAndPassword(email, password)).pipe(
      map(({ user }) => user),
      catchError(error => throwError(() => error))
    )
  }

  googleLogIn() {
    return from(
      this.fbAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    ).pipe(
      switchMap(({ user }) => {
        const ref = this.db.collection(`users`).doc(user.uid).ref
        return from(ref.get()).pipe(
          switchMap(snapshot => {
            if (!snapshot.exists) {
              return from(
                ref.set(
                  {
                    email: user.email
                  },
                  { merge: true }
                )
              ).pipe(
                map(() => user),
                catchError(error => throwError(() => error))
              )
            }
            return of(user)
          }),
          catchError(error => throwError(() => error))
        )
      })
    )
  }

  signOut() {
    return from(this.fbAuth.signOut())
  }
}
