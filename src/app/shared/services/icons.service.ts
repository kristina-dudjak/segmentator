import { Injectable } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { icons } from '../const/Icons'
import { Icon } from '../models/Icon'

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  constructor (
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  addIcons () {
    icons.map((icon: Icon) => {
      this.matIconRegistry.addSvgIconLiteral(
        icon.name,
        this.domSanitizer.bypassSecurityTrustHtml(icon.svg)
      )
    })
  }
}
