import { Injectable } from '@angular/core'
import * as d3 from 'd3'
import { Tool } from '../models/Tool'

@Injectable({
  providedIn: 'root'
})
export class LineTool implements Tool {
  private polygonPoints: number[][] = []
  icon: string = 'minimize'

  draw (event: MouseEvent, canvas: HTMLCanvasElement) {
    // console.log('line draw')
    const context = canvas.getContext('2d')!
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const [x, y] = d3.pointer(event)
    const point = [x * scaleX, y * scaleY]
    this.polygonPoints.push(point)
    context.fillStyle = 'red'
    context.lineWidth = 1
    context.strokeStyle = 'red'
    context.beginPath()
    context.moveTo(this.polygonPoints[0][0], this.polygonPoints[0][1])
    for (let i = 1; i < this.polygonPoints.length; i++) {
      context.lineTo(this.polygonPoints[i][0], this.polygonPoints[i][1])
    }
    context.stroke()

    const limit = 10

    if (this.polygonPoints.length > 2) {
      let dx = this.polygonPoints[0][0] - point[0]
      let dy = this.polygonPoints[0][1] - point[1]
      if (dx < 0) {
        dx *= -1
      }
      if (dy < 0) {
        dy *= -1
      }
      if (dx < limit && dy < limit) {
        context.closePath()
        context.fill()
        console.log(this.polygonPoints)
        var img = new Image()
        img.src = canvas.toDataURL()
        console.log(img.src)
      }
    }
  }

  // public startDrawing (event: MouseEvent) {
  //   const canvas = document.querySelector('canvas')
  //   const rect = canvas.getBoundingClientRect()
  //   const scaleX = canvas.width / rect.width
  //   const scaleY = canvas.height / rect.height

  //   const [x, y] = d3.pointer(event)
  //   const point = [x * scaleX, y * scaleY]
  //   this.polygonPoints.push(point)
  //   context.fillStyle = 'red'
  //   context.lineWidth = 1
  //   context.strokeStyle = 'red'
  //   context.beginPath()
  //   context.moveTo(this.polygonPoints[0][0], this.polygonPoints[0][1])
  //   for (let i = 1; i < this.polygonPoints.length; i++) {
  //     this.context.lineTo(this.polygonPoints[i][0], this.polygonPoints[i][1])
  //   }
  //   this.context.stroke()

  //   const limit = 10

  //   if (this.polygonPoints.length > 2) {
  //     let dx = this.polygonPoints[0][0] - point[0]
  //     let dy = this.polygonPoints[0][1] - point[1]
  //     if (dx < 0) {
  //       dx *= -1
  //     }
  //     if (dy < 0) {
  //       dy *= -1
  //     }
  //     if (dx < limit && dy < limit) {
  //       console.log('CLOSE!')
  //       this.context.closePath()
  //       this.context.fill()
  //       console.log(this.polygonPoints)
  //       var img = new Image()
  //       img.src = canvas.toDataURL()
  //       console.log(img.src)
  //     }
  //   }
  // }
}
