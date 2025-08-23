import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome";

export type TFontAwesomeIconProps = {
  name: React.ComponentProps<typeof FontAwesome6>["name"];
  color?: React.ComponentProps<typeof FontAwesome6>["color"];
  size?: React.ComponentProps<typeof FontAwesome6>["size"];
};

export default function FontAwesomeIcon({
  name = "home",
  size = 24,
  color = "#000000",
}: TFontAwesomeIconProps) {
  return <FontAwesome6 name={name} color={color} size={size} />;
}
