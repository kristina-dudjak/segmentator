import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  withLatestFrom
} from 'rxjs'
import { DbService } from '../services/db.service'
import {
  getImagesBundleFailure,
  getImagesBundleRequest,
  getImagesBundleSuccess,
  getImagesFailure,
  getImagesRequest,
  getImagesSuccess,
  getUserImagesFailure,
  getUserImagesRequest,
  getUserImagesSuccess,
  removeImage,
  saveImageFailure,
  saveImageRequest,
  saveImageSuccess,
  selectImage
} from './segmentator.actions'
import { Store } from '@ngrx/store'
import { AuthState } from '../../auth/store/auth.state'
import { getUser } from '../../auth/store/auth.selectors'
import { getImages } from './segmentator.selectors'
import { ImageData } from '../models/ImageData'

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
      switchMap(() =>
        this.dbService.getImages().pipe(
          take(1),
          mergeMap(images => {
            return [
              selectImage({
                selectedImage: images[0]
              }),
              getImagesSuccess({
                images: [...images]
              })
            ]
          }),
          catchError(error => of(getImagesFailure({ error: error.message })))
        )
      )
    )
  )

  getImagesBundle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getImagesBundleRequest),
      withLatestFrom(this.authStore.select(getUser)),
      switchMap(([action, user]) =>
        this.dbService.getImages().pipe(
          take(1),
          mergeMap(images =>
            this.dbService.getUserImages(user).pipe(
              take(1),
              map(userImages => {
                const filteredImages = images
                  .filter(
                    image =>
                      !userImages.some(userImage => userImage.id === image.id)
                  )
                  .map(image => ({ image, random: Math.random() }))
                  .sort((a, b) => a.random - b.random)
                  .map(({ image }) => image)
                  .slice(0, 10)
                return [
                  selectImage({
                    selectedImage: filteredImages[0]
                  }),
                  getImagesBundleSuccess({
                    images: filteredImages.map(image => image)
                  })
                ]
              }),
              catchError(error =>
                of(getImagesBundleFailure({ error: error.message }))
              )
            )
          )
        )
      ),
      concatMap(actions => Object.values(actions))
    )
  )

  removeImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeImage),
      withLatestFrom(this.authStore.select(getImages)),
      map(([action, images]) => {
        return selectImage({
          selectedImage: images[0]
        })
      })
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
                      selectedImage: userImages[0]
                    }),
                    getUserImagesSuccess({
                      images: userImages.map(image => image)
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
