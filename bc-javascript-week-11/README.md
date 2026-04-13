# 🌱 Week-11 – Sistema Robusto con Manejo de Errores

**Autor:** Javier Pérez  
**Programa:** Desarrollo de Software – SENA  
**Dominio:** Agricultura y AgroTech  
**Semana:** 11 – Custom Errors · Retry · Fallback · Error Handling

---

## 📋 Descripción

Sistema de gestión de registros de monitoreo AgroTech con manejo de errores profesional y completo. Implementa una jerarquía de clases de error personalizadas, validación con mensajes descriptivos, simulación de fallos de red con reintentos automáticos (exponential backoff), y persistencia en localStorage con fallback ante datos corruptos.

---

## 🎯 Objetivos Alcanzados

| Objetivo | Estado |
|----------|--------|
| Crear jerarquía de clases de error personalizadas | ✅ |
| Implementar `ValidationError` con campo y valor afectado | ✅ |
| Simular fallos de red con `NetworkError` y `isRetryable` | ✅ |
| Implementar retry con exponential backoff | ✅ |
| Manejar `StorageError` con fallback a array vacío | ✅ |
| Mostrar errores amigables sin crashear la aplicación | ✅ |
| Implementar logging para debugging | ✅ |

---

## 🔧 Jerarquía de Errores

```
Error (nativo)
└── AppError                    ← Base con code y timestamp
    ├── ValidationError         ← Campo inválido con field y value
    ├── NetworkError            ← Fallo de red con status e isRetryable
    └── StorageError            ← Error de localStorage
```

### `AppError` — Clase base
```javascript
class AppError extends Error {
  constructor(message, code = 'APP_ERROR') {
    super(message);
    this.name      = 'AppError';
    this.code      = code;
    this.timestamp = new Date().toISOString();
  }

  toJSON() {
    return { name: this.name, message: this.message, code: this.code, timestamp: this.timestamp };
  }
}
```

### `ValidationError` — Errores de formulario
```javascript
class ValidationError extends AppError {
  constructor(message, field, value) {
    super(message, 'VALIDATION_ERROR');
    this.field = field;
    this.value = value;
  }

  toUserMessage() {
    return `Campo "${this.field}": ${this.message}`;
    // Ej: 'Campo "humidity": Debe ser un número entre 0 y 100.'
  }
}
```

### `NetworkError` — Fallos de red
```javascript
class NetworkError extends AppError {
  constructor(message, status, isRetryable = true) {
    super(message, 'NETWORK_ERROR');
    this.status      = status;
    this.isRetryable = isRetryable; // ← Controla si se reintenta
  }
}
```

### `StorageError` — Errores de persistencia
```javascript
class StorageError extends AppError {
  constructor(message) {
    super(message, 'STORAGE_ERROR');
  }
}
```

---

## 🔄 Retry con Exponential Backoff

```javascript
async function withRetry(fn, maxRetries = 3, onAttempt = () => {}) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      onAttempt(attempt, error);

      // No reintentar si llegamos al límite o el error no es retryable
      if (attempt === maxRetries || !error.isRetryable) throw error;

      // Espera exponencial: 1s, 2s, 4s...
      await new Promise(r => setTimeout(r, 2 ** attempt * 500));
    }
  }
}
```

**Tiempos de espera:**
| Intento | Espera |
|---------|--------|
| 1 → 2 | 1000ms |
| 2 → 3 | 2000ms |
| 3 (falla) | lanza el error |

---

## 💾 Storage con Fallback

```javascript
function loadRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];                          // Sin datos → array vacío

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed))                   // Datos corruptos
      throw new StorageError('Datos corruptos en localStorage');

    return parsed;
  } catch (e) {
    logError(e);
    return []; // ← Fallback: siempre retorna algo usable
  }
}
```

---

## 📁 Estructura del Proyecto

```
bc-javascript-week-11/
├── index.html              # Sistema de gestión con log de errores
├── styles.css              # Estilos con consola dark
├── README.md               # Este archivo
├── starter/
│   └── script.js           # ← Código con TODOs para practicar
└── solution/
    └── script.js           # ← Solución completa de referencia
```

---

## 🖥️ Funcionalidades

| Sección | Descripción |
|---------|-------------|
| **Crear Registro** | Valida campos con `ValidationError`, muestra mensaje amigable |
| **Lista de Registros** | CRUD con eliminación individual |
| **Simulación de API** | Falla con 60% de probabilidad, reintenta 3 veces con backoff |
| **Persistencia** | Guardar/cargar en localStorage, botón para simular datos corruptos |
| **Log de Errores** | Consola dark que muestra todos los errores con código y timestamp |

---

## 🚀 Cómo Ejecutar

1. Abre con **Live Server** en VS Code
2. Intenta crear un registro con campos vacíos o inválidos para ver `ValidationError`
3. Haz click en **"Llamar API"** varias veces — observa los reintentos en el log
4. Guarda registros, luego haz click en **"Simular datos corruptos"** y después **"Cargar"** para ver el fallback
5. Observa el **Log de Errores** — cada error muestra su tipo, mensaje y código

---

## 📝 Criterios de Evaluación Cubiertos

| Criterio | Puntos | Estado |
|----------|--------|--------|
| Clases de error bien estructuradas con herencia | 25 pts | ✅ |
| Validación completa con mensajes útiles | 20 pts | ✅ |
| Retry con exponential backoff implementado | 20 pts | ✅ |
| UI muestra errores correctamente sin crashear | 20 pts | ✅ |
| Código limpio y comentado | 15 pts | ✅ |
| **Total** | **100 pts** | ✅ |

---

## 💡 Buenas Prácticas Aplicadas

- **Nunca crashear**: todos los errores son capturados con `try/catch`
- **Mensajes amigables**: `ValidationError.toUserMessage()` traduce errores técnicos a lenguaje humano
- **Logging separado**: los errores técnicos van a la consola de debug, no al usuario
- **Fallback siempre**: `loadRecords()` siempre retorna un array usable, nunca `undefined`
- **Errores tipados**: `instanceof ValidationError` permite manejar cada tipo diferente

---

_Week-11 · JavaScript Moderno Bootcamp · SENA · Javier Pérez_
