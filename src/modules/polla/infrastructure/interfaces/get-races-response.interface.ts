import { IAPIResponse } from '@common/interfaces';

export interface IRunner {
  id: string;
  name: string;
  programNumber: string;
  number: number;
  allow: boolean;
}

export interface IRace {
  id: string;
  hippodromeId: string;
  number: number;
  active: boolean;
  runners: IRunner[];
}

export interface IGetRacesResponse extends IAPIResponse< { [raceId: string]: IRace } > {}
