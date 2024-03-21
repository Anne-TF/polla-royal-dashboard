import { AxiosRequestConfig } from 'axios';

const authRoutes =  {
  login: {
    url: 'auth/login',
    method: 'POST'
  },
  basicLogin: {
    url: 'auth/basic-login',
    method: 'POST'
  },
  refreshToken: {
    url: 'auth/refresh-token',
    method: 'POST'
  },
  logout: {
    url: 'auth/logout',
    method: 'POST'
  },
  forgotPassword: {
    url: 'auth/forgot-password',
    method: 'POST'
  },
  changePassword: {
    url: 'auth/change-forgot-password',
    method: 'POST'
  },
  register: {
    url: 'auth/signup',
    method: 'POST'
  },
  verifyYourAccount: {
    url: 'auth/verify-account',
    method: 'POST'
  }
};

export type Route = Pick<AxiosRequestConfig, 'url' | 'method'>
export const setBasePath = (route: Route, basePath: string): Route =>
{
  return {
    ...route,
    url: `${basePath}/${route.url}`
  };
};


export default authRoutes;
