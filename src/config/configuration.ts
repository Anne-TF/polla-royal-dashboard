import { IConfig } from './config.interface';

export default (): IConfig => ({
  environment: process.env.NODE_ENV,
  app: {
    name: process.env.PROJECT_NAME,
    port: process.env.PORT
  },
  server: {
    host: process.env.API_HOST,
    port: process.env.API_PORT,
    basePath: process.env.API_BASE_PATH,
    useSSL: process.env.API_USE_SSL,
    withCredentials: process.env.API_WITH_CREDENTIALS
  }
});
