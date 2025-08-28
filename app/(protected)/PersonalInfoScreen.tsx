import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import UIText from "@/components/ui/UIText";
import { View } from "react-native";
import { useGlobal } from "hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";

const ProfileScreen = () => {
  const { userData } = useGlobal() as GlobalContextProps;
  return (
    <SafeAreaView className='flex-1 bg-bgColor dark:bg-darkBgColor'>
      <CustomHeader title='personalInfo' />
      <View className='px-6 py-8 mx-6 my-3 space-y-3 bg-bgSecondaryColor dark:bg-darkBgSecondaryColor rounded-xl'>
        <View className='space-y-0.5'>
          <UIText
            variant={"labelSm"}
            textStyles='text-tintLight dark:text-tintDark'
          >
            Full Name
          </UIText>
          <UIText variant={"bodyLg"}>{userData?.displayName}</UIText>
        </View>
        <View className='space-y-0.5'>
          <UIText
            variant={"labelSm"}
            textStyles='text-tintLight dark:text-tintDark'
          >
            Date of birth
          </UIText>
          <UIText variant={"bodyLg"}>{userData?.createdAt}</UIText>
        </View>
        <View className='space-y-0.5'>
          <UIText
            variant={"labelSm"}
            textStyles='text-tintLight dark:text-tintDark'
          >
            Email
          </UIText>
          <UIText variant={"bodyLg"}>{userData?.email}</UIText>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
