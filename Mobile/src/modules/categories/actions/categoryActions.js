// Acciones de categorías
const API_BASE = 'http://localhost:4000/api';

export const fetchCategoriesAction = async () => {
  try {
    const response = await fetch(`${API_BASE}/categories`);
    return await response.json();
  } catch (error) {
    console.error('Error en fetchCategoriesAction:', error);
    throw error;
  }
};
