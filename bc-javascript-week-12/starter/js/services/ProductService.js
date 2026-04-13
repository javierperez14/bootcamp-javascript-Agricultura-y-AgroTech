// ProductService – AgroTech Manager
// Week-12 | filter · map · toSorted · Set

import { Product } from '../models/Product.js';
import { INITIAL_PRODUCTS } from '../config.js';

export class ProductService {
  #products;

  constructor() {
    // TODO: this.#products = INITIAL_PRODUCTS.map(Product.create)
  }

  /** Retorna todos los productos */
  getAll() {
    // TODO: return [...this.#products]
  }

  /** Busca un producto por ID */
  getById(id) {
    // TODO: return this.#products.find(p => p.id === id)
  }

  /**
   * Filtra y ordena productos.
   * @param {{ category?, search?, sort? }} options
   */
  filter({ category = '', search = '', sort = 'name-asc' } = {}) {
    // TODO:
    // 1. Filtra por category si está definida
    // 2. Filtra por search (nombre incluye el texto, case-insensitive)
    // 3. Ordena con toSorted() según sort:
    //    'name-asc'   → a.name.localeCompare(b.name)
    //    'name-desc'  → b.name.localeCompare(a.name)
    //    'price-asc'  → a.price - b.price
    //    'price-desc' → b.price - a.price
  }

  /** Retorna las categorías únicas usando Set */
  getCategories() {
    // TODO: return Array.from(new Set(this.#products.map(p => p.category)))
  }
}
