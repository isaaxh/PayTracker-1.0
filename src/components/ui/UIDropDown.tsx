import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import IconComponent from "../IconComponent";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";

type UIDropDownProps = {
  data: dataItemType[];
  iconName?: string;
  placeholder?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

type dataItemType = {
  label: string;
  value: string;
};

const UIDropDown = (props: UIDropDownProps) => {
  const { data, iconName, placeholder, value, setValue } = props;
  const [isFocus, setIsFocus] = useState(false);
  const { colorScheme } = useColorScheme();

  return (
    <View className="mb-3">
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && {
            borderColor:
              colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
          },
          {
            backgroundColor:
              colorScheme === "dark"
                ? Colors.dark.backgroundSecondary
                : Colors.light.backgroundSecondary,
          },
        ]}
        containerStyle={{
          ...styles.containerStyle,
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.backgroundSecondary
              : Colors.light.backgroundSecondary,
        }}
        itemContainerStyle={{
          ...styles.itemContainerStyle,
        }}
        itemTextStyle={{
          color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
        }}
        placeholderStyle={{
          ...styles.placeholderStyle,
          color: colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
        }}
        selectedTextStyle={{
          ...styles.selectedTextStyle,
          color: colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
        }}
        activeColor={colorScheme === "dark" ? "#3f3f46" : Colors.light.tint}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        showsVerticalScrollIndicator={false}
        autoScroll={false}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder ?? "Select item" : "..."}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <View className="mr-6">
            <IconComponent
              name={iconName ?? ""}
              color={
                colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint
              }
            />
          </View>
        )}
      />
    </View>
  );
};

export default UIDropDown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  containerStyle: {
    borderColor: "transparent",
    backgroundColor: "#000000",
    borderRadius: 8,
  },
  dropdown: {
    height: 50,
    borderColor: "transparent",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  itemContainerStyle: {},
  icon: {
    marginRight: 15,
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
  },
  selectedTextStyle: {
    fontSize: 16,
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
