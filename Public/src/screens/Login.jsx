import React, { useState } from 'react';
// Importo el hook para poderme mover entre páginas
import { useNavigate } from 'react-router-dom'; 
// Mi imagen de fondo que está en assets
import imagenFondo from '../assets/login/fondo.png';

const Login = () => {
  // Los estados para guardar lo que escribo
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  
  // Activo la función de navegación
  const navigate = useNavigate(); 

  // Esta función se encarga de mandarme al Index cuando doy clic
  const manejarInicioSesion = (e) => {
    e.preventDefault();
    // Simulo que entro y me manda a la ruta /inicio que pusimos en el App.jsx
    navigate('/inicio'); 
  };

  return (
    // El contenedor con el fondo que ocupa toda la pantalla
    <div style={styles.loginContainer}>
      {/* Mi tarjeta blanca de login */}
      <div style={styles.tarjeta}>
        
        <h2 style={styles.titulo}>Bienvenido</h2>
        
        <form onSubmit={manejarInicioSesion} style={styles.formulario}>
          
          {/* El campo del correo */}
          <div style={styles.grupoInput}>
            <label style={styles.label}>Correo electrónico</label>
            <input
              type="email"
              placeholder="example@email.com"
              style={styles.input}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          {/* El campo de la contraseña */}
          <div style={styles.grupoInput}>
            <label style={styles.label}>Contraseña</label>
            <input
              type="password"
              placeholder="********"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* El botón con los colores que elegí */}
          <button type="submit" style={styles.boton}>
            Iniciar sesión
          </button>
          
        </form>
      </div>
    </div>
  );
};

// Mis estilos para que se vea igual al diseño
const styles = {
  // Contenedor principal con el fondo que ocupa TODA la pantalla
  loginContainer: {
    backgroundImage: `url(${imagenFondo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',      // Ancho total de la pantalla
    minHeight: '100vh',  // Alto total de la pantalla
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    fontFamily: "'Poppins', sans-serif",
  },
  tarjeta: {
    backgroundColor: '#F0FBF9',
    padding: '50px 40px',
    borderRadius: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0px 15px 35px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  titulo: {
    color: '#2A4D46',
    fontSize: '26px',
    fontWeight: '700',
    marginBottom: '35px',
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  grupoInput: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
    gap: '8px',
  },
  label: {
    color: '#2A4D46',
    fontSize: '14px',
    fontWeight: '600',
  },
  input: {
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
    color: '#2A4D46',
    outline: 'none',
    backgroundColor: '#FFFFFF',
  },
  boton: {
    backgroundColor: '#17C3B2',
    color: '#EFF4FB',
    padding: '14px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '15px',
    transition: 'background-color 0.3s ease',
  },
};

export default Login;