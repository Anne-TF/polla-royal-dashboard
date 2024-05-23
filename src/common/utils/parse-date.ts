import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

export const ParseDate = (isUnix: boolean, date: string | number, convertFormat: string, currFormat?: string): string =>
{
  if (!date || !isUnix && !currFormat)
  {
    return '';
  }
  dayjs.extend(customParseFormat);

  const dateTime = isUnix ? dayjs.unix(date as number) : dayjs(date as string, currFormat as string);
  return dayjs(dateTime).format(convertFormat);
};
