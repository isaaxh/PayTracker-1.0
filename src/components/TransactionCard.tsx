import { View, TouchableOpacity } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import TransactionIcon from "./TransactionIcon";
import { TCategory, TCategoryLabel, categories } from "@/constants/Categories";
import { Link } from "expo-router";
import { TTransaction } from "@/constants/Transactions";
import { formatDate } from "@/utils/dateHelperFn";
import { i18n } from "@/services/i18n/i18n";

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
  const category: TCategory | undefined = categories.find(
    (cat) => categoryLabel === cat.label,
  );

  const capitalizedLabel =
    categoryLabel[0].toUpperCase() + categoryLabel.slice(1);

  return (
    <Link
      href={{
        pathname: `/(transactions)/${id}`,
        params: { id: id },
      }}
      asChild
    >
      <TouchableOpacity className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row px-6 py-6 mb-3 rounded-3xl items-center">
        <TransactionIcon category={category} />
        <View className="flex-1 ml-3">
          <UIText textStyles="font-bold">{i18n.t(categoryLabel)}</UIText>
          {note !== "" ? <UIText variant="subHeader">{note}</UIText> : null}
        </View>
        <View className="items-end">
          <UIText variant="subHeader2">
            {type === "income" ? "+" : "-"} SAR {amount}
          </UIText>
          <UIText variant="subHeader">
            {formatDate(new Date(date)).split(" ")[0]}
          </UIText>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default TransactionCard;
