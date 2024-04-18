import { IHippodrome } from '@modules/polla/infrastructure/interfaces';

export class Hippodrome
{
  readonly id: string;
  readonly name: string;
  readonly date: string;
  readonly allowsPlay: boolean;
  readonly races: string[];

  constructor(data: IHippodrome)
  {
    delete data.firstRace;
    delete data.lastRace;

    Object.assign(this, data);
  }
}
