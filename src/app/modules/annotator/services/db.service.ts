import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable, defaultIfEmpty, forkJoin, from, map } from 'rxjs'
import { User } from '../../auth/models/User'
import { ImageData } from '../models/ImageData'

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private db: AngularFirestore) {}

  getImages(): Observable<ImageData[]> {
    return this.db
      .collection('images')
      .valueChanges({ idField: 'id' })
      .pipe(
        map(images =>
          images.map(image => ({
            id: image.id,
            url: image['url'],
            shapes: []
          }))
        )
      )
  }

  getUserImages(user: User): Observable<ImageData[]> {
    return this.db
      .collection('users')
      .doc(user.uid)
      .collection('images')
      .valueChanges({ idField: 'id' })
      .pipe(
        map(images =>
          images.map(image => ({
            id: image.id,
            url: image['originalImageURL'],
            shapes: image['shapes']
          }))
        ),
        defaultIfEmpty([])
      )
  }

  removeImage(imageUrl: string): Observable<void> {
    return from(this.db.collection('images').doc(imageUrl).delete())
  }

  removeUserImage(user: User, image: ImageData): Observable<void> {
    return from(
      this.db
        .collection('users')
        .doc(user.uid)
        .collection('images')
        .doc(image.id)
        .delete()
    )
  }

  saveImage(
    user: User,
    originalImage: ImageData,
    markedImage: string
  ): Observable<void> {
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

  uploadImages(images: string[]): Observable<void> {
    return forkJoin(
      images.map(image =>
        from(
          this.db
            .collection('images')
            .doc()
            .set({ url: image }, { merge: true })
        )
      )
    ).pipe(map(() => void 0))
  }
}
