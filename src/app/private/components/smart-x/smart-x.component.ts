import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { RouteConstants } from 'src/app/shared/constants';
import { UserModel } from 'src/app/shared/models';
import { SharedService } from 'src/app/shared/services';
import { BreadcrumbComponent } from '../../../shared/components/index';
import { MENU_ITEMS } from './smart-x.constants';
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
export class SmartXComponent implements OnInit {
  readonly MENU_ITEMS = MENU_ITEMS;

  user?: UserModel;
  username?: string

  constructor(private route: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
      this.user = this.sharedService.getUser();
      this.username = this.user.email.split('@')[0].toUpperCase();
  }

  onLogoutClick = () => {
    this.sharedService.clearSession();
    this.route.navigate([RouteConstants.Login]);
  };



 get organizationNameChar(): string {
  let organizationName = this.username;
    if (organizationName) {
        organizationName = organizationName.trim();
        const ind = organizationName.indexOf(' ');
        if (ind > -1) {
            return (
                organizationName.charAt(0) + organizationName.charAt(ind + 1)
            ).toUpperCase();
        } else {
            return (
                organizationName.charAt(0) + organizationName.charAt(1)
            ).toUpperCase();
        }
    } else {
        return '';
    }
};
}
