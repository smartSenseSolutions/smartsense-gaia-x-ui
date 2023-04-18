import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { RouteConstants } from 'src/app/shared/constants';
import { BreadcrumbComponent } from '../../../shared/components/index';
import { SharedService } from 'src/app/shared/services';
import { MENU_ITEMS } from './smart-x.constants';
import { UserModel } from 'src/app/shared/models';
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
}
