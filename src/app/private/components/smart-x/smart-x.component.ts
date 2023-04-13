import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  Router,
  RouterModule
} from '@angular/router';
import { RouteConstants } from 'src/app/shared/constants';
import { BreadcrumbComponent } from '../../../shared/components/index';

interface navLink {
  iconName: string;
  label: string;
  routeLink : string
}

@Component({
  selector: 'app-smart-x',
  templateUrl: './smart-x.component.html',
  styleUrls: ['./smart-x.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    BreadcrumbComponent,
  ],
})
export class SmartXComponent {
  selected: number = 0;
  menu: navLink[] = [
    {
      iconName: 'home',
      label: 'Dashboard',
      routeLink : RouteConstants.DashBoard
    },
    {
      iconName: 'wallet',
      label: 'Wallet',
      routeLink : RouteConstants.Wallet

    },
    {
      iconName: 'achievement',
      label: 'Issue Credentials',
      routeLink : RouteConstants.IssueCredentials
    },
    {
      iconName: 'search',
      label: 'Search',
      routeLink : RouteConstants.Search
    },
    {
      iconName: 'service-catalog',
      label: 'Service Catalog',
      routeLink : RouteConstants.ServiceCatalog
    },
    {
      iconName: 'profile',
      label: 'Profile',
      routeLink : RouteConstants.Profile
    },
  ];

  constructor(private route: Router) {}

  update(index: number) {
    this.selected = index;
    console.log(RouteConstants.Home + this.menu[index].routeLink);
    this.route.navigateByUrl( RouteConstants.Home+'/'+ this.menu[index].routeLink);
  }
}









