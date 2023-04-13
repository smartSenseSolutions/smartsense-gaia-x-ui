import { EventEmitter, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Event,
  NavigationEnd,
  Router
} from '@angular/router';
import { truncateFromMiddle } from '../../functions/index';
import { Breadcrumb } from './breadcrumb.interface';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    breadcrumbChanged = new EventEmitter<Breadcrumb[]>(false);

    private breadcrumbs = new Array<Breadcrumb>();

    constructor(private router: Router) {
        this.router.events.subscribe((routeEvent) => {
            this.onRouteEvent(routeEvent);
        });
    }

    private onRouteEvent(routeEvent: Event) {
        if (!(routeEvent instanceof NavigationEnd)) {
            return;
        }

        let route = this.router.routerState.root.snapshot;
        let url = '';

        var breadCrumbIndex = 0;
        var newCrumbs = [];

        while (route.firstChild != null) {
            route = route.firstChild;

            if (route.routeConfig === null) {
                continue;
            }
            if (!route.routeConfig.path) {
                continue;
            }

            url += `/${this.createUrl(route)}`;

            if (!route.data['breadcrumb']) {
                continue;
            }
            var newCrumb = this.createBreadcrumb(route, url);
            if (
                route.data['breadcrumb'].includes('{{') &&
                route.data['breadcrumb'].includes('}}')
            ) {
                const keys = route.data['breadcrumb']
                    .replace('{{', '')
                    .replace('}}', '')
                    .split('.');
                let data = route.data;
                for (let key of keys) {
                    data = data[key];
                }
                let label = data as unknown as string;
                newCrumb.displayName = label;
                if (label && label.length > 50) {
                    newCrumb.displayName = truncateFromMiddle(
                        label,
                        50,
                        '.....',
                        35,
                        15
                    );
                }
            }

            newCrumbs.push(newCrumb);
        }

        this.breadcrumbs = newCrumbs;
        this.breadcrumbChanged.emit(this.breadcrumbs);
    }

    private createBreadcrumb(
        route: ActivatedRouteSnapshot,
        url: string
    ): Breadcrumb {
        return {
            displayName: route.data['breadcrumb'],
            terminal: this.isTerminal(route),
            url: url,
            route: route.routeConfig
        };
    }

    private isTerminal(route: ActivatedRouteSnapshot) {
        return (
            route.firstChild === null ||
            route.firstChild.routeConfig === null ||
            !route.firstChild.routeConfig.path
        );
    }

    private createUrl(route: ActivatedRouteSnapshot) {
        return route.url
            .map(function (s) {
                return s.toString();
            })
            .join('/');
    }
}
