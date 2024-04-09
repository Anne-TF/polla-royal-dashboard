import { RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@common/layouts/MainLayout.vue'),
    children: [
      {
        path: 'polla',
        component: () => import('@modules/polla/presentation/pages/MainPage.vue')
      }
    ],
    meta: {
      requiresAuth: false
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@common/pages/ErrorNotFound.vue')
  }
];

export default routes;
