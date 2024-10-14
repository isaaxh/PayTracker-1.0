import React, { useState } from "react";
import { I18nManager, StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import IconComponent from "../IconComponent";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import UIText from "./UIText";

type UIDropDownProps<T extends FieldValues> = {
  data: dataItemType[];
  name: Path<T>;
  control: Control<T>;
  iconName?: string;
  placeholder?: string;
};

type dataItemType = {
  label: string;
  value: string;
};

const UIDropDown = <T extends FieldValues>(props: UIDropDownProps<T>) => {
  const { data, name, control, iconName, placeholder } = props;
  const [isFocus, setIsFocus] = useState(false);
  const { colorScheme } = useColorScheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
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
              color:
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
            }}
            placeholderStyle={{
              ...styles.placeholderStyle,
              color:
                colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
            }}
            selectedTextStyle={{
              ...styles.selectedTextStyle,
              color:
                colorScheme === "dark" ? Colors.dark.text : Colors.light.text,
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
            onBlur={() => {
              onBlur();
              setIsFocus(false);
            }}
            onChange={(item) => {
              onChange(item.value);
              setIsFocus(false);
            }}
            renderLeftIcon={
              I18nManager.isRTL
                ? () => null
                : () => (
                    <View className="mr-6">
                      <IconComponent
                        name={iconName ?? ""}
                        color={
                          colorScheme === "dark"
                            ? Colors.dark.tint
                            : Colors.light.tint
                        }
                      />
                    </View>
                  )
            }
            renderRightIcon={
              !I18nManager.isRTL
                ? () => null
                : () => (
                    <View className="mr-6">
                      <IconComponent
                        name={iconName ?? ""}
                        color={
                          colorScheme === "dark"
                            ? Colors.dark.tint
                            : Colors.light.tint
                        }
                      />
                    </View>
                  )
            }
          />
          {error && (
            <UIText
              variant="bodyText"
              textStyles={"text-left ml-2 self-stretch text-red-400"}
            >
              {error.message}
            </UIText>
          )}
        </View>
      )}
    />
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
