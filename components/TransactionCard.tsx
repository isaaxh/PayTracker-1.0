import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import {
  TCategory,
  TCategoryLabel,
  categories,
} from "@/constants/CategoriesTypes";
import { TTransaction } from "@/constants/TransactionsTypes";

import { formatDate } from "utils/dateHelperFn";
import { USDRate } from "@/constants/Settings";
import { convertCurrency } from "utils/currencyHelperFn";
import { cn } from "@/utils/cn";
import { capitalizeText } from "@/utils/helperFns";

import { useAppSettings } from "@/hooks/useAppSettings";

import UIText from "./ui/UIText";
import TransactionIcon from "./TransactionIcon";

type TransactionIconProps = {
  categoryLabel: TCategoryLabel;
  showDate?: boolean;
  transaction: TTransaction;
};

const TransactionCard = (props: TransactionIconProps) => {
  const {
    categoryLabel,
    showDate,
    transaction: { id, type, amount, date, note, entity },
  } = props;
  const { appSettings } = useAppSettings();
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
      <TouchableOpacity className='flex-row items-center px-6 py-6 mb-3 rounded-xl bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
        <TransactionIcon category={category} />
        <View className='flex-1'>
          <UIText textStyles='font-bold'>{capitalizeText(entity)}</UIText>
          {note !== "" ? <UIText variant='bodySm'>{note}</UIText> : null}
        </View>
        <View className='items-end'>
          <UIText
            variant='labelSm'
            textStyles={cn(type === "income" ? "text-success" : "text-danger")}
          >
            {type === "income" ? "+" : "-"} {appSettings.currency.value}{" "}
            {convertCurrency({
              currency: appSettings.currency.value,
              rate: USDRate,
              amount: amount,
            })}
          </UIText>
          {showDate ? (
            <UIText variant='caption'>{formatDate(date, "date")}</UIText>
          ) : (
            <UIText variant='caption'>{formatDate(date, "time")}</UIText>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TransactionCard;
