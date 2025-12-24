import React from "react";
import { View, TouchableOpacity } from "react-native";

import { TDocOrderBy } from "@/services/api/firestoreApi";
import { cn } from "@/utils/cn";

import UIText from "./ui/UIText";

type FilterSheetSortSectionProps = {
  docOrderBy?: TDocOrderBy;
  onChangeOrderBy: (docOrderBy: TDocOrderBy) => void;
};

const FilterSheetSortSection = ({
  docOrderBy,
  onChangeOrderBy,
}: FilterSheetSortSectionProps) => {
  return (
    <View className='mb-6'>
      <UIText variant={"labelLg"} textStyles='mb-3'>
        Sort By
      </UIText>
      <View className='flex-row flex-wrap gap-2'>
        <TouchableOpacity
          onPress={() => onChangeOrderBy({ field: "date", value: "desc" })}
          className={cn([
            "px-4 py-2 rounded-lg",
            docOrderBy && docOrderBy.field === "date" && "bg-primary",
          ])}
        >
          <UIText variant='bodyMd'>Date (Newest)</UIText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChangeOrderBy({ field: "amount", value: "desc" })}
          className={cn([
            "px-4 py-2 rounded-lg",
            docOrderBy && docOrderBy.field === "amount" && "bg-primary",
          ])}
        >
          <UIText variant='bodyMd'>Amount (Highest)</UIText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterSheetSortSection;
