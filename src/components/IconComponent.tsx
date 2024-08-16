import { Setting } from "iconsax-react-native";
import { Grid2 } from "iconsax-react-native";
import { StatusUp } from "iconsax-react-native";
import { Profile } from "iconsax-react-native";
import { EmojiHappy } from "iconsax-react-native";
import { ArrowUp } from "iconsax-react-native";
import { ArrowDown } from "iconsax-react-native";
import { Ticket } from "iconsax-react-native";
import { GasStation } from "iconsax-react-native";
import { Heart } from "iconsax-react-native";
import { Mobile } from "iconsax-react-native";
import { Element3 } from "iconsax-react-native";
import { ComponentProps } from "react";

type IconComponentProps = {
  name: string;
  variant?: ComponentProps<typeof Grid2>["variant"];
  size?: ComponentProps<typeof Grid2>["size"];
  color?: ComponentProps<typeof Grid2>["color"];
};

export default function Icon({
  name,
  variant = "Bold",
  size = 24,
  color = "#eee",
}: IconComponentProps) {
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
    case "arrow up":
      IconComponent = ArrowUp;
      break;
    case "arrow down":
      IconComponent = ArrowDown;
      break;
    case "ticket":
      IconComponent = Ticket;
      break;
    case "gas station":
      IconComponent = GasStation;
      break;
    case "heart":
      IconComponent = Heart;
      break;
    case "element3":
      IconComponent = Element3;
      break;
    case "mobile":
      IconComponent = Mobile;
      break;
  }

  return IconComponent ? (
    <IconComponent size={size} variant={variant} color={color} />
  ) : (
    <EmojiHappy size="24" variant="Bold" color={color} />
  );
}
