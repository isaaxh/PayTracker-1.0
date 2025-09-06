import { View, Text } from "react-native";
import React from "react";
import UIText from "./ui/UIText";

const SummaryCard = () => {
  return (
    <View className='items-center flex-1 px-2 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
      <UIText
        variant={"labelLg"}
        textStyles='text-tintLight dark:text-tintDark'
      >
        Average
      </UIText>
      <UIText variant={"headingMd"} textStyles='mt-1'>
        hello world
        {/* {Math.round(
              monthlyData.reduce((sum, item) => sum + item.value, 0) /
                monthlyData.length
            )} */}
      </UIText>
    </View>
  );
};

export default SummaryCard;
