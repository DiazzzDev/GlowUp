import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import PromoBanner from '../components/PromoBanner';
import CategoryPills from '../components/CategoryPills';
import ProductCard from '../components/ProductCard';
import useHome from '../hooks/useHome';

export const HomeScreen = ({ navigation }) => {
  const { skinTypes, selectedSkinType, setSelectedSkinType, products } = useHome();

  const handleViewProduct = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <View className="flex-1 bg-[#F0FBF9]">
      <StatusBar barStyle="dark-content" backgroundColor="#F0FBF9" />
      
      {/* Top Header */}
      <View className="flex-row justify-between items-center px-5 pt-12 pb-3 bg-[#F0FBF9]">
        <View>
          <Text className="text-[#8C9EA0] text-xs font-semibold uppercase tracking-wider">
            Glow Up SV
          </Text>
          <View className="flex-row items-baseline">
            <Text className="text-[#1A2B29] text-xl font-medium">Bienvenido </Text>
            <Text className="text-[#17C3B2] text-xl font-bold">Usuario</Text>
          </View>
        </View>

        {/* User Avatar Circle from design */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Menu')}
          className="w-10 h-10 rounded-full bg-white border-2 border-[#17C3B2] justify-center items-center shadow-xs"
        >
          <Text className="text-[#17C3B2] text-base font-bold">U</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}
      >
        {/* Horizontal Category Pills */}
        <CategoryPills
          categories={skinTypes}
          selectedCategory={selectedSkinType}
          onSelect={setSelectedSkinType}
        />

        {/* Main Promo Banner */}
        <PromoBanner
          title="¡Kit de playa!"
          price="$20.00"
          onPress={() => navigation.navigate('Categories')}
        />

        {/* Secondary Promo Card */}
        <View className="flex-row bg-white border border-[#D7EFEA] rounded-2xl p-4 mb-5 items-center justify-between shadow-xs">
          <View className="flex-1 mr-3">
            <Text className="text-[#1A2B29] text-sm font-bold">¡Kit personal diario!</Text>
            <Text className="text-[#8C9EA0] text-xs mt-0.5">Rutina básica para todo tipo de piel</Text>
          </View>
          <View className="bg-[#17C3B2]/15 px-3 py-1.5 rounded-xl">
            <Text className="text-[#17C3B2] font-extrabold text-sm">$15.00</Text>
          </View>
        </View>

        {/* Section Header: Descubre para ti */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-[#1A2B29] text-base font-extrabold">
            Descubre para ti
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text className="text-[#17C3B2] text-xs font-bold">Ver todos</Text>
          </TouchableOpacity>
        </View>

        {/* 2-Column Product Grid */}
        <View className="flex-row flex-wrap -mx-1.5">
          {products.map((item) => (
            <View key={item.id} className="w-1/2">
              <ProductCard
                product={item}
                onViewDetails={handleViewProduct}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
