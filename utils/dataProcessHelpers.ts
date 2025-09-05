// Chart helper functions

import { BarData } from "@/components/Chart";
import { TDailyTotals } from "./currencyHelperFn";


const processWeeklyData = () => {

}

export const formatToBarData = (data: TDailyTotals[]): BarData[] => {
    const barData: BarData[] = data.map((daily) => {
        return {
            label: daily.dayOfWeek,
            value: daily.totalAmount,
        };
    });

    return barData;
};
