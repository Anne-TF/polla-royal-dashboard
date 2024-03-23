import { IAPIResponse } from '@common/interfaces';

export interface IRunner {
  runnerId: string;
  programNumber: string;
  runnerStatus: string;
}

export interface IRace {
  cardId: string;
  raceId: string;
  raceNumber: string;
  statusRace: string;
  runners: IRunner[];
}

export interface IGetRacesResponse extends IAPIResponse< { [raceId: string]: IRace } > {}
