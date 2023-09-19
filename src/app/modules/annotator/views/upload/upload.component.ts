import { Component, OnInit } from '@angular/core'
import { DbService } from '../../services/db.service'
import { Store } from '@ngrx/store'
import { SegmentatorState } from '../../store/segmentator.state'
import { getImages } from '../../store/segmentator.selectors'
import { getImagesRequest } from '../../store/segmentator.actions'
import { ImageData } from '../../models/ImageData'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes
} from '@angular/fire/storage'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  fileName: string
  selectedImages: string[] = []
  public images$: Observable<ImageData[]>
  constructor (
    private dbService: DbService,
    private store: Store<SegmentatorState>
  ) {}

  ngOnInit () {
    this.store.dispatch(getImagesRequest())
    this.images$ = this.store.select(getImages)
  }

  removeImageFromDb (image: string) {
    this.dbService.removeImage(image)
  }

  removeImage (imageUrl: string) {
    this.selectedImages = this.selectedImages.filter(
      image => image !== imageUrl
    )
  }

  async onFileSelected (event) {
    const files: FileList = event.target.files
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i]
      this.fileName = file.name
      await this.uploadImage(file)
    }
  }

  async uploadImage (file: File) {
    const storage = getStorage()
    const storageRef = ref(storage, 'images/' + file.name)

    await uploadBytes(storageRef, file)
    const imageUrl = await getDownloadURL(storageRef)
    this.selectedImages.push(imageUrl)
  }

  save () {
    this.dbService.uploadImages(this.selectedImages)
  }
}
