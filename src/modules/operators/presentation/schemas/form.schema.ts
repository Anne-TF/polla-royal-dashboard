import { z } from 'zod';
import { IForm } from '@modules/operators/infrastructure/interfaces';

export interface IFormSchema extends IForm {}

export const FormSchema = z.object({
  dbs: z.string().min(3).max(20),
  nombre: z.string().min(3).max(20),
  url: z.string().url(),
  urlBg: z.string().url(),
  secret: z.string().uuid(),
  hash: z.string().uuid()
});
