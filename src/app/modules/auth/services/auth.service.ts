import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private fbAuth: AngularFireAuth) {}

  register (email: string, password: string) {
    return this.fbAuth.createUserWithEmailAndPassword(email, password)
  }

  logIn (email: string, password: string) {
    this.fbAuth.signInWithEmailAndPassword(email, password)
  }

  // googleLogIn () {
  //   this.fbAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
  // }

  signOut () {
    this.fbAuth.signOut()
  }
}
