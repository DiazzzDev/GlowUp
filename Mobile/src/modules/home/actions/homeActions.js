// Acciones de home para obtener promociones y productos destacados
const API_BASE = 'http://localhost:4000/api';

export const getHomeDataAction = async () => {
  const response = await fetch(`${API_BASE}/products`);
  return response.json();
};
