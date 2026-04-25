import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ELIMINÉ EL IMPORT DEL HEADER porque ahora viene desde App.jsx

// Usamos el hero del index como banner para la encuesta
import bannerSurvey from '../assets/index/hero_productos.png';

// PRODUCTOS CORREGIDOS: Con los nombres exactos de la carpeta assets/products
import prod1 from '../assets/products/protector_solar_ultra_sport_banana_boat.png';
import prod2 from '../assets/products/protector_solar_aerosol_banana_boat.png';
import prod3 from '../assets/products/crema_lavado_la_roche_posay.png';
import prod4 from '../assets/products/crema_correctora_la_roche_posay.png';

const Survey = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);

  const skinTypes = [
    "Piel Grasosa", "Piel Seca", "Piel Sensible", "Piel Brillosa",
    "Piel Áspera", "Piel con Ardor", "Piel con Picazón", "Piel Mixta"
  ];

  const goals = [
    "Control de Acné/Brillo", "Hidratación Intensa", "Protección Solar/Manchas", "Textura/Suavidad",
    "Piel Sensible/Rojeces", "Antiedad/Líneas de Expresión", "Limpieza de Poros/Puntos Negros", "Luminosidad / Piel Opaca"
  ];

  const handleSelect = (index) => {
    setSelectedOption(index);
  };

  const nextStep = () => {
    if (selectedOption !== null) {
      setStep(step + 1);
      setSelectedOption(null); 
    } else {
      alert("Ey, tenés que elegir una opción antes de seguir.");
    }
  };

  const handleFinalize = () => {
    alert("¡Listo! Según lo que elegiste, estos son los mejores productos para vos.");
    navigate('/product'); 
  };

  return (
    <div style={styles.container}>
      {/* ELIMINÉ EL HEADER DE AQUÍ */}

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>
            Diseñemos tu <br /> rutina ideal <span style={styles.badge}>CLICK</span>
          </h1>
        </div>
      </section>

      <div style={styles.contentBody}>
        {step === 1 && (
          <>
            <h2 style={styles.stepTitle}>| Identifica tu tipo de piel para tu rutina ideal</h2>
            <div style={styles.gridOptions}>
              {skinTypes.map((type, index) => (
                <div 
                  key={index} 
                  onClick={() => handleSelect(index)}
                  style={{
                    ...styles.optionCard,
                    border: selectedOption === index ? '2px solid #17C3B2' : '1px solid #F0F0F0',
                    backgroundColor: selectedOption === index ? '#F8FEFD' : '#FFF'
                  }}
                >
                  <span style={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <p style={styles.cardLabel}>{type}</p>
                </div>
              ))}
            </div>
            <button onClick={nextStep} style={styles.btnNext}>Siguiente paso</button>
            <p style={styles.stepLabel}>Paso 1 de 3</p>
          </>
        )}

        {step === 2 && (
          <>
            <h2 style={styles.stepTitle}>| ¿Cuáles son tus Objetivos?</h2>
            <div style={styles.gridOptions}>
              {goals.map((goal, index) => (
                <div 
                  key={index} 
                  onClick={() => handleSelect(index)}
                  style={{
                    ...styles.optionCard,
                    border: selectedOption === index ? '2px solid #17C3B2' : '1px solid #F0F0F0',
                    backgroundColor: selectedOption === index ? '#F8FEFD' : '#FFF'
                  }}
                >
                  <span style={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <p style={styles.cardLabel}>{goal}</p>
                </div>
              ))}
            </div>
            <button onClick={nextStep} style={styles.btnNext}>Siguiente paso</button>
            <p style={styles.stepLabel}>Paso 2 de 3</p>
          </>
        )}

        {step === 3 && (
          <>
            <div style={styles.recommendHeader}>
              <h2 style={styles.stepTitle}>| Te recomendamos estos productos</h2>
              <p style={styles.subStepTitle}>Esta recomendación es según tus Respuestas</p>
            </div>
            
            <div style={styles.productGrid}>
              {[
                { name: "ULTRA SPORT 50FPS", price: "$30.99", img: prod1 },
                { name: "ULTRA SPORT 30FPS", price: "$25.15", img: prod2 },
                { name: "LIPIKAR SYNDET AP+", price: "$22.99", img: prod3 },
                { name: "EFFACLAR DUO (+) FPS 30", price: "$55.15", img: prod4 }
              ].map((prod, idx) => (
                <div key={idx} style={styles.productCard}>
                   <p style={styles.prodPrice}>{prod.price}</p>
                   <img src={prod.img} alt={prod.name} style={styles.prodImg} />
                   <h4 style={styles.prodName}>{prod.name}</h4>
                   <button onClick={() => navigate('/product')} style={styles.btnView}>Ver Producto</button>
                </div>
              ))}
            </div>
            
            <button onClick={handleFinalize} style={styles.btnFinal}>Finalizar</button>
            <p style={styles.stepLabel}>Paso 3 de 3</p>
          </>
        )}
      </div>

      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <p>San Salvador, El Salvador<br />+503 7777-0000<br />glowup.sv@gmail.com</p>
          <p>© 2026 Glow Up SV – Belleza real, resultados reales.</p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: { 
    fontFamily: "'Poppins', sans-serif", 
    backgroundColor: '#FFFFFF', 
    minHeight: '100vh',
    width: '100%',
    margin: 0,
    padding: 0,
    overflowX: 'hidden'
  },
  hero: { 
    backgroundImage: `url(${bannerSurvey})`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '60vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', // Cambiado de 'center' a 'flex-start' para alinear a la izquierda
    margin: 0,
    padding: 0,
    position: 'relative'
  },
  heroContent: { 
    textAlign: 'left', // Cambiado de 'center' a 'left'
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: '30px 50px', // Más padding para separar mejor
    borderRadius: '20px',
    zIndex: 2,
    marginLeft: '10%', // Margen izquierdo para separar del borde
    maxWidth: '600px' // Ancho máximo para que no se estire demasiado
  },
  title: { 
    fontSize: '52px', // Un poco más grande
    fontWeight: '900', 
    color: '#000', 
    margin: 0,
    lineHeight: '1.3' // Más separación entre líneas
  },
  badge: { 
    backgroundColor: '#17C3B2', 
    color: 'white', 
    padding: '8px 30px', // Más padding para que el botón CLICK sea más grande
    borderRadius: '50px', 
    fontSize: '36px', // Más grande
    display: 'inline-block',
    marginTop: '15px' // Separación del texto de arriba
  },
  
  contentBody: { padding: '60px 10%', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' },
  stepTitle: { fontSize: '24px', fontWeight: '700', textAlign: 'left', marginBottom: '30px', color: '#1A2B29' },
  subStepTitle: { textAlign: 'left', marginTop: '-25px', marginBottom: '30px', color: '#666' },
  recommendHeader: {},

  gridOptions: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' },
  optionCard: { padding: '25px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', textAlign: 'left', cursor: 'pointer', transition: '0.3s' },
  cardNumber: { color: '#17C3B2', fontWeight: '700', fontSize: '14px', marginBottom: '10px', display: 'block' },
  cardLabel: { fontWeight: '700', fontSize: '16px', color: '#1A2B29' },

  btnNext: { backgroundColor: '#17C3B2', color: 'white', border: 'none', padding: '15px 50px', borderRadius: '30px', fontWeight: '700', cursor: 'pointer', fontSize: '18px' },
  btnFinal: { backgroundColor: '#17C3B2', color: 'white', border: 'none', padding: '15px 50px', borderRadius: '30px', fontWeight: '700', cursor: 'pointer', fontSize: '18px' },
  stepLabel: { marginTop: '15px', color: '#999', fontSize: '14px' },

  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '50px' },
  productCard: { backgroundColor: '#EFF4FB', borderRadius: '25px', padding: '20px', textAlign: 'center', position: 'relative' },
  prodPrice: { position: 'absolute', top: '20px', left: '20px', fontWeight: '700', color: '#1A2B29' },
  prodImg: { height: '180px', objectFit: 'contain', margin: '20px 0' },
  prodName: { fontSize: '14px', fontWeight: '800', marginBottom: '15px', height: '40px' },
  btnView: { backgroundColor: '#B2EBE5', border: 'none', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' },

  footer: { backgroundColor: '#17C3B2', padding: '40px 10%', color: '#1A2B29' },
  footerGrid: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }
};

export default Survey;