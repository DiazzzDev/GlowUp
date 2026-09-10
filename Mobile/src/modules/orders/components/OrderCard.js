import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export const OrderCard = ({ order, onPress }) => {
  const isPending = order.status === 'En camino';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(order)}
      className="bg-white border border-[#D7EFEA] rounded-3xl p-4 mb-4 shadow-xs"
    >
      {/* Top row: Order id, date, and status badge */}
      <View className="flex-row justify-between items-center mb-3">
        <View>
          <Text className="text-[#1A2B29] text-base font-extrabold">
            Pedido #{order.id}
          </Text>
          <Text className="text-[#8C9EA0] text-xs mt-0.5">{order.date}</Text>
        </View>

        <View
          className={`px-3 py-1 rounded-full ${
            isPending ? 'bg-[#17C3B2]/15 border border-[#17C3B2]/40' : 'bg-gray-100 border border-gray-300'
          }`}
        >
          <Text
            className={`text-xs font-bold ${
              isPending ? 'text-[#17C3B2]' : 'text-gray-600'
            }`}
          >
            {order.status}
          </Text>
        </View>
      </View>

      {/* Row of product thumbnails */}
      <View className="flex-row items-center gap-2 mb-3">
        {order.itemsPreview.map((imgUrl, index) => (
          <View
            key={index}
            className="w-12 h-12 rounded-xl bg-[#F0FBF9] border border-[#D7EFEA] overflow-hidden justify-center items-center"
          >
            <Image
              source={{ uri: imgUrl }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        ))}

        {order.remainingCount > 0 && (
          <View className="w-12 h-12 rounded-xl bg-[#E0F7F5] border border-[#17C3B2]/30 items-center justify-center">
            <Text className="text-[#17C3B2] text-xs font-extrabold">
              +{order.remainingCount}
            </Text>
          </View>
        )}
      </View>

      {/* Footer: total products and price */}
      <View className="flex-row justify-between items-center pt-2 border-t border-[#F0FBF9]">
        <Text className="text-[#8C9EA0] text-xs font-semibold">
          {order.totalItems} productos
        </Text>
        <View className="flex-row items-center">
          <Text className="text-[#1A2B29] text-sm font-extrabold mr-2">
            ${Number(order.totalPrice).toFixed(2)}
          </Text>
          <Text className="text-[#8C9EA0] text-base font-bold">›</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
