import { useEffect, useState } from 'react';
import { SKIN_TYPES } from '../../../constants/mockData';
import { fetchProductsAction } from '../actions/productActions';

const normalizeProduct = (product) => ({ ...product, id: product._id || product.id, name: product.productName || product.name, stock: Number(product.stock || 0) });

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchProductsAction().then((products) => setAllProducts(products.map(normalizeProduct))).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
  }, []);

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
    loading,
    error,
  };
};

export default useProducts;
