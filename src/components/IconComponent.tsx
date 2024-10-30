import {
  Setting,
  Grid2,
  StatusUp,
  Profile,
  EmojiHappy,
  ArrowUp,
  ArrowDown,
  ArrowCircleLeft2,
  ArrowCircleRight2,
  Ticket,
  GasStation,
  Heart,
  TaskSquare,
  Mobile,
  Category2,
  DocumentText,
  Calendar2,
  Element3,
  Global,
  DollarSquare,
  Sun1,
  Moon,
  Clock,
} from "iconsax-react-native";
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
  size = 26,
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
    case "arrow left":
      IconComponent = ArrowCircleLeft2;
      break;
    case "arrow right":
      IconComponent = ArrowCircleRight2;
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
    case "task":
      IconComponent = TaskSquare;
      break;
    case "category":
      IconComponent = Category2;
      break;
    case "document text":
      IconComponent = DocumentText;
      break;
    case "calender":
      IconComponent = Calendar2;
      break;
    case "global":
      IconComponent = Global;
      break;
    case "dollar":
      IconComponent = DollarSquare;
      break;
    case "moon":
      IconComponent = Moon;
      break;
    case "sun":
      IconComponent = Sun1;
      break;
    case "Clock":
      IconComponent = Clock;
      break;
  }

  return IconComponent ? (
    <IconComponent size={size} variant={variant} color={color} />
  ) : (
    <EmojiHappy size="24" variant="Bold" color={color} />
  );
}
