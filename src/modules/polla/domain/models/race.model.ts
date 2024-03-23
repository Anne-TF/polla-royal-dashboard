import { IHippodrome, IRace } from '@modules/polla/infrastructure/interfaces';
import { padNumber } from '@common/utils';

export interface IRunner {
  readonly id: string;
  readonly number: string;
  readonly status: string;
}

export class Race
{
  readonly id: string;
  readonly number: string;
  readonly status: string;
  readonly runners: IRunner[];

  constructor(data: IRace)
  {
    this.id = data.raceId;
    this.number = data.raceNumber;
    this.status = data.statusRace;
    this.runners = data.runners.map<IRunner>((runner) => ({
      id: runner.runnerId,
      number: runner.programNumber,
      status: runner.runnerStatus
    }));
  }
}
