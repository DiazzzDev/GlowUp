// Acciones para actualizar configuración de usuario y preferencias
const API_BASE = 'http://localhost:4000/api';

export const updateSettingsAction = async (settings) => {
  try {
    const response = await fetch(`${API_BASE}/user/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    return await response.json();
  } catch (error) {
    console.error('Error en updateSettingsAction:', error);
    throw error;
  }
};
