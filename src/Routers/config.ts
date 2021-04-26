import { Home } from '@/pages/Home/Home';
import { Main } from '@/pages/Main/Main';
import { IRouters } from '@/types/Routers';

export const routes: IRouters[] = [
  {
    key: 'main',
    path: '/main',
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
];
