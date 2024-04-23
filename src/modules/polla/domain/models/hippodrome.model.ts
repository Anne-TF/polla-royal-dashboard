import { IHippodrome } from '@modules/polla/infrastructure/interfaces';


interface ITicket {
  readonly amount: number;
  readonly currency: string;
}

export class Hippodrome
{
  readonly _id: string;
  readonly id: string;
  readonly name: string;
  readonly date: string;
  readonly allowsPlay: boolean;
  readonly races: string[];
  ticket: ITicket;

  constructor(data: IHippodrome)
  {
    delete data.firstRace;
    delete data.lastRace;

    Object.assign(this, data);
  }
}
