import { Platform } from "react-native";
import Toast from "react-native-toast-message";

type TShowToast = {
  type: "success" | "info" | "error";
  text1: string;
  text2: string;
};

export const useToast = () => {
  const showTransactionAddedToast = () => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Transaction added!",
      topOffset: Platform.OS === "ios" ? 60 : 40,
    });
  };

  const showToast = (props: TShowToast) => {
    const { type, text1, text2 } = props;
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      topOffset: Platform.OS === "ios" ? 60 : 40,
      /* autoHide: type === "info" ? false : true, */
    });
  };

  const showLoginFailedToast = () => {
    Toast.show({
      type: "error",
      text1: "Opps",
      text2: "Login failed",
      topOffset: Platform.OS === "ios" ? 60 : 40,
    });
  };
  return { showToast, showTransactionAddedToast, showLoginFailedToast };
};
