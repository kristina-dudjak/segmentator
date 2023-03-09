import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { googleLoginRequest, loginRequest } from '../../store/auth.actions'
import { AuthState } from '../../store/auth.state'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor (private fb: FormBuilder, private store: Store<AuthState>) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  onSubmit () {
    this.store.dispatch(
      loginRequest({
        credentials: {
          email: this.loginForm.value.email as string,
          password: this.loginForm.value.password as string
        }
      })
    )
  }

  onGoogle () {
    this.store.dispatch(googleLoginRequest())
  }
}
