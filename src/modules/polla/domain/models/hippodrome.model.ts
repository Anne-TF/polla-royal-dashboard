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

    this.races = Array.from({
      length: lastRace - firstRace + 1
    }, (_, i) => `${this.id}${padNumber(i + firstRace)}`);
  }
}
