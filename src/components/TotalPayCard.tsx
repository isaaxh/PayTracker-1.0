import { TouchableOpacity, View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import LinearGradView from "./LinearGradView";
import SummaryComponent from "./SummaryComponent";
import { Link } from "expo-router";
import { useFetchUserData } from "@/hooks/useFetchUserData";

const TotalPayCard = () => {
  const userData = useFetchUserData();
  console.log("total Pay: ", userData);
  return (
    <LinearGradView>
      <Link href="/(protected)/(tabs)/StatsTab" asChild>
        <TouchableOpacity className="py-7 px-2 items-center gap-y-2">
          <View>
            <UIText alwaysDarkText={true}>Monthly Payout</UIText>
          </View>
          <View className="flex-row items-center mb-4">
            <UIText variant="headerLg" alwaysDarkText={true}>
              SAR {userData?.monthlyTotal.total ?? 0.0}
            </UIText>
          </View>
          <View className="flex-row w-full px-4 justify-between">
            <SummaryComponent
              label="Income"
              amount={userData?.monthlyTotal.income ?? 0}
            />
            <SummaryComponent
              label="Expenses"
              amount={userData?.monthlyTotal.expenses ?? 0}
            />
          </View>
        </TouchableOpacity>
      </Link>
    </LinearGradView>
  );
};

export default TotalPayCard;
