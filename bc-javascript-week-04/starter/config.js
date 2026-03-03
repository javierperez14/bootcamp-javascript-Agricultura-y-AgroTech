// ============================================
// CONFIGURACIÓN DEL SISTEMA AGROTECH
// ============================================

// Categorías de equipos agrícolas
export const CATEGORIES = {
  TRACTOR: { 
    id: 'tractor', 
    name: 'Tractor', 
    emoji: '🚜',
    description: 'Maquinaria pesada para labranza'
  },
  SENSOR: { 
    id: 'sensor', 
    name: 'Sensor IoT', 
    emoji: '📡',
    description: 'Sensores de monitoreo agrícola'
  },
  DRONE: { 
    id: 'drone', 
    name: 'Drone Agrícola', 
    emoji: '🚁',
    description: 'Drones para fumigación y monitoreo'
  },
  IRRIGATION: { 
    id: 'irrigation', 
    name: 'Sistema de Riego', 
    emoji: '💧',
    description: 'Equipos de irrigación'
  },
};

// Configuración general de la aplicación
export const APP_CONFIG = {
  APP_NAME: 'Sistema AgroTech',
  VERSION: '1.0.0',
  STORAGE_KEY: 'agrotech_equipment_data',
  MIN_STOCK_THRESHOLD: 3, // Umbral para alertas de stock bajo
  CURRENCY: 'USD',
  CURRENCY_SYMBOL: '$',
};

// Estados de equipos
export const EQUIPMENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
};

// Configuración de validación
export const VALIDATION_RULES = {
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 100,
  MIN_VALUE: 0,
  MIN_QUANTITY: 1,
  MIN_STOCK: 0,
};

// Mensajes del sistema
export const MESSAGES = {
  SUCCESS: {
    ADD: 'Equipo agregado exitosamente',
    UPDATE: 'Equipo actualizado exitosamente',
    DELETE: 'Equipo eliminado exitosamente',
    EXPORT: 'Datos exportados exitosamente',
  },
  ERROR: {
    INVALID_DATA: 'Datos inválidos',
    NOT_FOUND: 'Equipo no encontrado',
    STORAGE_ERROR: 'Error al guardar los datos',
    LOAD_MODULE: 'Error al cargar el módulo',
  },
  WARNING: {
    LOW_STOCK: 'Stock bajo',
    CONFIRM_DELETE: '¿Estás seguro de eliminar este equipo?',
  },
};

// Exportar todas las categorías como array
export const getCategoriesArray = () => Object.values(CATEGORIES);

// Obtener categoría por ID
export const getCategoryById = (id) => {
  return Object.values(CATEGORIES).find(cat => cat.id === id);
};
