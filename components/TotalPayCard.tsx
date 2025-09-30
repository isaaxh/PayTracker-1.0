import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";

import { i18n } from "@/services/i18n/i18n";
import { USDRate } from "@/constants/Settings";
import Colors from "@/constants/Colors";
import { convertCurrency } from "utils/currencyHelperFn";

import { useAppSettings } from "@/hooks/useAppSettings";
import { useCalculate } from "hooks/useCalculate";

import UIText from "./ui/UIText";
import SummaryComponent from "./SummaryComponent";
import LoadingComponent from "./LoadingComponent";

const TotalPayCard = () => {
  const { appSettings } = useAppSettings();

  const { monthlyTotal, income, expense, transactionStatus, transactionError } =
    useCalculate();
  return (
    <View
      className='mb-4 rounded-2xl'
      style={{ backgroundColor: Colors.global.accent }}
    >
      <Link href='/(protected)/(tabs)/StatsTab' asChild>
        <TouchableOpacity className='items-center px-2 py-7 gap-y-2'>
          <View>
            <UIText variant={"bodyLg"} alwaysDarkText={true}>
              {i18n.t("monthlyPayout")}
            </UIText>
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
    </View>
  );
};

export default TotalPayCard;
