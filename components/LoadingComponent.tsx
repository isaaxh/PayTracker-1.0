import { View, ActivityIndicator, ColorValue } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";

type LoadingComponentProps = {
  size?: number | "large" | "small" | undefined;
  color?: ColorValue;
};

const LoadingComponent = ({ size, color }: LoadingComponentProps) => {
  const { colorScheme } = useColorScheme();
  const resolvedColor =
    color ??
    (colorScheme === "light"
      ? Colors.dark.background
      : Colors.light.background);

  return (
    <View className=''>
      <ActivityIndicator size={size} color={resolvedColor} />
    </View>
  );
};

export default LoadingComponent;
