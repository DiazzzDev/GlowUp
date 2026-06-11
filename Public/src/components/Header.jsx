import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import glowUpLogo from '../assets/index/glowup_logo.png'; 
import { FiShoppingCart } from 'react-icons/fi'; 
import UserMenu from './UserMenu'; 

const Header = () => {
  const navigate = useNavigate();

  return (
    <header style={styles.header}>
      {/* Navegación izquierda */}
      <nav style={styles.navIzquierda}>
        <Link to="/inicio" style={{ ...styles.link, color: '#17C3B2', fontWeight: 'bold' }}>Inicio</Link>
        <Link to="/about-us" style={styles.link}>Quienes somos</Link>
        <Link to="/contact-us" style={styles.link}>Contáctanos</Link>
      </nav>

      {/* Logo central */}
      <div style={styles.logoContenedor} onClick={() => navigate('/inicio')}>
        <img src={glowUpLogo} alt="Glow Up SV" style={styles.logoImagen} />
      </div>

      {/* Iconos derechos */}
      <div style={styles.iconosDerecha}>
        <FiShoppingCart 
          style={styles.icono} 
          onClick={() => navigate('/cart')} 
        />
        
        {/* aqui esta usermenu */}
        <div style={styles.contenedorUsuario}>
            <UserMenu />
        </div>
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
  navIzquierda: { display: 'flex', gap: '20px', flex: 1 },
  link: { textDecoration: 'none', color: '#1A2B29', fontSize: '14px', transition: 'color 0.3s ease' },
  logoContenedor: { flex: 1, display: 'flex', justifyContent: 'center', cursor: 'pointer' },
  logoImagen: { height: '35px', width: 'auto' },
  iconosDerecha: { display: 'flex', gap: '20px', flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  icono: { fontSize: '22px', color: '#1A2B29', cursor: 'pointer' },
  contenedorUsuario: { display: 'flex', alignItems: 'center' }
};

export default Header;