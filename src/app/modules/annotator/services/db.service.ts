import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { defaultIfEmpty, forkJoin, from, map } from 'rxjs'
import { User } from '../../auth/models/User'
import { ImageData } from '../models/ImageData'

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
          actions.map(({ payload: { doc } }) => {
            const img: ImageData = {
              id: doc.id,
              url: doc.data()['url'],
              shapes: []
            }
            return img
          })
        )
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
            id: doc.id,
            url: doc.data()['originalImageURL'],
            shapes: doc.data()['shapes']
          }))
        ),
        defaultIfEmpty([])
      )
  }

  removeImage (imageUrl: string) {
    this.db.collection('images').doc(imageUrl).delete()
  }

  removeUserImage (user: User, image: ImageData) {
    this.db
      .collection('users')
      .doc(user.uid)
      .collection('images')
      .doc(image.id)
      .delete()
  }

  saveImage (user: User, originalImage: ImageData, markedImage: string) {
    const imageRef = this.db
      .collection('users')
      .doc(user.uid)
      .collection('images')
      .doc(originalImage.id)

    return from(
      imageRef.set({
        originalImageURL: originalImage.url,
        markedImageURL: markedImage,
        shapes: originalImage.shapes
      })
    )
  }

  uploadImages (images: string[]) {
    return forkJoin(
      images.map(image =>
        from(
          this.db
            .collection('images')
            .doc()
            .set({ url: image }, { merge: true })
        )
      )
    )
  }
}
