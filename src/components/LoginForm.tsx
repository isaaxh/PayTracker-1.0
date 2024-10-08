import { View, Text } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import UIInput from "./ui/UIInput";
import UIButton from "./ui/UIButton";
import { useForm } from "react-hook-form";
import { TLoginSchema, loginSchema } from "@/utils/types";
import { useAuth } from "@/hooks/useAuth";
import { AuthContextProps } from "@/services/providers/AuthProvider";
import { Link } from "expo-router";
import IconCard from "./IconCard";
import { zodResolver } from "@hookform/resolvers/zod";

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
      <View className="mx-4 mt-6">
        <UIText variant="header">Enter your email</UIText>
        <UIText textStyles="text-left mb-3" variant="bodyText">
          Enter your email to log in to your account
        </UIText>
        <View className="mt-3">
          <UIInput
            name="email"
            control={control}
            placeholder="Enter email here"
          />
          <UIInput
            name="password"
            control={control}
            placeholder="Enter password here"
            secureTextEntry={true}
            isPassword
          />
        </View>

        <View className="flex-row justify-between items-center px-1">
          <UIText variant="bodyText">Remember me</UIText>
          <Link href="/" asChild>
            <UIButton
              hitSlop={5}
              variant="bare"
              size="small"
              buttonStyles="p-0"
              textStyles="text-blue-500"
            >
              Forgot password?
            </UIButton>
          </Link>
        </View>
      </View>
      <View className="justify-end items-center mb-6 mx-4 mt-auto">
        <UIButton
          onPress={handleSubmit(onSubmit)}
          size="large"
          buttonStyles="mx-0 mb-3"
          loading={loading}
        >
          Login
        </UIButton>
        <View className="flex-row items-center">
          <UIText variant="bodyText">Don't have an account? </UIText>
          <Link href="/SignupScreen" asChild>
            <UIButton
              hitSlop={5}
              variant="bare"
              size="small"
              buttonStyles="p-0 m-0"
              textStyles="text-blue-500"
            >
              Sign Up
            </UIButton>
          </Link>
        </View>
      </View>
      <View className="flex-row justify-center items-center gap-3 px-6 mb-6">
        <View className="border-b flex-1 border-b-gray-400" />
        <UIText variant="bodyText">Or login with</UIText>
        <View className="border-b flex-1 border-b-gray-400" />
      </View>
      <View className="flex-row justify-center items-center mx-4 mb-8">
        <IconCard iconName="google" />
        <IconCard iconName="apple" />
        <IconCard iconName="facebook" />
      </View>
    </>
  );
};

export default LoginForm;
