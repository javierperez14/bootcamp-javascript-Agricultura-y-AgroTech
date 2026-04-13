// Validador de Formularios – AgroTech
// Autor: Javier Pérez | Week-06 | RegExp + Strings ES2023
// ✅ SOLUCIÓN COMPLETA

// ─────────────────────────────────────────────
// 1. PATRONES RegExp
// ─────────────────────────────────────────────

const patterns = {
  // Solo letras (incluyendo tildes y ñ) y espacios, 2-50 caracteres
  name: /^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]{2,50}$/,

  // Email con grupos nombrados
  email: /^(?<user>[a-zA-Z0-9._%+-]+)@(?<domain>[a-zA-Z0-9.-]+)\.(?<tld>[a-zA-Z]{2,})$/,

  // Teléfono colombiano: +57 seguido de 10 dígitos
  phone: /^\+57[\s]?\d{3}[\s]?\d{3}[\s]?\d{4}$/,

  // Contraseña: mínimo 8 chars (la fortaleza se evalúa por separado)
  password: /^.{8,}$/,

  // Código de lote: LOT-YYYY-NNN
  lotCode: /^LOT-\d{4}-\d{3}$/,

  // Hectáreas: número decimal positivo
  hectares: /^\d{1,4}(\.\d{1,2})?$/,

  // Coordenadas GPS: lat,lng con decimales
  gps: /^(?<lat>-?\d{1,2}(\.\d+)?),(?<lng>-?\d{1,3}(\.\d+)?)$/
};

// ─────────────────────────────────────────────
// 2. SANITIZACIÓN
// ─────────────────────────────────────────────

function sanitizeInput(input) {
  return String(input)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// ─────────────────────────────────────────────
// 3. VALIDADORES
// ─────────────────────────────────────────────

const validators = {

  validateName(value) {
    const trimmed = value.trim();
    if (!patterns.name.test(trimmed)) {
      return { isValid: false, message: 'Solo letras y espacios, entre 2 y 50 caracteres.' };
    }
    // Title Case
    const formatted = trimmed
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
    return { isValid: true, message: `✓ Nombre válido: ${formatted}`, formatted };
  },

  validateEmail(value) {
    const trimmed = value.trim().toLowerCase();
    const match = patterns.email.exec(trimmed);
    if (!match) {
      return { isValid: false, message: 'Ingresa un correo electrónico válido.' };
    }
    const { user, domain } = match.groups;
    return { isValid: true, message: `✓ Usuario "${user}" en dominio "${domain}" detectado.` };
  },

  validatePhone(value) {
    const cleaned = value.replace(/[^\d+]/g, '');
    if (!patterns.phone.test(value.trim())) {
      return { isValid: false, message: 'Formato: +57 300 123 4567' };
    }
    // Formatear: +57 XXX XXX XXXX
    const digits = cleaned.replace('+57', '');
    const formatted = `+57 ${digits.slice(0,3)} ${digits.slice(3,6)} ${digits.slice(6)}`;
    return { isValid: true, message: `✓ Teléfono válido`, formatted };
  },

  validatePassword(value) {
    let score = 0;
    if (value.length >= 8)  score++;
    if (value.length >= 12) score++;
    if (/[a-z]/.test(value)) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/\d/.test(value))    score++;
    if (/[^a-zA-Z0-9]/.test(value)) score++;

    const isValid = score >= 4 && value.length >= 8;
    const message = isValid
      ? '✓ Contraseña segura'
      : 'Mínimo 8 caracteres con mayúscula, minúscula, número y carácter especial.';
    return { isValid, message, score };
  },

  validateConfirm(value) {
    const password = document.getElementById('password').value;
    if (!value) return { isValid: false, message: 'Confirma tu contraseña.' };
    if (value !== password) return { isValid: false, message: 'Las contraseñas no coinciden.' };
    return { isValid: true, message: '✓ Las contraseñas coinciden.' };
  },

  validateLotCode(value) {
    const formatted = value.toUpperCase().trim();
    if (!patterns.lotCode.test(formatted)) {
      return { isValid: false, message: 'Formato: LOT-YYYY-NNN (ej: LOT-2024-001)' };
    }
    return { isValid: true, message: `✓ Código de lote válido`, formatted };
  },

  validateHectares(value) {
    if (!patterns.hectares.test(value.trim())) {
      return { isValid: false, message: 'Ingresa un número válido (ej: 12.5)' };
    }
    const num = parseFloat(value);
    if (num < 0.1 || num > 9999.99) {
      return { isValid: false, message: 'El área debe estar entre 0.1 y 9999.99 ha.' };
    }
    return { isValid: true, message: `✓ ${num.toFixed(2)} hectáreas` };
  },

  validateGps(value) {
    const match = patterns.gps.exec(value.trim());
    if (!match) {
      return { isValid: false, message: 'Formato: latitud,longitud (ej: 4.7110,-74.0721)' };
    }
    const lat = parseFloat(match.groups.lat);
    const lng = parseFloat(match.groups.lng);
    if (lat < -90 || lat > 90)   return { isValid: false, message: 'Latitud debe estar entre -90 y 90.' };
    if (lng < -180 || lng > 180) return { isValid: false, message: 'Longitud debe estar entre -180 y 180.' };
    return { isValid: true, message: `✓ Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}` };
  }
};

// ─────────────────────────────────────────────
// 4. MEDIDOR DE FORTALEZA
// ─────────────────────────────────────────────

function updateStrengthBar(score) {
  const fill  = document.getElementById('strength-fill');
  const label = document.getElementById('strength-label');
  const width = `${(score / 6) * 100}%`;
  const [color, text] =
    score < 3 ? ['#c62828', 'Débil'] :
    score < 5 ? ['#f9a825', 'Media'] :
                ['#2e7d32', 'Fuerte'];
  fill.style.width      = width;
  fill.style.background = color;
  label.textContent     = score > 0 ? `Fortaleza: ${text}` : '';
}

// ─────────────────────────────────────────────
// 5. LÓGICA DE CAMPO
// ─────────────────────────────────────────────

const fieldValidators = {
  name:     v => validators.validateName(v),
  email:    v => validators.validateEmail(v),
  phone:    v => validators.validatePhone(v),
  password: v => validators.validatePassword(v),
  confirm:  v => validators.validateConfirm(v),
  lotCode:  v => validators.validateLotCode(v),
  hectares: v => validators.validateHectares(v),
  gps:      v => validators.validateGps(v)
};

const fieldState = Object.fromEntries(
  Object.keys(fieldValidators).map(k => [k, false])
);

function validateField(id) {
  const input  = document.getElementById(id);
  const msgEl  = document.getElementById(`${id}-msg`);
  const value  = sanitizeInput(input.value);
  const result = fieldValidators[id](value);

  input.classList.toggle('valid',   result.isValid);
  input.classList.toggle('invalid', !result.isValid);
  msgEl.textContent = result.message;
  msgEl.className   = `msg ${result.isValid ? 'ok' : 'err'}`;

  if (result.formatted) input.value = result.formatted;
  if (id === 'password') updateStrengthBar(result.score ?? 0);

  fieldState[id] = result.isValid;
  checkFormValidity();
}

function checkFormValidity() {
  document.getElementById('submitBtn').disabled =
    !Object.values(fieldState).every(Boolean);
}

// ─────────────────────────────────────────────
// 6. INICIALIZACIÓN
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  Object.keys(fieldValidators).forEach(id => {
    document.getElementById(id).addEventListener('input', () => validateField(id));
  });

  document.getElementById('agroForm').addEventListener('submit', e => {
    e.preventDefault();
    const data = {
      nombre:     document.getElementById('name').value,
      email:      document.getElementById('email').value,
      telefono:   document.getElementById('phone').value,
      codigoLote: document.getElementById('lotCode').value,
      hectareas:  document.getElementById('hectares').value,
      gps:        document.getElementById('gps').value
    };
    document.getElementById('summary-data').textContent = JSON.stringify(data, null, 2);
    document.getElementById('agroForm').classList.add('hidden');
    document.getElementById('summary').classList.remove('hidden');
  });

  document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('agroForm').reset();
    document.getElementById('agroForm').classList.remove('hidden');
    document.getElementById('summary').classList.add('hidden');
    Object.keys(fieldState).forEach(k => { fieldState[k] = false; });
    document.querySelectorAll('input').forEach(i => i.className = '');
    document.querySelectorAll('.msg').forEach(m => { m.textContent = ''; m.className = 'msg'; });
    updateStrengthBar(0);
    checkFormValidity();
  });
});
