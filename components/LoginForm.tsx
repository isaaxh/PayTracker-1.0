import { View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import UIInput from "./ui/UIInput";
import UIButton from "./ui/UIButton";
import { useForm } from "react-hook-form";
import { TLoginSchema, loginSchema } from "utils/types";
import { useAuth } from "hooks/useAuth";
import { AuthContextProps } from "@/services/providers/AuthProvider";
import { Link } from "expo-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { i18n } from "@/services/i18n/i18n";
import SocialAuthBtns from "./SocialAuthBtns";

const LoginForm = () => {
  const { control, handleSubmit } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { login, loading } = useAuth() as AuthContextProps;

  const onSubmit = (data: TLoginSchema) => {
    login({ email: data.email.trim(), password: data.password });
  };

  return (
    <>
      <View className='mx-4 mt-10'>
        <UIText variant='headingMd' textStyles='mb-2'>
          {i18n.t("enterYourEmail")}
        </UIText>
        <UIText textStyles='text-left mb-3' variant='bodySm'>
          {i18n.t("loginInstructions")}
        </UIText>
        <View className='mt-3'>
          <UIInput
            name='email'
            control={control}
            placeholder={i18n.t("enterEmailHere")}
            keyboardType='email-address'
          />
          <UIInput
            name='password'
            control={control}
            placeholder={i18n.t("enterPasswordHere")}
            secureTextEntry={true}
            isPassword
          />
        </View>

        <View className='flex-row items-center justify-between px-1'>
          <UIText variant='bodyMd'>{i18n.t("rememberMe")}</UIText>
          <Link href='/' asChild>
            <UIButton
              hitSlop={5}
              variant='link'
              size='small'
              textSize={"link"}
              buttonStyles='px-0 py-0'
            >
              {i18n.t("forgotPassword")}
            </UIButton>
          </Link>
        </View>
      </View>

      {/* <View className="items-center justify-center w-full"> */}
      {/*   {loading && <LoadingComponent />} */}
      {/*   <LoadingComponent /> */}
      {/* </View> */}

      <View className='items-center justify-end mx-4 mt-auto mb-6'>
        <UIButton
          onPress={handleSubmit(onSubmit)}
          size='large'
          buttonStyles='mx-0 mb-3'
          disabled={loading}
          primary
        >
          {i18n.t("login")}
        </UIButton>
        <View className='flex-row items-center'>
          <UIText variant='bodySm'>{i18n.t("dontHaveAnAccount")} </UIText>
          <Link href='/SignupScreen' asChild>
            <UIButton
              hitSlop={5}
              variant='link'
              size='small'
              textSize={"link"}
              buttonStyles='px-0 py-0 pl-1'
            >
              {i18n.t("signup")}
            </UIButton>
          </Link>
        </View>
      </View>
      <View className='flex-row items-center justify-center gap-3 px-6 mb-6'>
        <View className='flex-1 border-b border-b-gray-400' />
        <UIText variant='bodySm'>{i18n.t("orLoginWith")}</UIText>
        <View className='flex-1 border-b border-b-gray-400' />
      </View>
      <SocialAuthBtns />
    </>
  );
};

export default LoginForm;
