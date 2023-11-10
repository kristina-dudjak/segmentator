import {
  Directive,
  ElementRef,
  Renderer2,
  ViewContainerRef
} from '@angular/core'
import { MatIcon } from '@angular/material/icon'
import { MatButton } from '@angular/material/button'
@Directive({
  selector: '[appTogglePassword]'
})
export class TogglePasswordDirective {
  private isShown = false
  constructor(
    private el: ElementRef,
    private vcRef: ViewContainerRef,
    private renderer: Renderer2
  ) {
    this.setup()
  }

  private setup() {
    const parent = this.el.nativeElement.parentNode
    const matButton =
      this.vcRef.createComponent(MatButton).instance._elementRef.nativeElement
    const matIcon =
      this.vcRef.createComponent(MatIcon).instance._elementRef.nativeElement
    this.renderer.setStyle(matButton, 'line-height', '0')
    matIcon.innerHTML = 'visibility_off'

    matButton.appendChild(matIcon)
    matButton.addEventListener('click', () => {
      this.toggle(matIcon)
    })
    parent.appendChild(matButton)
  }

  private toggle(button: HTMLElement) {
    this.isShown = !this.isShown
    const type = this.isShown ? 'text' : 'password'
    this.renderer.setProperty(this.el.nativeElement, 'type', type)
    button.textContent = this.isShown ? 'visibility' : 'visibility_off'
  }
}
