import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@modules/auth/presentation/pages/LoginPage.vue')
  },
  {
    path: '/polla',
    component: () => import('@common/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@modules/polla/presentation/pages/MainPage.vue')
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/404',
    component: () => import('@common/pages/ErrorNotFound.vue')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@common/pages/ErrorNotFound.vue')
  }
];

export default routes;
