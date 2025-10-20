import React from "react";
import { View, TouchableOpacity } from "react-native";

import { cn } from "@/utils/cn";
import { TIconsaxName } from "@/constants/icons";
import { TFilterQuery } from "@/services/api/firestoreApi";

import RenderIcon from "./RenderIcon";
import UIText from "./ui/UIText";

type FilterSheetFilterSectionProps = {
  filterBy?: TFilterQuery;
  onChangeFilterQuery: (filterQuery: TFilterQuery) => void;
};

const FilterSheetFilterSection = ({
  filterBy = { field: "all", value: "all" },
  onChangeFilterQuery,
}: FilterSheetFilterSectionProps) => {
  return (
    <View className='mb-6'>
      <View className='mb-6'>
        <UIText variant={"labelLg"} textStyles='mb-3'>
          Filter By Type
        </UIText>
        <View className='flex-row flex-wrap'>
          <FilterItem
            filterQuery={{ field: "all", value: "all" }}
            filterBy={filterBy}
            onChangeFilterQuery={onChangeFilterQuery}
            filterItemKind='type'
          />
          <FilterItem
            filterQuery={{ field: "type", value: "income" }}
            filterBy={filterBy}
            onChangeFilterQuery={onChangeFilterQuery}
            filterItemKind='type'
          />
          <FilterItem
            filterQuery={{ field: "type", value: "expense" }}
            filterBy={filterBy}
            onChangeFilterQuery={onChangeFilterQuery}
            filterItemKind='type'
          />
        </View>
      </View>

      <View>
        <UIText variant='labelLg' textStyles='mb-3'>
          Filter By Category
        </UIText>
        <View className='flex-row flex-wrap'>
          <FilterItem
            filterQuery={{ field: "category", value: "gas" }}
            filterBy={filterBy}
            onChangeFilterQuery={onChangeFilterQuery}
            showIcon
            filterItemKind='category'
          />
          <FilterItem
            filterQuery={{ field: "category", value: "food" }}
            filterBy={filterBy}
            onChangeFilterQuery={onChangeFilterQuery}
            showIcon
            filterItemKind='category'
          />
          <FilterItem
            filterQuery={{ field: "category", value: "recharge" }}
            filterBy={filterBy}
            onChangeFilterQuery={onChangeFilterQuery}
            showIcon
            filterItemKind='category'
          />
          <FilterItem
            filterQuery={{ field: "category", value: "entertainment" }}
            filterBy={filterBy}
            onChangeFilterQuery={onChangeFilterQuery}
            showIcon
            filterItemKind='category'
          />
          <FilterItem
            filterQuery={{ field: "category", value: "miscellaneous" }}
            filterBy={filterBy}
            onChangeFilterQuery={onChangeFilterQuery}
            showIcon
            filterItemKind='category'
          />
        </View>
      </View>
    </View>
  );
};

export default FilterSheetFilterSection;

// helper component

const categoryIcons: Record<string, TIconsaxName> = {
  all: "EmojiHappy",
  income: "EmojiHappy",
  expense: "EmojiHappy",
  gas: "gas station",
  food: "heart",
  recharge: "mobile",
  entertainment: "ticket",
  miscellaneous: "element3",
};

type FilterItemProps = {
  filterQuery: TFilterQuery;
  showIcon?: boolean;
  filterItemKind: "category" | "type";
} & FilterSheetFilterSectionProps;

const FilterItem = ({
  filterQuery,
  filterBy = { field: "all", value: "all" },
  onChangeFilterQuery,
  showIcon,
  filterItemKind,
}: FilterItemProps) => {
  const categoryFilterStyle = "flex-row items-center px-4 py-2 rounded-lg";
  const typeFilterStyle = "px-4 py-2 rounded-lg";
  return (
    <TouchableOpacity
      onPress={() =>
        onChangeFilterQuery({
          field: filterQuery.field,
          value: filterQuery.value,
        } as TFilterQuery)
      }
      className={cn([
        filterItemKind === "category" && categoryFilterStyle,
        filterItemKind === "type" && typeFilterStyle,
        filterBy.value === filterQuery.value && "bg-accent",
      ])}
    >
      {showIcon && (
        <View className='mr-2'>
          <RenderIcon
            iconLibrary='iconsax'
            iconProps={{ name: categoryIcons[filterQuery.value], size: 16 }}
          />
        </View>
      )}
      <UIText variant='bodyMd'>
        {filterQuery.value.charAt(0).toUpperCase() + filterQuery.value.slice(1)}
      </UIText>
    </TouchableOpacity>
  );
};
