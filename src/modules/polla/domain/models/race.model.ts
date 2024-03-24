import { IRace } from '@modules/polla/infrastructure/interfaces';
import { parse } from '@common/utils';

export interface IRunner {
  readonly id: string;
  readonly number: number;
  readonly status: string;
}

export class Race
{
  readonly id: string;
  readonly number: number;
  readonly status: string;
  readonly runners: IRunner[];

  constructor(data: IRace)
  {
    this.id = data.raceId;
    this.number = parse(data.raceNumber);
    this.status = data.statusRace;
    this.runners = data.runners.map<IRunner>((runner) => ({
      id: runner.runnerId,
      number: parse(runner.programNumber),
      status: runner.runnerStatus
    }));
  }
}
