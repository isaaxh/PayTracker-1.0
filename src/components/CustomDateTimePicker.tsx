import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { formatDate } from "@/utils/dateHelperFn";
import IconComponent from "./IconComponent";
import UIText from "./ui/UIText";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";

type CustomDateTimePickerProps = {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  placeholder?: string;
};

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = (
  props: CustomDateTimePickerProps,
) => {
  const { date = new Date(), setDate } = props;
  const [dateString, setDateString] = useState(
    formatDate(props.date ?? new Date()),
  );
  const [show, setShow] = useState<boolean>(false);

  const { colorScheme } = useColorScheme();

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    setShow(false);
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      setDateString(formatDate(selectedDate));
    }
  };

  const showOverlay = () => {
    setShow(true);
  };

  return (
    <View className="bg-bgSecondaryColor dark:bg-darkBgSecondaryColor px-5 py-3 space-x-6 rounded-md flex-row">
      <IconComponent
        name="calender"
        color={colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint}
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
          is24Hour={false}
          display="default"
          onChange={onChange}
          style={{ backgroundColor: "white" }}
          maximumDate={new Date()}
          timeZoneName={"Asia/Riyadh"}
        />
      )}
    </View>
  );
};

export default CustomDateTimePicker;
