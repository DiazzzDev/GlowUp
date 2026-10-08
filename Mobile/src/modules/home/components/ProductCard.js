import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export const ProductCard = ({ product, onViewDetails, onAddToCart }) => {
  return (
    <View className="flex-1 bg-white border border-[#D7EFEA] rounded-2xl p-3 mb-3.5 mx-1.5 shadow-sm justify-between">
      {/* Product Image */}
      <View className="w-full h-28 bg-[#F0FBF9] rounded-xl overflow-hidden justify-center items-center mb-2.5">
        <Image
          source={{ uri: product.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Product Details */}
      <View>
        <Text
          numberOfLines={1}
          className="text-[#1A2B29] text-xs font-bold mb-0.5"
        >
          {product.name}
        </Text>
        <Text className="text-[#17C3B2] text-sm font-extrabold mb-2.5">
          ${Number(product.price).toFixed(2)}
        </Text>
      </View>

      {/* Button 'Ver' from the design */}
      <TouchableOpacity
        onPress={() => onViewDetails(product)}
        activeOpacity={0.8}
        className="w-full bg-[#17C3B2] py-2 rounded-xl items-center"
      >
        <Text className="text-white text-xs font-bold">Ver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
