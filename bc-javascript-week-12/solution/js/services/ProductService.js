// Product Service – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA

import { Product }          from '../models/Product.js';
import { INITIAL_PRODUCTS } from '../config.js';

class ProductServiceClass {
  #products = new Map();

  constructor() {
    INITIAL_PRODUCTS.forEach(data => {
      try {
        const p = Product.create(data);
        this.#products.set(p.id, p);
      } catch (e) {
        console.error('[ProductService] Error creando producto:', data, e);
      }
    });
  }

  getAll()    { return [...this.#products.values()]; }
  getById(id) { return this.#products.get(String(id)); }

  filter({ category = '', search = '', sort = 'name-asc' } = {}) {
    return this.getAll()
      .filter(p => !category || p.category === category)
      .filter(p => !search   || p.name.toLowerCase().includes(search.toLowerCase()))
      .toSorted((a, b) => {
        switch (sort) {
          case 'name-asc':   return a.name.localeCompare(b.name);
          case 'name-desc':  return b.name.localeCompare(a.name);
          case 'price-asc':  return a.price - b.price;
          case 'price-desc': return b.price - a.price;
          default:           return 0;
        }
      });
  }

  getCategories() {
    return Array.from(new Set(this.getAll().map(p => p.category)));
  }
}

export const ProductService = new ProductServiceClass();
