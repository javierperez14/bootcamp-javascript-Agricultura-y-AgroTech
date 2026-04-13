// Sistema Robusto con Manejo de Errores – AgroTech
// Autor: Javier Pérez | Week-11 | Custom Errors · Retry · Fallback
// ✅ SOLUCIÓN COMPLETA

// ─── Clases de error ───
class AppError extends Error {
  constructor(message, code = 'APP_ERROR') {
    super(message);
    this.name      = 'AppError';
    this.code      = code;
    this.timestamp = new Date().toISOString();
  }
  toJSON() { return { name: this.name, message: this.message, code: this.code, timestamp: this.timestamp }; }
}

class ValidationError extends AppError {
  constructor(message, field, value) {
    super(message, 'VALIDATION_ERROR');
    this.name  = 'ValidationError';
    this.field = field;
    this.value = value;
  }
  toUserMessage() { return `Campo "${this.field}": ${this.message}`; }
}

class NetworkError extends AppError {
  constructor(message, status, isRetryable = true) {
    super(message, 'NETWORK_ERROR');
    this.name        = 'NetworkError';
    this.status      = status;
    this.isRetryable = isRetryable;
  }
}

class StorageError extends AppError {
  constructor(message) {
    super(message, 'STORAGE_ERROR');
    this.name = 'StorageError';
  }
}

// ─── Validación ───
function validateRecord({ field, operator, humidity, status }) {
  if (!field || field.length < 3)
    throw new ValidationError('Debe tener al menos 3 caracteres.', 'field', field);
  if (!operator || operator.length < 2)
    throw new ValidationError('Debe tener al menos 2 caracteres.', 'operator', operator);
  const h = Number(humidity);
  if (isNaN(h) || h < 0 || h > 100)
    throw new ValidationError('Debe ser un número entre 0 y 100.', 'humidity', humidity);
  if (!['verified', 'pending'].includes(status))
    throw new ValidationError('Selecciona un estado válido.', 'status', status);
}

// ─── API con retry ───
function simulateAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.6) {
        reject(new NetworkError('Error de conexión con el servidor', 503));
      } else {
        resolve({ data: 'Datos del servidor AgroTech', timestamp: new Date().toISOString() });
      }
    }, 800);
  });
}

async function withRetry(fn, maxRetries = 3, onAttempt = () => {}) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      onAttempt(attempt, error);
      if (attempt === maxRetries || (error instanceof NetworkError && !error.isRetryable)) throw error;
      await new Promise(r => setTimeout(r, 2 ** attempt * 500));
    }
  }
}

// ─── Storage ───
const STORAGE_KEY = 'agrotech_records_w11';

function saveRecords(records) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }
  catch (e) { throw new StorageError(`No se pudo guardar: ${e.message}`); }
}

function loadRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new StorageError('Datos corruptos en localStorage');
    return parsed;
  } catch (e) {
    logError(e);
    return [];
  }
}

// ─── Estado y logging ───
let records = loadRecords();

function logError(error) {
  const box  = document.getElementById('error-log');
  const line = document.createElement('div');
  line.className = `log-line ${error instanceof ValidationError ? 'warn' : 'err'}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${error.name ?? 'Error'}: ${error.message}` +
    (error instanceof AppError ? ` (${error.code})` : '');
  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
}

function logInfo(msg) {
  const box  = document.getElementById('error-log');
  const line = document.createElement('div');
  line.className = 'log-line info';
  line.textContent = `[${new Date().toLocaleTimeString()}] ℹ️ ${msg}`;
  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
}

// ─── Render ───
function renderRecords() {
  const list  = document.getElementById('rec-list');
  const count = document.getElementById('rec-count');
  count.textContent = records.length;
  list.innerHTML = records.map((r, i) => `
    <div class="rec-item">
      <span class="rec-field">📍 ${r.field}</span>
      <span>👤 ${r.operator}</span>
      <span>💧 ${r.humidity}%</span>
      <span class="rec-status status-${r.status}">${r.status}</span>
      <button data-index="${i}" title="Eliminar">🗑️</button>
    </div>
  `).join('') || '<p style="color:#757575;font-size:.85rem">Sin registros aún.</p>';

  list.querySelectorAll('button[data-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      records.splice(Number(btn.dataset.index), 1);
      renderRecords();
      logInfo('Registro eliminado');
    });
  });
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  renderRecords();

  document.getElementById('btn-create').addEventListener('click', () => {
    const record = {
      field:    document.getElementById('rec-field').value.trim(),
      operator: document.getElementById('rec-operator').value.trim(),
      humidity: Number(document.getElementById('rec-humidity').value),
      status:   document.getElementById('rec-status').value
    };
    const fb = document.getElementById('create-feedback');
    try {
      validateRecord(record);
      record.id   = `MON-${Date.now()}`;
      record.date = new Date().toISOString().slice(0, 10);
      records.push(record);
      renderRecords();
      fb.textContent = '✅ Registro creado correctamente.';
      fb.className   = 'feedback ok';
      logInfo(`Registro creado: ${record.field}`);
      ['rec-field','rec-operator','rec-humidity'].forEach(id => document.getElementById(id).value = '');
      document.getElementById('rec-status').value = '';
    } catch (e) {
      fb.textContent = e instanceof ValidationError ? e.toUserMessage() : 'Error inesperado.';
      fb.className   = 'feedback err';
      logError(e);
    }
  });

  document.getElementById('btn-api-call').addEventListener('click', async () => {
    const statusEl = document.getElementById('api-status');
    statusEl.innerHTML = '';
    document.getElementById('btn-api-call').disabled = true;
    try {
      const result = await withRetry(simulateAPI, 3, (attempt, error) => {
        const line = document.createElement('p');
        line.className = 'attempt';
        line.textContent = `Intento ${attempt} fallido: ${error.message}. Reintentando…`;
        statusEl.appendChild(line);
        logError(error);
      });
      const s = document.createElement('p');
      s.className = 'success';
      s.textContent = `✅ Éxito: ${result.data}`;
      statusEl.appendChild(s);
      logInfo('API respondió correctamente');
    } catch (e) {
      const err = document.createElement('p');
      err.className = 'error';
      err.textContent = `❌ Falló después de 3 intentos: ${e.message}`;
      statusEl.appendChild(err);
      logError(e);
    } finally {
      document.getElementById('btn-api-call').disabled = false;
    }
  });

  document.getElementById('btn-save').addEventListener('click', () => {
    const fb = document.getElementById('storage-feedback');
    try {
      saveRecords(records);
      fb.textContent = `✅ ${records.length} registros guardados.`;
      fb.className   = 'feedback ok';
      logInfo('Datos guardados en localStorage');
    } catch (e) {
      fb.textContent = e instanceof StorageError ? e.message : 'Error al guardar.';
      fb.className   = 'feedback err';
      logError(e);
    }
  });

  document.getElementById('btn-load').addEventListener('click', () => {
    records = loadRecords();
    renderRecords();
    const fb = document.getElementById('storage-feedback');
    fb.textContent = `✅ ${records.length} registros cargados.`;
    fb.className   = 'feedback ok';
    logInfo('Datos cargados desde localStorage');
  });

  document.getElementById('btn-corrupt').addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'DATOS_CORRUPTOS_{}[]');
    const fb = document.getElementById('storage-feedback');
    fb.textContent = '⚠️ Datos corruptos guardados. Presiona "Cargar" para ver el fallback.';
    fb.className   = 'feedback err';
    logInfo('Datos corruptos simulados');
  });

  document.getElementById('btn-clear-log').addEventListener('click', () => {
    document.getElementById('error-log').innerHTML = '';
  });
});
