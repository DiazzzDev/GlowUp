import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export const CartItemCard = ({ item, onIncrement, onDecrement }) => {
  return (
    <View className="flex-row items-center bg-white border border-[#D7EFEA] rounded-2xl p-3 mb-3 shadow-xs">
      {/* Thumbnail */}
      <View className="w-16 h-16 bg-[#F0FBF9] rounded-xl overflow-hidden justify-center items-center mr-3.5">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Info */}
      <View className="flex-1">
        <Text className="text-[#1A2B29] text-sm font-bold">{item.name}</Text>
        <Text className="text-[#8C9EA0] text-xs mt-0.5">{item.category}</Text>
        <Text className="text-[#17C3B2] text-sm font-extrabold mt-1">
          ${Number(item.price).toFixed(2)}
        </Text>
      </View>

      {/* Quantity Stepper [-] Qty [+] */}
      <View className="flex-row items-center bg-[#F0FBF9] border border-[#D7EFEA] rounded-xl px-2 py-1">
        <TouchableOpacity
          onPress={() => onDecrement(item.id)}
          className="w-6 h-6 items-center justify-center rounded-lg"
        >
          <Text className="text-[#1A2B29] text-sm font-bold">−</Text>
        </TouchableOpacity>

        <Text className="text-[#1A2B29] text-xs font-bold px-2">
          {item.quantity}
        </Text>

        <TouchableOpacity
          onPress={() => onIncrement(item.id)}
          className="w-6 h-6 items-center justify-center rounded-lg"
        >
          <Text className="text-[#17C3B2] text-sm font-bold">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItemCard;
