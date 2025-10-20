import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";

import { TDocOrderBy, TFilterQuery } from "@/services/api/firestoreApi";

import UIText from "./ui/UIText";
import UIButton from "./ui/UIButton";
import FilterSheetFilterSection from "./FilterSheetFilterSection";
import FilterSheetSortSection from "./FilterSheetSortSection";

type TransactionFilterProps = {
  filterBy?: TFilterQuery;
  onChangeFilterQuery: (filterQuery: TFilterQuery) => void;
  docOrderBy?: TDocOrderBy;
  onChangeOrderBy: (docOrderBy: TDocOrderBy) => void;
  dateRange?: "";
  amountRange?: "";
  category?: "";
  handleCloseSheet: () => void;
};

const TransactionsFilterSheet = ({
  filterBy,
  onChangeFilterQuery,
  docOrderBy,
  onChangeOrderBy,
  handleCloseSheet,
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
      <FilterSheetSortSection
        docOrderBy={docOrderBy}
        onChangeOrderBy={onChangeOrderBy}
      />
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
            onChangeOrderBy({ field: "date", value: "desc" });
            handleCloseSheet();
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
