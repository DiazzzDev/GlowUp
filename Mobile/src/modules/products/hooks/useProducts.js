import { useState } from 'react';
import { PRODUCTS, SKIN_TYPES } from '../../../constants/mockData';

export const useProducts = () => {
  const [allProducts] = useState(PRODUCTS);
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filtered = allProducts.filter((item) => {
    const matchesSkin = selectedType === 'all' || item.skinType === selectedType;
    const matchesSearch =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.brand.toLowerCase().includes(query.toLowerCase());
    return matchesSkin && matchesSearch;
  });

  return {
    query,
    setQuery,
    selectedType,
    setSelectedType,
    skinTypes: SKIN_TYPES,
    products: filtered,
  };
};

export default useProducts;
