import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ELIMINÉ EL IMPORT DEL HEADER porque ahora viene desde App.jsx

const Checkout = () => {
  const navigate = useNavigate();
  const [isFinished, setIsFinished] = useState(false);
  const orderNumber = "ORD-" + Math.floor(Math.random() * 90000 + 10000);

  const handlePayment = (e) => {
    e.preventDefault();
    // Aquí podrías validar que los inputs no estén vacíos
    setIsFinished(true);
  };

  if (isFinished) {
    // VISTA DE PAGO COMPLETADO (image_0212b6.png)
    return (
      <div style={styles.page}>
        {/* ELIMINÉ EL HEADER DE AQUÍ */}
        <div style={styles.successContainer}>
          <div style={styles.checkIcon}>✔</div>
          <h2 style={styles.successTitle}>Pago Completado con Éxito</h2>
          <p style={styles.successText}>Tu orden ha sido confirmada. Gracias por confiar en Glow Up SV.</p>
          <div style={styles.orderCard}>
            <p style={styles.orderLabel}>Tu número de orden es:</p>
            <h3 style={styles.orderNumber}>{orderNumber}</h3>
          </div>
          <button onClick={() => navigate('/inicio')} style={styles.btnHome}>Volver a Inicio</button>
        </div>
      </div>
    );
  }

  // VISTA DE FORMULARIO (image_021272.png)
  return (
    <div style={styles.page}>
      {/* ELIMINÉ EL HEADER DE AQUÍ */}
      <div style={styles.container}>
        <div style={styles.layout}>
          <section style={styles.formSection}>
            <h1 style={styles.title}>Pago con tarjeta</h1>
            <form onSubmit={handlePayment} style={styles.form}>
              <input type="text" placeholder="Nombre del Titular" required style={styles.input} />
              <input type="text" placeholder="Número de tarjeta" required style={styles.input} />
              <div style={styles.rowFlex}>
                <input type="text" placeholder="MM/AA" required style={styles.inputMitad} />
                <input type="text" placeholder="CVC" required style={styles.inputMitad} />
              </div>
              <button type="submit" style={styles.btnFinalPay}>Pagar $78.99</button>
            </form>
          </section>
          
          <aside style={styles.miniSummary}>
            {/* Resumen de compra de la derecha */}
            <div style={styles.summaryCard}>
              <h3 style={styles.summaryTitle}>Resumen de compra</h3>
              <div style={styles.summaryProduct}>
                <p>Protector Solar Ultra Sport</p>
                <p>$30.99</p>
              </div>
              <div style={styles.summaryProduct}>
                <p>Crema Limpiadora</p>
                <p>$22.99</p>
              </div>
              <div style={styles.summaryDivider}></div>
              <div style={styles.summaryTotal}>
                <p style={styles.totalLabel}>Total</p>
                <p style={styles.totalPrice}>$78.98</p>
              </div>
              <p style={styles.summaryNote}>Envío gratis incluido</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const styles = {
  // Estilos generales
  page: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#FFFFFF',
    minHeight: '100vh',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  layout: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
  },
  formSection: {
    flex: '1.5',
    minWidth: '300px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1A2B29',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #E5E4E7',
    marginBottom: '15px',
    backgroundColor: '#F8F9FA',
    fontSize: '14px',
    fontFamily: "'Poppins', sans-serif",
    outline: 'none',
  },
  rowFlex: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  inputMitad: {
    flex: '1',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #E5E4E7',
    backgroundColor: '#F8F9FA',
    fontSize: '14px',
    fontFamily: "'Poppins', sans-serif",
    outline: 'none',
  },
  btnFinalPay: {
    width: '100%',
    backgroundColor: '#17C3B2',
    color: 'white',
    border: 'none',
    padding: '18px',
    borderRadius: '35px',
    fontWeight: '800',
    fontSize: '18px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  // Estilos del resumen de compra (sidebar)
  miniSummary: {
    flex: '1',
    minWidth: '280px',
  },
  summaryCard: {
    backgroundColor: '#F8FEFD',
    borderRadius: '20px',
    padding: '25px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  },
  summaryTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1A2B29',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #E5E4E7',
  },
  summaryProduct: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
    fontSize: '14px',
    color: '#1A2B29',
  },
  summaryDivider: {
    height: '1px',
    backgroundColor: '#E5E4E7',
    margin: '15px 0',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  totalLabel: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#1A2B29',
  },
  totalPrice: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#17C3B2',
  },
  summaryNote: {
    fontSize: '12px',
    color: '#6B6375',
    textAlign: 'center',
    marginTop: '15px',
  },
  // Estilos del mensaje de éxito (image_0212b6.png)
  successContainer: {
    textAlign: 'center',
    padding: '100px 20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  checkIcon: {
    backgroundColor: '#17C3B2',
    color: 'white',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    marginBottom: '20px',
  },
  successTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1A2B29',
    marginBottom: '15px',
  },
  successText: {
    color: '#6B6375',
    marginBottom: '30px',
  },
  orderCard: {
    backgroundColor: '#F0FBF9',
    padding: '20px 40px',
    borderRadius: '15px',
    margin: '30px 0',
  },
  orderLabel: {
    color: '#6B6375',
    fontSize: '14px',
  },
  orderNumber: {
    color: '#17C3B2',
    fontSize: '24px',
    fontWeight: '800',
    marginTop: '5px',
  },
  btnHome: {
    backgroundColor: '#17C3B2',
    color: 'white',
    border: 'none',
    padding: '15px 40px',
    borderRadius: '30px',
    fontWeight: '700',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default Checkout;