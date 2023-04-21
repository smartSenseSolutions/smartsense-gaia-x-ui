import { RouteConstants } from 'src/app/shared/constants';

export const MENU_ITEMS = [
  {
    iconName: 'home',
    label: 'Dashboard',
    routeLink: `/${RouteConstants.SmartX}/${RouteConstants.DashBoard}`,
  },
  {
    iconName: 'wallet',
    label: 'Wallet',
    routeLink: `/${RouteConstants.SmartX}/${RouteConstants.Wallet}`,
  },
  {
    iconName: 'search',
    label: 'Browse Catalogue',
    routeLink: `/${RouteConstants.SmartX}/${RouteConstants.BrowseCatalogue}`,
  },
  {
    iconName: 'service',
    label: 'My Service Offerings',
    routeLink: `/${RouteConstants.SmartX}/${RouteConstants.MyServiceOfferings}`,
  },
];
