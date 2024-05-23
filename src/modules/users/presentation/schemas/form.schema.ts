import { z } from 'zod';
import { IUser } from '@modules/users/infrastructure/interfaces';

export interface IFormSchema extends Partial<IUser> {
  password: string;
}

export const FormSchema = z.object({
  nombre: z.string().min(3).max(20),
  apellido: z.string().min(3).max(20),
  email: z.string().email().max(255),
  tlf: z.string().min(9).max(15),
  password: z.string().min(3).max(10).optional().transform(e => e === '' ? undefined : e)
});
