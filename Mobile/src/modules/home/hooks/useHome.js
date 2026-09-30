import useProducts from '../../products/hooks/useProducts';

export const useHome = () => {
  const productsState = useProducts();

  return {
    skinTypes: productsState.skinTypes,
    selectedSkinType: productsState.selectedType,
    setSelectedSkinType: productsState.setSelectedType,
    products: productsState.products,
    searchQuery: productsState.query,
    setSearchQuery: productsState.setQuery,
  };
};

export default useHome;
