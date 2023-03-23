import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { HeaderComponent } from './components/header/header.component'

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    HeaderComponent
  ]
})
export class SharedModule {}
