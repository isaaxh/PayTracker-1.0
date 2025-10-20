import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";

import { cn } from "@/utils/cn";
import { TFilterQuery } from "@/services/api/firestoreApi";

import UIText from "./ui/UIText";
import UIButton from "./ui/UIButton";
import FilterSheetFilterSection from "./FilterSheetFilterSection";

type TransactionFilterProps = {
  sortBy: "date" | "amount" | "category";
  filterBy?: TFilterQuery;
  onChangeFilterQuery: (filterQuery: TFilterQuery) => void;
  dateRange?: "";
  amountRange?: "";
  category?: "";
  onPressCloseSheet: () => void;
};

const TransactionsFilterSheet = ({
  sortBy = "date",
  filterBy,
  onChangeFilterQuery,
  onPressCloseSheet,
}: TransactionFilterProps) => {
  return (
    <ScrollView className='flex-1 px-4'>
      {/* header */}
      <View className='mb-6'>
        <UIText variant={"headingLg"}>Filter & Sort</UIText>
      </View>
      <FilterSheetFilterSection
        filterBy={filterBy}
        onChangeFilterQuery={onChangeFilterQuery}
      />
      {/* sort sections */}
      <View className='mb-6'>
        <UIText variant={"labelLg"} textStyles='mb-3'>
          Sort By
        </UIText>
        <View className='flex-row flex-wrap gap-2'>
          {/* <TouchableOpacity className='px-4 py-2 rounded-lg bg-accent'> */}
          <TouchableOpacity
            className={cn([
              "px-4 py-2 rounded-lg",
              sortBy === "date" && "bg-accent",
            ])}
          >
            <UIText variant='bodyMd' alwaysLightText>
              Date (Newest)
            </UIText>
          </TouchableOpacity>
          <TouchableOpacity
            className={cn([
              "px-4 py-2 rounded-lg",
              sortBy === "amount" && "bg-accent",
            ])}
          >
            <UIText variant='bodyMd'>Amount (Highest)</UIText>
          </TouchableOpacity>
          <TouchableOpacity
            className={cn([
              "px-4 py-2 rounded-lg",
              sortBy === "category" && "bg-accent",
            ])}
          >
            <UIText variant='bodyMd'>Category</UIText>
          </TouchableOpacity>
        </View>
      </View>
      {/* date range sections */}
      <View className='mb-6'>
        <UIText variant='labelLg' textStyles='mb-3'>
          Date Range
        </UIText>
        <View className='flex-row flex-wrap gap-2'>
          <TouchableOpacity className='px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <UIText variant='bodyMd'>Today</UIText>
          </TouchableOpacity>
          <TouchableOpacity className='px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <UIText variant='bodyMd'>This Week</UIText>
          </TouchableOpacity>
          <TouchableOpacity className='px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <UIText variant='bodyMd'>This Month</UIText>
          </TouchableOpacity>
          <TouchableOpacity className='px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <UIText variant='bodyMd'>Custom</UIText>
          </TouchableOpacity>
        </View>
      </View>
      {/* amount range sections */}
      <View className='mb-6'>
        <UIText variant='labelLg' textStyles='mb-3'>
          Amount Range
        </UIText>
        <View className='flex-row flex-wrap gap-2'>
          <TouchableOpacity className='px-4 py-2 rounded-lg bg-accent'>
            <UIText variant='bodyMd' alwaysLightText>
              All
            </UIText>
          </TouchableOpacity>
          <TouchableOpacity className='px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <UIText variant='bodyMd'>Under $50</UIText>
          </TouchableOpacity>
          <TouchableOpacity className='px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <UIText variant='bodyMd'>$50 - $200</UIText>
          </TouchableOpacity>
          <TouchableOpacity className='px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <UIText variant='bodyMd'>$200+</UIText>
          </TouchableOpacity>
        </View>
      </View>
      {/* action buttons */}
      <View className='gap-3 mb-6'>
        <UIButton
          onPress={() => {
            onChangeFilterQuery({ field: "all", value: "all" });
            onPressCloseSheet();
          }}
          variant='fill'
          size='default'
          buttonStyles='flex-1'
        >
          <UIText>Reset Filter</UIText>
        </UIButton>
      </View>
    </ScrollView>
  );
};

export default TransactionsFilterSheet;

{
  /* <UIButton
      variant='fill'
      size='default'
      primary
      buttonStyles='flex-1'
    // containerStyles='m-0 p-0 flex-1 bg-blue-200'
      >
       <UIText alwaysDarkText>Apply Filters</UIText>
    </UIButton> */
}
