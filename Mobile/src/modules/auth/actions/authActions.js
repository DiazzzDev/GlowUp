// Acciones de autenticación para peticiones HTTP al backend
// Conectadas con los endpoints de login, register y verifyCode del backend
import { request } from '../../../utils/api';

export const loginAction = async (email, password) => {
  return request('/auth/customer/login', { method: 'POST', body: JSON.stringify({ email, password }) });
};

export const registerAction = async (userData) => {
  return request('/auth/customer/register', { method: 'POST', body: JSON.stringify(userData) });
};

export const verifyCodeAction = async (code) => request('/auth/customer/verify', { method: 'POST', body: JSON.stringify({ verification: code }) });
export const forgotPasswordAction = async (email) => request('/auth/customer/password/forgot', { method: 'POST', body: JSON.stringify({ email }) });
export const resetPasswordAction = async (code, password) => request('/auth/customer/password/reset', { method: 'POST', body: JSON.stringify({ code, password }) });
