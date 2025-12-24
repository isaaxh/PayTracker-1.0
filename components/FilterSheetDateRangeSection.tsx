import { View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Timestamp } from "firebase/firestore";

import {
  deriveSelectedDatePreset,
  getDateRangeFromToday,
  TDateRangePresets,
  TRangeUnit,
} from "@/utils/dateHelperFn";
import { cn } from "@/utils/cn";
import { TRangeDateQuery } from "@/services/api/firestoreApi";

import { UIPickerButton } from "./ui/UIPickerButton";
import UIText from "./ui/UIText";

type FilterSheetDateRangeSectionProps = {
  selectedDateRange?: TRangeDateQuery | null;
  onSelectDateRange: (selectedDate: TRangeDateQuery | null) => void;
};

const FilterSheetDateRangeSection = ({
  selectedDateRange,
  onSelectDateRange,
}: FilterSheetDateRangeSectionProps) => {
  const [showDateRangePicker, setShowDateRangePicker] = useState(false);

  return (
    <>
      <View className='mb-6'>
        <UIText variant='labelLg' textStyles='mb-3'>
          Date Range
        </UIText>
        <View className='flex-row flex-wrap'>
          <DateRangeItem
            presetTitle='1 week'
            preset={"oneWeek"}
            selectedDateRange={selectedDateRange}
            onSelectDateRange={onSelectDateRange}
            dateRangeAmount={1}
            dateRangeUnit='weeks'
          />
          <DateRangeItem
            presetTitle='30 days'
            preset={"thirtyDays"}
            selectedDateRange={selectedDateRange}
            onSelectDateRange={onSelectDateRange}
            dateRangeAmount={30}
            dateRangeUnit='days'
          />
          <DateRangeItem
            presetTitle='3 months'
            preset={"threeMonths"}
            selectedDateRange={selectedDateRange}
            onSelectDateRange={onSelectDateRange}
            dateRangeAmount={3}
            dateRangeUnit='months'
          />

          <TouchableOpacity
            onPress={() => {
              onSelectDateRange(null);
              setShowDateRangePicker((prev) => !prev);
            }}
            className={cn([
              "px-4 py-2 rounded-lg",
              selectedDateRange &&
                deriveSelectedDatePreset(
                  selectedDateRange.start.toDate(),
                  selectedDateRange.end.toDate()
                ) === "custom" &&
                "bg-primary",
            ])}
          >
            <UIText variant='bodyMd'>Custom</UIText>
          </TouchableOpacity>
          {showDateRangePicker && (
            <View className='flex-row w-full gap-2 mt-1'>
              <View className='flex-1'>
                <UIPickerButton placeholder='From date' onPress={() => {}} />
              </View>

              <View className='flex-1'>
                <UIPickerButton placeholder='To date' onPress={() => {}} />
              </View>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default FilterSheetDateRangeSection;

type DateRangeItemProps = {
  selectedDateRange?: TRangeDateQuery | null;
  onSelectDateRange: (selectedDate: TRangeDateQuery | null) => void;
  dateRangeAmount: number;
  dateRangeUnit: TRangeUnit;
  preset: TDateRangePresets;
  presetTitle: string;
};

const DateRangeItem = ({
  presetTitle,
  preset,
  selectedDateRange,
  onSelectDateRange,
  dateRangeAmount,
  dateRangeUnit,
}: DateRangeItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        const range = getDateRangeFromToday(dateRangeAmount, dateRangeUnit);
        onSelectDateRange({
          start: Timestamp.fromDate(range.startDate),
          end: Timestamp.fromDate(range.endDate),
        });
      }}
      className={cn([
        "px-4 py-2 rounded-lg",
        selectedDateRange &&
          deriveSelectedDatePreset(
            selectedDateRange.start.toDate(),
            selectedDateRange.end.toDate()
          ) === preset &&
          "bg-primary",
      ])}
    >
      <UIText variant='bodyMd'>{presetTitle}</UIText>
    </TouchableOpacity>
  );
};
