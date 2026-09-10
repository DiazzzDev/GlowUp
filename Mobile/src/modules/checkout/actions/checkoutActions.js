// Acciones de pago y creación de orden
const API_BASE = 'http://localhost:4000/api';

export const createOrderAction = async (orderPayload) => {
  try {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload),
    });
    return await response.json();
  } catch (error) {
    console.error('Error en createOrderAction:', error);
    throw error;
  }
};
