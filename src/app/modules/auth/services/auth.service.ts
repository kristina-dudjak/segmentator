import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import * as firebase from 'firebase/compat/app'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private fbAuth: AngularFireAuth, private db: AngularFirestore) {}

  async register (email: string, password: string) {
    await this.fbAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await this.db
          .collection('users')
          .doc(user.uid)
          .set({ email: email }, { merge: true })
      })
    return (await this.fbAuth.getRedirectResult()).user
  }

  async logIn (email: string, password: string) {
    await this.fbAuth.signInWithEmailAndPassword(email, password)
    return (await this.fbAuth.getRedirectResult()).user
  }

  async googleLogIn () {
    await this.fbAuth
      .signInWithPopup(new firebase.default.auth.GoogleAuthProvider())
      .then(async ({ user }) => {
        const ref = this.db.collection(`users`).doc(user.uid).ref
        if ((await ref.get()).exists) return
        ref.set(
          {
            email: user.email
          },
          { merge: true }
        )
      })
    return (await this.fbAuth.getRedirectResult()).user
  }

  async signOut () {
    await this.fbAuth.signOut()
  }
}
