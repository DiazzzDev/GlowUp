// Acciones para obtener órdenes e historial de compras
const API_BASE = 'http://localhost:4000/api';

export const fetchOrdersAction = async () => {
  try {
    const response = await fetch(`${API_BASE}/orders/customer`);
    return await response.json();
  } catch (error) {
    console.error('Error en fetchOrdersAction:', error);
    throw error;
  }
};
