import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import UIText from "@/components/ui/UIText";
import { useColorScheme } from "nativewind";
import Seperator from "@/components/Seperator";
import { View } from "react-native";

export default function TabTwoScreen() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaView className="bg-bgColor dark:bg-darkBgColor flex-1 items-center justify-center">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <UIText variant={"headerLg"}>Analytics</UIText>
      <View>
        <Seperator />
      </View>
      <UIText>Coming soon...</UIText>
    </SafeAreaView>
  );
}
