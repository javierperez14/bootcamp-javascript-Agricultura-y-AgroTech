// Modelo User – AgroTech Manager
// Week-12 | Campos privados · Validación estática

export class User {
  // TODO: Define campos privados: #id, #name, #email, #password

  constructor({ id, name, email, password }) {
    // TODO: Asigna campos privados
  }

  // TODO: Getters para: id, name, email

  /** Verifica si la contraseña es correcta */
  verifyPassword(input) {
    // TODO: return this.#password === input
  }

  toJSON() {
    // TODO: return { id, name, email } (sin password)
  }

  /** Valida datos antes de crear el usuario. Lanza Error si inválido. */
  static validate({ name, email, password }) {
    // TODO:
    // if (!name || name.trim().length < 2) throw new Error('Nombre inválido')
    // if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Email inválido')
    // if (!password || password.length < 6) throw new Error('Contraseña mínimo 6 caracteres')
  }

  static create({ name, email, password }) {
    // TODO: User.validate({ name, email, password })
    // return new User({ id: crypto.randomUUID(), name, email, password })
  }
}
