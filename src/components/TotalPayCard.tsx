import { TouchableOpacity, View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import LinearGradView from "./LinearGradView";
import SummaryComponent from "./SummaryComponent";
import { Link } from "expo-router";
import { useGlobal } from "@/hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useCalculate } from "@/hooks/useCalculate";

const TotalPayCard = () => {
  const { userData } = useGlobal() as GlobalContextProps;

  const { grandTotal, income, expense } = useCalculate();
  console.log("grandTotal in paycard: ", grandTotal);
  console.log("income in paycard: ", income);
  console.log("expense in paycard: ", expense);
  return (
    <LinearGradView>
      <Link href="/(protected)/(tabs)/StatsTab" asChild>
        <TouchableOpacity className="py-7 px-2 items-center gap-y-2">
          <View>
            <UIText alwaysDarkText={true}>Monthly Payout</UIText>
          </View>
          <View className="flex-row items-center mb-4">
            <UIText variant="headerLg" alwaysDarkText={true}>
              SAR {userData?.monthlyTotal.total.toFixed(2) ?? 0.0}
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
