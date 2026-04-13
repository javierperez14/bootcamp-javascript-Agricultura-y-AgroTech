// User Model – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA

export class User {
  #id; #name; #email; #password; #createdAt;

  constructor({ id, name, email, password, createdAt }) {
    this.#id        = id;
    this.#name      = name;
    this.#email     = email.toLowerCase();
    this.#password  = password;
    this.#createdAt = createdAt ?? new Date().toISOString();
  }

  get id()        { return this.#id; }
  get name()      { return this.#name; }
  get email()     { return this.#email; }
  get createdAt() { return this.#createdAt; }

  get firstName() { return this.#name.split(' ')[0]; }
  get initials() {
    return this.#name.split(' ').filter(p => p.length > 0).slice(0, 2)
      .map(p => p[0].toUpperCase()).join('');
  }

  verifyPassword(input) { return this.#password === input; }

  toJSON() {
    return { id: this.#id, name: this.#name, email: this.#email, createdAt: this.#createdAt };
  }

  // Incluye password para persistencia
  toStorageJSON() {
    return { id: this.#id, name: this.#name, email: this.#email,
             password: this.#password, createdAt: this.#createdAt };
  }

  static validate({ name, email, password }) {
    if (!name || name.trim().length < 2)
      throw new Error('Nombre inválido (mínimo 2 caracteres).');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new Error('Email inválido.');
    if (!password || password.length < 6)
      throw new Error('Contraseña mínimo 6 caracteres.');
  }

  static create({ name, email, password }) {
    User.validate({ name, email, password });
    return new User({
      id: crypto.randomUUID(),
      name: name.trim(),
      email,
      password,
    });
  }
}
