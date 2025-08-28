import { TVariantProps } from "@/components/ui/UIButton";

export const capitalizeText = (text: string) => {
  return text.at(0)?.toUpperCase() + text.slice(1);
};

// helper functions for UIButton


export const getTextColorKey = ({ textColor, variant, type }: TVariantProps) => {
  if (textColor) return textColor;
  if (variant === "link") return "link";
  if (variant !== "fill" && type === "danger") return "danger";
  if (variant !== "fill" && type === "success") return "success";
  return "default";
};

