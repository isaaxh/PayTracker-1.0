import { View } from "react-native";
import React from "react";
import AddTransactionForm from "./AddTransactionForm";

const AddTransactionBody = () => {
  return (
    <View className="flex-1 items-center mt-16">
      <AddTransactionForm />
    </View>
  );
};

export default AddTransactionBody;
