import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import OrderCard from '../components/OrderCard';
import useOrders from '../hooks/useOrders';

const FILTER_OPTIONS = ['Todos', 'En camino', 'Entregados'];

export const OrdersScreen = ({ navigation }) => {
  const { orders, filter, setFilter } = useOrders();

  const handleOrderPress = (order) => {
    // Navigate or view detail
  };

  return (
    <View className="flex-1 bg-[#F0FBF9]">
      <StatusBar barStyle="dark-content" backgroundColor="#F0FBF9" />

      {/* Header */}
      <View className="px-5 pt-12 pb-2 bg-[#F0FBF9]">
        <Text className="text-[#1A2B29] text-2xl font-extrabold mb-3">
          Mis pedidos
        </Text>

        {/* Filter Pills from design */}
        <View className="flex-row gap-2 mb-3">
          {FILTER_OPTIONS.map((opt) => {
            const isSelected = filter === opt;
            return (
              <TouchableOpacity
                key={opt}
                onPress={() => setFilter(opt)}
                className={`px-4 py-2 rounded-full border ${
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
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 90 }}
      >
        {orders.length === 0 ? (
          <View className="py-16 items-center">
            <Text className="text-[#8C9EA0] text-sm">No tienes pedidos en esta categoría</Text>
          </View>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onPress={handleOrderPress}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default OrdersScreen;
