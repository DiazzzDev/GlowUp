import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi'; // Asegúrate de tener instalado react-icons

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    setIsOpen(false);
  };

  if (!user) return <span onClick={() => navigate('/login')} style={{cursor: 'pointer'}}>👤</span>;

  return (
    <div style={{ position: 'relative' }}>
      {/* Contenedor que cambia entre la imagen o el icono si no hay foto */}
      <div style={styles.avatarContainer} onClick={() => setIsOpen(!isOpen)}>
        {user.image ? (
          <img src={user.image} alt="Perfil" style={styles.avatarImg} />
        ) : (
          <FiUser style={styles.avatarIcon} />
        )}
      </div>
      
      {isOpen && (
        <div style={styles.dropdown}>
          <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>{user.firstName} {user.lastName}</p>
          <p style={{ fontSize: '12px', marginBottom: '10px' }}>{user.email}</p>
          
          {/* Aquí podrías agregar en el futuro un botón para ir a editar perfil */}
          <button style={styles.editBtn} onClick={() => alert('Próximamente: Editar Perfil')}>
            Editar Perfil
          </button>
          
          <hr style={{ margin: '10px 0' }} />
          <button onClick={handleLogout} style={styles.logoutBtn}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  avatarContainer: { 
    width: '35px', 
    height: '35px', 
    borderRadius: '8px', 
    backgroundColor: '#fff', 
    border: '1px solid #ddd',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    cursor: 'pointer',
    overflow: 'hidden'
  },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
  avatarIcon: { fontSize: '20px', color: '#2A4D46' },
  dropdown: { 
    position: 'absolute', right: 0, top: '45px', backgroundColor: 'white', 
    padding: '15px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', 
    zIndex: 1000, width: '180px', color: '#2A4D46', textAlign: 'center' 
  },
  editBtn: { 
    backgroundColor: '#f0f0f0', color: '#2A4D46', border: 'none', 
    padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '11px', marginBottom: '5px' 
  },
  logoutBtn: { 
    backgroundColor: '#ff4d4d', color: 'white', border: 'none', 
    padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', width: '100%', fontSize: '12px' 
  }
};

export default UserMenu;