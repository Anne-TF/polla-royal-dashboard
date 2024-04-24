import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory, Router as VueRouter
} from 'vue-router';

import routes from './routes';
import { useAuthStore } from '@modules/auth/domain/store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */


export let $globalRoute: VueRouter;
export default route(function(/* { store, ssrContext } */)
{

  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  });

  Router.beforeEach(async(to) =>
  {
    // FIRST WE CHECK IF TOKEN IS SETTED IN LOCAL STORAGE
    const authStore = useAuthStore();

    const token = authStore.GetToken;

    // IF TOKEN DOESN EXIST AND THE ROUTE REQUIRES AUTH, THEN REDIRECT TO LOADING SCREEN
    if (!token && to.path !== '/' && to.matched.some(record => record.meta.requiresAuth))
    {
      await Router.push('/');
      return;
    }

    // IF TOKEN EXISTS AND THE ROUTE DOESNT REQUIRE AUTH, THEN REDIRECT TO MAIN PAGE
    if (token && to.matched.some(record => record.meta.noAuth))
    {
      await Router.push('/polla');
      return;
    }

    if (to.path === '/')
    {
      if (!to.query.jwt_token || !to.query.integration)
      {
        await Router.push('/404');
        return;
      }
    }
  });

  $globalRoute = Router;

  return Router;
});
