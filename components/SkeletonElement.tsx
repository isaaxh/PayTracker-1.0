import React, { ReactNode } from "react";
import { useColorScheme } from "nativewind";

type SkeletonElementProps = {
  children: ReactNode;
};

const SkeletonElement = (props: SkeletonElementProps) => {
  const { children } = props;
  const { colorScheme } = useColorScheme();
  return <></>;
};

export default SkeletonElement;
