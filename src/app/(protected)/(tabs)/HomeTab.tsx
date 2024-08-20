import { StatusBar } from "expo-status-bar";
import HomeHeader from "@/components/HomeHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeBody from "@/components/HomeBody";
import { useColorScheme } from "nativewind";
import { useGlobal } from "@/hooks/useGlobal";
import { GlobalContextProps } from "@/services/providers/GlobalProvider";

function HomeTab() {
  const { colorScheme } = useColorScheme();

  const { language } = useGlobal() as GlobalContextProps;

  console.log(language);

  return (
    <SafeAreaView className="bg-bgColor dark:bg-darkBgColor flex-1 items-center">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <HomeHeader />
      <HomeBody />
    </SafeAreaView>
  );
}

export default HomeTab;
