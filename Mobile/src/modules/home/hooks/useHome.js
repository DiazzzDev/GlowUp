import { useState } from 'react';
import { PRODUCTS, SKIN_TYPES } from '../../../constants/mockData';

export const useHome = () => {
  const [selectedSkinType, setSelectedSkinType] = useState('all');
  const [products] = useState(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((item) => {
    const matchesSkin =
      selectedSkinType === 'all' || item.skinType === selectedSkinType;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSkin && matchesQuery;
  });

  return {
    skinTypes: SKIN_TYPES,
    selectedSkinType,
    setSelectedSkinType,
    products: filteredProducts,
    searchQuery,
    setSearchQuery,
  };
};

export default useHome;
