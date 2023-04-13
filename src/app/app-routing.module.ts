import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './private/components';
import {
  LoginComponent,
  Signup2Component,
  SignupComponent,
} from './public/components';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    pathMatch: "prefix",
    children: [
      {
        path: '',
        component: SignupComponent,
      },
      {
        path: 'step-2',
        component: Signup2Component,
      }
    ],
  },
  {
    path:"home",
    component : DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
