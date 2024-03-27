import { IAPIResponse } from '@common/interfaces';

export interface IPot {
  pot: number;
  price: number;
}

export interface IGetPotResponse extends IAPIResponse<IPot> {}
