// Acciones para sincronizar el carrito con la base de datos o sesión
const API_BASE = 'http://localhost:4000/api';

export const syncCartAction = async (items) => {
  try {
    const response = await fetch(`${API_BASE}/cart/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error en syncCartAction:', error);
    throw error;
  }
};
