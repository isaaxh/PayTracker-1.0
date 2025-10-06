import { Platform, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import uuid from "react-native-uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { i18n } from "@/services/i18n/i18n";

import { categoryLabelsArray } from "@/constants/CategoriesTypes";
import {
  TTransaction,
  transactionSchema,
  transactionTypeList,
} from "@/constants/TransactionsTypes";

import { useUserData } from "@/hooks/useUserData";
import { useAddTransaction } from "@/hooks/useTransactions";

import UIText from "./ui/UIText";
import UIDropDown from "./ui/UIDropDown";
import CustomDateTimePicker from "./CustomDateTimePicker";
import UIButton from "./ui/UIButton";
import UIInput from "./ui/UIInput";

const AddTransactionForm = () => {
  const [date, setDate] = useState(new Date().toISOString());

  const { data: userData } = useUserData();
  const { mutate, isPending } = useAddTransaction();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm<TTransaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      id: uuid.v4().toString(),
      date: date,
      note: "",
      amount: 0,
    },
  });

  const onSubmit = async (data: TTransaction) => {
    if (!userData?.uid) {
      console.log("Cannot add transaction: user id not found!");
      return;
    }

    mutate(data);

    reset();
    router.back();
  };

  return (
    <>
      <View className='items-center justify-center w-full px-24'>
        <UIText variant='headingSm'>{i18n.t("addTransaction")}</UIText>
        <View className='w-full mt-6'>
          <UIInput
            name='amount'
            control={control}
            variant='fullyRounded'
            size='default'
            isAmountInput
            placeholder='0.00'
          />
        </View>
      </View>
      <View className='flex-1 w-full px-8 mt-12'>
        <View className='flex-1'>
          <UIInput
            name='entity'
            control={control}
            variant='rectangular'
            size='large'
            placeholder={i18n.t("entity")}
            showIcon={true}
            iconProps={{ name: "profile" }}
          />
          <UIDropDown
            data={transactionTypeList}
            name='type'
            control={control}
            placeholder={i18n.t("type")}
            iconName='task'
            highlightBorder
          />
          <UIDropDown
            data={categoryLabelsArray}
            name='category'
            control={control}
            placeholder={i18n.t("category")}
            iconName='category'
            highlightBorder
          />
          <UIInput
            name='note'
            control={control}
            variant='rectangular'
            size='large'
            placeholder={i18n.t("note")}
            showIcon={true}
            iconProps={{ name: "documentText" }}
          />
          {Platform.OS === "ios" ? (
            <>
              <CustomDateTimePicker
                control={control}
                mode={"datetime"}
                date={date}
                setDate={setDate}
                placeholder='Select time'
              />
            </>
          ) : (
            <>
              <CustomDateTimePicker
                control={control}
                mode={"date"}
                date={date}
                setDate={setDate}
                placeholder='Select date'
              />
              <CustomDateTimePicker
                control={control}
                mode={"time"}
                date={date}
                setDate={setDate}
                placeholder='Select time'
              />
            </>
          )}
        </View>
        <View className='items-center w-full py-7'>
          <UIButton
            variant='fill'
            size='large'
            onPress={handleSubmit(onSubmit)}
            disabled={!isDirty || isPending || isSubmitting}
            primary
          >
            {i18n.t("save")}
          </UIButton>
        </View>
      </View>
    </>
  );
};

export default AddTransactionForm;
