import { IAPIResponse, IPagination } from '@common/interfaces';
import { IUser } from '@modules/users/infrastructure/interfaces';

export interface IListUsersResponse extends IAPIResponse<IUser[]> {
  pagination: IPagination;
}
