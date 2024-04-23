import { IAPIResponse } from '@common/interfaces';

export interface IBalancesResponse  extends IAPIResponse<{
  balances: Record<string, number>;
  defaultCurrency: string;
}> {}
