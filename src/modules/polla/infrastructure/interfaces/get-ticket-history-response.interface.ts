import { IAPIResponse } from '@common/interfaces';
export interface ISelectionRunner {
  runnerId: number;
  programNumber: string;
  position: number;
  points: number;
}

export interface ITicket {
  ticket: number;
  date: string;
  amount: number;
  status: number;
  payout: number;
  selections: Record<string, ISelectionRunner>;
  pointsTicket: number;
}

export interface IGetTicketHistoryResponse extends IAPIResponse<ITicket[]> {}
