import { View } from "react-native";
import React, { useEffect, useState } from "react";
import UIText from "./ui/UIText";
import UIDropDown from "./ui/UIDropDown";
import CustomDateTimePicker from "./CustomDateTimePicker";
import UIButton from "./ui/UIButton";
import { categoryLabelsArray } from "@/constants/Categories";
import {
  TTransaction,
  transactionSchema,
  transactionTypeList,
} from "@/constants/Transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import UIInput from "./ui/UIInput";
import uuid from "react-native-uuid";
import { useGlobal } from "@/hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import { router } from "expo-router";
import { i18n } from "@/services/i18n/i18n";

const AddTransactionForm = () => {
  const [date, setDate] = useState(new Date());

  const { userData, getAllDocuments, addTransactionDoc, loading } =
    useGlobal() as GlobalContextProps;

  const { control, handleSubmit, reset, formState } = useForm<TTransaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      id: uuid.v4().toString(),
      date: date.toISOString(),
      note: "",
      amount: 0,
    },
  });

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  const onSubmit = (data: TTransaction) => {
    if (!userData) {
      console.log("Cannot add transaction: user id not available!", userData);
      return;
    }

    addTransactionDoc({ uid: userData?.uid, transactionData: data });

    getAllDocuments({
      collectionName: `users/${userData?.uid}/transactions`,
    });

    router.back();
  };

  return (
    <>
      <View className="items-center justify-center w-full px-24">
        <UIText variant="header3">{i18n.t("addTransaction")}</UIText>
        <View className="w-full mt-6">
          <UIInput
            name="amount"
            control={control}
            variant="fullyRounded"
            size="default"
            isAmountInput
            placeholder="0.00"
          />
        </View>
      </View>
      <View className="flex-1 w-full px-8 mt-12">
        <View className="flex-1">
          <UIDropDown
            data={transactionTypeList}
            name="type"
            control={control}
            placeholder={i18n.t("type")}
            iconName="task"
          />
          <UIDropDown
            data={categoryLabelsArray}
            name="category"
            control={control}
            placeholder={i18n.t("category")}
            iconName="category"
          />
          <UIInput
            name="note"
            control={control}
            variant="rectangular"
            size="large"
            placeholder={i18n.t("note")}
            showIcon={true}
            iconName="document text"
          />
          <CustomDateTimePicker
            control={control}
            date={date}
            setDate={setDate}
          />
        </View>
        <View className="w-full py-7 items-center">
          <UIButton
            variant="fill"
            size="large"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          >
            {i18n.t("save")}
          </UIButton>
        </View>
      </View>
    </>
  );
};

export default AddTransactionForm;
