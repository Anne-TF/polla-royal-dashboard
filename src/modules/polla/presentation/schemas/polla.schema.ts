import { z } from 'zod';

/*
* IPollaSelectionSchema debe tener un min de 1 runnerId seleccionado y el
* raceId debe ser un string requerido
*
* */

export interface IPollaSelectionSchema {
  raceId: string;
  runnersId: string[];
}

/*
* IPollaSchema debe tener un min y un max de 6 selecciones y el
* hippodromeId debe ser un string requerido
*
* */
export interface IPollaSchema {
  hippodromeId: string;
  selections: IPollaSelectionSchema[];
}

export const PollaSelectionSchema = z.object({
  raceId: z.string(),
  runnersId: z.array(z.string()).min(1)
});

export const PollaSchema = z.object({
  hippodromeId: z.string(),
  selections: z.array(PollaSelectionSchema).min(1).max(6)
});
