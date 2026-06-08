import React, { useState } from 'react';
// ELIMINÉ EL IMPORT DEL HEADER porque ahora viene desde App.jsx

// --- IMPORTACIÓN DE IMÁGENES POR MARCA ---
// La Roche Posay
import micelarLRP from '../assets/products/agua_micelar_la_roche_posay.png';
import correctorLRP from '../assets/products/crema_correctora_la_roche_posay.png';
import lavadoLRP from '../assets/products/crema_lavado_la_roche_posay.png';
import gelLRP from '../assets/products/gel_limpiador_la_roche_posay.png';
import facialLRP from '../assets/products/hidratante_facial_la_roche_posay.png';
import solarLRP from '../assets/products/protector_solar_la_roche_posay.png';
import retinolLRP from '../assets/products/retinol_la_roche_posay.png';

// CeraVe
import micelarCera from '../assets/products/agua_micelar_cerave.png';
import gelCera from '../assets/products/crema_gel_cerave.png';
import hidraCera from '../assets/products/crema_hidratante_cerave.png';
import hidra2Cera from '../assets/products/crema_hidratante2_cerave.png';
import banoCera from '../assets/products/gel_baño_cerave.png';
import limpiadorCera from '../assets/products/gel_limpiador_cerave.png';
import locionCera from '../assets/products/locion_renovadora_cerave.png';

// Banana Boat
import aerosolBanana from '../assets/products/protector_solar_aerosol_banana_boat.png';
import regularBanana from '../assets/products/protector_solar_banana_boat.png';
import kidsBanana from '../assets/products/protector_solar_kids_banana_boat.png';
import simpleBanana from '../assets/products/protector_solar_simple_protect_banana_boat.png';
import ultraBanana from '../assets/products/protector_solar_ultra_sport_banana_boat.png';

// Nivea
import micelarNivea from '../assets/products/agua_micelar_nivea.png';
import correctorNivea from '../assets/products/crema_correctora_nivea.png';
import limpiadorNivea from '../assets/products/gel_limpiador_nivea.png';
import limpiador2Nivea from '../assets/products/gel_limpiador2_nivea.png';
import facialNivea from '../assets/products/hidratante_facial_nivea.png';
import solarNivea from '../assets/products/protector_solar_nivea.png';
import retinolNivea from '../assets/products/retinol_nivea.png';

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  // Mapeo de marcas por página (1 página = 1 marca)
  const brandPages = {
    1: { name: 'La Roche Posay', items: [
      { id: 101, name: 'AGUA MICELAR', price: '$31.85', img: micelarLRP, tags: ['Limpieza', 'Piel Sensible'] },
      { id: 102, name: 'CREMA CORRECTORA', price: '$55.15', img: correctorLRP, tags: ['Acné', 'Tratamiento'] },
      { id: 103, name: 'CREMA DE LAVADO', price: '$22.99', img: lavadoLRP, tags: ['Suave', 'Atópica'] },
      { id: 104, name: 'GEL LIMPIADOR', price: '$33.99', img: gelLRP, tags: ['Purificante'] },
      { id: 105, name: 'HIDRATANTE FACIAL', price: '$33.99', img: facialLRP, tags: ['Matificante'] },
      { id: 106, name: 'PROTECTOR SOLAR', price: '$30.99', img: solarLRP, tags: ['UVMUNE 400'] },
      { id: 107, name: 'RETINOL OJOS', price: '$25.15', img: retinolLRP, tags: ['Anti-edad'] }
    ]},
    2: { name: 'CeraVe', items: [
      { id: 201, name: 'AGUA MICELAR', price: '$24.99', img: micelarCera, tags: ['Hidratante'] },
      { id: 202, name: 'CREMA EN GEL', price: '$15.99', img: gelCera, tags: ['Blemish Control'] },
      { id: 203, name: 'CREMA HIDRATANTE', price: '$18.99', img: hidraCera, tags: ['Piel Seca'] },
      { id: 204, name: 'HIDRATANTE + HIALURÓNICO', price: '$27.99', img: hidra2Cera, tags: ['Reparadora'] },
      { id: 205, name: 'GEL DE BAÑO', price: '$30.99', img: banoCera, tags: ['Cuerpo'] },
      { id: 206, name: 'GEL LIMPIADOR', price: '$25.15', img: limpiadorCera, tags: ['Espumoso'] },
      { id: 207, name: 'LOCIÓN RENOVADORA', price: '$23.99', img: locionCera, tags: ['SA Lotion'] }
    ]},
    3: { name: 'Banana Boat', items: [
      { id: 301, name: 'PROTECTOR AEROSOL', price: '$31.85', img: aerosolBanana, tags: ['Sport 50+'] },
      { id: 302, name: 'DRY BALANCE 50FPS', price: '$22.99', img: regularBanana, tags: ['Mate'] },
      { id: 303, name: 'KIDS SPORT', price: '$30.99', img: kidsBanana, tags: ['Niños'] },
      { id: 304, name: 'SIMPLE PROTECT', price: '$33.99', img: simpleBanana, tags: ['Sin Fragancia'] },
      { id: 305, name: 'ULTRA SPORT 50+', price: '$33.99', img: ultraBanana, tags: ['Resistente'] }
    ]},
    4: { name: 'Nivea', items: [
      { id: 401, name: 'AGUA MICELAR', price: '$31.85', img: micelarNivea, tags: ['Suave'] },
      { id: 402, name: 'CREMA CORRECTORA', price: '$55.15', img: correctorNivea, tags: ['Luminous 630'] },
      { id: 403, name: 'GEL LIMPIADOR', price: '$22.99', img: limpiadorNivea, tags: ['Refrescante'] },
      { id: 404, name: 'LIMPIADOR CONTROL', price: '$33.99', img: limpiador2Nivea, tags: ['Piel Grasa'] },
      { id: 405, name: 'HIDRATANTE FACIAL', price: '$33.99', img: facialNivea, tags: ['Nutritiva'] },
      { id: 406, name: 'PROTECTOR SOLAR', price: '$30.99', img: solarNivea, tags: ['Anti-manchas'] },
      { id: 407, name: 'RETINOL NOCHE', price: '$25.15', img: retinolNivea, tags: ['Renovador'] }
    ]}
  };

  const handleNext = () => currentPage < 4 && setCurrentPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div style={styles.page}>
      {/* ELIMINÉ EL HEADER DE AQUÍ */}

      {/* Banner Principal */}
      <section style={styles.heroBanner}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Todos los productos en un solo lugar</h1>
          <p style={styles.heroSubtitle}>Marca actual: {brandPages[currentPage].name}</p>
        </div>
      </section>

      {/* Grid de Productos */}
      <section style={styles.productGrid}>
        {brandPages[currentPage].items.map((item) => (
          <div key={item.id} style={styles.card}>
            <div style={styles.imagePlaceholder}>
              <img src={item.img} alt={item.name} style={styles.img} />
            </div>
            <div style={styles.infoArea}>
              <p style={styles.brandTxt}>{brandPages[currentPage].name}</p>
              <h3 style={styles.nameTxt}>{item.name}</h3>
              <div style={styles.tagRow}>
                {item.tags.map(tag => <span key={tag} style={styles.tag}>{tag}</span>)}
              </div>
              <div style={styles.priceRow}>
                <span style={styles.priceTxt}>{item.price}</span>
                <button 
                  style={styles.cartBtn} 
                  onClick={() => setCartCount(cartCount + 1)}
                >🛒</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Paginación Funcional */}
      <div style={styles.pagination}>
        <button 
          onClick={handlePrev} 
          style={styles.pageBtnSide} 
          disabled={currentPage === 1}
        >Anterior</button>
        
        {[1, 2, 3, 4].map(num => (
          <span 
            key={num} 
            onClick={() => setCurrentPage(num)}
            style={currentPage === num ? styles.pageNumActive : styles.pageNum}
          >
            {num}
          </span>
        ))}
        
        <button 
          onClick={handleNext} 
          style={styles.pageBtnSide} 
          disabled={currentPage === 4}
        >Siguiente</button>
      </div>

      {/* Footer actualizado igual que ContactUs */}
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
        {/* Copyright centrado abajo */}
        <div style={styles.footerCopyright}>
          <p style={styles.footerTexto}>© 2026 Glow Up.sv — Belleza real, resultados reales.</p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  page: { fontFamily: "'Poppins', sans-serif", backgroundColor: '#FFFFFF' },
  heroBanner: { 
    background: 'linear-gradient(90deg, #1A9384 0%, #17C3B2 100%)', 
    padding: '60px 10%', color: 'white' 
  },
  heroTitle: { fontSize: '32px', fontWeight: '800', margin: 0 },
  heroSubtitle: { fontSize: '18px', marginTop: '10px' },
  
  productGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
    gap: '20px', padding: '40px 10%' 
  },
  card: { 
    backgroundColor: 'white', borderRadius: '15px', 
    border: '1px solid #E0E0E0', overflow: 'hidden' 
  },
  imagePlaceholder: { 
    height: '200px', backgroundColor: '#F2F2F2', 
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' 
  },
  img: { maxHeight: '100%', objectFit: 'contain' },
  
  infoArea: { padding: '15px' },
  brandTxt: { fontSize: '11px', color: '#2A4D46', fontWeight: '700' },
  nameTxt: { fontSize: '14px', color: '#000000', fontWeight: '700', height: '40px' },
  tagRow: { display: 'flex', gap: '5px', margin: '10px 0', flexWrap: 'wrap' },
  tag: { 
    fontSize: '9px', backgroundColor: '#E0F7F5', color: '#17C3B2', 
    padding: '2px 8px', borderRadius: '10px' 
  },
  
  priceRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  priceTxt: { fontSize: '16px', fontWeight: '800', color: '#2A4D46' },
  cartBtn: { border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' },
  
  pagination: { 
    display: 'flex', justifyContent: 'center', gap: '20px', 
    paddingBottom: '50px', alignItems: 'center' 
  },
  pageBtnSide: { 
    backgroundColor: '#E0F7F5', border: '1px solid #17C3B2', color: '#17C3B2', 
    padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' 
  },
  pageNum: { cursor: 'pointer', color: '#1A2B29' },
  pageNumActive: { color: '#17C3B2', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' },
  
  // Footer actualizado igual que ContactUs
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

export default Product;