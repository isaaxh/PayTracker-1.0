import Colors from "@/constants/Colors";
import FontAwesomeIcon, { type TFontAwesomeIconProps } from "./FontAwesomeIcon";
import IconsaxIcon, { TIconsaxIconProps } from "./IconsaxIcon";
import { useColorScheme } from "nativewind";

export type RenderIconProps =
  | {
      iconLibrary: "fontAwesome";
      iconProps: TFontAwesomeIconProps;
    }
  | {
      iconLibrary: "iconsax";
      iconProps: TIconsaxIconProps;
    };

const RenderIcon = ({ iconLibrary, iconProps }: RenderIconProps) => {
  const { colorScheme } = useColorScheme();

  if (iconLibrary === "iconsax")
    return (
      <IconsaxIcon
        color={colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint}
        size={26}
        {...iconProps}
      />
    );
  if (iconLibrary === "fontAwesome")
    return (
      <FontAwesomeIcon
        color={colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint}
        size={26}
        {...iconProps}
      />
    );

  return null;
};

export default RenderIcon;
