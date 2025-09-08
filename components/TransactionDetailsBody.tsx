import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { TTransaction } from "@/constants/TransactionsTypes";
import { useGlobal } from "hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { router, useLocalSearchParams } from "expo-router";
import UIButton from "./ui/UIButton";
import { useFetchFilteredTransactions } from "hooks/useFetchFilteredTransactions";
import RenderIcon from "./RenderIcon";
import UIText from "./ui/UIText";
import { formatDate } from "@/utils/dateHelperFn";
import Colors from "@/constants/Colors";
import DetailItemCard from "./DetailItemCard";

const TransactionDetailsBody = () => {
  const { id } = useLocalSearchParams();
  const [transaction, setTransaction] = useState<TTransaction | null>(null);
  const {
    userData,
    getDocument,
    removeDocument,
    transactions,
    setTransactions,
  } = useGlobal() as GlobalContextProps;
  const { fetchFilteredTransactions, loading } = useFetchFilteredTransactions({
    dateOrder: "desc",
  });

  const { appSettings } = useGlobal() as GlobalContextProps;

  useEffect(() => {
    const getTransactionDoc = async () => {
      try {
        const transaction = await getDocument<TTransaction>({
          collectionName: `users/${userData?.uid}/transactions`,
          id: id.toString(),
        });

        if (transaction !== null) {
          setTransaction(transaction);
        }
      } catch (e) {
        console.log("error loading transaction details: ", e);
      }
    };
    getTransactionDoc();
  }, []);

  const onPressDelete = () => {
    if (transaction) {
      const filteredTransactions = transactions.filter(
        (trans) => transaction?.id !== trans.id
      );

      removeDocument({
        id: transaction?.id,
        collectionName: `users/${userData?.uid}/transactions`,
      });

      setTransactions(filteredTransactions);
      fetchFilteredTransactions();
    } else {
      console.log("no transaction found");
    }

    router.back();
  };

  return (
    <View className='flex-1 w-full px-6 mt-8'>
      <View className='relative items-center px-6 pt-10 pb-8 mb-4 rounded-lg bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
        {transaction && (
          <View
            className='absolute items-center justify-center inline-block p-4 mb-3 bg-orange-400 rounded-full -top-8'
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
      <View className=''>
        <DetailItemCard
          label={"Date"}
          content={transaction && formatDate(transaction.date, "datetime")}
        />
        <DetailItemCard
          label={"Transaction ID"}
          content={transaction?.id.slice(-12)}
        />
        <DetailItemCard label={"Category"} content={transaction?.category} />
        <DetailItemCard label={"Type"} content={transaction?.type} />
        <DetailItemCard
          label={"Note"}
          content={transaction?.note === "" ? "no notes" : transaction?.note}
        />
      </View>

      <View className='mt-auto space-y-3'>
        <UIButton variant={"fill"} size={"large"} disabled={loading}>
          Edit
        </UIButton>
        <UIButton
          onPress={() => {
            onPressDelete();
          }}
          variant={"fill"}
          size={"large"}
          type={"danger"}
          disabled={loading}
        >
          Delete
        </UIButton>
      </View>
    </View>
  );
};

export default TransactionDetailsBody;
