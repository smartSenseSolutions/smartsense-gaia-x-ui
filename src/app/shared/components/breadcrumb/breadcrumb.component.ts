import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Breadcrumb } from './breadcrumb.interface';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
    selector: 'app-breadcrumb',
    standalone:true,
    imports:[CommonModule, RouterModule ,MatIconModule],
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
    breadcrumbs: Breadcrumb[] =[];

    isShowBreadCrumb: boolean = true;

    constructor(
        private breadcrumbService: BreadcrumbService,
    ) {
        this.breadcrumbService.breadcrumbChanged.subscribe(
            (crumbs: Breadcrumb[]) => {
                this.onBreadcrumbChange(crumbs);
            }
        );
        this.breadcrumbService.showBreadCrumbObservable.subscribe((value) => {
            this.isShowBreadCrumb = value;
        });
    }

    private onBreadcrumbChange(crumbs: Breadcrumb[]) {
        this.breadcrumbs = crumbs;
    }
}
