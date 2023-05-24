import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, of } from 'rxjs'
import { DbService } from '../services/db.service'
import {
  getImagesFailure,
  getImagesRequest,
  getImagesSuccess,
  selectImage
} from './segmentator.actions'

@Injectable()
export class SegmentatorEffects {
  constructor (private actions$: Actions, private dbService: DbService) {}

  getImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getImagesRequest),
      concatMap(() =>
        this.dbService.getImages().pipe(
          concatMap(images => {
            return [
              selectImage({ selectedImage: images[0] }),
              getImagesSuccess({ images })
            ]
          }),
          catchError(error => of(getImagesFailure(error)))
        )
      )
    )
  )
}
