import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { defaultIfEmpty, map } from 'rxjs'

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
}
