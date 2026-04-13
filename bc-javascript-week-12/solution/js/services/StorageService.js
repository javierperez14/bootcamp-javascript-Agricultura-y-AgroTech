// Storage Service – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA

import { STORAGE_KEYS } from '../config.js';

class StorageServiceClass {
  // ─── Genéricos ───
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error(`[AgroTech Storage] Error guardando "${key}": ${e.message}`);
      return false;
    }
  }

  load(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return defaultValue;
      return JSON.parse(raw);
    } catch (e) {
      console.error(`[AgroTech Storage] Error cargando "${key}": ${e.message}`);
      return defaultValue;
    }
  }

  remove(key) {
    try { localStorage.removeItem(key); return true; }
    catch (e) { console.error(`[AgroTech Storage] Error eliminando "${key}": ${e.message}`); return false; }
  }

  clearAll() {
    Object.values(STORAGE_KEYS).forEach(key => this.remove(key));
  }

  // ─── Carrito ───
  saveCart(data)  { return this.save(STORAGE_KEYS.cart, data); }
  loadCart()      { return this.load(STORAGE_KEYS.cart, null); }
  clearCart()     { this.remove(STORAGE_KEYS.cart); }

  // ─── Usuarios ───
  saveUsers(data) { return this.save(STORAGE_KEYS.users, data); }
  loadUsers()     { return this.load(STORAGE_KEYS.users, []); }

  // ─── Sesión ───
  saveSession(id) { return this.save(STORAGE_KEYS.session, id); }
  loadSession()   { return this.load(STORAGE_KEYS.session, null); }
  clearSession()  { this.remove(STORAGE_KEYS.session); }

  // ─── Reservas ───
  saveReservations(data) { return this.save(STORAGE_KEYS.reservations, data); }
  loadReservations()     { return this.load(STORAGE_KEYS.reservations, []); }
}

export const StorageService = new StorageServiceClass();
