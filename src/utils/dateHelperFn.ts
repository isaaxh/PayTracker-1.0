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
  const inputDate = moment(date).startOf("day");

  if (inputDate.isSame(today, "day")) {
    return "Today";
  } else if (inputDate.isSame(yesterday, "day")) {
    return "Yesterday";
  } else {
    return inputDate.format("YYYY-MM-DD");
  }
};
