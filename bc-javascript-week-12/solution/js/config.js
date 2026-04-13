// Configuración y datos iniciales – AgroTech Manager
// Week-12 – Solution

export const APP_CONFIG = {
  name: 'AgroTech Manager',
  currency: 'COP',
  freeShippingThreshold: 500000,
  maxQuantityPerItem: 10,
};

export const CATEGORIES = ['sensor', 'drone', 'tractor', 'irrigation'];

export const INITIAL_PRODUCTS = [
  { id: '1',  name: 'Sensor Humedad SH-200',     price: 180,   category: 'sensor',     icon: '📡', stock: 15, rating: 4.7 },
  { id: '2',  name: 'Sensor Temperatura ST-100',  price: 120,   category: 'sensor',     icon: '🌡️', stock: 20, rating: 4.5 },
  { id: '3',  name: 'Sensor pH SP-300',           price: 250,   category: 'sensor',     icon: '🧪', stock: 10, rating: 4.8 },
  { id: '4',  name: 'Sensor Luminosidad SL-50',   price: 95,    category: 'sensor',     icon: '☀️', stock: 25, rating: 4.3 },
  { id: '5',  name: 'Drone DJI Agras T40',        price: 8500,  category: 'drone',      icon: '🚁', stock: 3,  rating: 4.9 },
  { id: '6',  name: 'Drone Parrot Bluegrass',     price: 4200,  category: 'drone',      icon: '🚁', stock: 5,  rating: 4.6 },
  { id: '7',  name: 'Drone Wingtra One',          price: 6800,  category: 'drone',      icon: '🚁', stock: 2,  rating: 4.8 },
  { id: '8',  name: 'Tractor John Deere 6M',      price: 95000, category: 'tractor',    icon: '🚜', stock: 1,  rating: 4.9 },
  { id: '9',  name: 'Tractor New Holland T7',     price: 88000, category: 'tractor',    icon: '🚜', stock: 2,  rating: 4.7 },
  { id: '10', name: 'Sistema Riego Netafim',      price: 3200,  category: 'irrigation', icon: '💧', stock: 8,  rating: 4.6 },
  { id: '11', name: 'Riego por Goteo DripKit',    price: 1800,  category: 'irrigation', icon: '💧', stock: 12, rating: 4.4 },
  { id: '12', name: 'Sensor CO2 SC-400',          price: 320,   category: 'sensor',     icon: '🌿', stock: 7,  rating: 4.5 }
];

export const STORAGE_KEYS = {
  cart:         'agrotech_cart_w12',
  session:      'agrotech_session_w12',
  reservations: 'agrotech_reservations_w12',
  users:        'agrotech_users_w12'
};
