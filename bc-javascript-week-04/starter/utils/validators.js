// ============================================
// UTILIDADES: Validators
// ============================================

import { VALIDATION_RULES } from '../config.js';

// Validar nombre
export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'El nombre es requerido' };
  }

  const trimmedName = name.trim();
  
  if (trimmedName.length < VALIDATION_RULES.MIN_NAME_LENGTH) {
    return { 
      valid: false, 
      error: `El nombre debe tener al menos ${VALIDATION_RULES.MIN_NAME_LENGTH} caracteres` 
    };
  }

  if (trimmedName.length > VALIDATION_RULES.MAX_NAME_LENGTH) {
    return { 
      valid: false, 
      error: `El nombre no puede exceder ${VALIDATION_RULES.MAX_NAME_LENGTH} caracteres` 
    };
  }

  return { valid: true, value: trimmedName };
};

// Validar valor numérico
export const validateValue = (value) => {
  const numValue = parseFloat(value);

  if (isNaN(numValue)) {
    return { valid: false, error: 'El valor debe ser un número' };
  }

  if (numValue < VALIDATION_RULES.MIN_VALUE) {
    return { valid: false, error: 'El valor debe ser mayor o igual a 0' };
  }

  return { valid: true, value: numValue };
};

// Validar cantidad
export const validateQuantity = (quantity) => {
  const numQuantity = parseInt(quantity);

  if (isNaN(numQuantity)) {
    return { valid: false, error: 'La cantidad debe ser un número entero' };
  }

  if (numQuantity < VALIDATION_RULES.MIN_QUANTITY) {
    return { valid: false, error: 'La cantidad debe ser al menos 1' };
  }

  return { valid: true, value: numQuantity };
};

// Validar stock mínimo
export const validateMinStock = (minStock) => {
  const numMinStock = parseInt(minStock);

  if (isNaN(numMinStock)) {
    return { valid: false, error: 'El stock mínimo debe ser un número entero' };
  }

  if (numMinStock < VALIDATION_RULES.MIN_STOCK) {
    return { valid: false, error: 'El stock mínimo debe ser mayor o igual a 0' };
  }

  return { valid: true, value: numMinStock };
};

// Validar categoría
export const validateCategory = (category, validCategories) => {
  if (!category) {
    return { valid: false, error: 'La categoría es requerida' };
  }

  const isValid = validCategories.some(cat => cat.id === category);
  
  if (!isValid) {
    return { valid: false, error: 'Categoría inválida' };
  }

  return { valid: true, value: category };
};

// Validar ubicación
export const validateLocation = (location) => {
  if (!location || typeof location !== 'string') {
    return { valid: false, error: 'La ubicación es requerida' };
  }

  const trimmedLocation = location.trim();
  
  if (trimmedLocation.length < 2) {
    return { valid: false, error: 'La ubicación debe tener al menos 2 caracteres' };
  }

  return { valid: true, value: trimmedLocation };
};

// Validar formulario completo (usando destructuring)
export const validateEquipmentForm = ({ name, category, value, location, quantity, minStock }, validCategories) => {
  const errors = [];

  const nameValidation = validateName(name);
  if (!nameValidation.valid) errors.push(nameValidation.error);

  const categoryValidation = validateCategory(category, validCategories);
  if (!categoryValidation.valid) errors.push(categoryValidation.error);

  const valueValidation = validateValue(value);
  if (!valueValidation.valid) errors.push(valueValidation.error);

  const locationValidation = validateLocation(location);
  if (!locationValidation.valid) errors.push(locationValidation.error);

  const quantityValidation = validateQuantity(quantity);
  if (!quantityValidation.valid) errors.push(quantityValidation.error);

  const minStockValidation = validateMinStock(minStock);
  if (!minStockValidation.valid) errors.push(minStockValidation.error);

  return {
    valid: errors.length === 0,
    errors,
    values: errors.length === 0 ? {
      name: nameValidation.value,
      category: categoryValidation.value,
      value: valueValidation.value,
      location: locationValidation.value,
      quantity: quantityValidation.value,
      minStock: minStockValidation.value,
    } : null,
  };
};
