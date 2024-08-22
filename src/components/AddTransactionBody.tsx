import { TextInput, View } from "react-native";
import React, { useState } from "react";
import AmountInput from "./AmountInput";
import UIText from "./ui/UIText";
import UIDropDown from "./ui/UIDropDown";
import UITextInput from "./ui/UITextInput";

const transactionTypeData = [
  { label: "Expense", value: "expense" },
  { label: "Income", value: "income" },
];

const categoriesData = [
  { label: "Food", value: "food" },
  { label: "Gas", value: "gas" },
];

const AddTransactionBody = () => {
  const [amount, setAmount] = useState("0");
  const [note, setNote] = useState("");
  return (
    <View className="flex-1 items-center mt-16">
      <UIText variant="header3">Add Transaction</UIText>
      <AmountInput amount={amount} setAmount={setAmount} />
      <View className="flex-1 w-full px-8 mt-12">
        <UIDropDown
          data={transactionTypeData}
          placeholder="Type"
          iconName="task"
        />
        <UIDropDown
          data={categoriesData}
          placeholder="Category"
          iconName="category"
        />
        <UITextInput note={note} setNote={setNote} />
      </View>
    </View>
  );
};

export default AddTransactionBody;
