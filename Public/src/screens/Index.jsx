import React from 'react';
// ELIMINÉ EL IMPORT DEL HEADER porque ahora viene desde App.jsx

// Importo la imagen para el fondo del hero
import heroProductos from '../assets/index/hero_productos.png';
import logoBananaBoat from '../assets/index/logo_bananaboat.png';
import logoNivea from '../assets/index/logo_nivea.png';
import logoCeraVe from '../assets/index/logo_cerave.png';
import logoLaRochePosay from '../assets/index/logo_larocheposay.png';

const Index = () => {
  
  // Cree este arreglo para las 4 tarjetas de "Lo que nos mueve"
  // Así el código queda más limpio y ordenado
  const datosTarjetas = [
    { id: '01', titulo: 'Calidad Curada', texto: 'lo mejor para tu piel.' },
    { id: '02', titulo: 'Seguridad y Confianza', texto: 'Calidad y seguridad, sin complicaciones.' },
    { id: '03', titulo: 'Accesibilidad Local', texto: 'Las mejores tendencias, sin esperas ni costos extra.' },
    { id: '04', titulo: 'Bienestar Integral', texto: 'Cuidar tu piel, un momento de paz y amor propio.' },
  ];

  return (
    <div style={styles.contenedorPantalla}>
      {/* ELIMINÉ EL HEADER DE AQUÍ porque ahora se maneja desde App.jsx */}

      {/* 2. Sección principal con el título grande y la imagen de fondo */}
      <section style={styles.heroSection}>
        <div style={styles.heroTextContainer}>
          <h1 style={styles.heroTitulo}>
            Tu mejor versión a un solo <span style={styles.clickBadge}>CLICK</span>
          </h1>
        </div>
      </section>

      {/* 3. Sección de las 4 tarjetas con los números en verde aqua */}
      <section style={styles.nosMueveSeccion}>
        <div style={styles.textoIntroContenedor}>
          <h2 style={styles.tituloSecundario}>| Lo que nos mueve</h2>
          <p style={styles.subtituloTexto}>Detrás de cada pantalla o servicio, hay personas escuchando a personas.</p>
        </div>

        <div style={styles.tarjetasGrid}>
          {/* Uso un .map para que se creen las tarjetas automáticamente con los datos de arriba */}
          {datosTarjetas.map(item => (
            <div key={item.id} style={styles.tarjetaCard}>
              <span style={styles.tarjetaId}>{item.id}</span>
              <h3 style={styles.tarjetaTitulo}>{item.titulo}</h3>
              <p style={styles.tarjetaTexto}>{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Sección donde pongo los logos de las marcas */}
      <section style={styles.marcasSeccion}>
        <div style={styles.textoIntroContenedor}>
          <h2 style={styles.tituloSecundario}>Marcas que colaboramos</h2>
          <p style={styles.subtituloTexto}>Trabajamos con lo mejor para tu cuidado personal.</p>
        </div>
        
        <div style={styles.marcasGrid}>
          <img src={logoBananaBoat} alt="Banana Boat" style={styles.marcaLogo} />
          <img src={logoNivea} alt="Nivea" style={styles.marcaLogo} />
          <img src={logoCeraVe} alt="CeraVe" style={styles.marcaLogo} />
          <img src={logoLaRochePosay} alt="La Roche Posay" style={styles.marcaLogo} />
        </div>
      </section>

      {/* Footer actualizado igual que AboutUs */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div style={styles.footerColumna}>
            <p>San Salvador, El Salvador</p>
            <p>+503 7777-9000</p>
            <p>glowup.sv@gmail.com</p>
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
          <p>© 2026 Glow Up.sv — Belleza real, resultados reales.</p>
        </div>
      </footer>
    </div>
  );
};

// Aquí están todos mis estilos ordenados para que se vea igual al diseño
const styles = {
  contenedorPantalla: {
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#FFFFFF',
    color: '#1A2B29',
    width: '100%',
    margin: 0,
    padding: 0,
    overflowX: 'hidden'
  },
  // Hero con imagen de fondo (igual que Survey)
  heroSection: {
    backgroundImage: `url(${heroProductos})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '80vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 0,
    padding: 0,
    position: 'relative'
  },
  heroTextContainer: {
    textAlign: 'left',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: '30px 50px',
    borderRadius: '20px',
    zIndex: 2,
    marginLeft: '10%',
    maxWidth: '600px'
  },
  heroTitulo: {
    fontSize: '52px',
    fontWeight: '900',
    color: '#000',
    margin: 0,
    lineHeight: '1.3'
  },
  clickBadge: {
    backgroundColor: '#17C3B2',
    color: 'white',
    padding: '8px 30px',
    borderRadius: '50px',
    fontSize: '36px',
    display: 'inline-block',
    marginLeft: '15px'
  },
  textoIntroContenedor: { padding: '0 5%', marginBottom: '40px' },
  tituloSecundario: { color: '#1A2B29', fontSize: '24px', fontWeight: '700' },
  subtituloTexto: { color: '#1A2B29', fontSize: '14px' },
  nosMueveSeccion: { padding: '80px 0', backgroundColor: '#F8FEFD' },
  tarjetasGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    padding: '0 5%',
  },
  tarjetaCard: {
    backgroundColor: '#FFFFFF',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
  },
  tarjetaId: { 
    color: '#17C3B2',
    fontSize: '16px', 
    fontWeight: 'bold', 
    display: 'block', 
    marginBottom: '10px' 
  },
  tarjetaTitulo: { color: '#1A2B29', fontSize: '17px', fontWeight: '700', marginBottom: '8px' },
  tarjetaTexto: { color: '#1A2B29', fontSize: '13px', lineHeight: '1.5' },
  marcasSeccion: { padding: '80px 0' },
  marcasGrid: { display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0 5%', flexWrap: 'wrap', gap: '20px' },
  marcaLogo: { height: '50px', width: 'auto' },
  
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
  footerLink: {
    fontSize: '14px',
    color: '#1A2B29',
    textDecoration: 'none'
  },
  footerCopyright: {
    textAlign: 'center',
    borderTop: '1px solid rgba(26, 43, 41, 0.2)',
    paddingTop: '20px',
    marginTop: '10px',
    fontSize: '12px',
    color: '#1A2B29'
  }
};
 
export default Index;