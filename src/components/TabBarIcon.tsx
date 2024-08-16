import { Setting } from "iconsax-react-native";
import { Grid2 } from "iconsax-react-native";
import { StatusUp } from "iconsax-react-native";
import { Profile } from "iconsax-react-native";
import { EmojiHappy } from "iconsax-react-native";
import { ComponentProps } from "react";

type TabBarIconProps = {
  name: string;
  variant?: ComponentProps<typeof Grid2>["variant"];
  size?: ComponentProps<typeof Grid2>["size"];
  color?: ComponentProps<typeof Grid2>["color"];
};

export default function TabBarIcon({
  name,
  variant = "Bold",
  size = 28,
  color = "#eee",
}: TabBarIconProps) {
  let IconComponent = null;
  switch (name) {
    case "grid":
      IconComponent = Grid2;
      break;
    case "status up":
      IconComponent = StatusUp;
      break;
    case "setting":
      IconComponent = Setting;
      break;
    case "profile":
      IconComponent = Profile;
      break;
  }

  return IconComponent ? (
    <IconComponent size={size} variant={variant} color={color} />
  ) : (
    <EmojiHappy size="24" variant="Bold" color={color} />
  );
}
