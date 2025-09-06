import Colors from "@/constants/Colors";
import { generateMonthlyData } from "@/constants/DummyData";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
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
import { BarData, processWeeklyData } from "@/utils/dataProcessHelpers";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { SymbolView } from "expo-symbols";

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
  const [currentEndDate, setCurrentEndDate] = useState<Date>(currentDate);
  const [chartKey, setChartKey] = useState(0);
  const [transactionType, setTransactionType] = useState<"income" | "expense">(
    "expense"
  );

  const { userData, getAllDocuments } = useGlobal() as GlobalContextProps;

  useEffect(() => {
    const fetchData = async () => {
      if (chartPeriod === Period.week) {
        const { startDate, endDate } = getWeekRange(currentDate);
        setCurrentEndDate(new Date(startDate));
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

      return processWeeklyData({
        data: calculateDailyTotals(weeklyData),
        transactionType,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handlePreviousWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
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
      {/* <View
        className='flex-row gap-12 px-12 py-6'
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 12,
          marginVertical: 32,
          paddingHorizontal: 16,
        }}
      >
        <View className='items-center flex-1 px-2 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
          <UIText
            variant={"labelLg"}
            textStyles='text-tintLight dark:text-tintDark'
          >
            Average
          </UIText>
          <UIText variant={"headingMd"} textStyles='mt-1'>
            {Math.round(
              monthlyData.reduce((sum, item) => sum + item.value, 0) /
                monthlyData.length
            )}
          </UIText>
        </View>

        <View className='items-center flex-1 px-2 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
          <UIText
            variant={"labelLg"}
            textStyles='text-tintLight dark:text-tintInactiveDark'
          >
            Total
          </UIText>
          <UIText variant={"headingMd"} textStyles='mt-1'>
            {monthlyData.reduce((sum, item) => sum + item.value, 0)}
          </UIText>
        </View>

        <View className='items-center flex-1 px-2 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
          <UIText
            variant={"labelLg"}
            textStyles='text-tintLight dark:text-tintInactiveDark'
          >
            Peak
          </UIText>
          <UIText variant={"headingMd"} textStyles='mt-1'>
            {Math.max(...monthlyData.map((item) => item.value))}
          </UIText>
        </View>
      </View> */}

      {/* Month Navigation */}
      <View className='px-2 py-4 mx-5 mt-6 bg-bgSecondaryColor dark:bg-darkBgSecondaryColor rounded-xl'>
        {/* <View className='flex-row items-center justify-between px-1 mt-1 mb-4'>
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
        </View> */}
        <View className='mb-4 ml-4'>
          <UIText variant={"bodyMd"} textStyles='font-bold'>
            {currentEndDate.toLocaleDateString("en-US", { month: "short" })}{" "}
            {currentEndDate.getDate()} -{" "}
            {currentDate.toLocaleDateString("en-US", { month: "short" })}{" "}
            {currentDate.getDate()}
          </UIText>
          <UIText
            variant={"labelLg"}
            textStyles='text-tintLight dark:text-tintInactiveDark'
          >
            Total {transactionType === "expense" ? "Expense" : "Income"}
          </UIText>
          <UIText variant={"headingXL"}>
            SAR{" "}
            {chartData
              .reduce((total, item) => total + item.value, 0)
              .toFixed(2)}
          </UIText>
        </View>
        {/* Chart Container */}
        <View className='justify-between px-3 pb-3'>
          <BarChart
            key={chartKey}
            data={chartData}
            height={200}
            width={300}
            minHeight={3}
            barBorderRadius={8}
            barWidth={22}
            showGradient
            dashGap={10}
            rulesColor={"gray"}
            noOfSections={3}
            showXAxisIndices={false}
            xAxisThickness={0}
            xAxisLabelTextStyle={{
              color:
                colorScheme === "dark"
                  ? Colors.dark.tintInActive
                  : Colors.light.tint,
              fontSize: 12,
              fontWeight: "500",
            }}
            yAxisThickness={0}
            yAxisTextStyle={{
              color:
                colorScheme === "dark"
                  ? Colors.dark.tintInActive
                  : Colors.light.tint,
              fontSize: 12,
              fontWeight: "500",
            }}
            isAnimated
            animationDuration={300}
            onPress={(_item: BarData, index: number) => {
              setSelectedBarIndex(selectedBarIndex === index ? null : index);
            }}
            autoCenterTooltip
            renderTooltip={(item: BarData, index: number) => {
              return (
                <View
                  key={index}
                  className='items-center px-1 py-1 mb-1 rounded-md dark:bg-tintInactiveDark'
                  // style={{
                  //   marginBottom: 20,
                  //   marginLeft: -6,
                  //   backgroundColor: "#ffcefe",
                  //   paddingHorizontal: 6,
                  //   paddingVertical: 4,
                  //   borderRadius: 4,
                  // }}
                >
                  <UIText variant={"caption"}>{item.value}</UIText>
                </View>
              );
            }}
          />
          <View className='flex-row items-center justify-between pt-6'>
            <TouchableOpacity
              onPress={handlePreviousWeek}
              className='items-center'
            >
              <SymbolView
                name='chevron.left.circle.fill'
                size={40}
                type='hierarchical'
                tintColor={
                  colorScheme === "dark"
                    ? Colors.dark.tintInActive
                    : Colors.light.tint
                }
              />
              {/* <UIText
                variant={"caption"}
                textStyles='mt-1 text-tintLight dark:tintInactiveDark'
              >
                Prev week
              </UIText> */}
            </TouchableOpacity>
            <SegmentedControl
              values={["Income", "Expense"]}
              selectedIndex={transactionType === "income" ? 0 : 1}
              onChange={(event) => {
                const index = event.nativeEvent.selectedSegmentIndex;
                setTransactionType(index === 0 ? "income" : "expense");
              }}
              appearance={colorScheme}
              fontStyle={{
                color:
                  colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
              }}
              activeFontStyle={{
                fontWeight: "400",
                fontSize: 14,
              }}
              style={{
                height: 36,
                width: 180,
              }}
            />
            <TouchableOpacity onPress={handleNextWeek} className='items-center'>
              <SymbolView
                name='chevron.right.circle.fill'
                size={40}
                type='hierarchical'
                tintColor={
                  colorScheme === "dark"
                    ? Colors.dark.tintInActive
                    : Colors.light.tint
                }
              />
              {/* <UIText
                variant={"caption"}
                textStyles='mt-1 text-tintLight dark:tintInactiveDark'
              >
                Next week
              </UIText> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Chart;
