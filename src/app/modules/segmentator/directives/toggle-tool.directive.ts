import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
  selector: '[appToggleTool]'
})
export class ToggleToolDirective {
  @Input() segmentatorName: string
  @Input() selectedSegmentator: string
  private buttons: NodeListOf<Element>

  constructor (private el: ElementRef) {}

  ngAfterViewInit () {
    this.buttons = document.querySelectorAll('[appToggleTool]')
  }

  @HostListener('click') onClick () {
    this.buttons.forEach(button => {
      ;(button as HTMLElement).style.backgroundColor =
        button === this.el.nativeElement ? 'blue' : 'white'
    })
  }
}
