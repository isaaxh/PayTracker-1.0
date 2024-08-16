import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

export default function ResturantScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View className="bg-background flex-1">
      <Text style={{ color: "#ffffff" }}>{id}</Text>
    </View>
  );
}
