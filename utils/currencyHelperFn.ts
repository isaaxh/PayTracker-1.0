import { TTransaction } from "@/constants/TransactionsTypes";
import { formatDate, getDayName } from "./dateHelperFn";

type currencyConverterProps = {
  currency: string;
  rate: number;
  amount: number;
};

export const convertCurrency = (props: currencyConverterProps) => {
  const { currency, rate, amount } = props;

  const formattedAmount = (currency === "USD" ? amount / rate : amount).toFixed(
    2,
  );

  return formattedAmount;
};


export type TDailyTotals = {
  dayOfWeek: string;
  totalAmount: number;
};

export const calculateDailyTotals = (
  transactions: TTransaction[]
): TDailyTotals[] => {
  const weekdays = [0, 1, 2, 3, 4, 5, 6];

  const dailySums: { [key: string]: number } = {};
  transactions.forEach((transaction) => {
    const dayOfWeek = formatDate(transaction.date, "day");
    const amount = transaction.amount;

    dailySums[dayOfWeek] = (dailySums[dayOfWeek] || 0) + amount;
  });

  const dailyTotalsArray: TDailyTotals[] = weekdays.map((dayOfWeek) => ({
    dayOfWeek: getDayName(Number(dayOfWeek)),
    totalAmount: dailySums[dayOfWeek] || 0,
  }));

  return dailyTotalsArray;
};