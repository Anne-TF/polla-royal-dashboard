export interface IUser {
  firstName: string;
  id: string;
  lastName: string;
  email: string;
  phone: string;
  enable: boolean;
  birthday: number | string;
  firstLogin: boolean;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  provider?: string;
  mainPicture: null | { id: string; url: string };
}
