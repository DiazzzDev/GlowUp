import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Corregimos la ruta del logo para que coincida con tu carpeta assets/index
import glowUpLogo from '../assets/index/glowup_logo.png'; 
import { FiShoppingCart, FiUser } from 'react-icons/fi'; 

const Header = () => {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      {/* Navegación izquierda: Inicio, Quienes somos y Contactanos */}
      <nav style={styles.navIzquierda}>
        <Link to="/inicio" style={{ ...styles.link, color: '#17C3B2', fontWeight: 'bold' }}>Inicio</Link>
        <Link to="/about-us" style={styles.link}>Quienes somos</Link>
        <Link to="/contact-us" style={styles.link}>Contáctanos</Link>
      </nav>

      {/* Logo central: Al hacer clic te regresa al Inicio */}
      <div style={styles.logoContenedor} onClick={() => navigate('/inicio')}>
        <img src={glowUpLogo} alt="Glow Up SV" style={styles.logoImagen} />
      </div>

      {/* Iconos derechos: Carrito y Usuario */}
      <div style={styles.iconosDerecha}>
        {/* Este icono te lleva directo a la pantalla de Tu Carrito de Compras */}
        <FiShoppingCart 
          style={styles.icono} 
          onClick={() => navigate('/cart')} 
        />
        <FiUser style={styles.icono} />
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 5%',
    backgroundColor: '#FFFFFF',
    fontFamily: "'Poppins', sans-serif",
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  navIzquierda: { 
    display: 'flex', 
    gap: '20px',
    flex: 1 
  },
  link: { 
    textDecoration: 'none', 
    color: '#1A2B29', 
    fontSize: '14px',
    transition: 'color 0.3s ease'
  },
  logoContenedor: { 
    flex: 1, 
    display: 'flex', 
    justifyContent: 'center',
    cursor: 'pointer'
  },
  logoImagen: { 
    height: '35px', 
    width: 'auto' 
  },
  iconosDerecha: { 
    display: 'flex', 
    gap: '20px',
    flex: 1,
    justifyContent: 'flex-end'
  },
  icono: { 
    fontSize: '22px', 
    color: '#1A2B29', 
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  },
};

export default Header;