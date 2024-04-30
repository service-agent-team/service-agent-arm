import dayjs from 'dayjs';

export const dateFormatter = (date: string) => {
  const originalDate = new Date(date);
  const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} `;
  return formattedDate;
};

export const dateParser = (date: string) => {
  return dayjs(date).format('dddd D MMMM YYYY, h:mm A');
};

export const generateUTC = (date: string | Date): string => {
  const currentDate = new Date(date);
  return currentDate.toISOString();
};

export const dateFormatDayJs = (date: string, format?: string) => {
  return dayjs(date).format(format ? format : 'YYYY-MM-DD');
};
