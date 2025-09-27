import { View } from "react-native";
import React from "react";
import UIButton from "./ui/UIButton";

type TransactionDetailsActionsProps = {
  loading: boolean;
  onPressDelete: () => void;
  onPressEdit: () => void;
};

const TransactionDetailsActions = ({
  loading,
  onPressDelete,
  onPressEdit,
}: TransactionDetailsActionsProps) => {
  return (
    <View className='mt-6 space-y-3'>
      <UIButton
        onPress={onPressEdit}
        variant={"fill"}
        size={"large"}
        disabled={loading}
      >
        Edit
      </UIButton>
      <UIButton
        onPress={onPressDelete}
        variant={"fill"}
        size={"large"}
        type={"danger"}
        disabled={loading}
      >
        Delete
      </UIButton>
    </View>
  );
};

export default TransactionDetailsActions;
