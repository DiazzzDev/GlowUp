import React from 'react';
import { View, Text, TextInput } from 'react-native';

export const AuthInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  rightIcon = null,
  containerClassName = 'mb-4',
}) => {
  return (
    <View className={`w-full ${containerClassName}`}>
      {label ? (
        <Text className="text-[#1A2B29] text-sm font-semibold mb-1.5 ml-0.5">
          {label}
        </Text>
      ) : null}
      <View className="flex-row items-center bg-white border border-[#D7EFEA] rounded-xl px-3.5 py-2.5">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8C9EA0"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          className="flex-1 text-[#1A2B29] text-base"
        />
        {rightIcon}
      </View>
    </View>
  );
};

export default AuthInput;
