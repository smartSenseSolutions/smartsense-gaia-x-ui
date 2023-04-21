import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/public/components';
import { RouteConstants } from 'src/app/shared/constants';
import { DashboardModel } from '../../models';

interface navLink {
  iconName: string;
  label: string;
}
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  readonly RouteConstants = RouteConstants;
  dashboard: DashboardModel;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.dashboard = this.activatedRoute.snapshot.data['dashboard'];
  }
}
