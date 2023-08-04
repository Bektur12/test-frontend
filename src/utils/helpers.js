import { format, parseISO } from "date-fns";

export const getFormatDate = (date) => {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, "dd.MM.yyyy");
  return formattedDate;
};
