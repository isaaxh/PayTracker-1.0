import { TouchableOpacity, View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import LinearGradView from "./LinearGradView";
import SummaryComponent from "./SummaryComponent";
import { Link } from "expo-router";
import { useFetchUserData } from "@/hooks/useFetchUserData";

const totalMonthly = 4800;

const TotalPayCard = () => {
  const userData = useFetchUserData();
  console.log(userData);
  return (
    <LinearGradView>
      <Link href="/(protected)/(tabs)/StatsTab" asChild>
        <TouchableOpacity className="py-7 px-2 items-center gap-y-2">
          <View>
            <UIText alwaysDarkText={true}>Monthly Payout</UIText>
          </View>
          <View className="flex-row items-center mb-4">
            <UIText variant="headerLg" alwaysDarkText={true}>
              SAR {userData?.grandTotal.toFixed(2)}
            </UIText>
          </View>
          <View className="flex-row w-full px-4 justify-between">
            <SummaryComponent label="Income" amount={558.0} />
            <SummaryComponent label="Expenses" amount={356.0} />
          </View>
        </TouchableOpacity>
      </Link>
    </LinearGradView>
  );
};

export default TotalPayCard;
