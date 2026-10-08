import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const CategoryListItem = ({ category, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress(category)}
      className="flex-row items-center justify-between bg-white border border-[#D7EFEA] rounded-2xl p-4 mb-3 shadow-xs"
    >
      <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-xl bg-[#E0F7F5] items-center justify-center mr-3.5">
          <Text className="text-[#17C3B2] text-lg font-bold">✨</Text>
        </View>
        <View>
          <Text className="text-[#1A2B29] text-base font-bold">
            {category.name}
          </Text>
          <Text className="text-[#8C9EA0] text-xs mt-0.5">
            {category.count} productos
          </Text>
        </View>
      </View>

      <Text className="text-[#8C9EA0] text-xl font-bold">›</Text>
    </TouchableOpacity>
  );
};

export default CategoryListItem;
