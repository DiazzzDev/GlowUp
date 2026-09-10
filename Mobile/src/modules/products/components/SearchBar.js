import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Buscar categoría o producto...',
  onClear,
}) => {
  return (
    <View className="flex-row items-center bg-white border border-[#D7EFEA] rounded-2xl px-4 py-2.5 shadow-xs mb-3">
      <Text className="text-[#17C3B2] text-base mr-2">🔍</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8C9EA0"
        className="flex-1 text-[#1A2B29] text-sm"
      />
      {value ? (
        <TouchableOpacity onPress={onClear}>
          <Text className="text-[#8C9EA0] text-sm font-bold ml-2">✕</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchBar;
