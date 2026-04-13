// Validación Reactiva con Proxy – AgroTech
// Autor: Javier Pérez | Week-10 | Proxy · Reflect
// 📌 Completa cada TODO

// ─────────────────────────────────────────────
// 1. FÁBRICA DE VALIDADORES
// ─────────────────────────────────────────────

/**
 * Cada validador retorna { isValid: boolean, message: string }
 */
const validators = {
  /**
   * Valida string con longitud mínima y máxima.
   * @param {number} min
   * @param {number} max
   */
  string: (min, max) => (value, prop) => {
    // TODO: Verifica que value sea string y su longitud esté entre min y max
    // Retorna { isValid, message }
  },

  /**
   * Valida número dentro de un rango.
   * @param {number} min
   * @param {number} max
   */
  number: (min, max) => (value, prop) => {
    // TODO: Convierte a número con Number(value)
    // Verifica que no sea NaN y esté entre min y max
    // Retorna { isValid, message }
  },

  /**
   * Valida que sea una fecha válida y no futura.
   */
  date: () => (value, prop) => {
    // TODO: Crea new Date(value) y verifica que sea válida
    // Verifica que no sea mayor a hoy
    // Retorna { isValid, message }
  },

  /**
   * Valida que el valor esté en la lista de opciones.
   * @param {string[]} options
   */
  enum: (options) => (value, prop) => {
    // TODO: Verifica que options.includes(value)
    // Retorna { isValid, message }
  }
};

// ─────────────────────────────────────────────
// 2. SCHEMA DE VALIDACIÓN (dominio AgroTech)
// ─────────────────────────────────────────────

const monitoringSchema = {
  fieldName:   validators.string(2, 50),
  operator:    validators.string(2, 50),
  date:        validators.date(),
  humidity:    validators.number(0, 100),
  temperature: validators.number(-10, 60),
  ph:          validators.number(0, 14),
  status:      validators.enum(['verified', 'pending', 'reviewed'])
};

// ─────────────────────────────────────────────
// 3. CREAR FORMULARIO REACTIVO (Proxy)
// ─────────────────────────────────────────────

/**
 * Crea un objeto reactivo que valida automáticamente al asignar valores.
 * @param {Object} schema - Mapa de campo → función validadora
 * @returns {Proxy} Objeto reactivo con métodos subscribe, onError, isValid, getErrors, getData
 */
function createReactiveForm(schema) {
  const _data      = {};   // Datos actuales
  const _errors    = {};   // Errores actuales
  const _listeners = [];   // Suscriptores a cambios
  const _errListeners = []; // Suscriptores a errores

  const handler = {
    /**
     * Trap set: intercepta asignaciones de propiedades.
     * 1. Obtiene el validador del schema
     * 2. Ejecuta la validación
     * 3. Guarda o elimina el error
     * 4. Notifica a los listeners
     * 5. Usa Reflect.set para guardar el valor
     */
    set(target, prop, value, receiver) {
      // TODO:
      // const validator = schema[prop]
      // if (validator) {
      //   const result = validator(value, prop)
      //   if (!result.isValid) {
      //     _errors[prop] = result.message
      //     _errListeners.forEach(fn => fn(prop, result.message))
      //   } else {
      //     delete _errors[prop]
      //   }
      //   _listeners.forEach(fn => fn(prop, value, result))
      // }
      // return Reflect.set(target, prop, value, receiver)
    },

    /**
     * Trap get: expone métodos del formulario.
     */
    get(target, prop) {
      // TODO: switch(prop) {
      //   case 'subscribe':  return fn => _listeners.push(fn)
      //   case 'onError':    return fn => _errListeners.push(fn)
      //   case 'isValid':    return () => Object.keys(schema).every(k => !(k in _errors) && k in target)
      //   case 'getErrors':  return () => ({ ..._errors })
      //   case 'getData':    return () => ({ ...target })
      //   default:           return Reflect.get(target, prop)
      // }
    }
  };

  return new Proxy(_data, handler);
}

// ─────────────────────────────────────────────
// 4. CONECTAR CON EL DOM
// ─────────────────────────────────────────────

/**
 * Conecta el formulario reactivo con los inputs del DOM.
 * @param {Proxy} form - Formulario reactivo
 * @param {string[]} fields - Lista de IDs de campos
 */
function connectToDOM(form, fields) {
  // TODO: Para cada field:
  //   1. Obtén el input/select por id
  //   2. Agrega listener 'input'/'change' que asigne form[field] = input.value
  //   3. Suscríbete a cambios con form.subscribe para actualizar clases CSS y mensajes
  //   4. Suscríbete a errores con form.onError para mostrar mensajes de error
}

/**
 * Actualiza la UI de un campo según si es válido o no.
 */
function updateFieldUI(fieldId, isValid, message) {
  // TODO:
  // const input = document.getElementById(fieldId)
  // const msg   = document.getElementById(`${fieldId}-msg`)
  // input.classList.toggle('valid',   isValid)
  // input.classList.toggle('invalid', !isValid)
  // msg.textContent = message
  // msg.className   = `msg ${isValid ? 'ok' : 'err'}`
}

/**
 * Renderiza el panel de estado reactivo.
 */
function renderReactiveState(form) {
  // TODO: Obtén los datos con form.getData() y los errores con form.getErrors()
  // Renderiza cada campo en #reactive-state con su valor y estado
}

// ─────────────────────────────────────────────
// 5. INICIALIZACIÓN
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const form   = createReactiveForm(monitoringSchema);
  const fields = Object.keys(monitoringSchema);

  connectToDOM(form, fields);

  // Actualizar botón submit según validez
  form.subscribe(() => {
    document.getElementById('submitBtn').disabled = !form.isValid();
    renderReactiveState(form);
  });

  // Submit
  document.getElementById('monitorForm').addEventListener('submit', e => {
    e.preventDefault();
    if (!form.isValid()) return;
    document.getElementById('summary-data').textContent =
      JSON.stringify(form.getData(), null, 2);
    document.getElementById('monitorForm').classList.add('hidden');
    document.getElementById('summary').classList.remove('hidden');
  });

  // Reset
  document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('monitorForm').reset();
    document.getElementById('monitorForm').classList.remove('hidden');
    document.getElementById('summary').classList.add('hidden');
    fields.forEach(f => {
      const el = document.getElementById(f);
      if (el) { el.className = ''; }
      const msg = document.getElementById(`${f}-msg`);
      if (msg) { msg.textContent = ''; msg.className = 'msg'; }
    });
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('reactive-state').innerHTML = '';
  });
});
