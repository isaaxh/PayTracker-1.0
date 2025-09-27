import { View } from "react-native";
import React from "react";
import RenderIcon from "./RenderIcon";
import { TTransaction } from "@/constants/TransactionsTypes";
import Colors from "@/constants/Colors";
import UIText from "./ui/UIText";
import { useAppSettings } from "@/hooks/useAppSettings";

type TransactionDetailsSummaryCardProps = {
  transaction: TTransaction | null;
};

const TransactionDetailsSummaryCard = ({
  transaction,
}: TransactionDetailsSummaryCardProps) => {
  const { appSettings } = useAppSettings();

  return (
    <View className='relative items-center px-6 pt-10 pb-8 mb-4 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
      {transaction && (
        <View
          className='absolute items-center justify-center p-4 mb-3 bg-orange-400 rounded-full -top-8'
          style={{
            backgroundColor:
              transaction?.type === "expense"
                ? Colors.global.error
                : Colors.global.success,
          }}
        >
          <RenderIcon
            iconLibrary='iconsax'
            iconProps={{
              name: transaction?.type === "expense" ? "card" : "dollar",
              color: "#ffffff",
              size: "34",
            }}
          />
        </View>
      )}
      <View className='items-center mb-2'>
        <UIText variant={"headingMd"} textStyles='mb-1'>
          {transaction?.entity}
        </UIText>
        <UIText
          variant={"bodyMd"}
          textStyles='text-tintLight dark:text-tintInactiveDark'
        >
          Card Transaction
        </UIText>
      </View>

      <View className=''>
        {transaction ? (
          <UIText variant={"headingXL"}>
            {transaction.type === "expense" ? "-" : "+"}
            {Math.trunc(transaction.amount)}
            <UIText variant={"headingSm"} textStyles='font-medium'>
              .{(transaction.amount % 1).toFixed(2).slice(2)}{" "}
            </UIText>
            <UIText variant={"bodyMd"} textStyles='font-medium'>
              {appSettings.currency.value}
            </UIText>
          </UIText>
        ) : (
          <UIText variant={"headingXL"}>--</UIText>
        )}
      </View>
    </View>
  );
};

export default TransactionDetailsSummaryCard;
