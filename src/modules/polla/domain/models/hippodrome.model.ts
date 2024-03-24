import { IHippodrome } from '@modules/polla/infrastructure/interfaces';
import { padNumber, parse } from '@common/utils';

export class Hippodrome
{
  readonly id: string;
  readonly name: string;
  readonly allowsPlay: boolean;
  readonly races: string[];

  constructor(data: IHippodrome)
  {
    this.id = data.cardId;
    this.name = data.cardName;
    this.allowsPlay = parse<number>(data.statusPolla) === 1;

    const firstRace = parse<number>(data.firstRace);
    const lastRace = parse<number>(data.lastRace);

    const races = [];

    for (let i = firstRace; i <= lastRace; i++)
    {
      races.push(`${this.id}${padNumber(i)}`);
    }

    this.races = races;
  }
}
