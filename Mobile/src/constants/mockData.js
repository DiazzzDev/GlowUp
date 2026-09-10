// Datos iniciales de productos basados en el catálogo de Glow Up SV y diseño UI
export const CATEGORIES = [
  { id: 'cat-1', name: 'Protección solar', count: 20, icon: 'sun' },
  { id: 'cat-2', name: 'Hidratantes', count: 15, icon: 'droplet' },
  { id: 'cat-3', name: 'Limpiadores', count: 10, icon: 'sparkles' },
  { id: 'cat-4', name: 'Serums', count: 25, icon: 'flask-conical' },
  { id: 'cat-5', name: 'Antiedad', count: 8, icon: 'clock' },
];

export const SKIN_TYPES = [
  { id: 'all', label: 'Todas' },
  { id: 'dry', label: 'Piel Seca' },
  { id: 'oily', label: 'Piel Grasa' },
  { id: 'combo', label: 'Piel Mixta' },
  { id: 'sensitive', label: 'Piel Sensible' },
];

export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Hidratante facial CeraVe',
    category: 'Hidratantes',
    skinType: 'dry',
    price: 15.0,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format&fit=crop&q=80',
    description: 'Fórmula enriquecida con 3 ceramidas esenciales y ácido hialurónico para restaurar la barrera protectora de la piel.',
    brand: 'CeraVe',
  },
  {
    id: 'prod-2',
    name: 'Protector Solar La Roche-Posay',
    category: 'Protección solar',
    skinType: 'oily',
    price: 24.5,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=80',
    description: 'Anthelios XL toque seco SPF 50+, control de brillo inmediato sin dejar marcas blancas.',
    brand: 'La Roche-Posay',
  },
  {
    id: 'prod-3',
    name: 'Gel Limpiador Purificante Nivea',
    category: 'Limpiadores',
    skinType: 'oily',
    price: 12.0,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop&q=80',
    description: 'Limpia profundamente reduciendo el exceso de grasa y matificando el rostro durante el día.',
    brand: 'Nivea',
  },
  {
    id: 'prod-4',
    name: 'Retinol Nivea Noche',
    category: 'Antiedad',
    skinType: 'all',
    price: 28.5,
    rating: 4.7,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=80',
    description: 'Tratamiento renovador nocturno intensivo con ácido hialurónico puro y bio-retinol acelerador celular.',
    brand: 'Nivea',
  },
  {
    id: 'prod-5',
    name: 'Tanning Banana Boat',
    category: 'Protección solar',
    skinType: 'all',
    price: 19.99,
    rating: 4.7,
    reviews: 64,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80',
    description: 'Aceite bronceador con extractos de coco y zanahoria para un tono dorado radiante e hidratado.',
    brand: 'Banana Boat',
  },
  {
    id: 'prod-6',
    name: 'After Sun Aloe Vera',
    category: 'Protección solar',
    skinType: 'sensitive',
    price: 15.0,
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1567928815119-b4b3720242c8?w=500&auto=format&fit=crop&q=80',
    description: 'Gel refrescante enriquecido con aloe vera 100% puro para calmar e hidratar la piel post-exposición.',
    brand: 'Banana Boat',
  },
];

export const INITIAL_CART = [
  {
    id: 'prod-5',
    name: 'Tanning',
    category: 'Cuidado Solar',
    price: 19.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'prod-6',
    name: 'After Sun',
    category: 'Cuidado Solar',
    price: 15.0,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1567928815119-b4b3720242c8?w=500&auto=format&fit=crop&q=80',
  },
];

export const INITIAL_ORDERS = [
  {
    id: '1823',
    date: '15 feb 2026',
    status: 'En camino',
    statusColor: '#17C3B2',
    totalItems: 7,
    totalPrice: 200.79,
    itemsPreview: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=100&auto=format&fit=crop&q=80',
    ],
    remainingCount: 4,
  },
  {
    id: '1822',
    date: '10 feb 2026',
    status: 'Entregado',
    statusColor: '#9E9E9E',
    totalItems: 7,
    totalPrice: 200.79,
    itemsPreview: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1567928815119-b4b3720242c8?w=100&auto=format&fit=crop&q=80',
    ],
    remainingCount: 4,
  },
];

export const SKIN_TIPS = [
  {
    id: 'tip-1',
    step: '01',
    title: 'Limpieza Facial',
    tag: 'Día y Noche',
    description: 'Lava tu rostro con agua tibia y un limpiador suave adecuado para tu tipo de piel sin alterar el pH.',
  },
  {
    id: 'tip-2',
    step: '02',
    title: 'Hidratación Profunda',
    tag: 'Diario',
    description: 'Aplica una crema o gel hidratante con ácido hialurónico para mantener la elasticidad y suavidad.',
  },
  {
    id: 'tip-3',
    step: '03',
    title: 'Protección Solar',
    tag: 'Esencial',
    description: 'Usa protector solar SPF 50+ cada 3 horas, incluso en interiores o días nublados para evitar el fotoenvejecimiento.',
  },
  {
    id: 'tip-4',
    step: '04',
    title: 'Exfoliación Moderada',
    tag: '1-2 veces por semana',
    description: 'Elimina células muertas con exfoliantes químicos suaves (AHA/BHA) para evitar poros obstruidos.',
  },
];

export const SURVEY_QUESTIONS = [
  {
    id: 'q1',
    question: '¿Cómo sientes tu piel a mitad del día?',
    options: [
      { label: 'Tirante y opaca', type: 'dry' },
      { label: 'Brillante en zona T y mejillas', type: 'oily' },
      { label: 'Brillo solo en frente y nariz', type: 'combo' },
      { label: 'Con rojeces o picazón fácil', type: 'sensitive' },
    ],
  },
  {
    id: 'q2',
    question: '¿Cuál es tu principal objetivo para tu piel?',
    options: [
      { label: 'Combatir acné y exceso de sebo', focus: 'clarity' },
      { label: 'Hidratar y recuperar luminosidad', focus: 'glow' },
      { label: 'Prevenir arrugas y líneas finas', focus: 'anti-aging' },
      { label: 'Calmar sensibilidad y rojeces', focus: 'calm' },
    ],
  },
];
