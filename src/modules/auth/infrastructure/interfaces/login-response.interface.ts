import { IAPIResponse } from '@common/interfaces';

export interface ILoginResponse  extends IAPIResponse<{
  jwt: string;
}> {}
