import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate
} from '@angular/fire/compat/auth-guard'
import { Page404Component } from './shared/views/page404/page404.component'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const redirectLoggedInToHome = () => redirectLoggedInTo(['annotator'])

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
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'annotator',
    loadChildren: () =>
      import('./modules/annotator/annotator.module').then(
        m => m.AnnotatorModule
      ),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '**',
    pathMatch: 'full',
    component: Page404Component
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
