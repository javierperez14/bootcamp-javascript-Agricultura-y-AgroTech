// Objetos Seguros con Symbols – AgroTech
// Autor: Javier Pérez | Week-09 | Symbols · Well-known Symbols
// ✅ SOLUCIÓN COMPLETA

// ─── Símbolos privados ───
const _password  = Symbol('operator.password');
const _license   = Symbol('operator.license');
const _balance   = Symbol('wallet.balance');
const _txHistory = Symbol('wallet.transactions');
const _secrets   = Symbol('config.secrets');

// ─── SecureOperator ───
class SecureOperator {
  constructor(name, email, password, license) {
    this.name          = name;
    this.email         = email;
    this[_password]    = password;
    this[_license]     = license;
  }

  verifyPassword(input) { return this[_password] === input; }

  getMaskedLicense() {
    return this[_license].replace(/\d+$/, m => '*'.repeat(m.length));
  }

  toJSON() {
    return { name: this.name, email: this.email, license: this.getMaskedLicense(), type: 'SecureOperator' };
  }

  get [Symbol.toStringTag]() { return 'SecureOperator'; }
}

// ─── SecureWallet ───
class SecureWallet {
  constructor(initialBalance) {
    this[_balance]   = initialBalance;
    this[_txHistory] = [];
  }

  deposit(amount) {
    if (amount <= 0) return;
    this[_balance] += amount;
    this[_txHistory].push({ type: 'deposit', amount, date: new Date().toISOString() });
  }

  withdraw(amount) {
    if (amount <= 0 || this[_balance] < amount) return false;
    this[_balance] -= amount;
    this[_txHistory].push({ type: 'withdrawal', amount, date: new Date().toISOString() });
    return true;
  }

  getBalance() { return this[_balance]; }

  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'string': return `$${this[_balance].toFixed(2)}`;
      case 'number': return this[_balance];
      default:       return this[_balance];
    }
  }

  [Symbol.iterator]() { return this[_txHistory][Symbol.iterator](); }
}

// ─── SecureConfig ───
class SecureConfig {
  constructor(config) {
    this[_secrets] = {};
    for (const [key, value] of Object.entries(config)) {
      if (key.startsWith('_')) this[_secrets][key.slice(1)] = value;
      else this[key] = value;
    }
  }

  get(key)              { return this[key]; }
  hasSecret(key)        { return key in this[_secrets]; }
  useSecret(key, cb)    { if (this.hasSecret(key)) cb(this[_secrets][key]); }
  getPublicConfig() {
    return Object.fromEntries(
      Object.entries(this).filter(([k]) => typeof k === 'string')
    );
  }
}

// ─── Demo UI ───
let currentOperator = null;
let currentWallet   = null;
const show = (id, text) => { document.getElementById(id).textContent = text; };

document.addEventListener('DOMContentLoaded', () => {
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
      : `Fondos insuficientes. Balance: $${currentWallet.getBalance().toFixed(2)}`
    );
  });

  document.getElementById('btn-wallet-prim').addEventListener('click', () => {
    if (!currentWallet) return show('wallet-result', 'Crea una wallet primero.');
    show('wallet-result', `+wallet: ${+currentWallet}\n\`\${wallet}\`: ${`${currentWallet}`}`);
  });

  document.getElementById('btn-wallet-iter').addEventListener('click', () => {
    if (!currentWallet) return show('wallet-result', 'Crea una wallet primero.');
    const txs = [...currentWallet].map(tx => `${tx.type}: $${tx.amount} (${tx.date.slice(0,10)})`).join('\n');
    show('wallet-result', txs || 'Sin transacciones aún.');
  });

  const config = new SecureConfig({
    apiUrl: 'https://api.agrotech.co', timeout: 5000, environment: 'production',
    _apiKey: 'sk-agro-123456', _dbPassword: 'secret-db-pass'
  });
  document.getElementById('config-public').textContent = JSON.stringify(config.getPublicConfig());
  document.getElementById('config-has-secret').textContent = config.hasSecret('apiKey');
  config.useSecret('apiKey', key => {
    document.getElementById('config-use-secret').textContent = `Clave usada internamente (longitud: ${key.length})`;
  });
});
