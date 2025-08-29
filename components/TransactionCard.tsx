import { View, TouchableOpacity } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import TransactionIcon from "./TransactionIcon";
import { TCategory, TCategoryLabel, categories } from "@/constants/Categories";
import { Link } from "expo-router";
import { TTransaction } from "@/constants/Transactions";
import { formatDate } from "utils/dateHelperFn";
import { i18n } from "@/services/i18n/i18n";
import { useGlobal } from "hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { USDRate } from "@/constants/Settings";
import { convertCurrency } from "utils/currencyHelperFn";

type TransactionIconProps = {
  categoryLabel: TCategoryLabel;
} & TTransaction;

const TransactionCard = ({
  categoryLabel,
  id,
  type,
  amount,
  date,
  note,
}: TransactionIconProps) => {
  const { appSettings } = useGlobal() as GlobalContextProps;
  const category: TCategory | undefined = categories.find(
    (cat) => categoryLabel === cat.label
  );

  const capitalizedLabel =
    categoryLabel[0].toUpperCase() + categoryLabel.slice(1);

  return (
    <Link
      href={{
        pathname: `/(protected)/(transactions)/[id]`,
        params: { id: id },
      }}
      asChild
    >
      <TouchableOpacity className='flex-row items-center px-6 py-6 mb-3 bg-bgSecondaryColor dark:bg-darkBgSecondaryColor rounded-3xl'>
        <TransactionIcon category={category} />
        <View className='flex-1'>
          <UIText textStyles='font-bold'>
            {i18n.locale === "en" ? capitalizedLabel : i18n.t(categoryLabel)}
          </UIText>
          {note !== "" ? <UIText variant='bodySm'>{note}</UIText> : null}
        </View>
        <View className='items-end'>
          <UIText variant='labelSm'>
            {type === "income" ? "+" : "-"} {appSettings.currency.value}{" "}
            {convertCurrency({
              currency: appSettings.currency.value,
              rate: USDRate,
              amount: amount,
            })}
          </UIText>
          <UIText variant='caption'>{formatDate(date, "time")}</UIText>
          {/* <UIText variant='caption'>{formatDate(date).split(" ")[0]}</UIText> */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TransactionCard;
