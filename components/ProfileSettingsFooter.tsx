import { View, Text } from "react-native";
import React from "react";
import UIButton from "./ui/UIButton";
import { i18n } from "@/services/i18n/i18n";

type Props = {
  onPressSave: () => void;
  isDirty: boolean;
  isSubmitting: boolean;
};

const ProfileSettingsFooter = ({
  onPressSave,
  isDirty,
  isSubmitting,
}: Props) => {
  return (
    <View className='w-full pb-4'>
      <UIButton
        variant='fill'
        size='large'
        onPress={onPressSave}
        disabled={!isDirty || isSubmitting}
      >
        {i18n.t("saveChanges")}
      </UIButton>
    </View>
  );
};

export default ProfileSettingsFooter;
