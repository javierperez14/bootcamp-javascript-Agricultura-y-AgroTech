# 🌱 Week-10 – Sistema de Validación Reactivo con Proxy

**Autor:** Javier Pérez  
**Programa:** Desarrollo de Software – SENA  
**Dominio:** Agricultura y AgroTech  
**Semana:** 10 – Proxy · Reflect · Validación Reactiva

---

## 📋 Descripción

Formulario de registro de monitoreo AgroTech con validación completamente reactiva usando `Proxy` y `Reflect`. El sistema intercepta cada asignación de valor, ejecuta la validación automáticamente y notifica a los suscriptores del cambio — todo sin necesidad de llamar funciones de validación manualmente. Implementa el patrón Observer para conectar la lógica con el DOM.

---

## 🎯 Objetivos Alcanzados

| Objetivo | Estado |
|----------|--------|
| Implementar validación automática con `Proxy` | ✅ |
| Usar el trap `set` para interceptar asignaciones | ✅ |
| Aplicar `Reflect.set` correctamente dentro del trap | ✅ |
| Crear un sistema de suscripción (patrón Observer) | ✅ |
| Conectar el sistema reactivo con el DOM | ✅ |
| Construir una fábrica de validadores reutilizables | ✅ |

---

## 🔧 Arquitectura del Sistema

### Fábrica de Validadores
```javascript
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

  date:  () => (value, prop) => { /* valida fecha no futura */ },
  enum: (options) => (value, prop) => { /* valida opciones permitidas */ }
};
```

### Schema de validación AgroTech
```javascript
const monitoringSchema = {
  fieldName:   validators.string(2, 50),    // Nombre del lote
  operator:    validators.string(2, 50),    // Nombre del operador
  date:        validators.date(),           // Fecha no futura
  humidity:    validators.number(0, 100),   // Humedad %
  temperature: validators.number(-10, 60),  // Temperatura °C
  ph:          validators.number(0, 14),    // pH del suelo
  status:      validators.enum(['verified', 'pending', 'reviewed'])
};
```

### Formulario Reactivo con Proxy
```javascript
function createReactiveForm(schema) {
  const _data         = {};
  const _errors       = {};
  const _listeners    = [];

  const handler = {
    // Trap set: se ejecuta automáticamente al asignar form.campo = valor
    set(target, prop, value, receiver) {
      const validator = schema[prop];
      if (validator) {
        const result = validator(value, prop);

        if (!result.isValid) _errors[prop] = result.message;
        else                 delete _errors[prop];

        // Notificar a todos los suscriptores
        _listeners.forEach(fn => fn(prop, value, result));
      }
      return Reflect.set(target, prop, value, receiver);
    },

    // Trap get: expone métodos del formulario
    get(target, prop) {
      switch (prop) {
        case 'subscribe': return fn => _listeners.push(fn);
        case 'isValid':   return () => Object.keys(schema).every(k => !(k in _errors) && k in target);
        case 'getErrors': return () => ({ ..._errors });
        case 'getData':   return () => ({ ...target });
        default:          return Reflect.get(target, prop);
      }
    }
  };

  return new Proxy(_data, handler);
}
```

### Conexión con el DOM
```javascript
// Cada vez que el usuario escribe, el Proxy valida automáticamente
input.addEventListener('input', () => {
  form[fieldId] = input.value; // ← Esto dispara el trap set
});

// Suscribirse a cambios para actualizar la UI
form.subscribe((prop, value, result) => {
  updateFieldUI(prop, result.isValid, result.message);
  submitBtn.disabled = !form.isValid();
});
```

---

## 📁 Estructura del Proyecto

```
bc-javascript-week-10/
├── index.html              # Formulario de monitoreo
├── styles.css              # Estilos con estados válido/inválido + panel reactivo
├── README.md               # Este archivo
├── starter/
│   └── script.js           # ← Código con TODOs para practicar
└── solution/
    └── script.js           # ← Solución completa de referencia
```

---

## 🖥️ Funcionalidades

| Funcionalidad | Descripción |
|---------------|-------------|
| **Validación reactiva** | Cada campo se valida al instante al escribir |
| **Feedback visual** | Borde verde (válido) / rojo (inválido) + mensaje descriptivo |
| **Panel de estado** | Muestra el valor y estado de cada campo en tiempo real |
| **Botón inteligente** | Solo se habilita cuando todos los campos son válidos |
| **Resumen al enviar** | Muestra los datos validados en formato JSON |

---

## 🚀 Cómo Ejecutar

1. Abre con **Live Server** en VS Code
2. Escribe en cualquier campo y observa la validación inmediata
3. El panel "Estado Reactivo (Proxy)" muestra el estado de cada campo
4. El botón solo se habilita cuando todos los 7 campos son válidos
5. Al enviar, se muestra el resumen con los datos del formulario

---

## 📝 Criterios de Evaluación Cubiertos

| Criterio | Puntos | Estado |
|----------|--------|--------|
| Validadores funcionan correctamente | 20 pts | ✅ |
| `Proxy` intercepta y valida en el trap `set` | 25 pts | ✅ |
| Sistema de errores funciona | 15 pts | ✅ |
| Suscripciones notifican cambios | 15 pts | ✅ |
| Conexión DOM actualiza UI | 15 pts | ✅ |
| Código limpio y bien organizado | 10 pts | ✅ |
| **Total** | **100 pts** | ✅ |

---

## 💡 ¿Por qué Proxy para validación?

Con el enfoque tradicional, hay que llamar manualmente la función de validación en cada evento:

```javascript
// ❌ Enfoque tradicional — repetitivo y propenso a errores
input.addEventListener('input', () => {
  const result = validateField(input.id, input.value);
  updateUI(result);
  checkFormValidity();
});
```

Con Proxy, la validación ocurre automáticamente al asignar cualquier valor:

```javascript
// ✅ Con Proxy — la validación es transparente
form.humidity = '75'; // ← El Proxy valida, notifica y actualiza la UI solo
```

---

_Week-10 · JavaScript Moderno Bootcamp · SENA · Javier Pérez_
