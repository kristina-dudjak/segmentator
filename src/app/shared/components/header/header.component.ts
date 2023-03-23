import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { signOutRequest } from 'src/app/modules/auth/store/auth.actions'
import { AuthState } from 'src/app/modules/auth/store/auth.state'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor (private store: Store<AuthState>) {}

  logout () {
    this.store.dispatch(signOutRequest())
  }
}
