// Acciones de marca (About Us y Contacto)
const API_BASE = 'http://localhost:4000/api';

export const sendContactMessageAction = async (contactData) => {
  const response = await fetch(`${API_BASE}/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contactData) });
  return response.json();
};
