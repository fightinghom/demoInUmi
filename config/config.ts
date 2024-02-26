import { defineConfig } from '@umijs/max';
import routes from '../src/route/index';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  mfsu: { strategy: 'normal' },
  layout: {
    title: '@umijs/max',
  },
  routes: routes,
  npmClient: 'pnpm',
  tailwindcss: {},
});
