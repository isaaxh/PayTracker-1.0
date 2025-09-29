import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { formatDate } from "@/utils/dateHelperFn";

import { useUserData } from "@/hooks/useUserData";

import CustomHeader from "@/components/CustomHeader";
import DetailItemCard from "@/components/DetailItemCard";
import UIButton from "@/components/ui/UIButton";

const ProfileScreen = () => {
  const { userData } = useUserData();
  return (
    <SafeAreaView className='flex-1 bg-bgColor dark:bg-darkBgColor'>
      <CustomHeader title='personalInfo' />
      <View className='px-6 py-6 space-y-3'>
        <DetailItemCard label='Full Name' content={userData?.displayName} />
        <DetailItemCard
          label='Date Of Birth'
          content={userData && formatDate(userData?.createdAt, "date")}
        />
        <DetailItemCard label='Email' content={userData?.email} />
      </View>

      <View className='px-6 mt-auto mb-6 space-y-3'>
        <UIButton onPress={() => {}} variant={"fill"} size={"large"}>
          Save
        </UIButton>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
