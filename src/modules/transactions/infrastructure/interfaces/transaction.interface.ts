export interface ITransaction {
  id: string;
  amount: number;
  combinations: number;
  currency: string;
  createdAt: string;
  userId: string;
  hippodrome: string
}
