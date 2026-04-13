// Cart Service – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA

import { Cart }           from '../models/Cart.js';
import { CartItem }       from '../models/CartItem.js';
import { Product }        from '../models/Product.js';
import { StorageService } from './StorageService.js';

class CartServiceClass {
  #cart;
  #listeners; // Observer Pattern

  constructor() {
    this.#cart      = new Cart();
    this.#listeners = new Set();
    this.#loadFromStorage();
  }

  // ─── Persistencia ───
  #loadFromStorage() {
    const saved = StorageService.loadCart();
    if (!saved?.items) return;
    saved.items.forEach(itemData => {
      try {
        // Reconstruir como instancia Product para que los getters funcionen
        const productData = itemData.product ?? itemData;
        const product = Product.create(productData);
        this.#cart.addItem(product, itemData.quantity ?? 1);
      } catch { /* ignorar items corruptos */ }
    });
  }

  #save() { StorageService.saveCart(this.#cart.toJSON()); }

  #notify() {
    this.#listeners.forEach(cb => cb(this.getState()));
  }

  // ─── Estado ───
  getState() {
    return {
      items:            this.#cart.items,
      totalItems:       this.#cart.totalItems,
      uniqueItems:      this.#cart.uniqueItems,
      subtotal:         this.#cart.subtotal,
      shipping:         this.#cart.shipping,
      total:            this.#cart.total,
      formattedSubtotal: this.#cart.formattedSubtotal,
      formattedTotal:   this.#cart.formattedTotal,
      isEmpty:          this.#cart.isEmpty,
    };
  }

  // ─── Operaciones ───
  addItem(product, quantity = 1) {
    try {
      // isInStock / inStock — soportar ambos nombres de getter
      const inStock = typeof product.isInStock === 'boolean'
        ? product.isInStock
        : typeof product.inStock === 'boolean'
          ? product.inStock
          : (product.stock ?? 0) > 0;

      if (!inStock) {
        return { success: false, error: `${product.name} no tiene stock disponible` };
      }
      const item = this.#cart.addItem(product, quantity);
      this.#save();
      this.#notify();
      return { success: true, item };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  removeItem(productId) {
    const ok = this.#cart.removeItem(productId);
    if (ok) { this.#save(); this.#notify(); }
    return { success: ok };
  }

  updateQuantity(productId, quantity) {
    const ok = this.#cart.updateQuantity(productId, quantity);
    if (ok) { this.#save(); this.#notify(); }
    return { success: ok };
  }

  increaseQuantity(productId) {
    const item = this.#cart.getItem(productId);
    if (item) this.updateQuantity(productId, item.quantity + 1);
  }

  decreaseQuantity(productId) {
    const item = this.#cart.getItem(productId);
    if (item) this.updateQuantity(productId, item.quantity - 1);
  }

  clear() { this.#cart.clear(); this.#save(); this.#notify(); }

  hasItem(productId)      { return this.#cart.hasItem(productId); }
  getItemQuantity(id)     { return this.#cart.getItem(id)?.quantity ?? 0; }

  // ─── Observer ───
  subscribe(callback) {
    this.#listeners.add(callback);
    return () => this.#listeners.delete(callback);
  }
}

export const CartService = new CartServiceClass();
