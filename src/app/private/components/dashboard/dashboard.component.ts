import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface navLink {
  iconName: string;
  label: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  selected: number = 0;
  menu: navLink[] = [
    {
      iconName: 'home',
      label: 'Dashboard',
    },
    {
      iconName: 'wallet',
      label: 'Wallet',
    },
    {
      iconName: 'achievement',
      label: 'Issue Credentials',
    },
    {
      iconName: 'search',
      label: 'Search',
    },
    {
      iconName: 'service-catalog',
      label: 'Service Catalog',
    },
    {
      iconName: 'profile',
      label: 'Profile',
    },
  ];
  constructor() {}

  update(index: number) {
    this.selected = index;
  }
}
