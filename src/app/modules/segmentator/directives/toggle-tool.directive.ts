import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
  selector: '[appToggleTool]'
})
export class ToggleToolDirective {
  @Input() segmentatorName: string
  @Input() selectedSegmentator: string

  constructor (private el: ElementRef) {}

  @HostListener('click') onClick () {
    if (this.segmentatorName === this.selectedSegmentator) {
      this.selectedSegmentator = ''
      this.el.nativeElement.style.backgroundColor = 'white'
      this.el.nativeElement.style.color = 'black'
    } else {
      this.selectedSegmentator = this.segmentatorName
      this.el.nativeElement.style.backgroundColor = 'blue'
      this.el.nativeElement.style.color = 'white'
    }
  }
}
