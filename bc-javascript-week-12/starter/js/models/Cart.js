// Modelo Cart – AgroTech Manager
// Week-12 | Map · Spread · Reduce

export class Cart {
  // TODO: Define campo privado #items como Map<productId, { product, quantity }>

  constructor() {
    // TODO: this.#items = new Map()
  }

  /** Agrega un producto o incrementa su cantidad */
  add(product) {
    // TODO: Si ya existe en el Map, incrementa quantity
    // Si no, agrega { product, quantity: 1 }
  }

  /** Decrementa la cantidad. Si llega a 0, elimina del Map */
  remove(productId) {
    // TODO: Obtén el item, decrementa quantity
    // Si quantity <= 0, llama this.#items.delete(productId)
  }

  /** Elimina completamente un producto del carrito */
  delete(productId) {
    // TODO: this.#items.delete(productId)
  }

  /** Vacía el carrito */
  clear() {
    // TODO: this.#items.clear()
  }

  /** Retorna el total de items (suma de cantidades) */
  get itemCount() {
    // TODO: return [...this.#items.values()].reduce((sum, item) => sum + item.quantity, 0)
  }

  /** Retorna el precio total */
  get total() {
    // TODO: return [...this.#items.values()].reduce((sum, { product, quantity }) => sum + product.price * quantity, 0)
  }

  /** Retorna los items como array */
  get items() {
    // TODO: return [...this.#items.values()]
  }

  toJSON() {
    // TODO: return this.items.map(({ product, quantity }) => ({ ...product.toJSON(), quantity }))
  }
}
