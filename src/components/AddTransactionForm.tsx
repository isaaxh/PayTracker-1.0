import { View } from "react-native";
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
  const [amount, setAmount] = useState("0");
  const [note, setNote] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<TTransaction>({
    resolver: zodResolver(transactionSchema),
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
      <UIText variant="header3">Add Transaction</UIText>
      <AmountInput amount={amount} setAmount={setAmount} />
      {/* <UIInput name="amount" control={conrrol} /> */}
      <View className="flex-1 w-full px-8 mt-12">
        <View className="mb-3">
          <UIDropDown
            data={transactionTypeArray}
            placeholder="Type"
            iconName="task"
            value={type}
            setValue={setType}
          />
        </View>
        <View className="mb-3">
          <UIDropDown
            data={categoryLabelsArray}
            placeholder="Category"
            iconName="category"
            value={category}
            setValue={setCategory}
          />
        </View>
        <UIInput
          name="note"
          control={control}
          variant="rectangular"
          size="large"
          placeholder="Note"
          showIcon={true}
          iconName="document text"
        />
        <View className="mb-3">
          <CustomDateTimePicker date={date} setDate={setDate} />
        </View>
      </View>
      <View className="w-full px-6 py-7 items-center">
        <UIButton
          variant="fill"
          size="large"
          onPress={onSubmit}
          loading={loading}
        >
          Save
        </UIButton>
      </View>
    </>
  );
};

export default AddTransactionForm;
