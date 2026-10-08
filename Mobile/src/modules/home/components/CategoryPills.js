import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';

export const CategoryPills = ({ categories, selectedCategory, onSelect }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row py-2 mb-4"
    >
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelect(cat.id)}
            activeOpacity={0.8}
            className={`px-4 py-2 rounded-full mr-2.5 border ${
              isSelected
                ? 'bg-[#17C3B2] border-[#17C3B2]'
                : 'bg-white border-[#D7EFEA]'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                isSelected ? 'text-white' : 'text-[#1A2B29]'
              }`}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default CategoryPills;
