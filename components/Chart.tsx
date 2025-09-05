import Colors from "@/constants/Colors";
import { generateMonthlyData } from "@/constants/DummyData";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import RenderIcon from "./RenderIcon";
import UIText from "./ui/UIText";
import { useGlobal } from "@/hooks/useGlobal";
import {
  GlobalContextProps,
  TFilterQuery,
  TGetAllDocument,
  TRangeFilterQuery,
} from "@/services/providers/GlobalProvider";
import { transactionSchema } from "@/constants/TransactionsTypes";
import { getMonthName, getWeekRange } from "@/utils/dateHelperFn";
import { calculateDailyTotals } from "@/utils/currencyHelperFn";
import { formatToBarData } from "@/utils/dataProcessHelpers";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

export type BarData = {
  value: number;
  label?: string;
  frontColor?: string;
  [key: string]: any;
};

enum Period {
  week = "week",
  month = "month",
  year = "year",
}

const Chart = () => {
  const { colorScheme } = useColorScheme();
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState<BarData[]>([{ value: 0 }]);
  const [chartPeriod, setChartPeriod] = useState<Period>(Period.week);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentEndDate, setCurrentEndDate] = useState<Date>(new Date());
  const [chartKey, setChartKey] = useState(0);
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense"
  );

  const { userData, getAllDocuments } = useGlobal() as GlobalContextProps;

  useEffect(() => {
    const fetchData = async () => {
      if (chartPeriod === Period.week) {
        const { startDate, endDate } = getWeekRange(new Date());

        const data = await fetchWeeklyData(
          new Date(startDate),
          new Date(endDate),
          transactionType
        );

        if (!data) {
          console.log("no weekly data available");
          return;
        }

        setChartData(data);
        setChartKey((prev) => prev + 1);
      }
    };

    fetchData();
  }, [currentDate, transactionType]);

  // fetching data
  const fetchWeeklyData = async (
    startDate: Date,
    endDate: Date,
    transactionType: "income" | "expense"
  ) => {
    try {
      const rangeFilterQuery: TRangeFilterQuery = {
        field: "date",
        start: startDate,
        end: endDate,
        order: "desc",
      };

      const filterQuery: TFilterQuery = {
        field: "type",
        value: transactionType,
        dateOrder: "desc",
      };

      const params: TGetAllDocument = {
        collectionName: `users/${userData?.uid}/transactions`,
        dateOrder: "asc",
        rangeFilterQuery,
        filterQuery,
      };

      const weeklyData = await getAllDocuments(params, transactionSchema);

      return formatToBarData(calculateDailyTotals(weeklyData));
    } catch (e) {
      console.log(e);
    }
  };

  // not my code
  const navigateMonth = (direction: number) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedBarIndex(null);
  };

  const monthlyData = useMemo(
    () => generateMonthlyData(currentYear, currentMonth + 1),
    [currentYear, currentMonth]
  );

  const getChartData = useCallback(() => {
    return monthlyData.map((item, index) => ({
      ...item,
      frontColor: "blue",
      gradientColor: selectedBarIndex === index ? "orange" : "gray",
      topLabelComponent: () =>
        selectedBarIndex === index ? (
          <Text
            style={{
              color: "gray",
              fontSize: 10,
              fontWeight: "600",
              marginBottom: 4,
            }}
          >
            {item.value}
          </Text>
        ) : null,
    }));
  }, [monthlyData, selectedBarIndex]);
  return (
    <ScrollView
      contentInsetAdjustmentBehavior='automatic'
      showsVerticalScrollIndicator={false}
    >
      <View
        className='flex-row gap-12 px-12 py-6'
        // style={{
        //   flexDirection: "row",
        //   justifyContent: "space-between",
        //   gap: 12,
        //   marginVertical: 32,
        //   paddingHorizontal: 16,
        // }}
      >
        <View className='items-center flex-1 px-2 py-2 rounded-lg bg-bgSecondaryColor'>
          <UIText
            variant={"labelLg"}
            textStyles='text-tintInactiveLight dark:text-tintInactiveDark'
          >
            Average
          </UIText>
          <UIText
            variant={"headingMd"}
            textStyles='mt-1'
            // style={{
            //   fontSize: 24,
            //   fontWeight: "700",
            //   color: "gray",
            //   marginTop: 4,
            // }}
          >
            {Math.round(
              monthlyData.reduce((sum, item) => sum + item.value, 0) /
                monthlyData.length
            )}
          </UIText>
        </View>

        <View className='items-center flex-1 px-2 py-2 rounded-lg bg-bgSecondaryColor'>
          <UIText
            variant={"labelLg"}
            textStyles='text-tintInactiveLight dark:text-tintInactiveDark'
          >
            Total
          </UIText>
          <UIText variant={"headingMd"} textStyles='mt-1'>
            {monthlyData.reduce((sum, item) => sum + item.value, 0)}
          </UIText>
        </View>

        <View className='items-center flex-1 px-2 py-2 rounded-lg bg-bgSecondaryColor'>
          <UIText
            variant={"labelLg"}
            textStyles='text-tintInactiveLight dark:text-tintInactiveDark'
          >
            Peak
          </UIText>
          <UIText variant={"headingMd"} textStyles='mt-1'>
            {Math.max(...monthlyData.map((item) => item.value))}
          </UIText>
        </View>
      </View>

      {/* Month Navigation */}
      <View className='px-2 py-3 mx-5 bg-bgSecondaryColor dark:bg-darkBgSecondaryColor rounded-xl'>
        <View className='flex-row items-center justify-between px-1 mt-1 mb-4'>
          <Pressable
            onPress={() => navigateMonth(-1)}
            style={{
              padding: 8,
              borderRadius: 8,
            }}
            hitSlop={20}
          >
            <RenderIcon
              iconLibrary='iconsax'
              iconProps={{
                name: "chevronLeft",
                variant: "Linear",
                color:
                  colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
              }}
            />
          </Pressable>

          <UIText
            variant={"headingSm"}
            textStyles='text-tintLight dark:text-tintDark'
          >
            {getMonthName(currentMonth)} {currentYear}
          </UIText>

          <Pressable
            onPress={() => navigateMonth(1)}
            style={{
              padding: 8,
              borderRadius: 8,
            }}
            hitSlop={20}
          >
            <RenderIcon
              iconLibrary='iconsax'
              iconProps={{
                name: "chevronRight",
                variant: "Linear",
                color:
                  colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
              }}
            />
          </Pressable>
        </View>

        {/* Chart Container */}
        <View className='justify-between px-3 pb-3'>
          <BarChart
            // data={getChartData()}
            data={chartData}
            height={200}
            width={300}
            minHeight={3}
            barBorderRadius={4}
            showGradient
            gradientColor={"red"}
            frontColor={"white"}
            dashGap={10}
            noOfSections={3}
            showXAxisIndices={false}
            xAxisThickness={0}
            xAxisLabelTextStyle={{
              color:
                colorScheme === "dark"
                  ? Colors.dark.tintInActive
                  : Colors.light.tintInActive,
              fontSize: 12,
              fontWeight: "500",
            }}
            yAxisThickness={0}
            yAxisTextStyle={{
              color:
                colorScheme === "dark"
                  ? Colors.dark.tintInActive
                  : Colors.light.tintInActive,
              fontSize: 12,
              fontWeight: "500",
            }}
            // renderTooltip={() => (
            //   <View style={{ backgroundColor: "white" }}>
            //     <Text>Tooltip</Text>
            //   </View>
            // )}
            isAnimated
            animationDuration={300}
            onPress={(_item: BarData, index: number) => {
              setSelectedBarIndex(selectedBarIndex === index ? null : index);
            }}
          />
          <View className='pt-6'>
            <SegmentedControl
              values={["Income", "Expense"]}
              selectedIndex={transactionType === "income" ? 0 : 1}
              onChange={(event) => {
                const index = event.nativeEvent.selectedSegmentIndex;
                setTransactionType(index === 0 ? "income" : "expense");
              }}
              // tintColor={
              //   colorScheme === "dark"
              //     ? Colors.dark.tintInActive
              //     : Colors.light.tintInActive
              // }
              // backgroundColor={
              //   colorScheme === "dark"
              //     ? Colors.dark.background
              //     : Colors.light.background
              // }
              appearance={colorScheme}
              fontStyle={{
                color:
                  colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
              }}
              activeFontStyle={{
                fontWeight: "400",
                fontSize: 14,
              }}
              // tabStyle={{
              //   borderColor: "blue",
              //   borderWidth: 10,
              //   // backgroundColor: "green",
              // }}
              // sliderStyle={{
              //   borderColor: "green",
              //   borderWidth: 10,
              //   // backgroundColor: "green",
              // }}
              style={{
                height: 40,
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Chart;
