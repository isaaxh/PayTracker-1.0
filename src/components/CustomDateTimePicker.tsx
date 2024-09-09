import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
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

type CustomDateTimePickerProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  control: Control<TTransaction>;
  placeholder?: string;
};

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = (
  props: CustomDateTimePickerProps,
) => {
  const { control, date, setDate } = props;
  /* const [date, setDate] = useState(new Date()); */
  const [dateString, setDateString] = useState(formatDate(date));
  const [show, setShow] = useState<boolean>(false);

  const { colorScheme } = useColorScheme();

  /* const onChange = ( */
  /*   event: DateTimePickerEvent, */
  /*   selectedDate: Date | undefined, */
  /* ) => { */
  /*   setShow(false); */
  /*   if (event.type === "set" && selectedDate) { */
  /*     setDate(selectedDate); */
  /*     setDateString(formatDate(selectedDate)); */
  /*   } */
  /* }; */

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
        <View className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor flex-row rounded-md  px-5 py-3 mb-3 space-x-6">
          <IconComponent
            name="calender"
            color={
              colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint
            }
          />
          <TouchableOpacity
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
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={date}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={(
                event: DateTimePickerEvent,
                selectedDate: Date | undefined,
              ) => {
                setShow(false);
                if (event.type === "set" && selectedDate) {
                  onChange(convertToTimezone(selectedDate, 3));
                  setDate(convertToTimezone(selectedDate, 3));
                  setDateString(formatDate(selectedDate));
                }
              }}
              maximumDate={new Date()}
              timeZoneName={"Asia/Riyadh"}
            />
          )}
          <View>
            <Text>{error?.message}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default CustomDateTimePicker;
