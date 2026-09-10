// Acciones para consultar catálogo de productos y detalles
const API_BASE = 'http://localhost:4000/api';

export const fetchProductsAction = async () => {
  try {
    const response = await fetch(`${API_BASE}/products`);
    return await response.json();
  } catch (error) {
    console.error('Error en fetchProductsAction:', error);
    throw error;
  }
};

export const fetchProductByIdAction = async (productId) => {
  try {
    const response = await fetch(`${API_BASE}/products/${productId}`);
    return await response.json();
  } catch (error) {
    console.error('Error en fetchProductByIdAction:', error);
    throw error;
  }
};
