import { View, Text } from "react-native";
import React, { forwardRef, ReactNode, useCallback } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";

type CustomBottomSheetProps = {
  children: ReactNode;
  snapPoints?: string[] | number[];
  enablePanDownToClose?: boolean;
  containerStyles?: string;
} & Partial<BottomSheetProps>;

const CustomBottomSheet = forwardRef<BottomSheet, CustomBottomSheetProps>(
  (props, ref) => {
    const {
      children,
      snapPoints = ["30%", "90%"],
      enablePanDownToClose = true,
      containerStyles,
      ...restProps
    } = props;

    const { colorScheme } = useColorScheme();

    const renderBackdrop = useCallback(
      (backdropProps: any) => (
        <BottomSheetBackdrop
          {...backdropProps}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      ),
      []
    );
    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={enablePanDownToClose}
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.backgroundSecondary
              : Colors.light.backgroundSecondary,
        }}
        handleIndicatorStyle={{
          backgroundColor:
            colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
        }}
        {...restProps}
      >
        <BottomSheetView className={containerStyles}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

CustomBottomSheet.displayName = "CustomBottomSheet";

export default CustomBottomSheet;
