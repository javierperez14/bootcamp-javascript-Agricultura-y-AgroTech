// ============================================
// SERVICIO: Equipment Manager
// ============================================

import { AgriculturalEquipment } from '../models/index.js';
import { saveToStorage, loadFromStorage } from './storage.js';

export default class EquipmentManager {
  constructor() {
    this.equipment = [];
    this.loadData();
  }

  // Cargar datos desde localStorage
  loadData() {
    const data = loadFromStorage();
    this.equipment = data.map(item => AgriculturalEquipment.fromJSON(item));
  }

  // Guardar datos en localStorage
  saveData() {
    const data = this.equipment.map(eq => eq.toJSON());
    return saveToStorage(data);
  }

  // Agregar equipo (usando destructuring en parámetros)
  addEquipment({ name, category, value, location, quantity, minStock }) {
    const equipment = new AgriculturalEquipment({
      name,
      category,
      value,
      location,
      quantity,
      minStock,
    });

    this.equipment.push(equipment);
    this.saveData();
    return equipment;
  }

  // Actualizar equipo (usando destructuring)
  updateEquipment(id, { name, category, value, location, quantity, minStock }) {
    const equipment = this.findById(id);
    if (!equipment) return null;

    // Destructuring con valores actuales como fallback
    equipment.name = name ?? equipment.name;
    equipment.category = category ?? equipment.category;
    equipment.value = value ?? equipment.value;
    equipment.location = location ?? equipment.location;
    equipment.quantity = quantity ?? equipment.quantity;
    equipment.minStock = minStock ?? equipment.minStock;
    equipment.updatedAt = new Date().toISOString();

    this.saveData();
    return equipment;
  }

  // Eliminar equipo
  deleteEquipment(id) {
    const index = this.equipment.findIndex(eq => eq.id === id);
    if (index === -1) return false;

    this.equipment.splice(index, 1);
    this.saveData();
    return true;
  }

  // Buscar por ID
  findById(id) {
    return this.equipment.find(eq => eq.id === id);
  }

  // Obtener todos los equipos
  getAllEquipment() {
    return [...this.equipment];
  }

  // Buscar por nombre (usando destructuring en iteración)
  searchByName(query) {
    const lowerQuery = query.toLowerCase();
    return this.equipment.filter(({ name }) => 
      name.toLowerCase().includes(lowerQuery)
    );
  }

  // Filtrar por categoría
  filterByCategory(categoryId) {
    if (!categoryId) return this.getAllEquipment();
    return this.equipment.filter(({ category }) => category === categoryId);
  }

  // Filtrar por estado
  filterByStatus(status) {
    if (status === 'active') {
      return this.equipment.filter(({ active }) => active);
    } else if (status === 'inactive') {
      return this.equipment.filter(({ active }) => !active);
    } else if (status === 'lowStock') {
      return this.equipment.filter(eq => eq.isLowStock());
    }
    return this.getAllEquipment();
  }

  // Filtros combinados (usando destructuring)
  filterEquipment({ category, status, searchQuery }) {
    let filtered = this.getAllEquipment();

    if (category) {
      filtered = filtered.filter(eq => eq.category === category);
    }

    if (status === 'active') {
      filtered = filtered.filter(eq => eq.active);
    } else if (status === 'inactive') {
      filtered = filtered.filter(eq => !eq.active);
    } else if (status === 'lowStock') {
      filtered = filtered.filter(eq => eq.isLowStock());
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(({ name }) => 
        name.toLowerCase().includes(lowerQuery)
      );
    }

    return filtered;
  }

  // Cambiar estado activo/inactivo
  toggleEquipmentStatus(id) {
    const equipment = this.findById(id);
    if (!equipment) return null;

    equipment.toggleActive();
    this.saveData();
    return equipment;
  }

  // Obtener estadísticas (retorna objeto con destructuring)
  getStatistics() {
    const total = this.equipment.length;
    const active = this.equipment.filter(({ active }) => active).length;
    const inactive = total - active;
    const lowStock = this.equipment.filter(eq => eq.isLowStock()).length;

    // Calcular valor total usando reduce con destructuring
    const totalValue = this.equipment.reduce(
      (sum, { value, quantity }) => sum + (value * quantity), 
      0
    );

    // Contar por categoría usando destructuring
    const byCategory = this.equipment.reduce((acc, { category }) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Calcular promedio de valor
    const averageValue = total > 0 ? totalValue / total : 0;

    return {
      total,
      active,
      inactive,
      lowStock,
      totalValue,
      averageValue,
      byCategory,
    };
  }

  // Obtener equipos con alertas
  getAlerts() {
    return this.equipment
      .filter(eq => eq.isLowStock() || !eq.active)
      .map(({ id, name, quantity, minStock, active }) => ({
        id,
        name,
        type: !active ? 'inactive' : 'lowStock',
        message: !active 
          ? 'Equipo inactivo' 
          : `Stock bajo: ${quantity}/${minStock}`,
      }));
  }
}
