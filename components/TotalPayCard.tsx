import { TouchableOpacity, View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import LinearGradView from "./LinearGradView";
import SummaryComponent from "./SummaryComponent";
import { Link } from "expo-router";
import { useGlobal } from "hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { useCalculate } from "hooks/useCalculate";
import { i18n } from "@/services/i18n/i18n";
import { convertCurrency } from "utils/currencyHelperFn";
import { USDRate } from "@/constants/Settings";

const TotalPayCard = () => {
  const { appSettings } = useGlobal() as GlobalContextProps;

  const { monthlyTotal, income, expense } = useCalculate();

  return (
    <LinearGradView>
      <Link href='/(protected)/(tabs)/StatsTab' asChild>
        <TouchableOpacity className='items-center px-2 py-7 gap-y-2'>
          <View>
            <UIText alwaysDarkText={true}>{i18n.t("monthlyPayout")}</UIText>
          </View>
          <View className='flex-row items-center mb-4'>
            <UIText variant='headingXL' alwaysDarkText={true}>
              {appSettings.currency.value}{" "}
              {convertCurrency({
                currency: appSettings.currency.value,
                rate: USDRate,
                amount: monthlyTotal,
              })}
            </UIText>
          </View>
          <View className='flex-row justify-between w-full px-4'>
            <SummaryComponent label='income' amount={income ?? 0} />
            <SummaryComponent label='expense' amount={expense ?? 0} />
          </View>
        </TouchableOpacity>
      </Link>
    </LinearGradView>
  );
};

export default TotalPayCard;
