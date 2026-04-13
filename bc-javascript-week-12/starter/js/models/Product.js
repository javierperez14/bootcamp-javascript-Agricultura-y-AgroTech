// Modelo Product – AgroTech Manager
// Week-12 | Campos privados · Getters · toJSON

export class Product {
  // TODO: Define campos privados:
  // #id, #name, #price, #category, #icon, #stock, #rating

  /**
   * @param {{ id, name, price, category, icon, stock, rating }} data
   */
  constructor({ id, name, price, category, icon, stock, rating }) {
    // TODO: Asigna cada campo privado
  }

  // TODO: Getters para: id, name, price, category, icon, stock, rating

  /** Retorna true si hay stock disponible */
  get inStock() {
    // TODO: return this.#stock > 0
  }

  /** Formatea el precio como moneda */
  get formattedPrice() {
    // TODO: return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(this.#price)
  }

  /** Retorna estrellas según rating */
  get stars() {
    // TODO: return '⭐'.repeat(Math.round(this.#rating))
  }

  toJSON() {
    // TODO: return { id, name, price, category, icon, stock, rating }
  }

  /** Crea una instancia desde un objeto plano */
  static create(data) {
    // TODO: return new Product(data)
  }
}
