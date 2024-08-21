import { View } from "react-native";
import React from "react";
import NavButton from "./NavButton";

const AddTransactionHeader = () => {
  return (
    <View className="flex-row w-full py-6 px-6">
      <NavButton variant="cancel" customStyles="ml-auto" />
    </View>
  );
};

export default AddTransactionHeader;
