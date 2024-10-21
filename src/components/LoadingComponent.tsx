import { View, Text } from "react-native";
import React from "react";
import UIText from "./ui/UIText";

const LoadingComponent = () => {
  return (
    <View>
      <UIText variant={"headerLg"}>Loading...</UIText>
    </View>
  );
};

export default LoadingComponent;
