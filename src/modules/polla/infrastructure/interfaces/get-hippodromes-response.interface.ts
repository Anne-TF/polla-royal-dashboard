import { IAPIResponse } from '@common/interfaces';

export interface IHippodrome {
  id: string;
  name: string;
  firstRace: string;
  lastRace: string;
  allowPlay: boolean;
  races: string[];
}

export interface IGetHippodromesResponse extends IAPIResponse<IHippodrome[]> {}
