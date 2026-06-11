import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import imagenFondo from '../assets/login/fondo.png';

const VerifyCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verification, setVerification] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Si no llega el email por el navigate, lo dejamos vacío
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('registerToken'); 

    if (!token) {
      setError('La sesión de registro ha expirado. Por favor, vuelve a registrarte.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/client-auth/verify', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ verification })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Código incorrecto o expirado');

      // Limpio el token al terminar
      localStorage.removeItem('registerToken');
      setSuccess('¡Cuenta verificada exitosamente!');
      
      // Espero 2 segundos antes de mandar al login
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.tarjeta}>
        <h2 style={styles.titulo}>Verifica tu cuenta</h2>
        <p style={styles.subtitulo}>Hemos enviado un código a: <strong>{email}</strong></p>
        
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            type="text" 
            placeholder="Código de 6 caracteres" 
            value={verification} 
            onChange={(e) => setVerification(e.target.value)} 
            style={styles.input} 
            required 
          />
          <button type="submit" style={styles.boton}>Verificar Código</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundImage: `url(${imagenFondo})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Poppins', sans-serif" },
  tarjeta: { backgroundColor: '#F0FBF9', padding: '40px', borderRadius: '40px', width: '100%', maxWidth: '400px', boxShadow: '0px 15px 35px rgba(0,0,0,0.1)', textAlign: 'center' },
  titulo: { color: '#2A4D46', fontSize: '24px', fontWeight: '700', marginBottom: '10px' },
  subtitulo: { fontSize: '14px', color: '#555', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '15px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '18px', textAlign: 'center', outline: 'none', backgroundColor: '#FFFFFF' },
  boton: { backgroundColor: '#17C3B2', color: 'white', padding: '14px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer' },
  error: { color: 'red', fontSize: '14px' },
  success: { color: 'green', fontSize: '14px' }
};

export default VerifyCode;