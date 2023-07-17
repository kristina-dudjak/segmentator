import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent {
  @Input() urls: string[]
  @Output() newItemEvent = new EventEmitter<string>()

  removeImage (value: string) {
    this.newItemEvent.emit(value)
  }
}
