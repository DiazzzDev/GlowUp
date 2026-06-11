import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// 1. Componentes Globales
// Traigo el Header que reutilizo en todas las pantallas para que el diseño sea consistente
import Header from './components/Header'; 

// 2. Importación de Pantallas Informativas
// Aquí importo todas las pantallas que ya terminé de maquetar
import Login from './screens/Login';           // Pantalla de inicio de sesión
import Index from './screens/Index';           // Página principal de bienvenida
import AboutUs from './screens/AboutUs';       // Quiénes somos
import Product from './screens/Product';       // Catálogo de productos
import ContactUs from './screens/ContactUs';   // Formulario de contacto
import Survey from './screens/Survey';         // Encuesta para rutina ideal
import SkinTips from './screens/SkinTips';     // Consejos de cuidado de la piel
import Register from './screens/Register';     // Pantalla para crear cuenta de cliente
import VerifyCode from './screens/VerifyCode'; // Pantalla para meter el código del correo


// 3. Importación de las Pantallas de Venta
// Estas son las del flujo de compra (carrito y pago)
import Cart from './screens/Cart';             // Mi carrito de compras
import Checkout from './screens/Checkout';     // Proceso de pago

function App() {
  const location = useLocation();

  // Definimos las rutas donde NO queremos que aparezca el Header
  const rutasSinHeader = ['/', '/login', '/register', '/verify-code'];

  return (
    <>
      {/* El Header solo se va a mostrar si la ruta actual no está en la lista de rutas sin header */}
      {!rutasSinHeader.includes(location.pathname) && <Header />} 

      <Routes>
        {/* Acceso y Landing */}
        {/* La primera pantalla que ve el usuario es el Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* Después de iniciar sesión, lo mando al inicio */}
        <Route path="/inicio" element={<Index />} />
        {/* Pantallas de registro y verificación del cliente */}
        <Route path="/register" element={<Register />} />
        <Route path="/verify-code" element={<VerifyCode />} />

        {/* Secciones de Marca */}
        {/* Páginas informativas de la empresa */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        
        {/* Catálogo y Recomendaciones */}
        {/* Donde el usuario puede ver productos y recibir sugerencias */}
        <Route path="/product" element={<Product />} />
        <Route path="/survey" element={<Survey />} /> 
        <Route path="/skin-tips" element={<SkinTips />} /> 

        {/* Flujo de Compra */}
        {/* El carrito muestra lo que el usuario va a comprar */}
        <Route path="/cart" element={<Cart />} /> 
        {/* El checkout es el formulario de pago */}
        <Route path="/checkout" element={<Checkout />} /> 

        {/* Manejo de rutas inexistentes */}
        {/* Si el usuario escribe cualquier cosa que no existe, lo mando al inicio */}
        <Route path="*" element={<Index />} />
      </Routes>
    </>
  );
}

export default App;