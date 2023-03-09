import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import * as firebase from 'firebase/compat/app'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private fbAuth: AngularFireAuth) {}

  async register (email: string, password: string) {
    await this.fbAuth.createUserWithEmailAndPassword(email, password)
    return (await this.fbAuth.getRedirectResult()).user
  }

  async logIn (email: string, password: string) {
    await this.fbAuth.signInWithEmailAndPassword(email, password)
    return (await this.fbAuth.getRedirectResult()).user
  }

  async googleLogIn () {
    await this.fbAuth.signInWithPopup(
      new firebase.default.auth.GoogleAuthProvider()
    )
    return (await this.fbAuth.getRedirectResult()).user
  }

  async signOut () {
    await this.fbAuth.signOut()
  }
}
