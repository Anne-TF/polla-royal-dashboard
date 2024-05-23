import { IAPIResponse } from '@common/interfaces';
import { IUser } from '@modules/users/infrastructure/interfaces';

export interface ILoginResponse  extends IAPIResponse<{
  jwt: string;
  user: IUser;
}> {}
