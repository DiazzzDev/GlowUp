import React, { useState } from 'react';
// ELIMINÉ EL IMPORT DEL HEADER porque ahora viene desde App.jsx

// Imágenes para los consejos
import bannerTips from '../assets/skintips/banner_tips.png';
import imgLimpieza from '../assets/skintips/limpieza.png';
import imgHidratacion from '../assets/skintips/hidratacion.png';
import imgProteccion from '../assets/skintips/proteccion.png';
import imgExfoliacion from '../assets/skintips/exfoliacion.png';
import imgTratamiento from '../assets/skintips/tratamiento.png';

const SkinTips = () => {
  // Aquí tengo todos mis tips en un array
  const allTips = [
    { id: 1, titulo: "1. Limpieza", desc: "Limpia mañana y noche con un gel suave para liberar poros", img: imgLimpieza, color: '#E1F2F2' },
    { id: 2, titulo: "2. Hidratación", desc: "Aplica tu crema sobre piel húmeda para sellar la humedad.", img: imgHidratacion, color: '#E1E9F2' },
    { id: 3, titulo: "3. Protección", desc: "El sol no descansa. Usa SPF 50+ todos los días, sin falta.", img: imgProteccion, color: '#F2F1E1' },
    { id: 4, titulo: "4. Exfoliación", desc: "Renueva tu textura 1 o 2 veces por semana. Menos es más.", img: imgExfoliacion, color: '#E1F2E5' },
    { id: 5, titulo: "5. Tratamiento", desc: "Potencia tu brillo con un sérum específico para tu necesidad.", img: imgTratamiento, color: '#F2E1E5' },
  ];

  // Este estado controla cuál es el primer tip que se ve (el índice)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para mover a la derecha
  const nextTip = () => {
    if (currentIndex < allTips.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Función para mover a la izquierda
  const prevTip = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div style={styles.contenedor}>
      {/* ELIMINÉ EL HEADER DE AQUÍ */}

      {/* Hero con imagen de fondo */}
      <section style={styles.hero}>
        <div style={styles.heroTextContainer}>
          <h1 style={styles.titulo}>
            Skin <span style={styles.tituloSpan}>Tips</span>
          </h1>
          <p style={styles.subtitulo}>Pequeños hábitos, grandes cambios</p>
        </div>
      </section>

      <section style={styles.carruselSeccion}>
        <div style={styles.carruselWrapper}>
          <div style={styles.gridTips}>
            {allTips.slice(currentIndex, currentIndex + 4).map((tip) => (
              <div key={tip.id} style={{ ...styles.tipCard, backgroundColor: tip.color }}>
                <h3 style={styles.tipTitulo}>{tip.titulo}</h3>
                <img src={tip.img} alt={tip.titulo} style={styles.tipImg} />
                <p style={styles.tipDesc}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.controles}>
          <span 
            onClick={prevTip} 
            style={{ ...styles.flecha, opacity: currentIndex === 0 ? 0.3 : 1, cursor: currentIndex === 0 ? 'not-allowed' : 'pointer' }}
          >
            {"<"}
          </span>
          
          <div style={styles.puntos}>
            <div style={{ ...styles.punto, backgroundColor: currentIndex === 0 ? '#17C3B2' : '#DDD' }}></div>
            <div style={{ ...styles.punto, backgroundColor: currentIndex === 1 ? '#17C3B2' : '#DDD' }}></div>
          </div>

          <span 
            onClick={nextTip} 
            style={{ ...styles.flecha, opacity: currentIndex >= allTips.length - 4 ? 0.3 : 1, cursor: currentIndex >= allTips.length - 4 ? 'not-allowed' : 'pointer' }}
          >
            {">"}
          </span>
        </div>
      </section>

      {/* Footer actualizado igual que los demás */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div style={styles.footerColumna}>
            <p style={styles.footerTexto}>San Salvador, El Salvador</p>
            <p style={styles.footerTexto}>+503 7777-9000</p>
            <p style={styles.footerTexto}>glowup.sv@gmail.com</p>
          </div>
          <div style={styles.footerColumna}>
            <a href="/inicio" style={styles.footerLink}>Inicio</a>
            <a href="/about-us" style={styles.footerLink}>Quiénes somos</a>
            <a href="/contact-us" style={styles.footerLink}>Contáctanos</a>
            <a href="/faq" style={styles.footerLink}>FQA</a>
          </div>
          <div style={styles.footerColumna}>
          </div>
        </div>
        <div style={styles.footerCopyright}>
          <p style={styles.footerTexto}>© 2026 Glow Up.sv — Belleza real, resultados reales.</p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  contenedor: { 
    fontFamily: "'Poppins', sans-serif", 
    backgroundColor: '#FFFFFF',
    width: '100%',
    margin: 0,
    padding: 0,
    overflowX: 'hidden'
  },
  // Hero con imagen de fondo - sin fondo blanco
  hero: {
    backgroundImage: `url(${bannerTips})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '80vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
    position: 'relative'
  },
  heroTextContainer: {
    textAlign: 'right',
    // SIN fondo blanco - eliminado backgroundColor
    padding: '30px 50px',
    borderRadius: '20px',
    zIndex: 2,
    marginRight: '10%',
    maxWidth: '600px'
  },
  titulo: { 
    fontSize: '60px', 
    fontWeight: '900', 
    color: '#2A4D46', // Color #2A4D46
    margin: 0,
    lineHeight: '1.2'
  },
  tituloSpan: {
    color: '#17C3B2'
  },
  subtitulo: { 
    fontSize: '20px', 
    color: '#2A4D46', // Color #2A4D46
    marginTop: '10px',
    marginBottom: 0
  },

  carruselSeccion: { padding: '60px 5%', textAlign: 'center', overflow: 'hidden' },
  carruselWrapper: { maxWidth: '1100px', margin: '0 auto' },
  gridTips: { 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '20px',
    transition: 'all 0.5s ease-in-out',
    flexWrap: 'wrap'
  },
  tipCard: { 
    width: '220px', padding: '40px 20px', borderRadius: '50px', 
    textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },
  tipTitulo: { fontSize: '16px', fontWeight: '700', marginBottom: '20px' },
  tipImg: { width: '80px', height: '80px', marginBottom: '20px', objectFit: 'contain' },
  tipDesc: { fontSize: '13px', lineHeight: '1.4', color: '#333' },

  controles: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '40px' },
  flecha: { fontSize: '30px', color: '#17C3B2', fontWeight: 'bold', userSelect: 'none' },
  puntos: { display: 'flex', gap: '10px' },
  punto: { width: '12px', height: '12px', borderRadius: '50%', transition: '0.3s' },

  // Footer actualizado
  footer: { 
    backgroundColor: '#17C3B2', 
    padding: '40px 10% 20px 10%', 
    marginTop: '50px'
  },
  footerGrid: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    flexWrap: 'wrap',
    gap: '40px',
    marginBottom: '30px'
  },
  footerColumna: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: '180px'
  },
  footerTexto: {
    fontSize: '14px',
    color: '#1A2B29',
    textDecoration: 'none',
    margin: 0
  },
  footerLink: {
    fontSize: '14px',
    color: '#1A2B29',
    textDecoration: 'none',
    margin: 0
  },
  footerCopyright: {
    textAlign: 'center',
    borderTop: '1px solid rgba(26, 43, 41, 0.2)',
    paddingTop: '20px',
    marginTop: '10px'
  }
};

export default SkinTips;