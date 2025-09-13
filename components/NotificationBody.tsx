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

const NotificationBody = () => {
  const userData = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch<AppDispatch>();

  const {
    authState: { user },
  } = useAuth() as AuthContextProps;

  const handlePressFetch = () => {
    dispatch(clearUserData());
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
    if (userData.data) {
      const props = {
        id: userData.data?.uid,
        collectionName: "users",
        fieldName: "displayName",
        updateValue: "Ishaq Hussain",
      };
      dispatch(updateUserData(props));
    } else {
      // Handle cases where data is not ready (e.g., show a loading state)
      console.log("Cannot update: user data is not ready.");
    }
  };

  const handlePressClear = () => {
    if (!user?.uid) return;
    dispatch(clearUserData());
  };

  return (
    <View className='flex-1 w-full px-6 py-4 space-y-4'>
      {userData.status === "pending" && <UIText>Loading...</UIText>}
      {userData.status === "failed" && (
        <UIText>Failed to fetch userData</UIText>
      )}
      {userData.status === "success" ? (
        <>
          <UIText variant={"headingMd"}>{userData.data?.displayName}</UIText>
          <UIText variant={"headingMd"}>{userData.data?.email}</UIText>
          <UIText variant={"headingMd"}>
            {userData.data && formatDate(userData.data?.createdAt)}
          </UIText>

          <UIText variant={"headingMd"}>
            Monthly Payout: {userData.data?.monthlyTotal.total}
          </UIText>
          <UIText variant={"headingMd"}>
            income: {userData.data?.monthlyTotal.income}
          </UIText>
          <UIText variant={"headingMd"}>
            expense: {userData.data?.monthlyTotal.expenses}
          </UIText>
        </>
      ) : (
        <UIText variant={"headingMd"}>no user data</UIText>
      )}

      {userData.status === "failed" && <UIText>{userData.error}</UIText>}
      <UIButton variant={"fill"} primary onPress={handlePressFetch}>
        Fetch user data
      </UIButton>
      <UIButton variant={"fill"} primary onPress={handleUpdateDisplayName}>
        update user name
      </UIButton>
      <UIButton variant={"fill"} primary onPress={handlePressClear}>
        clear user data
      </UIButton>
    </View>
  );
};

export default NotificationBody;
