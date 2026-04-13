// CartView UI – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA

import { CartService }   from '../services/CartService.js';
import { AuthService }   from '../services/AuthService.js';
import { ReservationService } from '../services/ReservationService.js';
import { Notifications } from './Notifications.js';

class CartViewClass {
  #modal;
  #badge;
  #countEl;
  #itemsEl;
  #totalEl;

  constructor() {
    this.#modal   = null;
    this.#badge   = null;
    this.#countEl = null;
    this.#itemsEl = null;
    this.#totalEl = null;
  }

  init() {
    this.#modal   = document.getElementById('cart-modal');
    this.#badge   = document.getElementById('cart-badge');
    this.#countEl = document.getElementById('cart-count');
    this.#itemsEl = document.getElementById('cart-items');
    this.#totalEl = document.getElementById('cart-total');

    this.#setupButtons();

    // Observer: re-renderizar cuando cambie el carrito
    CartService.subscribe(() => this.render());

    this.render();
  }

  #setupButtons() {
    this.#badge?.addEventListener('click', () => {
      this.render();
      this.#modal?.classList.remove('hidden');
    });

    document.getElementById('btn-cart-close')?.addEventListener('click', () => {
      this.#modal?.classList.add('hidden');
    });

    document.getElementById('btn-clear-cart')?.addEventListener('click', () => {
      CartService.clear();
      Notifications.info('🗑️ Carrito vaciado');
    });

    document.getElementById('btn-checkout')?.addEventListener('click', () => {
      if (!AuthService.isLoggedIn) {
        Notifications.warning('⚠️ Debes iniciar sesión para confirmar el pedido.');
        return;
      }
      const state = CartService.getState();
      if (state.isEmpty) { Notifications.warning('El carrito está vacío.'); return; }

      state.items.forEach(({ product, quantity }) => {
        ReservationService.create({
          userId:      AuthService.currentUser.id,
          productId:   product.id,
          productName: product.name,
          quantity,
          total:       product.price * quantity,
        });
      });

      CartService.clear();
      this.#modal?.classList.add('hidden');
      Notifications.success('✅ Pedido confirmado. Revisa tus reservas.');
    });
  }

  render() {
    const state = CartService.getState();

    // Badge
    if (this.#countEl) this.#countEl.textContent = state.totalItems;
    this.#badge?.classList.toggle('hidden', state.totalItems === 0);

    if (!this.#itemsEl) return;

    if (state.isEmpty) {
      this.#itemsEl.innerHTML = '<p style="color:#757575;text-align:center;padding:1rem">Carrito vacío</p>';
      if (this.#totalEl) this.#totalEl.textContent = '$0';
      return;
    }

    const fmt = n => new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP', maximumFractionDigits: 0,
    }).format(n);

    this.#itemsEl.innerHTML = state.items.map(({ product, quantity, formattedSubtotal }) => `
      <div class="cart-item">
        <span class="cart-item-name">${product.icon ?? ''} ${product.name}</span>
        <div class="cart-qty">
          <button data-action="remove" data-id="${product.id}">−</button>
          <span>${quantity}</span>
          <button data-action="add"    data-id="${product.id}">+</button>
        </div>
        <span>${formattedSubtotal ?? fmt(product.price * quantity)}</span>
        <button data-action="delete" data-id="${product.id}">🗑️</button>
      </div>
    `).join('');

    if (this.#totalEl) this.#totalEl.textContent = state.formattedTotal;

    // Botones de cada item
    this.#itemsEl.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const { action, id } = btn.dataset;
        if (action === 'add')    CartService.increaseQuantity(id);
        if (action === 'remove') CartService.decreaseQuantity(id);
        if (action === 'delete') CartService.removeItem(id);
      });
    });
  }
}

export const CartView = new CartViewClass();
