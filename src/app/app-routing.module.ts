import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './private/components';
import { IssueCredentialsComponent } from './private/components/issue-credentials/issue-credentials.component';
import { ProfileComponent } from './private/components/profile/profile.component';
import { SearchComponent } from './private/components/search/search.component';
import { ServiceCatalogComponent } from './private/components/service-catalog/service-catalog.component';
import { SmartXComponent } from './private/components/smart-x/smart-x.component';
import { WalletComponent } from './private/components/wallet/wallet.component';
import {
  LoginComponent,
  SignupStepOneComponent,
  SignupStepTwoComponent,
} from './public/components';
import { RouteConstants } from './shared/constants';
import { SignupContainerComponent } from './public/components/signup/signup-container/signup-container.component';

const routes: Routes = [
  {
    path: RouteConstants.Login,
    component: LoginComponent,
  },
  {
    path: RouteConstants.SignUp,
    component: SignupContainerComponent,
  },
  {
    path: RouteConstants.SmartX,
    component: SmartXComponent,
    data: {
      breadcrumb:'Smart-X'
    },
    children: [
      {
        path: '',
        redirectTo: RouteConstants.DashBoard,
        pathMatch:'full'
      },
      {
        path:  RouteConstants.DashBoard,
        component: DashboardComponent,
        data: {
          breadcrumb:'Dashboard'
        }
      },
      {
        path:  RouteConstants.Wallet,
        component: WalletComponent,
        data: {
          breadcrumb:'Wallet'
        }
      },
      {
        path:  RouteConstants.IssueCredentials,
        component: IssueCredentialsComponent,
        data: {
          breadcrumb:'Issue Credentials'
        }
      },
      {
        path:  RouteConstants.Search,
        component: SearchComponent,
        data: {
          breadcrumb:'Search'
        }
      },
      {
        path:  RouteConstants.ServiceCatalog,
        component: ServiceCatalogComponent,
        data: {
          breadcrumb:'Service Catalog'
        }
      },
      {
        path:  RouteConstants.Profile,
        component: ProfileComponent,
        data: {
          breadcrumb:'Profile'
        }
      },
    ],
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
