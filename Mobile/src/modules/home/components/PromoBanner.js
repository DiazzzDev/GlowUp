import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export const PromoBanner = ({ title = '¡Kit de playa!', price = '$20.00', onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      className="w-full bg-[#E0F7F5] rounded-3xl overflow-hidden border border-[#D7EFEA] mb-5 shadow-sm"
    >
      <View className="h-36 bg-[#D1EBE7] justify-center items-center relative overflow-hidden">
        {/* Placeholder or banner graphic */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80' }}
          className="w-full h-full absolute opacity-40"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-[#17C3B2]/20" />
        
        {/* Floating Tag */}
        <View className="absolute bottom-3 left-4 right-4 flex-row justify-between items-center bg-white/95 px-4 py-2.5 rounded-2xl shadow-sm">
          <Text className="text-[#1A2B29] text-base font-bold">
            {title}
          </Text>
          <View className="bg-[#17C3B2] px-3 py-1 rounded-full">
            <Text className="text-white text-sm font-extrabold">{price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PromoBanner;
