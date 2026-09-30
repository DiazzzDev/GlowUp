import { useState } from 'react';
import { forgotPasswordAction, loginAction, registerAction, resetPasswordAction, verifyCodeAction } from '../actions/authActions';
import { useApp } from '../../../context/AppContext';
import { validateLogin, validateRegistration } from '../../../utils/validation';

export const useAuth = (navigation) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setCustomer } = useApp();

  const handleLogin = async (email, password) => {
    const validationError = validateLogin({ email, password });
    if (validationError) { setError(validationError); return false; }
    setLoading(true);
    setError(null);
    try {
      const response = await loginAction(email, password);
      setCustomer(response.customer);
      if (navigation) {navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });}
      return true;
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas');
      return false;
    } finally { setLoading(false); }
  };

  const handleRegister = async (formData) => {
    const validationError = validateRegistration(formData);
    if (validationError) { setError(validationError); return false; }
    setLoading(true);
    setError(null);
    try {
      await registerAction(formData);
      if (navigation) {navigation.navigate('VerifyCode', { email: formData.email });}
      return true;
    } catch (err) {
      setError(err.message || 'Error al crear cuenta');
      return false;
    } finally { setLoading(false); }
  };

  const handleVerifyCode = async (email, code) => {
    setLoading(true);
    setError(null);
    try {
      if (!/^[a-f0-9]{6}$/i.test(code)) {throw new Error('Ingresa el código de 6 caracteres recibido.');}
      await verifyCodeAction(code);
      if (navigation) {navigation.navigate('Login');}
      return true;
    } catch (err) {
      setError(err.message || 'Código inválido');
      return false;
    } finally { setLoading(false); }
  };

  const handleLogout = () => {
    setCustomer(null);
    if (navigation) {navigation.navigate('Welcome');}
  };

  const handleForgotPassword = async (email) => {
    const validationError = validateLogin({ email, password: 'placeholder' });
    if (validationError) { setError(validationError); return false; }
    setLoading(true); setError(null);
    try { await forgotPasswordAction(email); return true; } catch (err) { setError(err.message); return false; } finally { setLoading(false); }
  };
  const handleResetPassword = async (code, password) => {
    setLoading(true); setError(null);
    try { await resetPasswordAction(code, password); return true; } catch (err) { setError(err.message); return false; } finally { setLoading(false); }
  };

  return {
    loading,
    error,
    handleLogin,
    handleRegister,
    handleVerifyCode,
    handleLogout,
    handleForgotPassword,
    handleResetPassword,
  };
};

export default useAuth;
