// Validación Reactiva con Proxy – AgroTech
// Autor: Javier Pérez | Week-10 | Proxy · Reflect
// ✅ SOLUCIÓN COMPLETA

// ─── Validadores ───
const validators = {
  string: (min, max) => (value, prop) => {
    if (typeof value !== 'string' || value.trim().length < min || value.trim().length > max)
      return { isValid: false, message: `${prop}: debe tener entre ${min} y ${max} caracteres.` };
    return { isValid: true, message: `✓ ${prop} válido` };
  },

  number: (min, max) => (value, prop) => {
    const n = Number(value);
    if (isNaN(n) || n < min || n > max)
      return { isValid: false, message: `${prop}: debe ser un número entre ${min} y ${max}.` };
    return { isValid: true, message: `✓ ${prop}: ${n}` };
  },

  date: () => (value, prop) => {
    const d = new Date(value);
    if (isNaN(d.getTime()))
      return { isValid: false, message: `${prop}: fecha inválida.` };
    if (d > new Date())
      return { isValid: false, message: `${prop}: no puede ser una fecha futura.` };
    return { isValid: true, message: `✓ Fecha: ${d.toLocaleDateString('es-CO')}` };
  },

  enum: (options) => (value, prop) => {
    if (!options.includes(value))
      return { isValid: false, message: `${prop}: selecciona una opción válida.` };
    return { isValid: true, message: `✓ ${prop}: ${value}` };
  }
};

// ─── Schema ───
const monitoringSchema = {
  fieldName:   validators.string(2, 50),
  operator:    validators.string(2, 50),
  date:        validators.date(),
  humidity:    validators.number(0, 100),
  temperature: validators.number(-10, 60),
  ph:          validators.number(0, 14),
  status:      validators.enum(['verified', 'pending', 'reviewed'])
};

// ─── Formulario reactivo ───
function createReactiveForm(schema) {
  const _data         = {};
  const _errors       = {};
  const _listeners    = [];
  const _errListeners = [];

  const handler = {
    set(target, prop, value, receiver) {
      const validator = schema[prop];
      if (validator) {
        const result = validator(value, prop);
        if (!result.isValid) {
          _errors[prop] = result.message;
          _errListeners.forEach(fn => fn(prop, result.message));
        } else {
          delete _errors[prop];
        }
        _listeners.forEach(fn => fn(prop, value, result));
      }
      return Reflect.set(target, prop, value, receiver);
    },

    get(target, prop) {
      switch (prop) {
        case 'subscribe':  return fn => _listeners.push(fn);
        case 'onError':    return fn => _errListeners.push(fn);
        case 'isValid':    return () => Object.keys(schema).every(k => !(k in _errors) && k in target);
        case 'getErrors':  return () => ({ ..._errors });
        case 'getData':    return () => ({ ...target });
        default:           return Reflect.get(target, prop);
      }
    }
  };

  return new Proxy(_data, handler);
}

// ─── Conectar DOM ───
function connectToDOM(form, fields) {
  form.subscribe((prop, value, result) => {
    updateFieldUI(prop, result.isValid, result.message);
  });

  fields.forEach(field => {
    const el = document.getElementById(field);
    if (!el) return;
    const event = el.tagName === 'SELECT' ? 'change' : 'input';
    el.addEventListener(event, () => { form[field] = el.value; });
  });
}

function updateFieldUI(fieldId, isValid, message) {
  const input = document.getElementById(fieldId);
  const msg   = document.getElementById(`${fieldId}-msg`);
  if (!input || !msg) return;
  input.classList.toggle('valid',   isValid);
  input.classList.toggle('invalid', !isValid);
  msg.textContent = message;
  msg.className   = `msg ${isValid ? 'ok' : 'err'}`;
}

function renderReactiveState(form) {
  const data   = form.getData();
  const errors = form.getErrors();
  const container = document.getElementById('reactive-state');
  container.innerHTML = Object.keys(monitoringSchema).map(key => {
    const hasError = key in errors;
    const val = data[key] ?? '–';
    return `
      <div class="state-item ${hasError ? 'invalid-field' : (key in data ? 'valid-field' : '')}">
        <div class="key">${key}</div>
        <div class="val">${val}</div>
      </div>
    `;
  }).join('');
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  const form   = createReactiveForm(monitoringSchema);
  const fields = Object.keys(monitoringSchema);

  connectToDOM(form, fields);

  form.subscribe(() => {
    document.getElementById('submitBtn').disabled = !form.isValid();
    renderReactiveState(form);
  });

  document.getElementById('monitorForm').addEventListener('submit', e => {
    e.preventDefault();
    if (!form.isValid()) return;
    document.getElementById('summary-data').textContent = JSON.stringify(form.getData(), null, 2);
    document.getElementById('monitorForm').classList.add('hidden');
    document.getElementById('summary').classList.remove('hidden');
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('monitorForm').reset();
    document.getElementById('monitorForm').classList.remove('hidden');
    document.getElementById('summary').classList.add('hidden');
    fields.forEach(f => {
      const el = document.getElementById(f);
      if (el) el.className = '';
      const msg = document.getElementById(`${f}-msg`);
      if (msg) { msg.textContent = ''; msg.className = 'msg'; }
    });
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('reactive-state').innerHTML = '';
  });
});
