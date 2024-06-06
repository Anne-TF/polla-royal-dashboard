import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@modules/auth/presentation/pages/LoginPage.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    component: () => import('@common/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@modules/dashboard/presentation/pages/IndexPage.vue')
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/usuarios',
    component: () => import('@common/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@modules/users/presentation/pages/IndexPage.vue')
      },
      {
        path: 'crear',
        component: () => import('@modules/users/presentation/pages/CreatePage.vue')
      },
      {
        path: 'editar/:id',
        component: () => import('@modules/users/presentation/pages/UpdatePage.vue')
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/operadores',
    component: () => import('@common/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@modules/operators/presentation/pages/IndexPage.vue')
      },
      {
        path: 'crear',
        component: () => import('@modules/operators/presentation/pages/CreatePage.vue')
      },
      {
        path: 'editar/:id',
        component: () => import('@modules/operators/presentation/pages/UpdatePage.vue')
      }
    ],
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/apuestas',
    component: () => import('@common/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@modules/transactions/presentation/pages/IndexPage.vue')
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
