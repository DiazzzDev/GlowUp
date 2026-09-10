import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';

export const OrderSuccessScreen = ({ route, navigation }) => {
  const date = route?.params?.date || '02/02/2026';
  const time = route?.params?.time || '10:15 AM';
  const total = route?.params?.total || 49.99;

  return (
    <View className="flex-1 bg-white justify-between px-6 py-16">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Spacer */}
      <View />

      {/* Center Success Card exactly as in user image */}
      <View className="items-center">
        {/* Teal Checkmark Circle */}
        <View className="w-24 h-24 rounded-full border-4 border-[#17C3B2] bg-[#E0F7F5] items-center justify-center mb-6 shadow-sm">
          <Text className="text-[#17C3B2] text-4xl font-black">✓</Text>
        </View>

        <Text className="text-[#1A2B29] text-3xl font-extrabold mb-1 text-center">
          ¡Gracias!
        </Text>
        <Text className="text-[#8C9EA0] text-base font-medium mb-8 text-center">
          Tu pago fue exitoso
        </Text>

        {/* Invoice Summary Box */}
        <View className="w-full bg-[#F0FBF9] border border-[#D7EFEA] rounded-3xl p-6">
          <View className="flex-row justify-between py-2 border-b border-[#D7EFEA]">
            <Text className="text-[#8C9EA0] text-sm font-semibold">Fecha</Text>
            <Text className="text-[#1A2B29] text-sm font-bold">{date}</Text>
          </View>

          <View className="flex-row justify-between py-2 border-b border-[#D7EFEA]">
            <Text className="text-[#8C9EA0] text-sm font-semibold">Hora</Text>
            <Text className="text-[#1A2B29] text-sm font-bold">{time}</Text>
          </View>

          <View className="flex-row justify-between pt-3">
            <Text className="text-[#1A2B29] text-base font-extrabold">Total</Text>
            <Text className="text-[#17C3B2] text-xl font-black">
              ${Number(total).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Button: Seguir comprando */}
      <View className="w-full">
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeTab')}
          activeOpacity={0.85}
          className="w-full bg-[#17C3B2] py-4 rounded-2xl items-center shadow-md"
        >
          <Text className="text-white text-base font-bold">
            Seguir comprando
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderSuccessScreen;
