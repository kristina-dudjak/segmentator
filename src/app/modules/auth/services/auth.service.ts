import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
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

  // googleLogIn () {
  //   this.fbAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
  // }

  async signOut () {
    await this.fbAuth.signOut()
  }
}
