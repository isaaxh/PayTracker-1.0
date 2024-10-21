import { View } from "react-native";
import React from "react";
import IconComponent from "./IconComponent";
import UIText from "./ui/UIText";
import { i18n } from "@/services/i18n/i18n";
import { useGlobal } from "@/hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { USDRate } from "@/constants/Settings";
import { convertCurrency } from "@/utils/currencyHelperFn";

type SummaryComponentProps = {
  label: "income" | "expense";
  amount: number;
};

const SummaryComponent = ({ label, amount }: SummaryComponentProps) => {
  const { appSettings } = useGlobal() as GlobalContextProps;
  return (
    <View className="flex-row items-center gap-x-3">
      <View className="bg-white p-1 rounded-full bg-bgTransparent">
        <IconComponent
          name={label === "income" ? "arrow up" : "arrow down"}
          variant="Linear"
          color={label === "income" ? "#a3e635" : "#ef4444"}
          size={20}
        />
      </View>
      <View className="items-center">
        <UIText variant="subHeader3" alwaysDarkText={true}>
          {i18n.t(label)}
        </UIText>
        <UIText textStyles="font-bold" alwaysDarkText={true}>
          {convertCurrency({
            currency: appSettings.currency.value,
            rate: USDRate,
            amount: amount,
          })}
        </UIText>
      </View>
    </View>
  );
};

export default SummaryComponent;
