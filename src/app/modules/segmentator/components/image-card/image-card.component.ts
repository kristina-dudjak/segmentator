import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core'
import { Tool } from '../../models/Tool'

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef
  @Input() tool: Tool
  private canvas!: HTMLCanvasElement

  ngAfterViewInit () {
    this.canvas = this.canvasRef.nativeElement
    this.canvas.addEventListener('mousedown', event => {
      this.tool.draw(event, this.canvas)
    })
  }
}
