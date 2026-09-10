import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native';
import useCheckout from '../hooks/useCheckout';

export const CheckoutScreen = ({ route, navigation }) => {
  const total = route?.params?.total || 49.99;
  const { loading, paymentMethod, setPaymentMethod, address, setAddress, processPayment } = useCheckout(navigation);

  return (
    <View className="flex-1 bg-[#F0FBF9]">
      <StatusBar barStyle="dark-content" backgroundColor="#F0FBF9" />

      {/* Header */}
      <View className="flex-row items-center px-5 pt-12 pb-3 bg-[#F0FBF9]">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-9 h-9 rounded-full bg-white border border-[#D7EFEA] items-center justify-center mr-3"
        >
          <Text className="text-[#1A2B29] text-lg font-bold">‹</Text>
        </TouchableOpacity>
        <Text className="text-[#1A2B29] text-2xl font-extrabold">Finalizar Compra</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 110 }}
      >
        {/* Shipping Address */}
        <View className="bg-white p-5 rounded-3xl border border-[#D7EFEA] mb-4 shadow-xs">
          <Text className="text-[#1A2B29] text-sm font-bold mb-2">Dirección de Entrega</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Dirección completa"
            className="bg-[#F0FBF9] border border-[#D7EFEA] rounded-xl px-3.5 py-2.5 text-xs text-[#1A2B29]"
          />
        </View>

        {/* Payment Methods */}
        <View className="bg-white p-5 rounded-3xl border border-[#D7EFEA] mb-4 shadow-xs">
          <Text className="text-[#1A2B29] text-sm font-bold mb-3">Método de Pago</Text>
          
          <TouchableOpacity
            onPress={() => setPaymentMethod('card')}
            className={`flex-row items-center justify-between p-3.5 rounded-2xl border mb-2.5 ${
              paymentMethod === 'card'
                ? 'bg-[#E0F7F5] border-[#17C3B2]'
                : 'bg-white border-[#D7EFEA]'
            }`}
          >
            <View className="flex-row items-center">
              <Text className="text-xl mr-2.5">💳</Text>
              <Text className="text-[#1A2B29] text-sm font-bold">Tarjeta de Crédito / Débito</Text>
            </View>
            <View className={`w-4 h-4 rounded-full border-2 items-center justify-center ${paymentMethod === 'card' ? 'border-[#17C3B2]' : 'border-[#8C9EA0]'}`}>
              {paymentMethod === 'card' && <View className="w-2 h-2 rounded-full bg-[#17C3B2]" />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setPaymentMethod('cash')}
            className={`flex-row items-center justify-between p-3.5 rounded-2xl border ${
              paymentMethod === 'cash'
                ? 'bg-[#E0F7F5] border-[#17C3B2]'
                : 'bg-white border-[#D7EFEA]'
            }`}
          >
            <View className="flex-row items-center">
              <Text className="text-xl mr-2.5">💵</Text>
              <Text className="text-[#1A2B29] text-sm font-bold">Pago contra entrega</Text>
            </View>
            <View className={`w-4 h-4 rounded-full border-2 items-center justify-center ${paymentMethod === 'cash' ? 'border-[#17C3B2]' : 'border-[#8C9EA0]'}`}>
              {paymentMethod === 'cash' && <View className="w-2 h-2 rounded-full bg-[#17C3B2]" />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View className="bg-white p-5 rounded-3xl border border-[#D7EFEA] shadow-xs">
          <Text className="text-[#1A2B29] text-sm font-bold mb-3">Resumen del Pedido</Text>
          <View className="flex-row justify-between mb-1.5">
            <Text className="text-[#8C9EA0] text-xs">Subtotal productos</Text>
            <Text className="text-[#1A2B29] text-xs font-semibold">${Number(total).toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mb-2 pb-2 border-b border-[#F0FBF9]">
            <Text className="text-[#8C9EA0] text-xs">Envío (El Salvador)</Text>
            <Text className="text-[#17C3B2] text-xs font-bold">GRATIS</Text>
          </View>
          <View className="flex-row justify-between pt-1">
            <Text className="text-[#1A2B29] text-base font-extrabold">Total a Pagar</Text>
            <Text className="text-[#17C3B2] text-xl font-extrabold">${Number(total).toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Confirm Button */}
      <View className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-[#D7EFEA]">
        <TouchableOpacity
          onPress={() => processPayment(total)}
          disabled={loading}
          activeOpacity={0.85}
          className="w-full bg-[#17C3B2] py-4 rounded-2xl items-center shadow-md"
        >
          <Text className="text-white text-base font-bold">
            {loading ? 'Procesando Pago...' : 'Confirmar y Pagar'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckoutScreen;
