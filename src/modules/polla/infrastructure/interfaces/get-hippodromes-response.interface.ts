import { IAPIResponse } from '@common/interfaces';

export interface IHippodrome {
  _id: string;
  id: string;
  name: string;
  firstRace: string;
  lastRace: string;
  allowsPlay: boolean;
  races: string[];
  ticket: {
    amount: number;
    currency: string;
  }
}

export interface IGetHippodromesResponse extends IAPIResponse<IHippodrome[]> {}
