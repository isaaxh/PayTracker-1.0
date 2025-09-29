import React from "react";
import UIText from "./ui/UIText";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/services/state/store";
import UIButton from "./ui/UIButton";
import {
  clearUserData,
  fetchUserData,
  updateUserData,
} from "@/services/state/user/userSlice";
import { useAuth } from "@/hooks/useAuth";
import { AuthContextProps } from "@/services/providers/AuthProvider";
import { formatDate } from "@/utils/dateHelperFn";
import { View } from "react-native";
import {
  createSerializableUser,
  setAuthUser,
} from "@/services/state/auth/authSlice";
import { useFetchUserData } from "@/hooks/useFetchUserData";
import { useFetchAllTransactions } from "@/hooks/useFetchAllTransactions";
import { updateSettings } from "@/services/state/appSettings/appSettingSlice";

const NotificationBody = () => {
  const { userData, error, status } = useFetchUserData();
  const authState = useSelector((state: RootState) => state.authState);
  const dispatch = useDispatch<AppDispatch>();

  const { transactions } = useFetchAllTransactions();

  console.log(transactions);

  const { user } = useAuth();

  const handlePressFetch = () => {
    if (!authState.user?.uid) return;
    dispatch(
      fetchUserData({ collectionName: "users", id: authState.user.uid })
    );
  };

  const handlePressUpdate = () => {
    if (!user?.uid) return;
    dispatch(
      updateUserData({
        id: user?.uid,
        collectionName: "users",
        fieldName: "displayName",
        updateValue: "Ishaq Hussain",
      })
    );
  };
  const handleUpdateDisplayName = () => {
    // Only allow the update if data is loaded successfully
    if (userData) {
      const props = {
        id: userData?.uid,
        collectionName: "users",
        fieldName: "displayName",
        updateValue: "Mohammad Hussain",
      };
      dispatch(updateUserData(props));
    } else {
      // Handle cases where data is not ready (e.g., show a loading state)
      console.log("Cannot update: user data is not available.");
    }
  };

  // const handlePressClear = () => {
  //   if (!user?.uid) return;
  //   dispatch(setAuthUser(createSerializableUser(user)));
  // };

  const handlePress = () => {
    dispatch(
      updateSettings({
        key: "theme",
        value: { label: "Light", value: "light" },
      })
    );
  };

  return (
    <View className='flex-1 w-full px-6 py-4 space-y-4'>
      {status === "pending" && <UIText>Loading...</UIText>}
      {status === "failed" && <UIText>Failed to fetch userData</UIText>}
      {status === "success" ? (
        <>
          <UIText variant={"headingMd"}>{authState.user?.displayName}</UIText>
          <UIText variant={"headingMd"}>{userData?.displayName}</UIText>
          <UIText variant={"headingMd"}>
            {userData && formatDate(userData?.createdAt)}
          </UIText>

          <UIText variant={"headingMd"}>
            Monthly Payout: {userData?.monthlyTotal.total}
          </UIText>
          <UIText variant={"headingMd"}>
            income: {userData?.monthlyTotal.income}
          </UIText>
          <UIText variant={"headingMd"}>
            expense: {userData?.monthlyTotal.expenses}
          </UIText>
        </>
      ) : (
        <UIText variant={"headingMd"}>no user data</UIText>
      )}

      {status === "failed" && <UIText>{error}</UIText>}
      <UIButton variant={"fill"} primary onPress={handlePressFetch}>
        Fetch user data
      </UIButton>
      <UIButton variant={"fill"} primary onPress={handleUpdateDisplayName}>
        update user name
      </UIButton>
      <UIButton variant={"fill"} primary onPress={handlePress}>
        Press
      </UIButton>
    </View>
  );
};

export default NotificationBody;
