import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { GlobalStyles } from "utils/globalStyles";
import { cn } from "utils/cn";

type LinearGradViewProps = {
  children: ReactNode;
  containerStyles?: string;
};

const LinearGradView = ({ children, containerStyles }: LinearGradViewProps) => {
  return (
    <LinearGradient
      className={cn("rounded-3xl mb-6", containerStyles)}
      style={GlobalStyles.shadow}
      colors={["#2bace3", "#ce68f7", "#f9907f"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.8, y: 1.2 }}
      locations={[0, 0.6, 1]}
    >
      {children}
    </LinearGradient>
  );
};

export default LinearGradView;
