import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor (private fb: FormBuilder) {}

  registerForm = this.fb.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required]
  })
}
