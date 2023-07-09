import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { defaultIfEmpty, from, map } from 'rxjs'
import { User } from '../../auth/models/User'

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor (private db: AngularFirestore) {}

  getImages () {
    return this.db
      .collection('images')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(({ payload: { doc } }) => doc.data()['url'])
        ),
        defaultIfEmpty([])
      )
  }

  saveImage (user: User, originalImage: string, markedImage: string) {
    const imageRef = this.db
      .collection('users')
      .doc(user.uid)
      .collection('images')
      .doc()

    return from(
      imageRef.set({
        originalImageURL: originalImage,
        markedImageURL: markedImage
      })
    )
  }
}
