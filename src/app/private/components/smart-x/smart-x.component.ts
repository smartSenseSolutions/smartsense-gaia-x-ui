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
import { SharedService } from 'src/app/shared/services';

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
      iconName: 'search',
      label: 'Browse Catalogue',
      routeLink : RouteConstants.BrowseCatalogue
    },
    {
      iconName: 'service-catalog',
      label: 'My Service Offerings',
      routeLink : RouteConstants.MyServiceOfferings
    }
  ];

  constructor(private route: Router, private sharedService : SharedService) {}

  update(index: number) {
    this.selected = index;
    this.route.navigateByUrl( RouteConstants.SmartX+'/'+ this.menu[index].routeLink);
  }

  onLogoutClick = () => {
    this.sharedService.clearSession();
    this.route.navigate([RouteConstants.Login])
  }
}









