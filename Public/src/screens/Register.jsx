import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import imagenFondo from '../assets/login/fondo.png';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '' });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  const handleFileChange = (e) => { setImageFile(e.target.files[0]); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const dataToSend = new FormData();

      const customerData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      };

      dataToSend.append('customer', JSON.stringify(customerData));

      if (imageFile) {
        dataToSend.append('image', imageFile);
      }

      const response = await fetch('http://localhost:4000/api/auth/customer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify()
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar el cliente');
      }

      navigate('/verify-code', { state: { email: formData.email } });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.tarjeta}>
        <h2 style={styles.titulo}>Crear Cuenta</h2>
        {error && <p style={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.formulario}>
          <div style={styles.filaInput}>
            <input type="text" name="firstName" placeholder="Nombre" style={styles.inputPequeno} value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Apellido" style={styles.inputPequeno} value={formData.lastName} onChange={handleChange} required />
          </div>
          <input type="email" name="email" placeholder="Correo electrónico" style={styles.input} value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Teléfono" style={styles.input} value={formData.phone} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" style={styles.input} value={formData.password} onChange={handleChange} required />
          <div style={styles.grupoInput}>
            <label style={styles.labelFoto}>Foto de perfil (Opcional):</label>
            <input type="file" accept="image/*" onChange={handleFileChange} style={styles.inputFile} />
          </div>
          <button type="submit" style={styles.boton} disabled={loading}>{loading ? 'Registrando...' : 'Registrarse'}</button>
        </form>
        <p style={styles.switchText}>¿Ya tienes cuenta? <Link to="/login" style={styles.link}>Inicia sesión</Link></p>
      </div>
    </div>
  );
};

const styles = {
  loginContainer: { backgroundImage: `url(${imagenFondo})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: "'Poppins', sans-serif" },
  tarjeta: { backgroundColor: '#F0FBF9', padding: '40px 30px', borderRadius: '40px', width: '100%', maxWidth: '460px', boxShadow: '0px 15px 35px rgba(0,0,0,0.1)', textAlign: 'center' },
  titulo: { color: '#2A4D46', fontSize: '26px', fontWeight: '700', marginBottom: '25px' },
  formulario: { display: 'flex', flexDirection: 'column', gap: '15px' },
  filaInput: { display: 'flex', gap: '10px' },
  inputPequeno: { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px', outline: 'none', backgroundColor: '#FFFFFF' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '14px', outline: 'none', backgroundColor: '#FFFFFF' },
  grupoInput: { display: 'flex', flexDirection: 'column', textAlign: 'left', gap: '5px', marginTop: '5px' },
  labelFoto: { color: '#2A4D46', fontSize: '13px', fontWeight: '600' },
  inputFile: { fontSize: '13px', color: '#2A4D46' },
  boton: { backgroundColor: '#17C3B2', color: '#EFF4FB', padding: '14px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' },
  errorText: { color: 'red', fontSize: '14px', marginBottom: '10px' },
  switchText: { marginTop: '20px', fontSize: '14px', color: '#2A4D46' },
  link: { color: '#17C3B2', fontWeight: 'bold', textDecoration: 'none' }
};

export default Register;