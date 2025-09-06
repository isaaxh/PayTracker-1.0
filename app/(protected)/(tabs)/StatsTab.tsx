import { View } from "react-native";
import UIText from "components/ui/UIText";
import { SafeAreaView } from "react-native-safe-area-context";
import Chart from "@/components/Chart";

export default function TabTwoScreen() {
  return (
    <SafeAreaView className='flex-1 bg-bgColor dark:bg-darkBgColor'>
      <View className='w-full px-8 pt-6 pb-2'>
        <UIText variant={"headingXL"}>Financial Stats</UIText>
      </View>
      <Chart />
    </SafeAreaView>
  );
}
