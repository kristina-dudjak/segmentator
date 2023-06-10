import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, of } from 'rxjs'
import { DbService } from '../services/db.service'
import {
  getImagesFailure,
  getImagesRequest,
  getImagesSuccess,
  saveImageFailure,
  saveImageRequest,
  saveImageSuccess,
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
          concatMap((imageUrls: string[]) => {
            return [
              selectImage({ selectedImage: imageUrls[0] }),
              getImagesSuccess({
                images: imageUrls.map(url => ({
                  url: url,
                  shapes: []
                }))
              })
            ]
          }),
          catchError(error => of(getImagesFailure(error)))
        )
      )
    )
  )

  saveImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveImageRequest),
      concatMap(({ user, original, marked }) => {
        return this.dbService
          .saveImage(user, original, marked)
          .pipe(map(() => saveImageSuccess()))
      }),
      catchError(error => of(saveImageFailure(error)))
    )
  )
}
