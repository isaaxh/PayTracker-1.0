import { TMode } from "components/CustomDateTimePicker";
import { Timestamp } from "firebase/firestore";
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

export function convertToTimezone(date: Date, offsetInHours: number) {
  // Convert the date to UTC (get the time in milliseconds since the Unix epoch)
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60 * 1000;

  // Add the offset (in milliseconds)
  const targetTime = utcTime + offsetInHours * 60 * 60 * 1000;

  // Create a new Date object with the adjusted time
  return new Date(targetTime);
}

export const formatDate = (
  timestamp: Timestamp | Date,
  mode?: TMode,
): string => {
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
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
  if (mode === "date") {
    return inputDate.format("YYYY-MM-DD");
  } else if (mode === "time") {
    return inputDate.format("hh:mm A");
  }

  return inputDate.format("YYYY-MM-DD · hh:mm A");
};
