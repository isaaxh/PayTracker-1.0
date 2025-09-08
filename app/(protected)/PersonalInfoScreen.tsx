import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import UIText from "@/components/ui/UIText";
import { View } from "react-native";
import { useGlobal } from "hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import DetailItemCard from "@/components/DetailItemCard";
import { formatDate } from "@/utils/dateHelperFn";
import UIButton from "@/components/ui/UIButton";

const ProfileScreen = () => {
  const { userData } = useGlobal() as GlobalContextProps;
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
