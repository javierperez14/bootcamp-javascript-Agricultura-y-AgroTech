// AuthView UI – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA

import { AuthService }  from '../services/AuthService.js';
import { Notifications } from './Notifications.js';

class AuthViewClass {
  #modal;
  #userInfo;
  #authBtn;
  #isRegisterMode;

  constructor() {
    this.#modal          = null;
    this.#userInfo       = null;
    this.#authBtn        = null;
    this.#isRegisterMode = false;
  }

  init() {
    this.#modal    = document.getElementById('auth-modal');
    this.#userInfo = document.getElementById('user-info');
    this.#authBtn  = document.getElementById('btn-auth');

    this.#setupButtons();

    // Observer: re-renderizar cuando cambie la sesión
    AuthService.subscribe(() => this.#renderUserArea());

    this.#renderUserArea();
  }

  #setupButtons() {
    // Abrir/cerrar modal
    this.#authBtn?.addEventListener('click', () => {
      if (AuthService.isLoggedIn) {
        AuthService.logout();
        Notifications.info('👋 Sesión cerrada. ¡Hasta pronto!');
      } else {
        this.#openModal();
      }
    });

    document.getElementById('btn-auth-close')?.addEventListener('click', () => this.#closeModal());

    // Toggle login ↔ registro
    document.getElementById('btn-auth-toggle')?.addEventListener('click', () => {
      this.#isRegisterMode = !this.#isRegisterMode;
      this.#updateModalMode();
    });

    // Submit
    document.getElementById('btn-auth-submit')?.addEventListener('click', () => {
      this.#handleSubmit();
    });
  }

  #handleSubmit() {
    const name     = document.getElementById('auth-name')?.value.trim();
    const email    = document.getElementById('auth-email')?.value.trim();
    const password = document.getElementById('auth-password')?.value;
    const errEl    = document.getElementById('auth-error');

    const result = this.#isRegisterMode
      ? AuthService.register({ name, email, password })
      : AuthService.login({ email, password });

    if (result.success) {
      const msg = this.#isRegisterMode
        ? `✅ ¡Cuenta creada! Bienvenido, ${result.user.firstName}!`
        : `🌱 ¡Bienvenido, ${result.user.firstName}!`;
      Notifications.success(msg);
      this.#closeModal();
      this.#clearForm();
    } else {
      if (errEl) errEl.textContent = result.error ?? 'Error desconocido.';
    }
  }

  #openModal() {
    this.#isRegisterMode = false;
    this.#updateModalMode();
    this.#modal?.classList.remove('hidden');
  }

  #closeModal() {
    this.#modal?.classList.add('hidden');
  }

  #updateModalMode() {
    const titleEl  = document.getElementById('auth-title');
    const nameEl   = document.getElementById('auth-name');
    const submitEl = document.getElementById('btn-auth-submit');
    const toggleEl = document.getElementById('btn-auth-toggle');
    const errEl    = document.getElementById('auth-error');

    if (this.#isRegisterMode) {
      if (titleEl)  titleEl.textContent  = '🌱 Crear Cuenta';
      if (submitEl) submitEl.textContent = 'Registrarse';
      if (toggleEl) toggleEl.textContent = '¿Ya tienes cuenta? Inicia sesión';
      nameEl?.classList.remove('hidden');
    } else {
      if (titleEl)  titleEl.textContent  = '🔑 Iniciar Sesión';
      if (submitEl) submitEl.textContent = 'Entrar';
      if (toggleEl) toggleEl.textContent = '¿No tienes cuenta? Regístrate';
      nameEl?.classList.add('hidden');
    }
    if (errEl) errEl.textContent = '';
  }

  #clearForm() {
    ['auth-name', 'auth-email', 'auth-password'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const errEl = document.getElementById('auth-error');
    if (errEl) errEl.textContent = '';
  }

  #renderUserArea() {
    if (!this.#userInfo || !this.#authBtn) return;
    const { isAuthenticated, user } = AuthService.getState();

    if (isAuthenticated && user) {
      this.#userInfo.textContent = `👤 ${user.firstName}`;
      this.#authBtn.textContent  = 'Cerrar sesión';
    } else {
      this.#userInfo.textContent = '';
      this.#authBtn.textContent  = 'Iniciar sesión';
    }
  }
}

export const AuthView = new AuthViewClass();
