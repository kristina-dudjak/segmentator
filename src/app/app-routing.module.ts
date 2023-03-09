import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate
} from '@angular/fire/compat/auth-guard'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const redirectLoggedInToSegmentator = () => redirectLoggedInTo(['segmentator'])

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule),
    ...canActivate(redirectLoggedInToSegmentator)
  },
  {
    path: 'segmentator',
    loadChildren: () =>
      import('./modules/segmentator/segmentator.module').then(
        m => m.SegmentatorModule
      ),
    ...canActivate(redirectUnauthorizedToLogin)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
