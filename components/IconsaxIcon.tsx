import { ComponentProps } from "react";
import { EmojiHappy } from "iconsax-react-native";
import { iconRegistry, TIconsaxName } from "@/constants/index";

export type TIconsaxIconProps = {
  name: TIconsaxName;
  variant?: ComponentProps<typeof EmojiHappy>["variant"];
  size?: ComponentProps<typeof EmojiHappy>["size"];
  color?: ComponentProps<typeof EmojiHappy>["color"];
};

export default function IconsaxIcon({
  name,
  variant = "Bold",
  size = 26,
  color = "#eee",
}: TIconsaxIconProps) {
  const IconComponent = iconRegistry[name];

  return IconComponent ? (
    <IconComponent size={size} variant={variant} color={color} />
  ) : (
    <EmojiHappy size='24' variant='Bold' color={color} />
  );
}
