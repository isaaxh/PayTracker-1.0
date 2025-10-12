import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Platform, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query ?? "");

  const handleChange = (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      router.setParams({ query: undefined });
    }
  };

  const handleSubmit = () => {
    if (query.trim()) {
      router.setParams({ query });
    }
  };

  const handleClear = () => {
    setQuery("");
    router.setParams({ query: undefined });
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
        value={query}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmit}
        returnKeyType='search'
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <Ionicons name='close-circle' size={20} color='#888' />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
