import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { registerRequest } from 'src/app/shared/store/auth/auth.actions'
import { AuthState } from 'src/app/shared/store/auth/auth.reducer'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor (private fb: FormBuilder, private store: Store<AuthState>) {}

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required]
  })

  onSubmit () {
    this.store.dispatch(
      registerRequest({
        data: {
          credentials: {
            email: this.registerForm.value.email as string,
            password: this.registerForm.value.password as string
          }
        }
      })
    )
  }
}
