import { IAPIResponse } from '@common/interfaces';
export interface ISelectionRunner {
  runnerId: number;
  programNumber: number;
  position: number;
  points: number;
}

export interface ITicket {
  ticket: number;
  date: string;
  amount: number;
  status: number;
  payout: number;
  selections: ISelectionRunner[];
  pointsTicket: number;
}

export interface IGetTicketHistoryResponse extends IAPIResponse<ITicket[]> {}
