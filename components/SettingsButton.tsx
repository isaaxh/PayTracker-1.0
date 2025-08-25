import { TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import RenderIcon from "./RenderIcon";

const SettingsButton = () => {
  const { colorScheme } = useColorScheme();
  return (
    <Link href='/(protected)/SettingScreen' asChild>
      <TouchableOpacity className='bg-bgSecondaryColor dark:bg-darkBgSecondaryColor p-2 rounded-xl inline-block justify-center items-center'>
        <RenderIcon
          iconLibrary='iconsax'
          iconProps={{
            name: "setting",
            size: 26,
            color:
              colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
          }}
        />
      </TouchableOpacity>
    </Link>
  );
};

export default SettingsButton;
