import { IAPIResponse } from '@common/interfaces';

export interface IHippodrome {
  cardId: string;
  cardName: string;
  firstRace: string;
  lastRace: string;
  lastClosedRace: string;
  statusPolla: string;
}

export interface IGetHippodromesResponse extends IAPIResponse<IHippodrome[]> {}
