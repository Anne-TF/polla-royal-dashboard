import { IBaseEntity } from '@common/interfaces';

export interface IUser extends IBaseEntity {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  birthday: number;
  enable: boolean;
  verify: boolean;
  isSuperAdmin: boolean;
  firstLogin: boolean;
  permissions: string[];
  roles: any[];
  mainPicture: null | { id: string; url: string };
  banner: null | { id: string; url: string };
}
