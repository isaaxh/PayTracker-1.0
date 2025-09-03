import { View } from "react-native";
import React from "react";
import { TCategory } from "@/constants/CategoriesTypes";
import RenderIcon from "./RenderIcon";

type TransactionIconProps = {
  category: TCategory | undefined;
};

const TransactionIcon = ({ category }: TransactionIconProps) => {
  return (
    <View
      className='bg-yellow-400 h-12 w-12 mr-4 items-center justify-center rounded-full'
      style={{ backgroundColor: category?.color ?? "#000000" }}
    >
      <RenderIcon
        iconLibrary='iconsax'
        iconProps={{
          name: category?.iconName ?? "money",
          color: "#fefefe",
        }}
        name={category?.iconName ?? ""}
        color='#fefefe'
      />
    </View>
  );
};

export default TransactionIcon;
