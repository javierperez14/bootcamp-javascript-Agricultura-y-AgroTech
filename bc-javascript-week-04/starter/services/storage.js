// ============================================
// SERVICIO: LocalStorage
// ============================================

import { APP_CONFIG } from '../config.js';

// Guardar datos en localStorage
export const saveToStorage = (data) => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(APP_CONFIG.STORAGE_KEY, jsonData);
    return true;
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
    return false;
  }
};

// Cargar datos desde localStorage
export const loadFromStorage = () => {
  try {
    const jsonData = localStorage.getItem(APP_CONFIG.STORAGE_KEY);
    return jsonData ? JSON.parse(jsonData) : [];
  } catch (error) {
    console.error('Error al cargar desde localStorage:', error);
    return [];
  }
};

// Limpiar localStorage
export const clearStorage = () => {
  try {
    localStorage.removeItem(APP_CONFIG.STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error al limpiar localStorage:', error);
    return false;
  }
};

// Exportar datos como JSON
export const exportAsJSON = (data) => {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  return URL.createObjectURL(blob);
};

// Obtener tamaño del storage
export const getStorageSize = () => {
  const data = localStorage.getItem(APP_CONFIG.STORAGE_KEY);
  return data ? new Blob([data]).size : 0;
};
