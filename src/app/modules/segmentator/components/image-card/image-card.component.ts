import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core'

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef
  @Input() tool!: any
  private canvas!: HTMLCanvasElement
  points: number[][] = []

  ngAfterViewInit () {
    this.canvas = this.canvasRef.nativeElement
    this.canvas.addEventListener('mousedown', event => {
      this.tool.tool.draw(event, this.canvas, this.points)
    })
  }
}
