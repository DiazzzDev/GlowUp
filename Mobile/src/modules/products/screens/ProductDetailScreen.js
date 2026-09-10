import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

export const ProductDetailScreen = ({ route, navigation }) => {
  const product = route?.params?.product || {
    name: 'Hidratante facial CeraVe',
    category: 'Hidratantes',
    price: 15.0,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80',
    description: 'Fórmula enriquecida con 3 ceramidas esenciales y ácido hialurónico para restaurar la barrera protectora de la piel.',
    brand: 'CeraVe',
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Bar with Back Button */}
      <View className="flex-row items-center justify-between px-5 pt-12 pb-3 bg-white border-b border-[#F0FBF9]">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-10 h-10 rounded-full bg-[#F0FBF9] border border-[#D7EFEA] items-center justify-center"
        >
          <Text className="text-[#1A2B29] text-xl font-bold">‹</Text>
        </TouchableOpacity>
        <Text className="text-[#1A2B29] text-base font-bold">Detalle del Producto</Text>
        <View className="w-10" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Large Product Image */}
        <View className="w-full h-72 bg-[#F0FBF9] items-center justify-center p-6">
          <Image
            source={{ uri: product.image }}
            className="w-full h-full rounded-2xl"
            resizeMode="cover"
          />
        </View>

        {/* Content */}
        <View className="p-6">
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1 pr-4">
              <Text className="text-[#17C3B2] text-xs font-bold uppercase tracking-wider">
                {product.brand || 'Glow Up'} • {product.category}
              </Text>
              <Text className="text-[#1A2B29] text-2xl font-extrabold mt-1">
                {product.name}
              </Text>
            </View>
            <Text className="text-[#17C3B2] text-2xl font-extrabold">
              ${Number(product.price).toFixed(2)}
            </Text>
          </View>

          {/* Rating */}
          <View className="flex-row items-center bg-[#F0FBF9] self-start px-3 py-1.5 rounded-full mb-5 border border-[#D7EFEA]">
            <Text className="text-[#17C3B2] text-xs font-bold mr-1.5">★ 4.9</Text>
            <Text className="text-[#8C9EA0] text-xs font-medium">(120 reseñas)</Text>
          </View>

          {/* Description */}
          <Text className="text-[#1A2B29] text-sm font-bold mb-2">Descripción</Text>
          <Text className="text-[#8C9EA0] text-sm leading-relaxed mb-6">
            {product.description}
          </Text>

          {/* Benefits */}
          <View className="bg-[#E0F7F5]/50 border border-[#D7EFEA] rounded-2xl p-4 mb-6">
            <Text className="text-[#17C3B2] text-xs font-bold mb-2 uppercase">Beneficios clave</Text>
            <Text className="text-[#1A2B29] text-xs mb-1">• Dermatológicamente testeado</Text>
            <Text className="text-[#1A2B29] text-xs mb-1">• Libre de parabenos y crueldad animal</Text>
            <Text className="text-[#1A2B29] text-xs">• Apto para pieles sensibles</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Action */}
      <View className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-[#D7EFEA] flex-row items-center gap-3">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cart');
          }}
          activeOpacity={0.85}
          className="flex-1 bg-[#17C3B2] py-4 rounded-2xl items-center shadow-md"
        >
          <Text className="text-white text-base font-bold">Agregar al Carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;
