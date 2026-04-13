// Objetos Seguros con Symbols – AgroTech
// Autor: Javier Pérez | Week-09 | Symbols · Well-known Symbols
// 📌 Completa cada TODO

// ─────────────────────────────────────────────
// 1. SÍMBOLOS PRIVADOS
// ─────────────────────────────────────────────

// TODO: Define los símbolos para datos privados
// const _password = Symbol('operator.password')
// const _license  = Symbol('operator.license')
// const _balance  = Symbol('wallet.balance')
// const _txHistory = Symbol('wallet.transactions')
// const _secrets  = Symbol('config.secrets')

// ─────────────────────────────────────────────
// 2. SecureOperator
// ─────────────────────────────────────────────

class SecureOperator {
  /**
   * @param {string} name
   * @param {string} email
   * @param {string} password  - Se guarda en símbolo privado
   * @param {string} license   - Licencia AgroTech (ej: AGR-12345)
   */
  constructor(name, email, password, license) {
    // TODO: Asigna name y email como propiedades públicas
    // Guarda password en this[_password]
    // Guarda license en this[_license]
  }

  /** Verifica si la contraseña es correcta sin exponerla */
  verifyPassword(input) {
    // TODO: return this[_password] === input
  }

  /**
   * Retorna la licencia enmascarada: AGR-*****
   * Solo muestra el prefijo y oculta los dígitos
   */
  getMaskedLicense() {
    // TODO: Usa replace() con RegExp para ocultar los dígitos
    // Ej: 'AGR-12345' → 'AGR-*****'
  }

  /** Serializa solo datos públicos (sin password ni license completa) */
  toJSON() {
    // TODO: return { name, email, license: getMaskedLicense(), type: 'SecureOperator' }
  }

  /** Symbol.toStringTag para identificación de tipo */
  get [Symbol.toStringTag]() {
    // TODO: return 'SecureOperator'
  }
}

// ─────────────────────────────────────────────
// 3. SecureWallet
// ─────────────────────────────────────────────

class SecureWallet {
  /**
   * @param {number} initialBalance
   */
  constructor(initialBalance) {
    // TODO: Guarda balance en this[_balance]
    // Inicializa this[_txHistory] = []
  }

  /** Deposita fondos y registra la transacción */
  deposit(amount) {
    // TODO: Valida amount > 0
    // this[_balance] += amount
    // Agrega a this[_txHistory]: { type: 'deposit', amount, date: new Date().toISOString() }
  }

  /** Retira fondos si hay suficiente balance */
  withdraw(amount) {
    // TODO: Valida amount > 0 y this[_balance] >= amount
    // this[_balance] -= amount
    // Agrega a this[_txHistory]: { type: 'withdrawal', amount, date: ... }
    // Retorna true si exitoso, false si no hay fondos
  }

  getBalance() {
    // TODO: return this[_balance]
  }

  /**
   * Symbol.toPrimitive:
   * - hint 'number' → retorna el balance
   * - hint 'string' → retorna '$balance.toFixed(2)'
   * - default       → retorna el balance
   */
  [Symbol.toPrimitive](hint) {
    // TODO: switch(hint) { case 'string': ... case 'number': ... default: ... }
  }

  /**
   * Symbol.iterator: itera sobre el historial de transacciones
   */
  [Symbol.iterator]() {
    // TODO: return this[_txHistory][Symbol.iterator]()
  }
}

// ─────────────────────────────────────────────
// 4. SecureConfig
// ─────────────────────────────────────────────

class SecureConfig {
  /**
   * Separa automáticamente claves que empiezan con '_' como secretos.
   * @param {Object} config
   */
  constructor(config) {
    // TODO: Itera Object.entries(config)
    // Si la clave empieza con '_': guarda en this[_secrets][clave sin '_']
    // Si no: guarda como propiedad pública this[clave] = valor
    // Inicializa this[_secrets] = {} antes del loop
  }

  /** Obtiene un valor de configuración pública */
  get(key) {
    // TODO: return this[key]
  }

  /** Verifica si existe un secreto con esa clave */
  hasSecret(key) {
    // TODO: return key in this[_secrets]
  }

  /**
   * Ejecuta un callback con el valor del secreto.
   * El secreto nunca se expone directamente.
   */
  useSecret(key, callback) {
    // TODO: if (this.hasSecret(key)) callback(this[_secrets][key])
  }

  /** Retorna solo la configuración pública */
  getPublicConfig() {
    // TODO: Usa Object.fromEntries para filtrar solo propiedades no-símbolo
    // Excluye _secrets usando Object.getOwnPropertySymbols
  }
}

// ─────────────────────────────────────────────
// 5. DEMO UI
// ─────────────────────────────────────────────

let currentOperator = null;
let currentWallet   = null;

const show = (id, text) => {
  document.getElementById(id).textContent = text;
};

document.addEventListener('DOMContentLoaded', () => {

  // SecureOperator
  document.getElementById('btn-create-op').addEventListener('click', () => {
    const name     = document.getElementById('op-name').value;
    const email    = document.getElementById('op-email').value;
    const password = document.getElementById('op-password').value;
    const license  = document.getElementById('op-license').value;
    currentOperator = new SecureOperator(name, email, password, license);
    show('op-result',
      `Operador creado: ${Object.prototype.toString.call(currentOperator)}\n` +
      `Object.keys: [${Object.keys(currentOperator).join(', ')}]\n` +
      `Símbolos ocultos: ${Object.getOwnPropertySymbols(currentOperator).length} propiedades`
    );
  });

  document.getElementById('btn-verify-pass').addEventListener('click', () => {
    if (!currentOperator) return show('op-demo-result', 'Crea un operador primero.');
    const input = document.getElementById('op-pass-check').value;
    show('op-demo-result', `verifyPassword: ${currentOperator.verifyPassword(input)}`);
  });

  document.getElementById('btn-mask-license').addEventListener('click', () => {
    if (!currentOperator) return show('op-demo-result', 'Crea un operador primero.');
    show('op-demo-result', `getMaskedLicense: ${currentOperator.getMaskedLicense()}`);
  });

  document.getElementById('btn-op-json').addEventListener('click', () => {
    if (!currentOperator) return show('op-demo-result', 'Crea un operador primero.');
    show('op-demo-result', `toJSON:\n${JSON.stringify(currentOperator.toJSON(), null, 2)}`);
  });

  document.getElementById('btn-op-keys').addEventListener('click', () => {
    if (!currentOperator) return show('op-demo-result', 'Crea un operador primero.');
    show('op-demo-result', `Object.keys: [${Object.keys(currentOperator).join(', ')}]\n(password y license NO aparecen ✅)`);
  });

  // SecureWallet
  document.getElementById('btn-create-wallet').addEventListener('click', () => {
    const init = Number(document.getElementById('wallet-init').value);
    currentWallet = new SecureWallet(init);
    show('wallet-result', `Wallet creada. Balance: $${currentWallet.getBalance().toFixed(2)}`);
  });

  document.getElementById('btn-deposit').addEventListener('click', () => {
    if (!currentWallet) return show('wallet-result', 'Crea una wallet primero.');
    const amount = Number(document.getElementById('wallet-amount').value);
    currentWallet.deposit(amount);
    show('wallet-result', `Depósito de $${amount}. Nuevo balance: $${currentWallet.getBalance().toFixed(2)}`);
  });

  document.getElementById('btn-withdraw').addEventListener('click', () => {
    if (!currentWallet) return show('wallet-result', 'Crea una wallet primero.');
    const amount = Number(document.getElementById('wallet-amount').value);
    const ok = currentWallet.withdraw(amount);
    show('wallet-result', ok
      ? `Retiro de $${amount}. Nuevo balance: $${currentWallet.getBalance().toFixed(2)}`
      : `Fondos insuficientes. Balance actual: $${currentWallet.getBalance().toFixed(2)}`
    );
  });

  document.getElementById('btn-wallet-prim').addEventListener('click', () => {
    if (!currentWallet) return show('wallet-result', 'Crea una wallet primero.');
    show('wallet-result',
      `+wallet (number): ${+currentWallet}\n` +
      `\`\${wallet}\` (string): ${`${currentWallet}`}`
    );
  });

  document.getElementById('btn-wallet-iter').addEventListener('click', () => {
    if (!currentWallet) return show('wallet-result', 'Crea una wallet primero.');
    const txs = [...currentWallet].map(tx =>
      `${tx.type}: $${tx.amount} (${tx.date.slice(0,10)})`
    ).join('\n');
    show('wallet-result', txs || 'Sin transacciones aún.');
  });

  // SecureConfig demo
  const config = new SecureConfig({
    apiUrl:      'https://api.agrotech.co',
    timeout:     5000,
    environment: 'production',
    _apiKey:     'sk-agro-123456',
    _dbPassword: 'secret-db-pass'
  });

  document.getElementById('config-public').textContent =
    JSON.stringify(config.getPublicConfig());
  document.getElementById('config-has-secret').textContent =
    config.hasSecret('apiKey');
  config.useSecret('apiKey', key => {
    document.getElementById('config-use-secret').textContent =
      `Clave usada internamente (longitud: ${key.length})`;
  });
});
