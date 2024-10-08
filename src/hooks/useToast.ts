import { Platform } from "react-native";
import Toast from "react-native-toast-message";

export const useToast = () => {
  const showTransactionAddedToast = () => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Transaction added!",
      topOffset: Platform.OS === "ios" ? 60 : 40,
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
  return { showTransactionAddedToast, showLoginFailedToast };
};
