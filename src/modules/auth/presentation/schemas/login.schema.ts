import { z } from 'zod';

export interface ILoginSchema {
  email: string;
  password: string;
}

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string()
});
