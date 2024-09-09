import { View } from "react-native";
import React, { useState } from "react";
import UIText from "./ui/UIText";
import UIDropDown from "./ui/UIDropDown";
import CustomDateTimePicker from "./CustomDateTimePicker";
import UIButton from "./ui/UIButton";
import { categoryLabelsArray } from "@/constants/Categories";
import {
  TTransaction,
  transactionSchema,
  transactionTypeArray,
} from "@/constants/Transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import UIInput from "./ui/UIInput";
import uuid from "react-native-uuid";

const AddTransactionForm = () => {
  const [date, setDate] = useState(new Date());

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TTransaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: { id: uuid.v4(), date: date.toISOString(), note: "" },
  });

  const onSubmit = (data: TTransaction) => {
    console.log(data);
    console.log("save clicked");
  };

  return (
    <>
      <View className="items-center justify-center w-full px-24">
        <UIText variant="header3">Add Transaction</UIText>
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
            data={transactionTypeArray}
            name="type"
            control={control}
            placeholder="Type"
            iconName="task"
          />
          <UIDropDown
            data={categoryLabelsArray}
            name="category"
            control={control}
            placeholder="Category"
            iconName="category"
          />
          <UIInput
            name="note"
            control={control}
            variant="rectangular"
            size="large"
            placeholder="Note"
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
            loading={isSubmitting}
          >
            Save
          </UIButton>
        </View>
      </View>
    </>
  );
};

export default AddTransactionForm;
