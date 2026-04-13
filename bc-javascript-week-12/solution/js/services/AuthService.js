// Auth Service – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA

import { User }           from '../models/User.js';
import { StorageService } from './StorageService.js';

class AuthServiceClass {
  #currentUser = null;
  #users       = new Map();   // Map<id, User>
  #listeners   = new Set();   // Observer Pattern

  constructor() {
    this.#loadUsers();
    this.#loadSession();
  }

  // ─── Persistencia ───
  #loadUsers() {
    StorageService.loadUsers().forEach(u => {
      try {
        const user = new User(u);
        this.#users.set(user.id, user);
      } catch { /* ignorar datos corruptos */ }
    });
  }

  #saveUsers() {
    StorageService.saveUsers(
      [...this.#users.values()].map(u => u.toStorageJSON())
    );
  }

  #loadSession() {
    const id = StorageService.loadSession();
    if (id) this.#currentUser = this.#users.get(id) ?? null;
  }

  #notify() {
    this.#listeners.forEach(cb => cb(this.getState()));
  }

  // ─── Getters ───
  getState() {
    return { isAuthenticated: this.isLoggedIn, user: this.#currentUser };
  }

  get isLoggedIn()   { return this.#currentUser !== null; }
  get currentUser()  { return this.#currentUser; }

  // ─── Auth ───
  register({ name, email, password }) {
    try {
      User.validate({ name, email, password });
      const exists = [...this.#users.values()].some(u => u.email === email.toLowerCase());
      if (exists) return { success: false, error: 'El email ya está registrado.' };

      const user = User.create({ name, email, password });
      this.#users.set(user.id, user);
      this.#saveUsers();
      this.#currentUser = user;
      StorageService.saveSession(user.id);
      this.#notify();
      return { success: true, user };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  login({ email, password }) {
    try {
      const user = [...this.#users.values()].find(u => u.email === email.toLowerCase());
      if (!user || !user.verifyPassword(password))
        return { success: false, error: 'Email o contraseña incorrectos.' };
      this.#currentUser = user;
      StorageService.saveSession(user.id);
      this.#notify();
      return { success: true, user };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  logout() {
    this.#currentUser = null;
    StorageService.clearSession();
    this.#notify();
  }

  // ─── Observer ───
  subscribe(callback) {
    this.#listeners.add(callback);
    return () => this.#listeners.delete(callback);
  }
}

export const AuthService = new AuthServiceClass();
