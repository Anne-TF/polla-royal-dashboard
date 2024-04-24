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
    path: '/no-hippodromes',
    component: () => import('@modules/polla/presentation/pages/NoHippodromes.vue')
  },
  {
    path: '/session-expired',
    component: () => import('@modules/auth/presentation/pages/SessionExpired.vue'),
    meta: {
      noAuth: true
    }
  },
  {
    path: '/operator-error',
    component: () => import('@modules/auth/presentation/pages/OperatorError.vue'),
    meta: {
      noAuth: true
    }
  },
  {
    path: '/invalid-token',
    component: () => import('@modules/auth/presentation/pages/InvalidToken.vue'),
    meta: {
      noAuth: true
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
