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
  mode?: TMode | 'day',
): string => {
  const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
  const inputDate = moment(date);

  if (mode === "date") {
    return inputDate.format("YYYY-MM-DD");
  } else if (mode === "time") {
    return inputDate.format("A hh:mm");
  } else if (mode === "day") {
    return inputDate.format('d')
  }


  return inputDate.format("YYYY-MM-DD · A hh:mm");
};

export const getWeekRange = (date: Date) => {
  const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
  const endOfWeek = new Date(date.setDate(startOfWeek.getDate() + 6));

  return {
    startDate: startOfWeek.setHours(0, 0, 0, 0),
    endDate: endOfWeek.setHours(23, 59, 59, 59),
  };
};

export const getDayName = (day: number) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
};

export const getMonthName = (month: number) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month];
};