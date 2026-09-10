import { useState } from 'react';
import { loginAction, registerAction, verifyCodeAction } from '../actions/authActions';

export const useAuth = (navigation) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    name: 'Usuario Demo',
    email: 'usuario@glowup.sv',
  });

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // Simula o llama a la acción
      // const res = await loginAction(email, password);
      setTimeout(() => {
        setLoading(false);
        setUser({ name: email.split('@')[0] || 'Usuario', email });
        if (navigation) navigation.navigate('MainTabs');
      }, 500);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Credenciales incorrectas');
    }
  };

  const handleRegister = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      // const res = await registerAction(formData);
      setTimeout(() => {
        setLoading(false);
        if (navigation) navigation.navigate('VerifyCode', { email: formData.email });
      }, 600);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Error al crear cuenta');
    }
  };

  const handleVerifyCode = async (email, code) => {
    setLoading(true);
    setError(null);
    try {
      // const res = await verifyCodeAction(email, code);
      setTimeout(() => {
        setLoading(false);
        if (navigation) navigation.navigate('MainTabs');
      }, 600);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Código inválido');
    }
  };

  const handleLogout = () => {
    setUser(null);
    if (navigation) navigation.navigate('Welcome');
  };

  return {
    loading,
    error,
    user,
    handleLogin,
    handleRegister,
    handleVerifyCode,
    handleLogout,
  };
};

export default useAuth;
