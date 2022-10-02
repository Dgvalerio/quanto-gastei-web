export enum Routes {
  Home = `/`,
  Dashboard = `/dashboard`,
}

export const routes = {
  home: (): Routes => Routes.Home,
  dashboard: (): Routes => Routes.Dashboard,
};
