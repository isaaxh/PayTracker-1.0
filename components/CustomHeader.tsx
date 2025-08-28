import { View } from "react-native";
import React from "react";
import NavButton from "./NavButton";
import UIText from "./ui/UIText";
import { i18n } from "@/services/i18n/i18n";

const CustomHeader = ({ title }: { title: string }) => {
  return (
    <View className='flex-row items-center justify-between w-full px-6 py-4'>
      <NavButton variant='back' />
      {title !== "profile" && (
        <View className='flex-1 px-6'>
          <UIText variant='headingMd' textStyles='my-0'>
            {i18n.t(title)}
          </UIText>
        </View>
      )}
    </View>
  );
};

export default CustomHeader;
