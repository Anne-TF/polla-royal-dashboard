import { IAPIResponse } from '@common/interfaces';

export interface ILoginResponse  extends IAPIResponse<{
  jwt: string;
  balances: Record<string, number>;
  defaultCurrency: string;
}> {}
