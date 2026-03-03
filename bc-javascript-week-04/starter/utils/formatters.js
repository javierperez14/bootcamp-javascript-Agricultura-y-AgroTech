// ============================================
// UTILIDADES: Formatters
// ============================================

import { APP_CONFIG } from '../config.js';

// Formatear moneda
export const formatCurrency = (value) => {
  return `${APP_CONFIG.CURRENCY_SYMBOL}${parseFloat(value).toFixed(2)}`;
};

// Formatear fecha
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Formatear fecha corta
export const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES');
};

// Formatear número con separadores de miles
export const formatNumber = (num) => {
  return new Intl.NumberFormat('es-ES').format(num);
};

// Formatear porcentaje
export const formatPercentage = (value, total) => {
  if (total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(1)}%`;
};

// Capitalizar primera letra
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Truncar texto
export const truncate = (str, maxLength = 50) => {
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};

// Formatear tiempo relativo
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoy';
  if (diffDays === 1) return 'Ayer';
  if (diffDays < 7) return `Hace ${diffDays} días`;
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
  return formatShortDate(dateString);
};
