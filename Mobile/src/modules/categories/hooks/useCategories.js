import { useState } from 'react';
import { CATEGORIES } from '../../../constants/mockData';

export const useCategories = () => {
  const [categories] = useState(CATEGORIES);
  const [search, setSearch] = useState('');

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return {
    categories: filtered,
    search,
    setSearch,
  };
};

export default useCategories;
