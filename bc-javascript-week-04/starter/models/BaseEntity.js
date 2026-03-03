// ============================================
// CLASE BASE: AgriculturalEquipment
// ============================================

export default class AgriculturalEquipment {
  constructor({ 
    id = null, 
    name, 
    category, 
    value, 
    location, 
    quantity = 1, 
    minStock = 1,
    active = true,
    createdAt = new Date().toISOString()
  }) {
    this.id = id || this.generateId();
    this.name = name;
    this.category = category;
    this.value = parseFloat(value);
    this.location = location;
    this.quantity = parseInt(quantity);
    this.minStock = parseInt(minStock);
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = new Date().toISOString();
  }

  // Generar ID único
  generateId() {
    return `EQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Verificar si el stock está bajo
  isLowStock() {
    return this.quantity <= this.minStock;
  }

  // Calcular valor total
  getTotalValue() {
    return this.value * this.quantity;
  }

  // Actualizar cantidad
  updateQuantity(newQuantity) {
    this.quantity = parseInt(newQuantity);
    this.updatedAt = new Date().toISOString();
  }

  // Activar/desactivar
  toggleActive() {
    this.active = !this.active;
    this.updatedAt = new Date().toISOString();
  }

  // Convertir a objeto plano para almacenamiento
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      value: this.value,
      location: this.location,
      quantity: this.quantity,
      minStock: this.minStock,
      active: this.active,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  // Crear instancia desde objeto plano
  static fromJSON(data) {
    return new AgriculturalEquipment(data);
  }
}
