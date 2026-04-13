// AuthService – AgroTech Manager
// Week-12 | localStorage · try/catch · User model

import { User } from '../models/User.js';
import { STORAGE_KEYS } from '../config.js';

export class AuthService {
  #currentUser = null;
  #users       = new Map();

  constructor() {
    // TODO: Carga usuarios guardados desde localStorage (STORAGE_KEYS.users)
    // Carga la sesión actual desde localStorage (STORAGE_KEYS.session)
    // Si hay sesión, restaura this.#currentUser buscando en this.#users
  }

  /** Registra un nuevo usuario */
  register({ name, email, password }) {
    // TODO:
    // 1. Verifica que el email no esté ya registrado
    // 2. Llama User.create({ name, email, password }) (puede lanzar Error)
    // 3. Guarda en this.#users.set(user.id, user)
    // 4. Persiste en localStorage
    // 5. Retorna { success: true, user }
  }

  /** Inicia sesión */
  login({ email, password }) {
    // TODO:
    // 1. Busca el usuario por email: [...this.#users.values()].find(u => u.email === email)
    // 2. Verifica contraseña con user.verifyPassword(password)
    // 3. Guarda sesión en localStorage
    // 4. Asigna this.#currentUser = user
    // 5. Retorna { success: true, user }
  }

  /** Cierra sesión */
  logout() {
    // TODO: this.#currentUser = null
    // localStorage.removeItem(STORAGE_KEYS.session)
  }

  get currentUser() { return this.#currentUser; }
  get isLoggedIn()  { return this.#currentUser !== null; }

  #saveUsers() {
    // TODO: localStorage.setItem(STORAGE_KEYS.users, JSON.stringify([...this.#users.values()].map(u => u.toJSON())))
    // Nota: toJSON no incluye password, así que guarda también la contraseña de otra forma
    // Simplificación: guarda el objeto completo con password para este ejercicio
  }
}
