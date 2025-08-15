import React, { ReactChild, ReactNode } from "react";
import { useColorScheme } from "nativewind";

type SkeletonElementProps = {
  children: ReactChild;
};

const SkeletonElement = (props: SkeletonElementProps) => {
  const { children } = props;
  const { colorScheme } = useColorScheme();
  return <></>;
};

export default SkeletonElement;
