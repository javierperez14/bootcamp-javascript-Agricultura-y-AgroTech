// ============================================
// CLASE: Category
// ============================================

export default class Category {
  constructor({ id, name, emoji, description }) {
    this.id = id;
    this.name = name;
    this.emoji = emoji;
    this.description = description;
  }

  // Obtener badge HTML
  getBadgeHTML() {
    return `<span class="equipment-badge badge-${this.id}">${this.name}</span>`;
  }

  // Obtener representación completa
  getFullDisplay() {
    return `${this.emoji} ${this.name}`;
  }

  // Validar si un equipo pertenece a esta categoría
  matches(equipment) {
    return equipment.category === this.id;
  }
}
