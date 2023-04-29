import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  DocumentChangeAction
} from '@angular/fire/compat/firestore'
import { defaultIfEmpty, firstValueFrom, map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor (private db: AngularFirestore) {}

  async getImages () {
    return await firstValueFrom(
      this.db
        .collection('images')
        .snapshotChanges()
        .pipe(
          map(actions =>
            actions.map(
              ({ payload: { doc } }: DocumentChangeAction<unknown>) =>
                doc.data()['url']
            )
          ),
          defaultIfEmpty([])
        )
    )
  }
}
