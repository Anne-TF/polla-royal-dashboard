import { z } from 'zod';

export interface ILoginSchema {
  jwt_token: string;
  integration: string;
}

export const LoginSchema = z.object({
  jwt_token: z.string(),
  integration: z.string()
});
