export const dateFormatter = (date: string) => {
  const originalDate = new Date(date);
  const formattedDate = `${originalDate.getFullYear()}-${(originalDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${originalDate.getDate().toString().padStart(2, '0')} `;
  return formattedDate;
};
