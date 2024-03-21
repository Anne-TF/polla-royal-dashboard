import { RouteRecordRaw } from 'vue-router';


const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   component: () => import('@modules/auth/presentation/layouts/AuthLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@modules/auth/presentation/pages/AuthPage.vue')
  //     }
  //   ],
  //   meta: {
  //     requiresAuth: false
  //   }
  // },

  {
    path: '/',
    component: () => import('@common/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@modules/main/presentation/pages/MainPage.vue')
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
