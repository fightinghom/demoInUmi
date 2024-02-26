import { UmiMaxRoute } from '@/types';

const routes: UmiMaxRoute[] = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: '@/pages/Home',
    icon: 'HomeOutlined',
  },
  {
    name: '权限演示',
    path: '/access',
    component: '@/pages/Access',
  },
  {
    name: ' CRUD 示例',
    path: '/table',
    component: '@/pages/Table',
  },
  {
    name: 'webgis',
    path: '/WebGis',
    component: '@/pages/WebGis',
  },
];

export default routes;
