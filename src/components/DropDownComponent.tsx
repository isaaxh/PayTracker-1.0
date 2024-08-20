import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";
import {
  currencyType,
  languageType,
} from "@/services/providers/GlobalProvider";

type DropdownProps<T> = {
  placeholder?: string;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  data: OptionType<T>[];
};

export type OptionType<T> = {
  label: string;
  value: T;
};

const DropDownComponent = <T extends string>(props: DropdownProps<T>) => {
  const { placeholder, value, setValue, data } = props;
  /* const [value, setValue] = useState<string | null>(null); */
  /* const { setLanguage, language } = useGlobal() as GlobalContextProps; */
  const [isFocus, setIsFocus] = useState(false);
  const { colorScheme } = useColorScheme();

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[
            styles.label,
            isFocus && {
              color:
                colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
            },
          ]}
        >
          Language
        </Text>
      );
    }
    return null;
  };

  return (
    <Dropdown
      style={[
        styles.dropdown,
        isFocus && {
          borderColor:
            colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
        },
      ]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      /* search */
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? placeholder ?? "Select item" : "..."}
      /* searchPlaceholder="Search..." */
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item: OptionType<T>) => {
        console.log(item);
        setValue(item.value);
        setIsFocus(false);
      }}
      /* renderLeftIcon={() => ( */
      /*   <AntDesign */
      /*     style={styles.icon} */
      /*     color={isFocus ? "blue" : "black"} */
      /*     name="Safety" */
      /*     size={20} */
      /*   /> */
      /* )} */
    />
  );
};
export default DropDownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 55,
    backgroundColor: Colors.dark.backgroundSecondary,
    borderColor: "transparent",
    borderWidth: 0.5,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginTop: 16,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.dark.text,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.dark.text,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
