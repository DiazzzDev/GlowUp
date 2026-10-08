import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import SearchBar from '../components/SearchBar';
import CategoryPills from '../../home/components/CategoryPills';
import ProductCard from '../../home/components/ProductCard';
import useProducts from '../hooks/useProducts';

export const SearchProductsScreen = ({ navigation }) => {
  const { query, setQuery, selectedType, setSelectedType, skinTypes, products } = useProducts();

  const handleViewProduct = (product) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <View className="flex-1 bg-[#F0FBF9]">
      <StatusBar barStyle="dark-content" backgroundColor="#F0FBF9" />

      {/* Header */}
      <View className="px-5 pt-12 pb-2 bg-[#F0FBF9]">
        <Text className="text-[#1A2B29] text-2xl font-extrabold mb-3">
          Explorar Productos
        </Text>

        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={() => setQuery('')}
          placeholder="Buscar categoría o producto..."
        />

        {/* Filter Pills from design */}
        <CategoryPills
          categories={skinTypes}
          selectedCategory={selectedType}
          onSelect={setSelectedType}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}
      >
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-[#8C9EA0] text-xs font-semibold">
            {products.length} productos disponibles
          </Text>
        </View>

        {/* 2-Column Grid */}
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

export default SearchProductsScreen;
