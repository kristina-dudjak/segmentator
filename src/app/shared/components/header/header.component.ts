import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  getUserRequest,
  signOutRequest
} from 'src/app/modules/auth/store/auth.actions'
import { getUser } from 'src/app/modules/auth/store/auth.selectors'
import { AuthState } from 'src/app/modules/auth/store/auth.state'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<AuthState>) {}
  user$ = this.store.select(getUser)

  ngOnInit() {
    this.store.dispatch(getUserRequest())
  }

  logout() {
    this.store.dispatch(signOutRequest())
  }
}
