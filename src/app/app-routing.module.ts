import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './private/components';
import {
  LoginComponent,
  SignupStepTwoComponent,
  SignupStepOneComponent,
} from './public/components';
import { RouteConstants } from './shared/constants';

const routes: Routes = [
  {
    path: RouteConstants.Login,
    component: LoginComponent,
  },
  {
    path: RouteConstants.SignUp,
    children: [
      {
        path: RouteConstants.Step1,
        component: SignupStepOneComponent,
      },
      {
        path: RouteConstants.Step2,
        component: SignupStepTwoComponent,
      },
      {
        path: '**',
        redirectTo: RouteConstants.Step1,
      },
    ],
  },
  {
    path: 'home',
    component: DashboardComponent,
  },
  {
    path: '**',
    redirectTo: RouteConstants.Login,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
