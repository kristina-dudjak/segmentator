import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import {
  googleLoginRequest,
  registerRequest
} from 'src/app/modules/auth/store/auth.actions'
import { PasswordRegex } from '../../const/PasswordRegex'
import { ValidatorService } from '../../services/validator.service'
import { AuthState } from '../../store/auth.state'
import { getError } from '../../store/auth.selectors'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>
  ) {}
  errorMessage$ = this.store.select(getError)

  registerForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(PasswordRegex)
        ]
      ],
      repeatPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(PasswordRegex)
        ]
      ]
    },
    {
      validators: [
        ValidatorService.customValidator('email'),
        ValidatorService.customValidator('password'),
        ValidatorService.customValidator('repeatPassword'),
        ValidatorService.passwordMatchValidator('repeatPassword')
      ],
      updateOn: 'change'
    }
  )

  onSubmit() {
    const { email, password } = this.registerForm.value
    this.store.dispatch(
      registerRequest({
        credentials: {
          email,
          password
        }
      })
    )
  }

  onGoogle() {
    this.store.dispatch(googleLoginRequest())
  }
}
