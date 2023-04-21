import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DashboardModel } from '../../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent {
  dashboard: DashboardModel;
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.dashboard = this.activatedRoute.snapshot.data['dashboard'];
  }
}
