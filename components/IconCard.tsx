import UIButton from "./ui/UIButton";
import { TIconProps } from "./Icon";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";

type IconCardProps = {
  iconName: TIconProps["name"];
  iconSize?: TIconProps["size"];
  iconColor?: TIconProps["color"];
};
/* "#18181b" */
const IconCard = (props: IconCardProps) => {
  const { colorScheme } = useColorScheme();
  const {
    iconName,
    iconSize = 24,
    iconColor = colorScheme === "dark" ? Colors.dark.tint : "#18181b",
  } = props;
  return (
    <>
      <UIButton
        variant="icon"
        iconName={iconName}
        iconSize={iconSize}
        iconColor={iconColor}
        containerStyles="flex-1 justify-center"
        buttonStyles="bg-gray-200 dark:bg-darkBgSecondaryColor flex-1 items-center mx-2"
      />
    </>
  );
};

export default IconCard;
