import { IRace } from '@modules/polla/infrastructure/interfaces';
import { parse, removeNonNumericCharacters } from '@common/utils';

export interface IRunner {
  readonly id: string;
  readonly number: number;
  readonly programNumber: string;
  readonly allow: boolean;
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
      programNumber: runner.programNumber,
      number: parse(removeNonNumericCharacters(runner.programNumber)),
      allow: parse(runner.runnerStatus) === 1
    }));
  }
}
