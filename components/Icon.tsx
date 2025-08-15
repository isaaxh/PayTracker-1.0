import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome";

export type TIconProps = {
  name: React.ComponentProps<typeof FontAwesome6>["name"];
  color: React.ComponentProps<typeof FontAwesome6>["color"];
  size: React.ComponentProps<typeof FontAwesome6>["size"];
};

export default function Icon(props: TIconProps) {
  return <FontAwesome6 {...props} />;
}
