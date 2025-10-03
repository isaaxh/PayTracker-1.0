import React from "react";
import UIText from "./ui/UIText";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/services/state/store";
import UIButton from "./ui/UIButton";
import { fetchUserData, updateUserData } from "@/services/state/user/userSlice";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/utils/dateHelperFn";
import { View } from "react-native";
import { useFetchAllTransactions } from "@/hooks/useFetchAllTransactions";
import { updateSettings } from "@/services/state/appSettings/appSettingSlice";
import { useUserData } from "@/hooks/useUserData";
import { TUserData } from "@/utils/types";
import { TUpdateDocFields } from "@/services/api/firestoreApi";

const NotificationBody = () => {
  const { data: userData, error, status } = useUserData();
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
        updates: { displayName: "Isaac Hussain" },
      })
    );
  };
  const handleUpdateDisplayName = () => {
    // Only allow the update if data is loaded successfully
    if (!userData) {
      console.log("Cannot update: user data is not available.");
      return;
    }
    const props: TUpdateDocFields<TUserData> = {
      id: userData.uid,
      collectionName: "users",
      updates: { displayName: "Ayyub Hussain" },
    };

    dispatch(updateUserData(props));
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
      {status === "error" && <UIText>Failed to fetch userData</UIText>}
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

      {status === "error" && <UIText>{error.message}</UIText>}
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
