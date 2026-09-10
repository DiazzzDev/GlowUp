// Acciones de marca (About Us y Contacto)
const API_BASE = 'http://localhost:4000/api';

export const sendContactMessageAction = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error en sendContactMessageAction:', error);
    throw error;
  }
};
