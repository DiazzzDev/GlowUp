// Acciones de categorías
const API_BASE = 'http://localhost:4000/api';

export const fetchCategoriesAction = async () => {
  const response = await fetch(`${API_BASE}/categories`);
  return response.json();
};
