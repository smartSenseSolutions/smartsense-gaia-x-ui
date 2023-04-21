import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  BrowseCatalogueComponent,
  CatalogDetailsComponent,
  DashboardComponent,
  MyServiceOfferingsComponent,
  SignupContainerComponent,
  SmartXComponent,
  WalletComponent,
} from './private/components';
import { AddNewServiceComponent } from './private/components/add-service/add-new-service/add-new-service.component';
import { DashboardResolver } from './private/resolver';
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
        component: BrowseCatalogueComponent,
        data: {
          breadcrumb: 'Browser Catalogue',
        },
      },
      {
        path: RouteConstants.MyServiceOfferings,
        component: MyServiceOfferingsComponent,
        data: {
          breadcrumb: 'My Service Offerings',
        },
        children: [
          {
            path: RouteConstants.AddNewService,
            component: AddNewServiceComponent,
            data: {
              breadcrumb: 'Add New Service',
            },
          },
          // {
          //   path: RouteConstants.catalogDetails,
          //   component: CatalogDetailsComponent,
          //   data: {
          //     breadcrumb: 'Carbon Footprint of Camshift Pulse Generator',
          //   },
          // },
        ],
      },

      {
        path: RouteConstants.catalogDetails,
        component: CatalogDetailsComponent,
        data: {
          breadcrumb: 'Carbon Footprint of Camshift Pulse Generator',
        },
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
