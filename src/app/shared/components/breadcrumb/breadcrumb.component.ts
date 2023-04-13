import { Component } from '@angular/core';
import { SharedService } from '@sharedModule/services';
import { Breadcrumb } from './breadcrumb.interface';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
    breadcrumbs: Breadcrumb[];

    isShowBreadCrumb: boolean = true;

    constructor(
        private breadcrumbService: BreadcrumbService,
        private sharedService: SharedService
    ) {
        this.breadcrumbService.breadcrumbChanged.subscribe(
            (crumbs: Breadcrumb[]) => {
                this.onBreadcrumbChange(crumbs);
            }
        );
        this.sharedService.showBreadCrumbObservable.subscribe((value) => {
            this.isShowBreadCrumb = value;
        });
    }

    private onBreadcrumbChange(crumbs: Breadcrumb[]) {
        this.breadcrumbs = crumbs;
    }
}
