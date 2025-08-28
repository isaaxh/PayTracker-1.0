import { TouchableOpacity, View, Text } from "react-native";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import RenderIcon from "./RenderIcon";
import UIText from "./ui/UIText";

const NotificationButton = () => {
  const { colorScheme } = useColorScheme();
  const notificationCounter = 4;
  return (
    <Link href='/(protected)/NotificationScreen' asChild>
      <TouchableOpacity className='items-center justify-center inline-block p-2 bg-bgSecondaryColor dark:bg-darkBgSecondaryColor rounded-xl'>
        <RenderIcon
          iconLibrary='iconsax'
          iconProps={{
            name: "notification",
            size: 26,
            color:
              colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
          }}
        />
        {notificationCounter && (
          <View className='absolute items-center justify-center w-5 h-5 rounded-full bg-danger top-0.5 right-0.5 shrink-0 grow-0'>
            <UIText variant={"bodySm"} textStyles='text-white'>
              {notificationCounter}
            </UIText>
          </View>
        )}
      </TouchableOpacity>
    </Link>
  );
};

export default NotificationButton;
