// Sistema Robusto con Manejo de Errores – AgroTech
// Autor: Javier Pérez | Week-11 | Custom Errors · Retry · Fallback
// 📌 Completa cada TODO

// ─────────────────────────────────────────────
// 1. CLASES DE ERROR PERSONALIZADAS
// ─────────────────────────────────────────────

/**
 * Clase base para todos los errores de la aplicación.
 * Debe incluir: code, timestamp, toJSON()
 */
class AppError extends Error {
  // TODO:
  // constructor(message, code = 'APP_ERROR') {
  //   super(message)
  //   this.name = 'AppError'
  //   this.code = code
  //   this.timestamp = new Date().toISOString()
  // }
  // toJSON() { return { name, message, code, timestamp } }
}

/**
 * Error de validación con campo y valor afectado.
 * Debe incluir: field, value, toUserMessage()
 */
class ValidationError extends AppError {
  // TODO:
  // constructor(message, field, value) {
  //   super(message, 'VALIDATION_ERROR')
  //   this.name = 'ValidationError'
  //   this.field = field
  //   this.value = value
  // }
  // toUserMessage() { return `Campo "${this.field}": ${this.message}` }
}

/**
 * Error de red simulado.
 * Debe incluir: status, isRetryable
 */
class NetworkError extends AppError {
  // TODO:
  // constructor(message, status, isRetryable = true) {
  //   super(message, 'NETWORK_ERROR')
  //   this.name = 'NetworkError'
  //   this.status = status
  //   this.isRetryable = isRetryable
  // }
}

/**
 * Error de almacenamiento local.
 */
class StorageError extends AppError {
  // TODO:
  // constructor(message) {
  //   super(message, 'STORAGE_ERROR')
  //   this.name = 'StorageError'
  // }
}

// ─────────────────────────────────────────────
// 2. VALIDACIÓN DE REGISTROS
// ─────────────────────────────────────────────

/**
 * Valida un registro de monitoreo.
 * Lanza ValidationError si algún campo es inválido.
 * @param {{ field, operator, humidity, status }} record
 */
function validateRecord(record) {
  // TODO: Valida cada campo y lanza ValidationError si falla:
  // - field: requerido, mínimo 3 chars
  // - operator: requerido, mínimo 2 chars
  // - humidity: número entre 0 y 100
  // - status: debe ser 'verified' o 'pending'
}

// ─────────────────────────────────────────────
// 3. SIMULACIÓN DE API CON RETRY
// ─────────────────────────────────────────────

/**
 * Simula una llamada a la API que falla aleatoriamente.
 * Falla con 60% de probabilidad.
 * @returns {Promise<Object>}
 */
function simulateAPI() {
  // TODO: return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     if (Math.random() < 0.6) {
  //       reject(new NetworkError('Error de conexión con el servidor', 503))
  //     } else {
  //       resolve({ data: 'Datos del servidor AgroTech', timestamp: new Date().toISOString() })
  //     }
  //   }, 800)
  // })
}

/**
 * Reintenta una función async hasta maxRetries veces con exponential backoff.
 * @param {Function} fn - Función async a reintentar
 * @param {number} maxRetries
 * @param {Function} onAttempt - Callback para notificar cada intento
 */
async function withRetry(fn, maxRetries = 3, onAttempt = () => {}) {
  // TODO: Bucle for de 1 a maxRetries
  // try { return await fn() }
  // catch (error) {
  //   onAttempt(attempt, error)
  //   if (attempt === maxRetries || (error instanceof NetworkError && !error.isRetryable)) throw error
  //   await new Promise(r => setTimeout(r, 2 ** attempt * 500)) // exponential backoff
  // }
}

// ─────────────────────────────────────────────
// 4. STORAGE CON FALLBACK
// ─────────────────────────────────────────────

const STORAGE_KEY = 'agrotech_records_w11';

/**
 * Guarda los registros en localStorage.
 * Lanza StorageError si falla.
 */
function saveRecords(records) {
  // TODO: try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)) }
  // catch (e) { throw new StorageError(`No se pudo guardar: ${e.message}`) }
}

/**
 * Carga los registros desde localStorage.
 * Retorna [] como fallback si falla o si los datos son inválidos.
 */
function loadRecords() {
  // TODO: try {
  //   const raw = localStorage.getItem(STORAGE_KEY)
  //   if (!raw) return []
  //   const parsed = JSON.parse(raw)
  //   if (!Array.isArray(parsed)) throw new StorageError('Datos corruptos')
  //   return parsed
  // } catch (e) {
  //   logError(e)
  //   return [] // fallback
  // }
}

// ─────────────────────────────────────────────
// 5. ESTADO Y LOGGING
// ─────────────────────────────────────────────

let records = loadRecords();

function logError(error) {
  const box  = document.getElementById('error-log');
  const line = document.createElement('div');
  const isAppError = error instanceof AppError;
  line.className = `log-line ${error instanceof ValidationError ? 'warn' : 'err'}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${error.name ?? 'Error'}: ${error.message}` +
    (isAppError ? ` (${error.code})` : '');
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

// ─────────────────────────────────────────────
// 6. RENDER
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// 7. INICIALIZACIÓN
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderRecords();

  // Crear registro
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
      if (e instanceof ValidationError) {
        fb.textContent = e.toUserMessage();
      } else {
        fb.textContent = 'Error inesperado al crear el registro.';
      }
      fb.className = 'feedback err';
      logError(e);
    }
  });

  // API con retry
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
      const success = document.createElement('p');
      success.className = 'success';
      success.textContent = `✅ Éxito: ${result.data}`;
      statusEl.appendChild(success);
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

  // Storage
  document.getElementById('btn-save').addEventListener('click', () => {
    const fb = document.getElementById('storage-feedback');
    try {
      saveRecords(records);
      fb.textContent = `✅ ${records.length} registros guardados en localStorage.`;
      fb.className   = 'feedback ok';
      logInfo('Datos guardados en localStorage');
    } catch (e) {
      fb.textContent = e instanceof StorageError ? e.message : 'Error al guardar.';
      fb.className   = 'feedback err';
      logError(e);
    }
  });

  document.getElementById('btn-load').addEventListener('click', () => {
    const fb = document.getElementById('storage-feedback');
    records = loadRecords();
    renderRecords();
    fb.textContent = `✅ ${records.length} registros cargados.`;
    fb.className   = 'feedback ok';
    logInfo('Datos cargados desde localStorage');
  });

  document.getElementById('btn-corrupt').addEventListener('click', () => {
    localStorage.setItem(STORAGE_KEY, 'DATOS_CORRUPTOS_{}[]');
    const fb = document.getElementById('storage-feedback');
    fb.textContent = '⚠️ Datos corruptos guardados. Presiona "Cargar" para ver el fallback.';
    fb.className   = 'feedback err';
    logInfo('Datos corruptos simulados en localStorage');
  });

  document.getElementById('btn-clear-log').addEventListener('click', () => {
    document.getElementById('error-log').innerHTML = '';
  });
});
