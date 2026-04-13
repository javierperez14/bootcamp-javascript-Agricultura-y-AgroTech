// Reservation Service – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA

import { StorageService } from './StorageService.js';

class ReservationServiceClass {
  #reservations = [];
  #listeners    = new Set(); // Observer Pattern

  constructor() {
    this.#reservations = StorageService.loadReservations();
  }

  #save()   { StorageService.saveReservations(this.#reservations); }
  #notify() { this.#listeners.forEach(cb => cb()); }

  create({ userId, productId, productName, quantity, total }) {
    const reservation = {
      id: crypto.randomUUID(), userId, productId, productName,
      quantity, total, date: new Date().toISOString().slice(0, 10), status: 'active',
    };
    this.#reservations.push(reservation);
    this.#save();
    this.#notify();
    return reservation;
  }

  getByUser(userId) {
    return this.#reservations.filter(r => r.userId === userId);
  }

  cancel(reservationId) {
    const res = this.#reservations.find(r => r.id === reservationId);
    if (res) { res.status = 'cancelled'; this.#save(); this.#notify(); }
  }

  subscribe(callback) {
    this.#listeners.add(callback);
    return () => this.#listeners.delete(callback);
  }
}

export const ReservationService = new ReservationServiceClass();
