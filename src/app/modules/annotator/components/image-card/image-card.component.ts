import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core'
import { Tool } from '../../models/Tool'
import { SegmentatorState } from '../../../annotator/store/segmentator.state'
import { Store } from '@ngrx/store'
import { AuthState } from 'src/app/modules/auth/store/auth.state'
import { getUser } from 'src/app/modules/auth/store/auth.selectors'
import { User } from 'src/app/modules/auth/models/User'
import { PolygonTool } from '../../../annotator/services/polygon-tool.service'
import { removeImage, saveImageRequest } from '../../store/segmentator.actions'
import { ActivatedRoute } from '@angular/router'
import { DbService } from '../../services/db.service'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes
} from '@angular/fire/storage'
import * as d3 from 'd3'
import { Point } from '../../models/Point'
import { ImageData } from '../../models/ImageData'

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnChanges, AfterViewInit, OnInit {
  @ViewChild('svg') svgRef: ElementRef<SVGElement>
  @Input() tool: Tool
  @Input() image: ImageData
  private points: Point[] = []
  user$ = this.authStore.select(getUser)
  route: string

  ngOnInit() {
    this.route = this.activatedRoute.snapshot.routeConfig.path
  }

  constructor(
    private store: Store<SegmentatorState>,
    private authStore: Store<AuthState>,
    private activatedRoute: ActivatedRoute,
    private db: DbService
  ) {}

  onMouseDown(event: MouseEvent) {
    this.tool.onMouseDown?.(
      event,
      this.svgRef.nativeElement,
      this.image,
      this.store,
      this.points
    )
  }

  onMouseMove(event: MouseEvent) {
    this.tool.onMouseMove?.(event, this.svgRef.nativeElement, this.points)
  }

  onMouseUp(event: MouseEvent) {
    this.tool.onMouseUp?.(
      event,
      this.svgRef.nativeElement,
      this.image,
      this.store,
      this.points
    )
  }

  ngAfterViewInit() {
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

  ngOnChanges(changes: SimpleChanges) {
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

  async uploadImage(binaryImage: Blob, user: User) {
    const fileName = `${this.image.id}-${user.uid}.jpg`
    const storage = getStorage()
    const maskRef = ref(storage, 'masks/' + fileName)
    await uploadBytes(maskRef, binaryImage)
    const imageUrl = await getDownloadURL(maskRef)
    const response = await fetch(this.image.url)
    const imageBlob = await response.blob()
    const storageRef = ref(storage, 'uimages/' + fileName)
    await uploadBytes(storageRef, imageBlob)

    this.store.dispatch(
      saveImageRequest({ user, image: this.image, marked: imageUrl })
    )
  }

  async save(user: User) {
    const svgElement = document.getElementById('svg')
    d3.select(svgElement).selectAll('*').style('fill', 'white')
    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svgElement)
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' })
    const svgURL = URL.createObjectURL(svgBlob)
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    img.onload = async () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      const binaryImage: Blob = await new Promise(resolve =>
        canvas.toBlob(resolve, 'image/jpeg')
      )
      URL.revokeObjectURL(svgURL)
      await this.uploadImage(binaryImage, user)
    }
    img.src = svgURL

    if (this.route === 'new') {
      this.store.dispatch(removeImage({ image: this.image }))
    }
  }

  delete(user: User) {
    this.db.removeUserImage(user, this.image)
  }
}
