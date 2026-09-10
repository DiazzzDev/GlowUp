// Acciones de home para obtener promociones y productos destacados
const API_BASE = 'http://localhost:4000/api';

export const getHomeDataAction = async () => {
  try {
    const response = await fetch(`${API_BASE}/products`);
    return await response.json();
  } catch (error) {
    console.error('Error en getHomeDataAction:', error);
    throw error;
  }
};
