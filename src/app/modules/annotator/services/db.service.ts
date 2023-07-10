import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { defaultIfEmpty, from, map } from 'rxjs'
import { User } from '../../auth/models/User'
import { ImageData } from '../store/segmentator.state'

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

  getUserImages (user: User) {
    return this.db
      .collection('users')
      .doc(user.uid)
      .collection('images')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(({ payload: { doc } }) => ({
            url: doc.data()['originalImageURL'],
            shapes: doc.data()['shapes']
          }))
        ),
        defaultIfEmpty([])
      )
  }

  saveImage (user: User, originalImage: ImageData, markedImage: string) {
    const imageRef = this.db
      .collection('users')
      .doc(user.uid)
      .collection('images')
      .doc()

    return from(
      imageRef.set({
        originalImageURL: originalImage.url,
        markedImageURL: markedImage,
        shapes: originalImage.shapes
      })
    )
  }
}
