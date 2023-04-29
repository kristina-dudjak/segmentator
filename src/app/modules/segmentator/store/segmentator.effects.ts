import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { mergeMap } from 'rxjs'
import { DbService } from '../services/db.service'
import {
  getImagesFailure,
  getImagesRequest,
  getImagesSuccess
} from './segmentator.actions'

@Injectable()
export class SegmentatorEffects {
  constructor (private actions$: Actions, private dbService: DbService) {}

  getImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getImagesRequest),
      mergeMap(async () => {
        try {
          const images = await this.dbService.getImages()
          return getImagesSuccess({ images: images })
        } catch (error) {
          return getImagesFailure(error)
        }
      })
    )
  )
}
