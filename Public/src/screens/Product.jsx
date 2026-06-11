import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
  // Estados para meter lo que venga de la base de datos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Control de paginación para no saturar la vista con un solo grid gigante
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Dejo 8 productos por página, se puede cambiar luego

  // --- TRAER LOS PRODUCTOS DE LA API ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Ruta exacta al endpoint de productos que definimos en el backend (puerto 4000)
        const response = await axios.get('http://localhost:4000/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error("Error jalando productos:", err);
        setError("No se pudieron cargar los productos. Hay que revisar si el backend está corriendo.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // --- OPERACIONES PARA LA PAGINACIÓN ---
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  
  // Cortamos el array global para sacar solo los productos de la página actual
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Pantalla de carga por si la base de datos o Cloudinary tardan en responder
  if (loading) {
    return (
      <div style={{ ...styles.page, textAlign: 'center', padding: '100px 10%' }}>
        <h2 style={{ color: '#17C3B2' }}>Cargando catálogo...</h2>
      </div>
    );
  }

  // Pantalla de error por si se cae el servidor o explota la petición
  if (error) {
    return (
      <div style={{ ...styles.page, textAlign: 'center', padding: '100px 10%' }}>
        <h2 style={{ color: 'red' }}>{error}</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Banner Principal - Ahora cuenta el total general dinámicamente */}
      <section style={styles.heroBanner}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Todos los productos en un solo lugar</h1>
          <p style={styles.heroSubtitle}>
            {products.length} productos disponibles en nuestro catálogo
          </p>
        </div>
      </section>

      {/* Grid de Productos - Renderizado desde MongoDB */}
      <section style={styles.productGrid}>
        {products.length === 0 ? (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#666' }}>
            No hay productos registrados en la base de datos actualmente.
          </p>
        ) : (
          currentProducts.map((product) => (
            <div key={product._id} style={styles.card}>
              {/* Contenedor de la Imagen - Jala directo el link seguro de Cloudinary */}
              <div style={styles.imagePlaceholder}>
                {product.image ? (
                  <img src={product.image} alt={product.productName} style={styles.img} />
                ) : (
                  <span style={{ fontSize: '12px', color: '#999' }}>Sin foto</span>
                )}
              </div>
              
              {/* Bloque de Información del Producto */}
              <div style={styles.infoArea}>
                <p style={styles.brandTxt}>{product.brand}</p>
                <h3 style={styles.nameTxt}>{product.productName}</h3>
                
                {/* Metemos Categoría y Tipo de Piel como los tags del diseño original */}
                <div style={styles.tagRow}>
                  <span style={styles.tag}>{product.category}</span>
                  <span style={styles.tag}>{product.skinType}</span>
                </div>
                
                {/* Fila de Precio y Carrito */}
                <div style={styles.priceRow}>
                  <span style={styles.priceTxt}>
                    ${product.price ? product.price.toFixed(2) : '0.00'}
                  </span>
                  {/* Deshabilitamos el botón de carrito si el estado es Out of Stock */}
                  <button 
                    style={styles.cartBtn} 
                    onClick={() => setCartCount(cartCount + 1)}
                    disabled={product.status === "Out of Stock"}
                  >
                    {product.status === "Out of Stock" ? '❌' : '🛒'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Paginación Dinámica - Se oculta automáticamente si todo cabe en una sola página */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button 
            onClick={handlePrev} 
            style={styles.pageBtnSide} 
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
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
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Footer original */}
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

// Mantenemos intacto nuestro objeto de estilos inline
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
  img: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' },
  
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