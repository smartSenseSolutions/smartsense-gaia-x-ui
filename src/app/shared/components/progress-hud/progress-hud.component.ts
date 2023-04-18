import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedService } from '../../services';
@Component({
    selector: 'app-progress-hud',
    standalone: true,
    imports : [CommonModule  , MatProgressBarModule],
    templateUrl: './progress-hud.component.html',
    styleUrls: ['./progress-hud.component.scss'],
})

export class ProgressHudComponent implements OnInit, OnDestroy {

    isLoading = false;
    $loaderSubscriber: any;

    constructor(private _sharedService: SharedService) {
    }

    ngOnInit() {
        this.$loaderSubscriber = this._sharedService.getLoader().subscribe((isLoading) => {
            this.isLoading = isLoading;
        });
    }

    ngOnDestroy() {
        if (this.$loaderSubscriber) {
            this.$loaderSubscriber.unsubscribe();
        }
    }
}
