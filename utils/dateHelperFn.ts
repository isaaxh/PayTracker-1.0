import { TMode } from "components/CustomDateTimePicker";
import { Timestamp } from "firebase/firestore";
import moment from "moment-timezone";

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
  date: Timestamp | Date | string,
  mode?: TMode | 'day' | 'month',
): string => {

  let inputDate;

  if (date instanceof Timestamp) {
    inputDate = moment(date.toDate());
  } else if (date instanceof Date) {
    inputDate = moment(date);
  } else {
    inputDate = moment(date);
  }

  if (!inputDate.isValid()) {
    return 'Invalid Date';
  }


  if (mode === "date") {
    return inputDate.format("DD-MM-YYYY");
  } else if (mode === "datetime") {
    return inputDate.format("DD-MM-YYYY hh:mm A");
  } else if (mode === "time") {
    return inputDate.format("A hh:mm");
  } else if (mode === "month") {
    return inputDate.format('MM-YYYY')
  }
  else if (mode === "day") {
    return inputDate.format('d')
  }


  return inputDate.format("YYYY-MM-DD · hh:mm A");
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

export type TRangeUnit = 'days' | 'weeks' | 'months'

export const getDateRangeFromToday = (amount: number, unit: TRangeUnit) => {

  const endDate = moment().endOf('day').toDate()
  const startDate = moment().subtract(amount, unit).startOf('day').toDate()

  return {
    startDate,
    endDate
  }
}

export type TDateRangePresets = "oneWeek" | "thirtyDays" | "threeMonths" | "custom" | null

export const deriveSelectedDatePreset = (
  startDate: Date,
  endDate: Date
): TDateRangePresets => {
  const presets = {
    "oneWeek": getDateRangeFromToday(1, "weeks"),
    "thirtyDays": getDateRangeFromToday(30, "days"),
    "threeMonths": getDateRangeFromToday(3, "months"),
  } as const;

  for (const [key, range] of Object.entries(presets)) {
    const isMatch =
      range.startDate.getTime() === startDate.getTime() &&
      range.endDate.getTime() === endDate.getTime();

    if (isMatch) return key as "oneWeek" | "thirtyDays" | "threeMonths";
  }

  return "custom";
};