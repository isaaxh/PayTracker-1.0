import React, { useState } from "react";
import { View, Pressable, Platform } from "react-native";
import { Control, Controller } from "react-hook-form";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useColorScheme } from "nativewind";

import { TTransaction } from "@/constants/TransactionsTypes";

import Colors from "@/constants/Colors";
import { cn } from "utils/cn";
import { convertToTimezone, formatDate } from "utils/dateHelperFn";

import RenderIcon from "./RenderIcon";
import UIText from "./ui/UIText";

type CustomDateTimePickerProps = {
  date: string;
  mode: TMode;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  control: Control<TTransaction>;
  placeholder?: string;
  icon?: string;
};

export type TMode = "date" | "time" | "datetime" | "countdown";

// in the project date is stored as ISOString
// datePicker requires Date obj so inject Date here
// convert return date to string

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = (
  props: CustomDateTimePickerProps
) => {
  const { control, date, setDate, mode, placeholder } = props;
  const [dateString, setDateString] = useState("");
  const [show, setShow] = useState(false);

  const { colorScheme } = useColorScheme();

  const showOverlay = () => {
    setShow(true);
  };

  return (
    <Controller
      name='date'
      control={control}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <View className='flex-row items-center px-5 py-3 mb-3 space-x-6 rounded-md bg-bgSecondaryColor dark:bg-darkBgSecondaryColor'>
            <RenderIcon
              iconLibrary='iconsax'
              iconProps={{
                name: mode === "time" ? "clock" : "calender",
                color:
                  colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
              }}
            />
            {Platform.OS !== "ios" && (
              <Pressable
                onPress={showOverlay}
                className='flex-row items-center w-full'
              >
                {dateString ? (
                  <UIText>{dateString}</UIText>
                ) : (
                  <UIText textStyles='text-tintLight dark:text-tintDark'>
                    {placeholder}
                  </UIText>
                )}
              </Pressable>
            )}
            {(show || Platform.OS === "ios") && (
              <DateTimePicker
                value={new Date(date)}
                mode={mode}
                display='default'
                themeVariant={colorScheme}
                style={{
                  /* backgroundColor: "red", */
                  paddingLeft: 0,
                }}
                onChange={(
                  event: DateTimePickerEvent,
                  selectedDate: Date | undefined
                ) => {
                  setShow(false);
                  if (event.type === "set" && selectedDate) {
                    onChange(convertToTimezone(selectedDate, 3).toISOString());
                    setDate(convertToTimezone(selectedDate, 3).toISOString());
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
              variant='bodySm'
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
