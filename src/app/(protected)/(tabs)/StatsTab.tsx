import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { View, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import UIText from "@/components/ui/UIText";
import UIButton from "@/components/ui/UIButton";

type TMode = "date" | "time" | "datetime" | "countdown";

export default function TabTwoScreen() {
  const { colorScheme } = useColorScheme();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState<TMode>("date");

  const onChange = (e: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setShow(false);
    }
  };

  const showMode = (modeToShow: TMode) => {
    setMode(modeToShow);
    setShow(true);
  };

  return (
    <View className="flex-1 items-center justify-center">
      {Platform.OS === "android" && (
        <View>
          <UIButton onPress={() => showMode("date")}>Show date picker</UIButton>
        </View>
      )}
      {Platform.OS === "android" && (
        <View>
          <UIButton onPress={() => showMode("time")}>Show time picker</UIButton>
        </View>
      )}
      {Platform.OS === "ios" && (
        <View>
          <DateTimePicker
            style={{ width: "auto" }}
            value={date}
            mode={mode}
            onChange={onChange}
          />
        </View>
      )}

      {show && <DateTimePicker value={date} mode={mode} onChange={onChange} />}
      <UIText>{date.toString()}</UIText>
    </View>
  );
}

{
  /* <SafeAreaView className="bg-bgColor dark:bg-darkBgColor flex-1 items-center justify-center"> */
}
{
  /*   <StatusBar style={colorScheme === "dark" ? "light" : "dark"} /> */
}
{
  /*   <UIText variant={"headerLg"}>Analytics</UIText> */
}
{
  /*   <View> */
}
{
  /*     <Seperator /> */
}
{
  /*   </View> */
}
{
  /*   <UIText>Coming soon...</UIText> */
}
{
  /* </SafeAreaView> */
}
