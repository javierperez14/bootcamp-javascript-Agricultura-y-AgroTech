// App – AgroTech Manager
// Week-12 | Integración de todos los módulos
// 📌 Completa cada TODO

import { ProductService }     from './services/ProductService.js';
import { AuthService }        from './services/AuthService.js';
import { ReservationService } from './services/ReservationService.js';
import { Cart }               from './models/Cart.js';
import { STORAGE_KEYS }       from './config.js';

// ─── Servicios ───
const productService     = new ProductService();
const authService        = new AuthService();
const reservationService = new ReservationService();
const cart               = new Cart();

// ─────────────────────────────────────────────
// CATÁLOGO
// ─────────────────────────────────────────────

function renderCatalog() {
  // TODO:
  // 1. Lee los filtros del DOM (filter-category, filter-search, filter-sort)
  // 2. Llama productService.filter({ category, search, sort })
  // 3. Renderiza cada producto en #catalog-grid con template literals
  // Cada tarjeta debe tener:
  //   - Icono, nombre, badge de categoría, precio formateado, rating (estrellas), stock
  //   - Botón "Agregar" deshabilitado si !inStock
  //   - data-id en el botón para identificar el producto
}

// ─────────────────────────────────────────────
// CARRITO
// ─────────────────────────────────────────────

function renderCart() {
  // TODO:
  // 1. Actualiza #cart-count con cart.itemCount
  // 2. Muestra/oculta #cart-badge según itemCount > 0
  // 3. Renderiza #cart-items con los items del carrito
  //    Cada item: nombre, botones +/-, cantidad, subtotal
  // 4. Actualiza #cart-total con cart.total formateado
}

function saveCart() {
  // TODO: localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart.toJSON()))
}

function loadCart() {
  // TODO: Carga el carrito desde localStorage y agrega los productos
}

// ─────────────────────────────────────────────
// RESERVAS
// ─────────────────────────────────────────────

function renderReservations() {
  // TODO:
  // Si no hay usuario logueado, oculta la sección
  // Si hay usuario, muestra sus reservas con botón "Cancelar"
}

// ─────────────────────────────────────────────
// AUTH UI
// ─────────────────────────────────────────────

function updateAuthUI() {
  // TODO:
  // Si isLoggedIn: muestra nombre en #user-info, cambia botón a "Cerrar sesión"
  // Si no: limpia #user-info, botón dice "Iniciar sesión"
}

// ─────────────────────────────────────────────
// INICIALIZACIÓN
// ─────────────────────────────────────────────

export function initApp() {
  loadCart();
  renderCatalog();
  renderCart();
  renderReservations();
  updateAuthUI();

  // Filtros
  ['filter-category', 'filter-search', 'filter-sort'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', renderCatalog);
  });

  // Agregar al carrito (delegación de eventos)
  document.getElementById('catalog-grid').addEventListener('click', e => {
    const btn = e.target.closest('[data-id]');
    if (!btn) return;
    const product = productService.getById(btn.dataset.id);
    if (product) {
      cart.add(product);
      saveCart();
      renderCart();
    }
  });

  // Carrito modal
  document.getElementById('cart-badge')?.addEventListener('click', () => {
    document.getElementById('cart-modal').classList.remove('hidden');
  });
  document.getElementById('btn-cart-close')?.addEventListener('click', () => {
    document.getElementById('cart-modal').classList.add('hidden');
  });
  document.getElementById('btn-clear-cart')?.addEventListener('click', () => {
    cart.clear();
    saveCart();
    renderCart();
  });

  // Checkout
  document.getElementById('btn-checkout')?.addEventListener('click', () => {
    if (!authService.isLoggedIn) {
      alert('Debes iniciar sesión para confirmar el pedido.');
      return;
    }
    cart.items.forEach(({ product, quantity }) => {
      reservationService.create({
        userId:      authService.currentUser.id,
        productId:   product.id,
        productName: product.name,
        quantity,
        total:       product.price * quantity
      });
    });
    cart.clear();
    saveCart();
    renderCart();
    renderReservations();
    document.getElementById('cart-modal').classList.add('hidden');
    alert('✅ Pedido confirmado. Revisa tus reservas.');
  });

  // Auth modal
  let isRegisterMode = false;
  document.getElementById('btn-auth')?.addEventListener('click', () => {
    if (authService.isLoggedIn) {
      authService.logout();
      updateAuthUI();
      renderReservations();
    } else {
      document.getElementById('auth-modal').classList.remove('hidden');
    }
  });
  document.getElementById('btn-auth-close')?.addEventListener('click', () => {
    document.getElementById('auth-modal').classList.add('hidden');
  });
  document.getElementById('btn-auth-toggle')?.addEventListener('click', () => {
    isRegisterMode = !isRegisterMode;
    document.getElementById('auth-title').textContent = isRegisterMode ? 'Registrarse' : 'Iniciar sesión';
    document.getElementById('auth-name').classList.toggle('hidden', !isRegisterMode);
    document.getElementById('btn-auth-toggle').textContent = isRegisterMode
      ? '¿Ya tienes cuenta? Inicia sesión'
      : '¿No tienes cuenta? Regístrate';
    document.getElementById('btn-auth-submit').textContent = isRegisterMode ? 'Registrarse' : 'Entrar';
    document.getElementById('auth-error').textContent = '';
  });

  document.getElementById('btn-auth-submit')?.addEventListener('click', () => {
    const name     = document.getElementById('auth-name').value.trim();
    const email    = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const errEl    = document.getElementById('auth-error');
    try {
      const result = isRegisterMode
        ? authService.register({ name, email, password })
        : authService.login({ email, password });
      if (result.success) {
        document.getElementById('auth-modal').classList.add('hidden');
        updateAuthUI();
        renderReservations();
      } else {
        errEl.textContent = result.message ?? 'Error de autenticación.';
      }
    } catch (e) {
      errEl.textContent = e.message;
    }
  });
}
