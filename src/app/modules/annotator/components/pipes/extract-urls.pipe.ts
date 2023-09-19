import { Pipe, PipeTransform } from '@angular/core'
import { ImageData } from '../../models/ImageData'

@Pipe({
  name: 'extractUrls'
})
export class ExtractUrlsPipe implements PipeTransform {
  transform (images: ImageData[]): string[] {
    return images.map(image => image.url)
  }
}
