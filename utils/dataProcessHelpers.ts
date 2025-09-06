// Chart helper functions

import { TDailyTotals } from "./currencyHelperFn";

type TProcessWeeklyDataProps = {
    data: TDailyTotals[],
    transactionType: 'income' | 'expense'
}

export type BarData = {
    value: number;
    label?: string;
    frontColor?: string;
    [key: string]: any;
};

export const processWeeklyData = ({ data, transactionType = 'income' }: TProcessWeeklyDataProps) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const isIncome = transactionType === 'income'

    let barData: BarData[] = days.map((label) => ({
        label,
        value: 0,
        frontColor: '#d1d5db',
        gradientColor: '#d1d5db'
    }))

    data.forEach((item) => {
        const dayIndex = item.dayOfWeek
        if (dayIndex >= 0 && dayIndex < 7) {
            barData[dayIndex].value = item.totalAmount

            if (item.totalAmount <= 10) {
                barData[dayIndex].frontColor = '#d1d5db'
                barData[dayIndex].gradient = '#d1d5db'
            } else {
                barData[dayIndex].frontColor = isIncome ? '#d3ff00' : '#ffab00'
                barData[dayIndex].gradientColor = isIncome ? '#12ff00' : '#ff0000'
            }
        }
    })

    return barData
}

// export const formatToBarData = (data: TDailyTotals[]): BarData[] => {
//     const barData: BarData[] = data.map((daily) => {
//         return {
//             label: daily.dayOfWeek,
//             value: daily.totalAmount,
//         };
//     });

//     return barData;
// };
