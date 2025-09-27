import { View } from "react-native";
import React from "react";
import { i18n } from "@/services/i18n/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TSettingsSchema, settingsSchema } from "@/constants/Settings";

import { useFetchUserData } from "@/hooks/useFetchUserData";
import { useProfileSettingsForm } from "@/hooks/useProfileSettingsForm";
import { useAppSettings } from "@/hooks/useAppSettings";

import UIButton from "./ui/UIButton";
import ProfileSettingsHeader from "./ProfileSettingsHeader";
import ProfileSettingsLinks from "./ProfileSettingsLinks";
import ProfileAppSettingsFields from "./ProfileAppSettingsFields";
import ProfileSettingsFooter from "./ProfileSettingsFooter";

const ProfileSettingsForm = () => {
  const { appSettings } = useAppSettings();
  const { userData } = useFetchUserData();
  const { onPressLogout, handleOnSubmit } = useProfileSettingsForm();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<TSettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      theme: appSettings.theme.value,
      currency: appSettings.currency.value,
      language: appSettings.language.value,
    },
  });

  return (
    <View className='flex-1'>
      <ProfileSettingsHeader name={userData?.displayName ?? "John Smith"} />
      <View className='mb-auto'>
        <ProfileSettingsLinks />
        <ProfileAppSettingsFields control={control} />
        <UIButton
          variant={"iconText"}
          iconLibrary='iconsax'
          iconProps={{ name: "logout" }}
          size={"large"}
          onPress={onPressLogout}
          textColor={"danger"}
        >
          {i18n.t("logout")}
        </UIButton>
      </View>
      <ProfileSettingsFooter
        onPressSave={handleSubmit(handleOnSubmit)}
        isDirty={isDirty}
        isSubmitting={isSubmitting}
      />
    </View>
  );
};

export default ProfileSettingsForm;
