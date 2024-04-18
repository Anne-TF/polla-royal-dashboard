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
  readonly active: boolean;
  readonly runners: IRunner[];

  constructor(data: IRace)
  {
    this.id = data.id;
    this.number = data.number;
    this.active = data.active;

    this.runners = data.runners.map<IRunner>((runner) =>
    {
      delete runner.name;
      return runner;
    });
  }
}
