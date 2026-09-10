import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import SearchBar from '../../products/components/SearchBar';
import CategoryListItem from '../components/CategoryListItem';
import useCategories from '../hooks/useCategories';

export const CategoriesScreen = ({ navigation }) => {
  const { categories, search, setSearch } = useCategories();

  const handleSelectCategory = (category) => {
    navigation.navigate('Search', { category: category.name });
  };

  return (
    <View className="flex-1 bg-[#F0FBF9]">
      <StatusBar barStyle="dark-content" backgroundColor="#F0FBF9" />

      {/* Header */}
      <View className="px-5 pt-12 pb-3 bg-[#F0FBF9]">
        <Text className="text-[#1A2B29] text-2xl font-extrabold mb-3">
          Categorías
        </Text>

        <SearchBar
          value={search}
          onChangeText={setSearch}
          onClear={() => setSearch('')}
          placeholder="Buscar categoría..."
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 90 }}
      >
        <Text className="text-[#1A2B29] text-sm font-bold mb-3 mt-1">
          Explorar por categoría
        </Text>

        {categories.map((cat) => (
          <CategoryListItem
            key={cat.id}
            category={cat}
            onPress={handleSelectCategory}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesScreen;
