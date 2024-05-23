import { IUser } from './user.interface';

export interface Form extends Partial<IUser> {
  password: string;
}
