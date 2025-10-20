import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import RenderIcon from "./RenderIcon";
import UIButton from "./ui/UIButton";

const TransactionsFilterSheet = () => {
  return (
    <ScrollView className='flex-1 px-4'>
      {/* header */}
      <View className='mb-6'>
        <UIText variant={"headingLg"}>Filter & Sort</UIText>
      </View>
      {/* sort sections */}
      <View className='mb-6'>
        <UIText variant={"labelLg"} textStyles='mb-3'>
          Sort By
        </UIText>
        <View className='flex-row flex-wrap gap-2'>
          <TouchableOpacity className='px-4 py-2 rounded-lg bg-accent'>
            <UIText variant='bodyMd' alwaysLightText>
              Date (Newest)
            </UIText>
          </TouchableOpacity>
          <TouchableOpacity className='px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <UIText variant='bodyMd'>Amount (Highest)</UIText>
          </TouchableOpacity>
          <TouchableOpacity className='px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
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
      {/* category sections */}
      <View className='mb-6'>
        <UIText variant='labelLg' textStyles='mb-3'>
          Category
        </UIText>
        <View className='flex-row flex-wrap gap-2'>
          <TouchableOpacity className='flex-row items-center gap-2 px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <RenderIcon
              iconLibrary='iconsax'
              iconProps={{ name: "gas station", size: 16 }}
            />
            <UIText variant='bodyMd'>Gas</UIText>
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center gap-2 px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <RenderIcon
              iconLibrary='iconsax'
              iconProps={{ name: "heart", size: 16 }}
            />
            <UIText variant='bodyMd'>Food</UIText>
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center gap-2 px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <RenderIcon
              iconLibrary='iconsax'
              iconProps={{ name: "mobile", size: 16 }}
            />
            <UIText variant='bodyMd'>Recharge</UIText>
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center gap-2 px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <RenderIcon
              iconLibrary='iconsax'
              iconProps={{ name: "ticket", size: 16 }}
            />
            <UIText variant='bodyMd'>Entertainment</UIText>
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center gap-2 px-4 py-2 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <RenderIcon
              iconLibrary='iconsax'
              iconProps={{ name: "element3", size: 16 }}
            />
            <UIText variant='bodyMd'>Misc</UIText>
          </TouchableOpacity>
        </View>
      </View>
      {/* action buttons */}
      <View className='gap-3 mb-6'>
        <UIButton
          variant='fill'
          size='default'
          primary
          buttonStyles='flex-1'
          // containerStyles='m-0 p-0 flex-1 bg-blue-200'
        >
          <UIText alwaysDarkText>Apply Filters</UIText>
        </UIButton>
        <UIButton variant='outline' size='default' buttonStyles='flex-1'>
          <UIText>Reset</UIText>
        </UIButton>
      </View>
    </ScrollView>
  );
};

export default TransactionsFilterSheet;
