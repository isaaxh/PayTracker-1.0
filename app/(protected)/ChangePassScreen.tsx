import { View, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "@/components/CustomHeader";
import { useGlobal } from "hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";
import UIButton from "@/components/ui/UIButton";
import { changePasswordSchema, TChangePassword } from "@/utils/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import UIInput from "@/components/ui/UIInput";
import { FIREBASE_AUTH } from "firebaseConfig";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const ChangePassScreen = () => {
  const { userData } = useGlobal() as GlobalContextProps;
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setError,
  } = useForm<TChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: TChangePassword) => {
    setLoading(true);

    if (!userData) {
      setLoading(false);
      console.log("No user data found");
      return;
    }

    try {
      const user = FIREBASE_AUTH.currentUser;
      if (!user) {
        setLoading(false);
        console.log("No user found in auth");
        return;
      }

      // Re-authenticate user with old password
      const credential = EmailAuthProvider.credential(
        user.email || "",
        data.oldPassword
      );

      await reauthenticateWithCredential(user, credential);

      // Update to new password
      await updatePassword(user, data.newPassword);

      Alert.alert("Success", "Successfully changed password!");
      reset();
    } catch (error: any) {
      console.log("Error changing password: ", error);

      // Handle Firebase-specific errors
      let errorMessage = "An unexpected error occurred. Please try again.";
      switch (error.code) {
        case "auth/invalid-credential":
          errorMessage = "The old password you entered is incorrect.";
          setError("oldPassword", { type: "manual", message: errorMessage });
          break;
        case "auth/requires-recent-login":
          errorMessage = "Please sign in again to update your password.";
          setError("oldPassword", { type: "manual", message: errorMessage });
          break;
        default:
          Alert.alert("Error", errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-bgColor dark:bg-darkBgColor'>
      <CustomHeader title='changePass' />
      <View className='px-6 py-6'>
        <UIInput
          name='oldPassword'
          control={control}
          placeholder={"Enter old password"}
          variant={"rectangular"}
          secureTextEntry={true}
          isPassword
          formError={errors.oldPassword?.message}
        />
        <UIInput
          name='newPassword'
          control={control}
          placeholder={"Enter new password"}
          variant={"rectangular"}
          secureTextEntry={true}
          isPassword
          formError={errors.newPassword?.message}
        />
        <UIInput
          name='confirmNewPassword'
          control={control}
          placeholder={"Confirm new password"}
          variant={"rectangular"}
          secureTextEntry={true}
          isPassword
          formError={errors.confirmNewPassword?.message}
        />
      </View>

      <View className='px-6 mt-auto mb-6 space-y-3'>
        <UIButton
          onPress={handleSubmit(onSubmit)}
          variant={"fill"}
          size={"large"}
          primary
          disabled={!isDirty || loading}
          loading={loading}
        >
          Save
        </UIButton>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassScreen;
