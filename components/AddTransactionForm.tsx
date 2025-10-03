import { Platform, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import uuid from "react-native-uuid";
import { ZodError } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Timestamp } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { i18n } from "@/services/i18n/i18n";

import UIText from "./ui/UIText";
import UIDropDown from "./ui/UIDropDown";
import CustomDateTimePicker from "./CustomDateTimePicker";
import UIButton from "./ui/UIButton";
import UIInput from "./ui/UIInput";

import { categoryLabelsArray } from "@/constants/CategoriesTypes";
import {
  TTransaction,
  firestoreTransactionSchema,
  transactionSchema,
  transactionTypeList,
} from "@/constants/TransactionsTypes";

import { addTransaction } from "@/services/state/transactions/transactionSlice";
import { AppDispatch } from "@/services/state/store";
import { useUserData } from "@/hooks/useUserData";
import { useFetchAllTransactions } from "hooks/useFetchAllTransactions";

const AddTransactionForm = () => {
  const [date, setDate] = useState(new Date());

  const { data: userData } = useUserData();
  const { transactionStatus } = useFetchAllTransactions();
  const dispatch = useDispatch<AppDispatch>();

  const { refetch } = useFetchAllTransactions();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm<TTransaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      id: uuid.v4().toString(),
      date: new Date().toISOString(),
      note: "",
      amount: 0,
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset]);

  const onSubmit = async (data: TTransaction) => {
    if (!userData?.uid) {
      console.log("Cannot add transaction: user id not found!");
      return;
    }

    try {
      const firestoreReady = {
        ...data,
        date: Timestamp.fromDate(new Date(data.date)),
      };
      const parsedTransaction =
        firestoreTransactionSchema.parse(firestoreReady);

      const uid = userData.uid;

      dispatch(
        addTransaction({
          uid,
          transactionData: parsedTransaction,
        })
      );

      refetch();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error:", error.errors);
      } else {
        console.error("Error adding transaction:", error);
      }
    }

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
            disabled={
              !isDirty || transactionStatus === "pending" || isSubmitting
            }
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
