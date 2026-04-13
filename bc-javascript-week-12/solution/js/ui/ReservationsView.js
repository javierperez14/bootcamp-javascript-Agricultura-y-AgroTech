// ReservationsView UI – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA

import { AuthService }        from '../services/AuthService.js';
import { ReservationService } from '../services/ReservationService.js';
import { Notifications }      from './Notifications.js';

class ReservationsViewClass {
  #section;
  #list;
  #countEl;

  constructor() {
    this.#section = null;
    this.#list    = null;
    this.#countEl = null;
  }

  init() {
    this.#section = document.getElementById('reservations-section');
    this.#list    = document.getElementById('reservations-list');
    this.#countEl = document.getElementById('res-count');

    // Observer: re-renderizar cuando cambie auth o reservas
    AuthService.subscribe(() => this.render());
    ReservationService.subscribe(() => this.render());

    this.render();
  }

  render() {
    if (!this.#section) return;
    const { isAuthenticated, user } = AuthService.getState();

    if (!isAuthenticated || !user) {
      this.#section.style.display = 'none';
      return;
    }

    this.#section.style.display = '';
    const reservations = ReservationService.getByUser(user.id);

    if (this.#countEl) this.#countEl.textContent = reservations.length;

    if (!this.#list) return;

    if (reservations.length === 0) {
      this.#list.innerHTML = '<p style="color:#757575;font-size:.85rem">Sin reservas aún.</p>';
      return;
    }

    const fmt = n => new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP', maximumFractionDigits: 0,
    }).format(n);

    this.#list.innerHTML = reservations.map(r => `
      <div class="res-item">
        <span class="res-name">${r.productName}</span>
        <span>x${r.quantity}</span>
        <span>${fmt(r.total)}</span>
        <span>${r.date}</span>
        <span class="rec-status status-${r.status === 'active' ? 'verified' : 'pending'}">${r.status}</span>
        ${r.status === 'active'
          ? `<button class="btn btn-sm btn-outline" data-res-id="${r.id}">Cancelar</button>`
          : ''}
      </div>
    `).join('');

    this.#list.querySelectorAll('[data-res-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        ReservationService.cancel(btn.dataset.resId);
        Notifications.info('Reserva cancelada.');
      });
    });
  }
}

export const ReservationsView = new ReservationsViewClass();
