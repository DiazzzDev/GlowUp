import React from "react";
import { useNavigate } from "react-router-dom";
// ELIMINÉ EL IMPORT DEL HEADER porque ahora viene desde App.jsx

// Corregido: Usando el estándar de nombre_marca.png y la ruta plana de screens
import imgRetinol from "../assets/products/retinol_nivea.png"; 

const Cart = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* ELIMINÉ EL HEADER DE AQUÍ */}
      <div style={styles.content}>
        <h2 style={styles.title}>Tu Carrito</h2>
        <div style={styles.cartItem}>
          <img src={imgRetinol} alt="Retinol Nivea" style={styles.productImg} />
          <div style={styles.details}>
            <h3 style={styles.productTitle}>Retinol Nivea</h3>
            <p style={styles.productDesc}>Tratamiento Renovador Nocturno</p>
            <span style={styles.price}>$28.50</span>
          </div>
        </div>
        <button onClick={() => navigate('/checkout')} style={styles.btnCheckout}>
          Ir a Pagar
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    fontFamily: "'Poppins', sans-serif", 
    minHeight: '100vh',
    backgroundColor: '#FFFFFF',
  },
  content: { 
    padding: '40px 10%', 
    maxWidth: '1200px', 
    margin: '0 auto' 
  },
  title: { 
    fontSize: '28px', 
    fontWeight: '800', 
    marginBottom: '30px',
    color: '#1A2B29',
  },
  cartItem: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '20px', 
    padding: '20px', 
    border: '1px solid #eee', 
    borderRadius: '15px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
  },
  productImg: { 
    width: '100px', 
    height: '100px', 
    objectFit: 'contain' 
  },
  details: { 
    flex: 1 
  },
  productTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1A2B29',
    marginBottom: '5px',
  },
  productDesc: {
    fontSize: '14px',
    color: '#6B6375',
    marginBottom: '8px',
  },
  price: { 
    fontWeight: '700', 
    color: '#17C3B2', 
    fontSize: '20px' 
  },
  btnCheckout: { 
    marginTop: '30px', 
    backgroundColor: '#17C3B2', 
    color: 'white', 
    border: 'none', 
    padding: '15px 40px', 
    borderRadius: '30px', 
    fontWeight: '700', 
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    width: '100%',
    maxWidth: '300px',
  }
};

export default Cart;