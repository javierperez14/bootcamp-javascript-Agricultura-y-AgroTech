// ProductList UI – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA

import { ProductService } from '../services/ProductService.js';
import { CartService }    from '../services/CartService.js';
import { Notifications }  from './Notifications.js';

class ProductListClass {
  #grid;
  #filters;

  constructor() {
    this.#grid = null;
    this.#filters = { category: '', search: '', sort: 'name-asc' };
  }

  init() {
    this.#grid = document.getElementById('catalog-grid');
    // Sincronizar filtro sort con el valor actual del select en el DOM
    const sortEl = document.getElementById('filter-sort');
    if (sortEl) this.#filters.sort = sortEl.value || 'name-asc';
    this.#setupFilters();
    this.render();
  }

  #setupFilters() {
    document.getElementById('filter-category')?.addEventListener('change', e => {
      this.#filters.category = e.target.value;
      this.render();
    });

    document.getElementById('filter-search')?.addEventListener('input', e => {
      this.#filters.search = e.target.value;
      this.render();
    });

    document.getElementById('filter-sort')?.addEventListener('change', e => {
      this.#filters.sort = e.target.value;
      this.render();
    });
  }

  render() {
    if (!this.#grid) return;
    const products = ProductService.filter(this.#filters);

    if (products.length === 0) {
      this.#grid.innerHTML = '<p class="empty-state">No se encontraron equipos.</p>';
      return;
    }

    this.#grid.innerHTML = products.map(p => this.#renderCard(p)).join('');
    this.#setupAddButtons();
  }

  #renderCard(p) {
    return `
      <div class="product-card">
        <div class="product-icon">${p.icon}</div>
        <div class="product-name">${p.name}</div>
        <span class="product-category cat-${p.category}">${p.category}</span>
        <div class="product-price">${p.formattedPrice}</div>
        <div class="product-rating">${p.stars} (${p.rating})</div>
        <div class="product-stock">${p.inStock ? `Stock: ${p.stock}` : '❌ Sin stock'}</div>
        <button class="btn-add" data-id="${p.id}" ${!p.inStock ? 'disabled' : ''}>
          ${p.inStock ? '+ Agregar' : 'Sin stock'}
        </button>
      </div>
    `;
  }

  #setupAddButtons() {
    this.#grid?.querySelectorAll('.btn-add').forEach(btn => {
      btn.addEventListener('click', () => {
        const product = ProductService.getById(btn.dataset.id);
        if (!product) return;
        const result = CartService.addItem(product);
        if (result.success) {
          Notifications.success(`✅ ${product.name} agregado al carrito`);
        } else {
          Notifications.error(result.error);
        }
      });
    });
  }
}

export const ProductList = new ProductListClass();
