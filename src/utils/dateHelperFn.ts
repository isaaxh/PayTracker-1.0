import moment from "moment";

export const getFormattedDate = () => {
  const date = new Date();
  const formattedDate = date.toLocaleString("en-us", {
    timeZone: "Asia/Riyadh",
    dateStyle: "short",
    timeStyle: "medium",
  });
  return formattedDate;
};

export const formatDate = (date: Date): string => {
  const today = moment();
  const yesterday = moment().subtract(1, "days").startOf("day");
  const inputDate = moment(date);

  /* if (inputDate.isSame(today, "day")) { */
  /*   return "Today"; */
  /* } else if (inputDate.isSame(yesterday, "day")) { */
  /*   return "Yesterday"; */
  /* } else { */
  /*   return inputDate.format("YYYY-MM-DD"); */
  /* } */
  return inputDate.format("YYYY-MM-DD HH:mm");
};

export function convertToTimezone(date: Date, offsetInHours: number) {
  // Convert the date to UTC (get the time in milliseconds since the Unix epoch)
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60 * 1000;

  // Add the offset (in milliseconds)
  const targetTime = utcTime + offsetInHours * 60 * 60 * 1000;

  // Create a new Date object with the adjusted time
  return new Date(targetTime);
}
