import { CatchErrorFactory, Handler } from '@common/factories';

export const DefaultCatch = (handler: Handler) => CatchErrorFactory(handler);
