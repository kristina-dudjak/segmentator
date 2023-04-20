import { Injectable } from '@angular/core'
import { Tool } from '../models/Tool'

@Injectable({
  providedIn: 'root'
})
export class RectTool implements Tool {
  constructor () {}
  icon: string = 'gesture'
  draw (event: MouseEvent, canvas: HTMLCanvasElement) {
    console.log('rect draw')
  }
}
