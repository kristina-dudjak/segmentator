import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { PasswordRegex } from '../../const/PasswordRegex'
import { ValidatorService } from '../../services/validator.service'
import { googleLoginRequest, loginRequest } from '../../store/auth.actions'
import { AuthState } from '../../store/auth.state'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor (private fb: FormBuilder, private store: Store<AuthState>) {}

  loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(PasswordRegex)
        ]
      ]
    },
    {
      validators: [
        ValidatorService.validator('email'),
        ValidatorService.validator('password')
      ],
      updateOn: 'change'
    }
  )

  onSubmit () {
    const { email, password } = this.loginForm.value
    this.store.dispatch(
      loginRequest({
        credentials: {
          email,
          password
        }
      })
    )
  }

  onGoogle () {
    this.store.dispatch(googleLoginRequest())
  }
}
