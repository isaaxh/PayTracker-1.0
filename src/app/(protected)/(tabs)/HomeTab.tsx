import { StatusBar } from "expo-status-bar";
import HomeHeader from "@/components/HomeHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeBody from "@/components/HomeBody";
import { useColorScheme } from "nativewind";
import Toast from "react-native-toast-message";

function HomeTab() {
  const { colorScheme } = useColorScheme();
  return (
    <SafeAreaView className="bg-bgColor dark:bg-darkBgColor flex-1 items-center">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <HomeHeader />
      <HomeBody />
      <Toast />
    </SafeAreaView>
  );
}

export default HomeTab;
