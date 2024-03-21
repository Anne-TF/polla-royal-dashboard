import { CatchErrorFactory, Handler } from '@common/factories';

export const Catch = (errorClassConstructor: any, handler: Handler) =>
  CatchErrorFactory(errorClassConstructor, handler);
