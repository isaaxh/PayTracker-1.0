import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <View className='flex-row items-center flex-1 px-3 py-3.5 bg-bgSecondaryColor dark:bg-darkBgSecondaryColor rounded-xl'>
      <Ionicons name='search' size={20} color='#888' />
      <TextInput
        className='flex-1 px-2 text-base leading-[20px] text-black dark:text-white'
        placeholder='Search transactions...'
        autoCapitalize='none'
        autoCorrect={false}
        placeholderTextColor='#A0A0A0'
        value={value}
        onChangeText={onChange}
        returnKeyType='done'
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Ionicons name='close-circle' size={20} color='#888' />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
