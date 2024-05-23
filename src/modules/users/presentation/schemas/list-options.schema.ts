import { z } from 'zod';

export interface IListOptionsSchema {
  sort?: string;
  filter?: object;
  pagination?: {
    limit: number;
    offset?: number;
  };
  sortOrder?: boolean;
}

export const ListOptionsSchema = z.object({
  sort: z.string().optional(),
  search: z.string().optional(),
  pagination: z.object({
    limit: z.number(),
    offset: z.number().optional()
  }).optional(),
  sortOrder: z.boolean().optional()
});
