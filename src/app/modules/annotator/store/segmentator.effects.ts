import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, concatMap, map, of, switchMap, take } from 'rxjs'
import { DbService } from '../services/db.service'
import {
  getImagesFailure,
  getImagesRequest,
  getImagesSuccess,
  getUserImagesFailure,
  getUserImagesRequest,
  getUserImagesSuccess,
  saveImageFailure,
  saveImageRequest,
  saveImageSuccess,
  selectImage
} from './segmentator.actions'
import { ImageData } from './segmentator.state'
import { Store } from '@ngrx/store'
import { AuthState } from '../../auth/store/auth.state'
import { getUser } from '../../auth/store/auth.selectors'

@Injectable()
export class SegmentatorEffects {
  constructor (
    private actions$: Actions,
    private dbService: DbService,
    private authStore: Store<AuthState>
  ) {}

  getImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getImagesRequest),
      concatMap(() =>
        this.dbService.getImages().pipe(
          concatMap((images: ImageData[]) => {
            return [
              selectImage({
                selectedImage: {
                  id: images[0].id,
                  url: images[0].url,
                  shapes: []
                }
              }),
              getImagesSuccess({
                images: images.map(image => ({
                  id: image.id,
                  url: image.url,
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

  getUserImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserImagesRequest),
      switchMap(() =>
        this.authStore.select(getUser).pipe(
          take(1),
          switchMap(user =>
            this.dbService.getUserImages(user).pipe(
              concatMap((userImages: ImageData[]) => {
                if (userImages.length === 0) {
                  return [getUserImagesSuccess({ images: [] })]
                } else {
                  return [
                    selectImage({
                      selectedImage: {
                        id: userImages[0].id,
                        url: userImages[0].url,
                        shapes: userImages[0].shapes
                      }
                    }),
                    getUserImagesSuccess({
                      images: userImages.map(image => ({
                        id: image.id,
                        url: image.url,
                        shapes: image.shapes
                      }))
                    })
                  ]
                }
              }),
              catchError(error => of(getUserImagesFailure(error)))
            )
          )
        )
      )
    )
  )

  saveImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveImageRequest),
      concatMap(({ user, image, marked }) => {
        return this.dbService
          .saveImage(user, image, marked)
          .pipe(map(() => saveImageSuccess()))
      }),
      catchError(error => of(saveImageFailure(error)))
    )
  )
}
