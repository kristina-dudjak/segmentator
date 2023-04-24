export interface Tool {
  icon: string
  draw: (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    points: number[][]
  ) => void
}
