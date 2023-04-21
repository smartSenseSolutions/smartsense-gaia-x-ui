import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AddServiceContainerComponent,
  BrowseCatalogueComponent,
  CatalogDetailsComponent,
  DashboardComponent,
  MyServiceOfferingsComponent,
  SignupContainerComponent,
  SmartXComponent,
  WalletComponent,
} from './private/components';
import {
  DashboardResolver,
  ServiceOfferingDetailResolver,
} from './private/resolver';
import { LoginComponent } from './public/components';
import { RouteConstants } from './shared/constants';
import { RouteType, UserType } from './shared/enums';
import { AuthGuard } from './shared/guards';

const routes: Routes = [
{
    path: RouteConstants.Login,
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      routeType: RouteType.Public,
      loginType: UserType.Enterprise,
    },
  },
  {
    path: RouteConstants.AdminLogin,
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      routeType: RouteType.Public,
      loginType: UserType.Admin,
    },
  },
  {
    path: RouteConstants.SignUp,
    component: SignupContainerComponent,
    canActivate: [AuthGuard],
    data: {
      routeType: RouteType.Private,
      allowedUserTypes: [UserType.Admin],
    },
  },
  {
    path: RouteConstants.SmartX,
    component: SmartXComponent,
    canActivate: [AuthGuard],
    data: {
      routeType: RouteType.Private,
      allowedUserTypes: [UserType.Enterprise],
      breadcrumb: 'Smart-X',
    },
    children: [
      {
        path: '',
        redirectTo: RouteConstants.DashBoard,
        pathMatch: 'full',
      },
      {
        path: RouteConstants.DashBoard,
        component: DashboardComponent,
        resolve: {
          dashboard: DashboardResolver,
        },
        data: {
          breadcrumb: 'Dashboard',
        },
      },
      {
        path: RouteConstants.Wallet,
        component: WalletComponent,
        resolve: {
          dashboard: DashboardResolver,
        },
        data: {
          breadcrumb: 'Wallet',
        },
      },
      {
        path: RouteConstants.BrowseCatalogue,
        data: {
          breadcrumb: 'Browser Catalogue',
        },
        children: [
          {
            path: '',
            component: BrowseCatalogueComponent,
          },
          {
            path: RouteConstants.Detail,
            component: CatalogDetailsComponent,
            data: {
              breadcrumb: '{{service.label}}',
            },
            resolve: {
              service: ServiceOfferingDetailResolver,
            },
          },
        ],
      },
      {
        path: RouteConstants.MyServiceOfferings,
        data: {
          breadcrumb: 'My Service Offerings',
        },
        children: [
          {
            path: '',
            component: MyServiceOfferingsComponent,
          },
          {
            path: RouteConstants.AddNewService,
            component: AddServiceContainerComponent,
            data: {
              breadcrumb: 'Add New Service',
            },
          },
          {
            path: RouteConstants.Detail,
            component: CatalogDetailsComponent,
            data: {
              breadcrumb: '{{service.label}}',
            },
            resolve: {
              service: ServiceOfferingDetailResolver,
            },
          },
        ],
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
