import { View } from "react-native";
import React from "react";
import UIText from "./ui/UIText";
import UIInput from "./ui/UIInput";
import UIButton from "./ui/UIButton";
import { useForm } from "react-hook-form";
import { TSignupSchema, signupSchema } from "@/utils/types";
import { useAuth } from "@/hooks/useAuth";
import { AuthContextProps } from "@/services/providers/AuthProvider";
import { Link } from "expo-router";
import IconCard from "./IconCard";
import { zodResolver } from "@hookform/resolvers/zod";

const SignupForm = () => {
  const { control, handleSubmit } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const { signup, loading } = useAuth() as AuthContextProps;

  const onSubmit = (data: TSignupSchema) => {
    signup({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <>
      <View className="mx-4 mt-6">
        <UIText variant="header">Create an account</UIText>
        <UIText textStyles="text-left mb-3" variant="bodyText">
          Enter your account details
        </UIText>
        <View className="mt-3">
          <UIInput
            name="name"
            control={control}
            placeholder="Enter full name here"
          />
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
          <UIInput
            name="confirmPassword"
            control={control}
            placeholder="Confirm password here"
            secureTextEntry={true}
            isPassword
          />
        </View>
      </View>
      <View className="justify-end items-center mb-6 mx-4 mt-auto">
        <UIButton
          onPress={handleSubmit(onSubmit)}
          size="large"
          buttonStyles="mx-0 mb-3"
          textStyles="bg-white"
          loading={loading}
        >
          Create Account
        </UIButton>
        <View className="flex-row items-center">
          <UIText variant="bodyText">Already have an account? </UIText>
          <Link href="/" asChild>
            <UIButton
              hitSlop={5}
              variant="bare"
              size="small"
              buttonStyles="p-0 m-0"
              textStyles="text-blue-500"
            >
              Log In
            </UIButton>
          </Link>
        </View>
      </View>
      <View className="flex-row justify-center items-center gap-3 px-6 mb-6">
        <View className="border-b flex-1 border-b-gray-400" />
        <UIText variant="bodyText">Or register with</UIText>
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

export default SignupForm;
