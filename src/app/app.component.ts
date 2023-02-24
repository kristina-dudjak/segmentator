import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  loadedImage: HTMLImageElement
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>

  draw () {
    const canvas = this.canvas.nativeElement
    const context = canvas.getContext('2d')
    let isDrawing = false
    canvas.width = 1000
    canvas.height = 500
    let lastX = 0
    let lastY = 0
    let color = 'red'

    const img = new Image()
    img.src = '../assets/background.png'
    img.onload = () => {
      context.drawImage(img, 0, 0)
    }

    canvas.addEventListener('mousedown', event => {
      isDrawing = true
      ;[lastX, lastY] = [event.offsetX, event.offsetY]
    })

    canvas.addEventListener('mousemove', event => {
      if (!isDrawing) return
      context.beginPath()
      context.moveTo(lastX, lastY)
      context.lineTo(event.offsetX, event.offsetY)
      context.strokeStyle = color
      context.stroke()
      ;[lastX, lastY] = [event.offsetX, event.offsetY]
    })

    canvas.addEventListener('mouseup', () => {
      isDrawing = false
    })

    canvas.addEventListener('mouseout', () => {
      isDrawing = false
    })
  }

  ngAfterViewInit (): void {
    this.draw()
  }

  async ngOnInit () {}
}
