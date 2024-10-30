import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { convertToTimezone, formatDate } from "@/utils/dateHelperFn";
import IconComponent from "./IconComponent";
import UIText from "./ui/UIText";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";
import { Control, Controller } from "react-hook-form";
import { TTransaction } from "@/constants/Transactions";
import { cn } from "@/utils/cn";
import { Timestamp } from "firebase/firestore";

type CustomDateTimePickerProps = {
  date: Date;
  mode: TMode;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  control: Control<TTransaction>;
  placeholder?: string;
  icon?: string;
};

export type TMode = "date" | "time" | "datetime" | "countdown";

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = (
  props: CustomDateTimePickerProps,
) => {
  const { control, date, setDate, mode } = props;
  const [dateString, setDateString] = useState("");
  const [show, setShow] = useState(false);

  const { colorScheme } = useColorScheme();

  const showOverlay = () => {
    setShow(true);
  };

  return (
    <Controller
      name="date"
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <View className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row items-center rounded-md  px-5 py-3 mb-3 space-x-6">
            <IconComponent
              name={mode === "time" ? "Clock" : "calender"}
              color={
                colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint
              }
            />
            {Platform.OS !== "ios" && (
              <Pressable
                onPress={showOverlay}
                className="flex-row w-full items-center"
              >
                {dateString ? (
                  <UIText>{dateString}</UIText>
                ) : (
                  <UIText textStyles="text-tintLight dark:text-tintDark">
                    {props.placeholder}
                  </UIText>
                )}
              </Pressable>
            )}
            {(show || Platform.OS === "ios") && (
              <DateTimePicker
                value={date}
                mode={mode}
                display="default"
                themeVariant={colorScheme}
                style={{
                  /* backgroundColor: "red", */
                  paddingLeft: 0,
                }}
                onChange={(
                  event: DateTimePickerEvent,
                  selectedDate: Date | undefined,
                ) => {
                  setShow(false);
                  if (event.type === "set" && selectedDate) {
                    onChange(
                      Timestamp.fromDate(convertToTimezone(selectedDate, 3)),
                    );
                    setDate(convertToTimezone(selectedDate, 3));
                    setDateString(formatDate(selectedDate, mode));
                  }
                }}
                maximumDate={new Date()}
                timeZoneName={"Asia/Riyadh"}
              />
            )}
          </View>
          {error && (
            <UIText
              variant="bodyText"
              textStyles={cn("text-left ml-2 self-stretch text-red-400")}
            >
              {error.message}
            </UIText>
          )}
        </>
      )}
    />
  );
};

export default CustomDateTimePicker;
