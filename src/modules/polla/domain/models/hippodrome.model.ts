import { IHippodrome } from '@modules/polla/infrastructure/interfaces';
import { padNumber } from '@common/utils';

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
    this.allowsPlay = parseInt(data.statusPolla, 10) === 1;

    const firstRace = parseInt(data.firstRace, 10);
    const lastRace = parseInt(data.lastRace, 10);

    const races = [];

    for (let i = firstRace; i <= lastRace; i++)
    {
      races.push(`${this.id}${padNumber(i)}`);
    }

    this.races = races;
  }
}
