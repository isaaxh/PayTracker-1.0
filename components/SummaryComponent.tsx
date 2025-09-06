import { View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import { i18n } from "@/services/i18n/i18n";
import { useGlobal } from "hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { USDRate } from "@/constants/Settings";
import { convertCurrency } from "utils/currencyHelperFn";
import RenderIcon from "./RenderIcon";
import Colors from "@/constants/Colors";

type SummaryComponentProps = {
  label: "income" | "expense";
  amount: number;
};

const SummaryComponent = ({ label, amount }: SummaryComponentProps) => {
  const { appSettings } = useGlobal() as GlobalContextProps;
  return (
    <View className='flex-row items-center gap-x-3'>
      <View
        className='p-1 rounded-full'
        style={{
          backgroundColor:
            label === "income" ? Colors.global.success : Colors.global.error,
        }}
      >
        <RenderIcon
          iconLibrary='iconsax'
          iconProps={{
            name: label === "income" ? "arrow up" : "arrow down",
            variant: "Linear",
            color: "white",
            size: 20,
          }}
        />
      </View>
      <View className='items-center'>
        <UIText variant='bodySm' alwaysDarkText={true}>
          {i18n.t(label)}
        </UIText>
        <UIText textStyles='font-quicksand-bold' alwaysDarkText={true}>
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
