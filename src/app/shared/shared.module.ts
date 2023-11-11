import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { HeaderComponent } from './components/header/header.component'
import { MatMenuModule } from '@angular/material/menu'
import { MatPaginatorModule } from '@angular/material/paginator'
import { Page404Component } from './views/page404/page404.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [HeaderComponent, Page404Component],
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  exports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatPaginatorModule,
    HeaderComponent
  ]
})
export class SharedModule {}
