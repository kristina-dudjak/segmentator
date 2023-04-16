import { Injectable } from '@angular/core'
import { Tool } from '../models/Tool'

@Injectable({
  providedIn: 'root'
})
export class RectToolService implements Tool {
  constructor () {}
  icon: string = 'gesture'
  draw (event: MouseEvent) {
    throw new Error('Method not implemented.')
  }
}
