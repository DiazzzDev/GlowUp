# Glow Up SV - Mobile App (React Native & Expo 57)

Aplicación móvil oficial de la parte pública de **Glow Up SV**, construida con **React Native**, **JavaScript**, **Expo 57** y estilizada con **NativeWind** (Tailwind CSS para móvil).

---

## 📱 Paleta de Colores Oficial

- **Main / Principal**: `#17C3B2` (Turquesa Glow Up)
- **Text / Texto Oscuro**: `#1A2B29` (Verde petróleo profundo)
- **Danger / Alertas**: `#E76F51` (Coral de advertencia y botón de cerrar sesión)
- **Background / Fondo**: `#F0FBF9` (Menta suave)
- **White / Blanco**: `#FFFFFF` (Tarjetas limpias y contrastes)
- **Neutral / Borders**: `#D7EFEA` / `#8C9EA0`

---

## 🗂️ Arquitectura Modular

La aplicación sigue estrictamente una distribución por módulos de negocio:

```text
mobile/
├── App.js                         # Entrada principal con NavigationContainer
├── app.json                       # Configuración de Expo
├── babel.config.js                # Preset de Babel con NativeWind
├── tailwind.config.js             # Configuración de tokens de diseño
├── metro.config.js                # Metro bundler configurado para NativeWind
├── src/
│   ├── constants/
│   │   ├── colors.js              # Variables de color del diseño
│   │   └── mockData.js            # Datos iniciales (productos, categorías, pedidos)
│   ├── navigation/
│   │   ├── AppNavigator.js        # Native Stack Navigator general
│   │   └── TabNavigator.js        # Bottom Tab Bar (Inicio, Explorar, Carrito, Pedidos, Más)
│   └── modules/
│       ├── auth/                  # Módulo de Autenticación
│       │   ├── actions/           # Llamadas fetch (login, register, verifyCode)
│       │   ├── components/        # Inputs y botones estilizados
│       │   ├── hooks/             # useAuth
│       │   └── screens/           # Welcome, Login, Register, VerifyCode
│       ├── home/                  # Módulo de Inicio
│       │   ├── actions/           # Fetch de promociones y datos home
│       │   ├── components/        # Banners y filtros de tipo de piel
│       │   ├── hooks/             # useHome
│       │   └── screens/           # HomeScreen
│       ├── products/              # Catálogo y Exploración
│       │   ├── actions/           # Fetch de productos y detalle
│       │   ├── components/        # Barra de búsqueda y detalle
│       │   ├── hooks/             # useProducts
│       │   └── screens/           # SearchProductsScreen, ProductDetailScreen
│       ├── categories/            # Categorías de cuidado facial
│       │   ├── actions/           # Fetch de categorías
│       │   ├── components/        # Items de categoría
│       │   ├── hooks/             # useCategories
│       │   └── screens/           # CategoriesScreen
│       ├── cart/                  # Carrito de Compras
│       │   ├── actions/           # Sincronización del carrito
│       │   ├── components/        # Item de carrito con selector de cantidad
│       │   ├── hooks/             # useCart
│       │   └── screens/           # CartScreen
│       ├── checkout/              # Proceso de Pago
│       │   ├── actions/           # Creación de orden
│       │   ├── components/        # Selector de método de pago
│       │   ├── hooks/             # useCheckout
│       │   └── screens/           # CheckoutScreen, OrderSuccessScreen
│       ├── orders/                # Historial de Pedidos
│       │   ├── actions/           # Fetch de pedidos del cliente
│       │   ├── components/        # Tarjeta de pedido con tira de productos
│       │   ├── hooks/             # useOrders
│       │   └── screens/           # OrdersScreen
│       ├── menu/                  # Configuración y Perfil
│       │   ├── actions/           # Actualización de perfil y ajustes
│       │   ├── components/        # Filas y switches
│       │   ├── hooks/             # useMenu
│       │   └── screens/           # MenuScreen
│       ├── skintips/              # Consejos de la piel
│       │   ├── actions/           # Fetch de tips
│       │   ├── hooks/             # useSkinTips
│       │   └── screens/           # SkinTipsScreen
│       ├── survey/                # Test interactivo de rutina ideal
│       │   ├── actions/           # Envío y recomendación de test
│       │   ├── hooks/             # useSurvey
│       │   └── screens/           # SurveyScreen
│       └── brand/                 # Páginas informativas (Quiénes somos, Contacto)
│           ├── actions/           # Envío de formulario de contacto
│           └── screens/           # AboutUsScreen, ContactUsScreen
```

---

## ⚡ Entorno & Compatibilidad Node.js 22 LTS

El proyecto está preparado y optimizado para ejecutarse con **Node.js 22 (Active LTS)**:
- Compatible con **Node.js >= 22.0.0** (incluye archivo `.nvmrc` con versión 22).
- Expo 52+ / Metro bundler y React Native 0.76+ aprovechan el rendimiento V8 y soporte ECMAScript moderno de Node 22.

Para fijar la versión de Node:
```bash
nvm use 22 # o 'nvm use' si usas el archivo .nvmrc
node -v    # Verifica que estás en v22.x
```

---

## 🚀 Cómo Ejecutar el Proyecto Mobile

1. Entra a la carpeta del proyecto móvil:
   ```bash
   cd mobile
   ```

2. Instala las dependencias con Node 22:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo de Expo:
   ```bash
   npx expo start
   ```

4. Puedes abrir la aplicación escaneando el código QR con **Expo Go** en tu dispositivo físico (iOS o Android) o presionando `i` para simulador de iOS o `a` para emulador de Android.
