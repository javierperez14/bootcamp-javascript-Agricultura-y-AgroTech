// ReservationService – AgroTech Manager
// Week-12 | CRUD · localStorage · filter

import { STORAGE_KEYS } from '../config.js';

export class ReservationService {
  #reservations = [];

  constructor() {
    // TODO: Carga reservas desde localStorage (STORAGE_KEYS.reservations)
    // try { const raw = localStorage.getItem(...); if (raw) this.#reservations = JSON.parse(raw) }
    // catch { this.#reservations = [] }
  }

  /** Crea una nueva reserva */
  create({ userId, productId, productName, quantity, total }) {
    // TODO: Crea objeto reserva con:
    // { id: crypto.randomUUID(), userId, productId, productName, quantity, total,
    //   date: new Date().toISOString().slice(0,10), status: 'active' }
    // Agrega a this.#reservations y persiste
  }

  /** Retorna reservas del usuario actual */
  getByUser(userId) {
    // TODO: return this.#reservations.filter(r => r.userId === userId)
  }

  /** Cancela una reserva */
  cancel(reservationId) {
    // TODO: Encuentra la reserva y cambia su status a 'cancelled'
    // Persiste los cambios
  }

  #save() {
    // TODO: localStorage.setItem(STORAGE_KEYS.reservations, JSON.stringify(this.#reservations))
  }
}
