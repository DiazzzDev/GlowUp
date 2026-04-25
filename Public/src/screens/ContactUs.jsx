import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// ELIMINÉ EL IMPORT DEL HEADER porque ahora viene desde App.jsx

// Aquí importo las imágenes que guardé en la carpeta assets/contact
import bannerContacto from '../assets/contact/banner_contacto.png'; // El banner de arriba (pepino/cremas)
import skinTipsCard from '../assets/contact/skin_tips_card.png'; // La foto de la chica con el gotero

const ContactUs = () => {
  const navigate = useNavigate();

  // Uso un estado para controlar los datos del formulario y que no se envíen vacíos
  const [formData, setFormData] = useState({
    email: '',
    telefono: '',
    nombre: '',
    mensaje: ''
  });

  // Esta función va actualizando mis variables cada vez que escribo algo
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío. Puse el alert para que sea funcional visualmente
  const handleSubmit = (e) => {
    e.preventDefault(); // Esto evita que la página se refresque
    
    // Si llegamos aquí es porque el navegador ya validó que nada esté vacío por el "required"
    alert("¡Tu mensaje ha sido enviado con éxito! Nos pondremos en contacto pronto.");
    
    // Limpio los campos después del envío para que quede como nuevo
    setFormData({ email: '', telefono: '', nombre: '', mensaje: '' });
  };

  return (
    <div style={styles.contenedor}>
      {/* ELIMINÉ EL HEADER DE AQUÍ */}

      {/* Sección del título con la imagen de fondo que importamos */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.mainTitle}>Contáctanos</h1>
          <p style={styles.subTitle}>Tu piel merece atención personalizada.</p>
        </div>
      </section>

      {/* Aquí divido la pantalla en el formulario (izquierda) y la card (derecha) */}
      <section style={styles.mainContent}>
        
        {/* Formulario de contacto: puse 'required' en todos para que sea obligatorio llenarlos */}
        <form onSubmit={handleSubmit} style={styles.formulario}>
          <div style={styles.filaInput}>
            <input 
              type="email" name="email" placeholder="Email" required 
              value={formData.email} onChange={handleChange} style={styles.inputPequeno} 
            />
            <input 
              type="tel" name="telefono" placeholder="Teléfono" required 
              value={formData.telefono} onChange={handleChange} style={styles.inputPequeno} 
            />
          </div>
          <input 
            type="text" name="nombre" placeholder="Nombre" required 
            value={formData.nombre} onChange={handleChange} style={styles.inputGrande} 
          />
          <textarea 
            name="mensaje" placeholder="Mensaje" required 
            value={formData.mensaje} onChange={handleChange} style={styles.textArea} 
          />
          
          <button type="submit" style={styles.btnEnviar}>
            Solicitar asesoría
          </button>
        </form>

        {/* Tarjeta de Skin Tips: al darle clic a la flecha nos manda a la encuesta */}
        <div style={styles.cardTips}>
          <img src={skinTipsCard} alt="Skin Tips" style={styles.imgCard} />
          <div style={styles.cardInfo}>
            <h3 style={styles.cardTitle}>Skin Tips</h3>
            <p style={styles.cardText}>Recibe consejos, lanzamientos y promociones especiales directo en tu correo.</p>
            <button onClick={() => navigate('/survey')} style={styles.btnCard}>
              →
            </button>
          </div>
        </div>

      </section>

      {/* Footer con todos los textos del mismo color */}
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

// Configuración de estilos JSS según el diseño minimalista
const styles = {
  contenedor: { fontFamily: "'Poppins', sans-serif", backgroundColor: '#FFFFFF' },
  
  heroSection: { 
    height: '350px', 
    backgroundImage: `url(${bannerContacto})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heroOverlay: { textAlign: 'center', color: '#1A2B29' },
  mainTitle: { fontSize: '50px', fontWeight: '800', marginBottom: '10px' },
  subTitle: { fontSize: '18px', fontWeight: '500' },

  mainContent: { 
    display: 'flex', 
    padding: '60px 10%', 
    gap: '40px', 
    alignItems: 'flex-start',
    maxWidth: '1300px',
    margin: '0 auto'
  },

  formulario: { flex: 2, display: 'flex', flexDirection: 'column', gap: '20px' },
  filaInput: { display: 'flex', gap: '20px' },
  inputPequeno: { 
    flex: 1, padding: '15px 25px', borderRadius: '30px', border: 'none', 
    backgroundColor: '#EFF4FB', fontSize: '15px', outline: 'none'
  },
  inputGrande: { 
    padding: '15px 25px', borderRadius: '30px', border: 'none', 
    backgroundColor: '#EFF4FB', fontSize: '15px', outline: 'none' 
  },
  textArea: { 
    padding: '25px', borderRadius: '30px', border: 'none', 
    backgroundColor: '#EFF4FB', fontSize: '15px', outline: 'none', 
    minHeight: '200px', fontFamily: 'inherit' 
  },
  btnEnviar: { 
    backgroundColor: '#17C3B2', color: 'white', border: 'none', 
    padding: '15px 40px', borderRadius: '30px', cursor: 'pointer', 
    fontWeight: '700', fontSize: '16px', alignSelf: 'flex-start',
    marginTop: '10px'
  },

  cardTips: { 
    flex: 1, borderRadius: '30px', overflow: 'hidden', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)', position: 'relative' 
  },
  imgCard: { width: '100%', height: 'auto', display: 'block' },
  cardInfo: { padding: '20px', backgroundColor: '#FFFFFF', textAlign: 'left' },
  cardTitle: { fontSize: '22px', fontWeight: '800', color: '#1A2B29', marginBottom: '5px' },
  cardText: { fontSize: '12px', color: '#666', marginBottom: '15px', lineHeight: '1.4' },
  btnCard: { 
    backgroundColor: '#2A4D46', color: 'white', border: 'none', 
    width: '35px', height: '35px', borderRadius: '8px', cursor: 'pointer',
    fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center'
  },

  // Footer - todos los textos del mismo color #1A2B29
  footer: { 
    backgroundColor: '#17C3B2', 
    padding: '40px 10% 20px 10%', 
    marginTop: '60px'
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

export default ContactUs;