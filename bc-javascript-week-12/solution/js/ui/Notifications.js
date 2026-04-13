// Notifications UI – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA

class NotificationsClass {
  #container;
  #duration;

  constructor() {
    this.#container = null;
    this.#duration  = 3500;
  }

  #getContainer() {
    if (!this.#container) {
      this.#container = document.getElementById('notifications');
      if (!this.#container) {
        this.#container = document.createElement('div');
        this.#container.id = 'notifications';
        this.#container.style.cssText =
          'position:fixed;top:1rem;right:1rem;z-index:9999;display:flex;flex-direction:column;gap:.5rem';
        document.body.appendChild(this.#container);
      }
    }
    return this.#container;
  }

  show(message, type = 'info', duration = this.#duration) {
    const container = this.#getContainer();
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

    const el = document.createElement('div');
    el.className = `notification notification-${type}`;
    el.style.cssText =
      'background:#fff;border-left:4px solid;padding:.75rem 1rem;border-radius:6px;' +
      'box-shadow:0 2px 8px rgba(0,0,0,.15);display:flex;gap:.5rem;align-items:center;' +
      'max-width:320px;cursor:pointer;opacity:0;transition:opacity .3s;' +
      `border-color:${{ success:'#2e7d32', error:'#c62828', warning:'#f9a825', info:'#1565c0' }[type]}`;

    el.innerHTML = `<span>${icons[type] ?? 'ℹ️'}</span><span>${message}</span>`;
    container.appendChild(el);

    setTimeout(() => { el.style.opacity = '1'; }, 10);
    const remove = () => {
      el.style.opacity = '0';
      setTimeout(() => el.remove(), 300);
    };
    setTimeout(remove, duration);
    el.addEventListener('click', remove);
  }

  success(msg, d) { this.show(msg, 'success', d); }
  error(msg, d)   { this.show(msg, 'error',   d); }
  warning(msg, d) { this.show(msg, 'warning', d); }
  info(msg, d)    { this.show(msg, 'info',    d); }
}

export const Notifications = new NotificationsClass();
