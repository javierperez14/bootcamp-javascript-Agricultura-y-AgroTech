// Cart Model – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA

import { CartItem }   from './CartItem.js';
import { APP_CONFIG } from '../config.js';

export class Cart {
  #items = new Map(); // Map<productId, CartItem>

  // ─── Getters ───
  get items()     { return [...this.#items.values()]; }
  get totalItems(){ return this.items.reduce((s, i) => s + i.quantity, 0); }
  get uniqueItems(){ return this.#items.size; }
  get isEmpty()   { return this.#items.size === 0; }

  get subtotal() {
    return this.items.reduce((s, i) => s + i.subtotal, 0);
  }

  get shipping() {
    if (this.isEmpty) return 0;
    return this.subtotal >= (APP_CONFIG?.freeShippingThreshold ?? 500000) ? 0 : 50000;
  }

  get total() { return this.subtotal + this.shipping; }

  get formattedSubtotal() { return this.#fmt(this.subtotal); }
  get formattedTotal()    { return this.#fmt(this.total); }

  #fmt(n) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP', maximumFractionDigits: 0,
    }).format(n);
  }

  // ─── Métodos ───
  addItem(product, quantity = 1) {
    const existing = this.#items.get(String(product.id));
    if (existing) { existing.increaseQuantity(quantity); return existing; }
    const item = new CartItem(product, quantity);
    this.#items.set(String(product.id), item);
    return item;
  }

  removeItem(productId) { return this.#items.delete(String(productId)); }

  updateQuantity(productId, quantity) {
    const item = this.#items.get(String(productId));
    if (!item) return false;
    if (quantity <= 0) return this.removeItem(productId);
    item.setQuantity(quantity);
    return true;
  }

  getItem(productId)  { return this.#items.get(String(productId)); }
  hasItem(productId)  { return this.#items.has(String(productId)); }
  clear()             { this.#items.clear(); }

  toJSON() {
    return { items: this.items.map(i => i.toJSON()) };
  }
}
