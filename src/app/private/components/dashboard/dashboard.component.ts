import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/public/components';

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
  imports: [CommonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
