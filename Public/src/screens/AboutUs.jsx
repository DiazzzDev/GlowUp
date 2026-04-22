import React from 'react';
import { useNavigate } from 'react-router-dom';
// ELIMINÉ EL IMPORT DEL HEADER porque ahora viene desde App.jsx

// Aquí importo todas las imágenes que guardé en la carpeta de assets/about
import heroNosotros from '../assets/about/hero_nosotros.png';
import iconoMision from '../assets/about/icono_mision.png';
import iconoVision from '../assets/about/icono_vision.png';
import iconoObjetivo from '../assets/about/icono_objetivo.png';

const AboutUs = () => {
  // Uso este hook para que los botones de catálogo y saber más funcionen y nos muevan de página
  const navigate = useNavigate();

  // Aquí preparé los datos de las tarjetas en un array para no repetir código y que sea más ordenado
  const esencia = [
    {
      titulo: 'Misión',
      texto: 'Ofrecer a los jóvenes soluciones de skincare accesibles y efectivas que fomenten la confianza y el cuidado responsable de la piel.',
      img: iconoMision
    },
    {
      titulo: 'Visión',
      texto: 'Ser la marca líder de e-commerce en cuidado personal para la nueva generación, reconocida por nuestra transparencia y compromiso.',
      img: iconoVision
    },
    {
      titulo: 'Objetivo',
      texto: 'Garantizar una experiencia de compra segura y educativa, facilitando el acceso a rutinas personalizadas que respeten la salud cutánea.',
      img: iconoObjetivo
    }
  ];

  return (
    <div style={styles.contenedor}>
      {/* ELIMINÉ EL HEADER DE AQUÍ */}

      {/* Esta es la sección principal (Hero) con el título llamativo y la imagen de los productos */}
      <section style={styles.heroSection}>
        <div style={styles.heroContenido}>
          <div style={styles.heroTexto}>
            <h1 style={styles.titulo}>
              Tu mejor versión a <br /> un solo <span style={styles.badge}>CLICK</span>
            </h1>
            <p style={styles.subtitulo}>
              Descubre una nueva forma de cuidar tu piel con productos naturales 
              diseñados específicamente para las necesidades de los más jóvenes.
            </p>
            
            <div style={styles.botonera}>
              {/* Al darle clic a este botón nos manda a la pantalla de productos que acabamos de terminar */}
              <button onClick={() => navigate('/product')} style={styles.btnCatalogo}>
                Ver Catálogo
              </button>
              {/* Este lo configuré para que mande a los tips de piel */}
              <button onClick={() => navigate('/skin-tips')} style={styles.btnSaberMas}>
                Saber más
              </button>
            </div>
          </div>

          {/* Aquí va la imagen principal de la sección nosotros */}
          <div style={styles.heroImagenContenedor}>
            <img src={heroNosotros} alt="Productos Glow Up" style={styles.heroImg} />
          </div>
        </div>
      </section>

      {/* Sección donde explico la Misión, Visión y Objetivo usando las tarjetas */}
      <section style={styles.esenciaSection}>
        <h2 style={styles.seccionTitulo}>Nuestra Esencia</h2>
        <div style={styles.lineaDecorativa}></div> {/* La rayita aqua que sale en el diseño */}

        <div style={styles.cardsContenedor}>
          {/* Uso un .map para generar las 3 tarjetas automáticamente con la info del array de arriba */}
          {esencia.map((item, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.iconBox}>
                <img src={item.img} alt={item.titulo} style={styles.iconImg} />
              </div>
              <h3 style={styles.cardTitulo}>{item.titulo}</h3>
              <p style={styles.cardTexto}>{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer corregido: 3 columnas arriba y copyright centrado abajo */}
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
          <div >
            
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

// Mis estilos personalizados para que el diseño quede limpio y profesional (minimalista)
const styles = {
  contenedor: { fontFamily: "'Poppins', sans-serif", color: '#1A2B29', backgroundColor: '#FFFFFF' },
  heroSection: { padding: '60px 5%', backgroundColor: '#F8FEFD' },
  heroContenido: { display: 'flex', alignItems: 'center', gap: '40px', maxWidth: '1200px', margin: '0 auto' },
  heroTexto: { flex: 1 },
  titulo: { 
    fontSize: '52px', 
    fontWeight: '900', 
    marginBottom: '20px', 
    color: '#1A2B29',
    lineHeight: '1.3'
  },
  badge: { 
    backgroundColor: '#17C3B2', 
    color: 'white', 
    padding: '8px 30px', 
    borderRadius: '50px',
    fontSize: '36px',
    display: 'inline-block',
    marginLeft: '15px'
  },
  subtitulo: { fontSize: '16px', lineHeight: '1.6', marginBottom: '30px', color: '#555' },
  botonera: { display: 'flex', gap: '15px' },
  btnCatalogo: { 
    backgroundColor: '#17C3B2', color: 'white', border: 'none', 
    padding: '12px 25px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' 
  },
  btnSaberMas: { 
    backgroundColor: 'transparent', color: '#17C3B2', border: '2px solid #17C3B2', 
    padding: '10px 25px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600' 
  },
  heroImagenContenedor: { flex: 1 },
  heroImg: { width: '100%', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' },
  
  esenciaSection: { padding: '80px 5%', textAlign: 'center' },
  seccionTitulo: { fontSize: '28px', fontWeight: '700', marginBottom: '10px' },
  lineaDecorativa: { width: '50px', height: '4px', backgroundColor: '#17C3B2', margin: '0 auto 50px' },
  cardsContenedor: { display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' },
  card: { 
    backgroundColor: 'white', padding: '40px 30px', borderRadius: '20px', 
    width: '300px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', textAlign: 'left' 
  },
  iconBox: { 
    marginBottom: '20px', backgroundColor: '#F0FBF9', width: '60px', height: '60px', 
    display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px' 
  },
  iconImg: { width: '35px', height: '35px' },
  cardTitulo: { fontSize: '20px', marginBottom: '15px', color: '#1A2B29', fontWeight: '700' },
  cardTexto: { fontSize: '14px', lineHeight: '1.5', color: '#666' },
  
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

export default AboutUs;