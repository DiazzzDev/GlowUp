import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import CartItemCard from '../components/CartItemCard';
import useCart from '../hooks/useCart';

export const CartScreen = ({ navigation }) => {
  const { items, increment, decrement, subtotal } = useCart();

  const handleCheckout = () => {
    navigation.navigate('Checkout', { total: subtotal });
  };

  return (
    <View className="flex-1 bg-[#F0FBF9]">
      <StatusBar barStyle="dark-content" backgroundColor="#F0FBF9" />

      {/* Top Header */}
      <View className="flex-row items-center px-5 pt-12 pb-3 bg-[#F0FBF9]">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-9 h-9 rounded-full bg-white border border-[#D7EFEA] items-center justify-center mr-3"
        >
          <Text className="text-[#1A2B29] text-lg font-bold">‹</Text>
        </TouchableOpacity>
        <Text className="text-[#1A2B29] text-2xl font-extrabold">Mi carrito</Text>
      </View>

      {items.length === 0 ? (
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-[#1A2B29] text-lg font-bold mb-2">Tu carrito está vacío</Text>
          <Text className="text-[#8C9EA0] text-sm text-center mb-6">
            Explora nuestro catálogo y agrega los mejores productos para tu piel.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            className="bg-[#17C3B2] px-6 py-3 rounded-2xl"
          >
            <Text className="text-white font-bold">Ver Catálogo</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 justify-between">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 120 }}
          >
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onIncrement={increment}
                onDecrement={decrement}
              />
            ))}
          </ScrollView>

          {/* Sticky Checkout Bar */}
          <View className="bg-white border-t border-[#D7EFEA] p-5 pb-8 shadow-lg">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-[#8C9EA0] text-sm font-semibold">Subtotal</Text>
              <Text className="text-[#1A2B29] text-xl font-extrabold">
                ${subtotal.toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleCheckout}
              activeOpacity={0.85}
              className="w-full bg-[#17C3B2] py-4 rounded-2xl items-center shadow-md"
            >
              <Text className="text-white text-base font-bold">Ir a pagar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default CartScreen;
