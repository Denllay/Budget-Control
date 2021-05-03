import { Home } from '@/pages/Home/Home';
import { Main } from '@/pages/Main/Main';
import { IRouters } from '@/types/Routers';
import { RedirectRoute } from './RedirectRoute';

export const routes: IRouters[] = [
  {
    key: 'main',
    path: '/Budget-Control/main',
    Component: Main,
    privateMode: true,
    exact: true,
  },
  {
    key: 'home',
    path: '/home',
    Component: Home,
    privateMode: false,
    exact: true,
  },
  {
    key: 'redirect',
    path: '/',
    Component: RedirectRoute,
    privateMode: false,
    exact: true,
  },
];
