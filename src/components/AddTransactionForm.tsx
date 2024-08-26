import { View } from "react-native";
import React, { useState } from "react";
import UIText from "./ui/UIText";
import AmountInput from "./AmountInput";
import UIDropDown from "./ui/UIDropDown";
import CustomDateTimePicker from "./CustomDateTimePicker";
import UITextInput from "./ui/UITextInput";
import UIButton from "./ui/UIButton";

const transactionTypeData = [
  { label: "Expense", value: "expense" },
  { label: "Income", value: "income" },
];

const categoriesData = [
  { label: "Food", value: "food" },
  { label: "Gas", value: "gas" },
];

const AddTransactionForm = () => {
  const [amount, setAmount] = useState("0");
  const [note, setNote] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    console.log("date: ", date);

    if (Number(amount) > 500) {
      console.log("Max amount cannot exceed 500");
      setLoading(false);
      return;
    }
    console.log("Type: ", type);
    console.log("Category: ", category);
    console.log("amount: ", amount);
    console.log("note: ", note);

    setLoading(false);
  };
  return (
    <>
      <UIText variant="header3">Add Transaction</UIText>
      <AmountInput amount={amount} setAmount={setAmount} />
      <View className="flex-1 w-full px-8 mt-12">
        <View className="mb-4">
          <UIDropDown
            data={transactionTypeData}
            placeholder="Type"
            iconName="task"
            value={type}
            setValue={setType}
          />
        </View>
        <View className="mb-4">
          <UIDropDown
            data={categoriesData}
            placeholder="Category"
            iconName="category"
            value={category}
            setValue={setCategory}
          />
        </View>
        <View className="mb-4">
          <UITextInput note={note} setNote={setNote} />
        </View>
        <View className="mb-4">
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
