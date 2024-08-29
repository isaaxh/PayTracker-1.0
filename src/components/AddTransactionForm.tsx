import { TextInput, View } from "react-native";
import React, { useState } from "react";
import UIText from "./ui/UIText";
import AmountInput from "./AmountInput";
import UIDropDown from "./ui/UIDropDown";
import CustomDateTimePicker from "./CustomDateTimePicker";
import UITextInput from "./ui/UITextInput";
import UIButton from "./ui/UIButton";
import { categoryLabelsArray } from "@/constants/Categories";
import { TTransaction, transactionTypeArray } from "@/constants/Transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { transactionSchema } from "@/utils/types";
import UIInput from "./ui/UIInput";

const AddTransactionForm = () => {
  const [amount, setAmount] = useState("0.0");
  const [note, setNote] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<TTransaction>({
    resolver: zodResolver(transactionSchema),
    defaultValues: { amount: "0.0" },
  });

  const onSubmit = (data: TTransaction) => {
    console.log(data);
  };

  /* const onSubmit = () => { */
  /*   setLoading(true); */
  /*   console.log("date: ", date); */
  /**/
  /*   if (Number(amount) > 500) { */
  /*     console.log("Max amount cannot exceed 500"); */
  /*     setLoading(false); */
  /*     return; */
  /*   } */
  /*   console.log("Type: ", type); */
  /*   console.log("Category: ", category); */
  /*   console.log("amount: ", amount); */
  /*   console.log("note: ", note); */
  /**/
  /*   setLoading(false); */
  /* }; */
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
          />
        </View>
      </View>
      <View className="flex-1 w-full px-8 mt-12">
        <View className="flex-1">
          <UIDropDown
            data={transactionTypeArray}
            placeholder="Type"
            iconName="task"
            value={type}
            setValue={setType}
          />
          <UIDropDown
            data={categoryLabelsArray}
            placeholder="Category"
            iconName="category"
            value={category}
            setValue={setCategory}
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
          <CustomDateTimePicker date={date} setDate={setDate} />
          <TextInput
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => {
              const cleanedValue = text.replace(/[^0-9]/g, "");
              const parsedValue = parseInt(cleanedValue, 10);
              if (!isNaN(parsedValue)) {
                const boundedValue = Math.max(0, Math.min(parsedValue, 500));
                setAmount(boundedValue.toString());
              } else {
                setAmount("");
              }
            }}
          />
        </View>
        <View className="w-full py-7 items-center">
          <UIButton
            variant="fill"
            size="large"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
          >
            Save
          </UIButton>
        </View>
      </View>
    </>
  );
};

export default AddTransactionForm;
