import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { Tool } from '../../models/Tool'
import { ImageData, SegmentatorState } from '../../store/segmentator.state'
import { Store } from '@ngrx/store'
import { RectTool } from '../../services/rect-tool.service'
import { AuthState } from 'src/app/modules/auth/store/auth.state'
import { getUser } from 'src/app/modules/auth/store/auth.selectors'
import { User } from 'src/app/modules/auth/models/User'
import { saveImageRequest } from '../../store/segmentator.actions'

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnChanges, AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef
  @Input() tool: Tool
  @Input() image: ImageData
  private canvas: HTMLCanvasElement
  private points: number[][] = []
  private isDrawing = false
  user$ = this.authStore.select(getUser)

  constructor (
    private store: Store<SegmentatorState>,
    private authStore: Store<AuthState>
  ) {}

  save (user: User) {
    var img = new Image()
    img.src = this.canvas.toDataURL()
    this.store.dispatch(
      saveImageRequest({ user, original: this.image.url, marked: img.src })
    )
  }

  onMouseDown (event: MouseEvent) {
    this.isDrawing = true
    this.tool.draw(event, this.canvas, this.image, this.store, this.points)
  }

  onMouseMove (event: MouseEvent) {
    if (this.isDrawing) {
      this.tool.draw(event, this.canvas, this.image, this.store, this.points)
    }
  }

  onMouseUp (event: MouseEvent) {
    this.isDrawing = false
    if (this.tool instanceof RectTool) {
      this.tool.draw(event, this.canvas, this.image, this.store, this.points)
    }
  }

  ngAfterViewInit () {
    this.canvas = this.canvasRef.nativeElement
    const img = new Image()
    img.src = this.image.url
    img.addEventListener('load', () => {
      this.canvas.width = img.width
      this.canvas.height = img.height
      this.tool.update(this.canvas, this.image)
    })

    document.addEventListener('keydown', event => {
      this.tool.undo(this.canvas, this.image, this.store, this.points)
    })
  }

  ngOnChanges (change: SimpleChanges) {
    if (this.canvas) {
      this.tool.update(this.canvas, this.image)
      this.points = []
    }
  }
}
