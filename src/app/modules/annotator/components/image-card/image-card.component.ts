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
import {
  ImageData,
  Point,
  SegmentatorState
} from '../../../annotator/store/segmentator.state'
import { Store } from '@ngrx/store'
import { AuthState } from 'src/app/modules/auth/store/auth.state'
import { getUser } from 'src/app/modules/auth/store/auth.selectors'
import { User } from 'src/app/modules/auth/models/User'
import { PolygonTool } from '../../../annotator/services/polygon-tool.service'
import { saveImageRequest } from '../../store/segmentator.actions'

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnChanges, AfterViewInit {
  @ViewChild('svg') svgRef: ElementRef<SVGElement>
  @Input() tool: Tool
  @Input() image: ImageData
  private points: Point[] = []
  user$ = this.authStore.select(getUser)

  constructor (
    private store: Store<SegmentatorState>,
    private authStore: Store<AuthState>
  ) {}

  onMouseDown (event: MouseEvent) {
    this.tool.onMouseDown?.(
      event,
      this.svgRef.nativeElement,
      this.image,
      this.store,
      this.points
    )
  }

  onMouseMove (event: MouseEvent) {
    this.tool.onMouseMove?.(event, this.svgRef.nativeElement, this.points)
  }

  onMouseUp (event: MouseEvent) {
    this.tool.onMouseUp?.(
      event,
      this.svgRef.nativeElement,
      this.image,
      this.store,
      this.points
    )
  }

  ngAfterViewInit () {
    const svg = this.svgRef.nativeElement
    const img = new Image()
    img.src = this.image.url

    img.addEventListener('load', () => {
      const svgRect = svg.getBoundingClientRect()
      const aspectRatio = img.width / img.height
      const width = svgRect.width
      const height = width / aspectRatio

      svg.setAttribute('width', `${width}`)
      svg.setAttribute('height', `${height}`)
      this.tool.update(this.svgRef.nativeElement, this.image)
    })
  }

  ngOnChanges (changes: SimpleChanges) {
    const toolChange = changes['tool']
    if (this.tool instanceof PolygonTool && !toolChange) {
      this.points = [...this.points]
    } else {
      this.points = []
    }
    if (
      toolChange?.currentValue &&
      toolChange?.currentValue !== toolChange?.previousValue
    ) {
      if (this.svgRef) {
        this.tool.update(this.svgRef.nativeElement, this.image)
      }
    }
  }

  save (user: User) {
    const svgElement = document.getElementById('svg')
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgElement)
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' })
    const svgURL = URL.createObjectURL(svgBlob)

    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const dataUrlPromise = new Promise(resolve => {
      img.onload = function () {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        const dataUrl = canvas.toDataURL()
        URL.revokeObjectURL(svgURL)
        resolve(dataUrl)
      }
    })
    img.src = svgURL
    dataUrlPromise.then((dataUrl: string) => {
      this.store.dispatch(
        saveImageRequest({ user, image: this.image, marked: dataUrl })
      )
    })
  }
}
