// Acciones de autenticación para peticiones HTTP al backend
// Conectadas con los endpoints de login, register y verifyCode del backend
const API_BASE = 'http://localhost:4000/api/auth';

export const loginAction = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE}/customer/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error en loginAction:', error);
    throw error;
  }
};

export const registerAction = async (userData) => {
  try {
    const response = await fetch(`${API_BASE}/customer/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error en registerAction:', error);
    throw error;
  }
};

export const verifyCodeAction = async (email, code) => {
  try {
    const response = await fetch(`${API_BASE}/customer/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error en verifyCodeAction:', error);
    throw error;
  }
};
