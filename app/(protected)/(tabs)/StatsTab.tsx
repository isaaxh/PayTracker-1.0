import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { View, Text, Platform, ScrollView } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import UIText from "components/ui/UIText";
import UIButton from "components/ui/UIButton";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import RenderIcon from "@/components/RenderIcon";

type TMode = "date" | "time" | "datetime" | "countdown";

export default function TabTwoScreen() {
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
    <SafeAreaView className=''>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <View className='items-center mt-6 space-y-3'>
          <UIButton
            variant={"icon"}
            iconLibrary='fontAwesome'
            iconProps={{ name: "dollar" }}
            size={"small"}
            primary
          />
          <UIButton variant={"link"} size={"small"}>
            Default Button
          </UIButton>
          <UIButton
            variant={"iconText"}
            textSize={"default"}
            iconLibrary='fontAwesome'
            iconProps={{ name: "address-book" }}
            primary
          >
            Default Button color
          </UIButton>

          <UIButton variant={"outline"} size={"default"} type={"danger"}>
            Large Button
          </UIButton>
          <UIButton>Address Book test</UIButton>
          <UIButton
            variant='iconText'
            iconLibrary='fontAwesome'
            iconProps={{ name: "address-book" }}
            type={"danger"}
          >
            Address Book test
          </UIButton>
        </View>

        {/* {Platform.OS === "android" && (
          <View>
            <UIButton onPress={() => showMode("date")}>
              Show date picker
            </UIButton>
          </View>
        )}
        {Platform.OS === "android" && (
          <View>
            <UIButton onPress={() => showMode("time")}>
              Show time picker
            </UIButton>
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
        )} */}

        {/* {show && (
          <DateTimePicker value={date} mode={mode} onChange={onChange} />
        )}
        <Text style={{ color: Colors.success }}>{date.toString()}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
}

{
  /* <SafeAreaView className="items-center justify-center flex-1 bg-bgColor dark:bg-darkBgColor"> */
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
