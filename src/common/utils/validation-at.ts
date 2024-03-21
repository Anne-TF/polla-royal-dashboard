import { ZodError, ZodObject } from 'zod';
export const validationAt = <S = any>(schema: ZodObject<S | any>) =>
{
  return (property: keyof Partial<S>) =>
  {
    return async(value: any) =>
    {
      try
      {
        await schema.pick({ [property as string]: true }).parseAsync({ [property]: value });
      }
      catch (e: ZodError | any)
      {
        return (e as ZodError).errors[0].message;
      }
    };
  };
};
