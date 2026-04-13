# 🌱 Week-09 – Objetos Seguros con Symbols

**Autor:** Javier Pérez  
**Programa:** Desarrollo de Software – SENA  
**Dominio:** Agricultura y AgroTech  
**Semana:** 09 – Symbols · Well-known Symbols · Propiedades Privadas

---

## 📋 Descripción

Sistema de objetos seguros para el dominio AgroTech que utiliza `Symbol` para implementar propiedades "privadas" ocultas de enumeraciones, métodos de verificación sin exponer datos sensibles, y personalización de comportamiento con Well-known Symbols. Demuestra cómo proteger datos críticos como contraseñas y licencias de operadores.

---

## 🎯 Objetivos Alcanzados

| Objetivo | Estado |
|----------|--------|
| Usar Symbols para ocultar datos internos | ✅ |
| Implementar `Symbol.toStringTag` para identificación de tipos | ✅ |
| Usar `Symbol.toPrimitive` para conversiones personalizadas | ✅ |
| Hacer objetos iterables con `Symbol.iterator` | ✅ |
| Crear una API pública limpia que oculte la implementación | ✅ |
| Verificar que los datos NO aparecen en `Object.keys()` ni `JSON.stringify()` | ✅ |

---

## 🔧 Clases Implementadas

### `SecureOperator` — Operador con datos protegidos

```javascript
const _password = Symbol('operator.password');
const _license  = Symbol('operator.license');

class SecureOperator {
  constructor(name, email, password, license) {
    this.name       = name;    // Público
    this.email      = email;   // Público
    this[_password] = password; // 🔒 Oculto
    this[_license]  = license;  // 🔒 Oculto
  }

  verifyPassword(input) {
    return this[_password] === input; // Verifica sin exponer
  }

  getMaskedLicense() {
    return this[_license].replace(/\d+$/, m => '*'.repeat(m.length));
    // 'AGR-12345' → 'AGR-*****'
  }

  toJSON() {
    return { name: this.name, email: this.email, license: this.getMaskedLicense() };
    // password y license completa NUNCA aparecen en JSON
  }

  get [Symbol.toStringTag]() { return 'SecureOperator'; }
}
```

**Verificación de ocultación:**
```javascript
const op = new SecureOperator('Carlos', 'carlos@agro.co', 'secret123', 'AGR-12345');

Object.keys(op)                        // ['name', 'email'] — sin password ni license ✅
JSON.stringify(op)                     // {"name":"Carlos","email":"carlos@agro.co","license":"AGR-*****"} ✅
Object.prototype.toString.call(op)     // '[object SecureOperator]' ✅
```

---

### `SecureWallet` — Billetera con historial protegido

```javascript
const _balance   = Symbol('wallet.balance');
const _txHistory = Symbol('wallet.transactions');

class SecureWallet {
  // Symbol.toPrimitive — conversión personalizada
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'string': return `$${this[_balance].toFixed(2)}`;
      case 'number': return this[_balance];
      default:       return this[_balance];
    }
  }

  // Symbol.iterator — iterar sobre transacciones
  [Symbol.iterator]() {
    return this[_txHistory][Symbol.iterator]();
  }
}
```

**Uso de Well-known Symbols:**
```javascript
const wallet = new SecureWallet(500);
wallet.deposit(100);

+wallet          // 600  (hint: 'number')
`${wallet}`      // '$600.00'  (hint: 'string')

for (const tx of wallet) {
  console.log(tx); // { type: 'deposit', amount: 100, date: '...' }
}
```

---

### `SecureConfig` — Configuración con secretos

```javascript
const config = new SecureConfig({
  apiUrl:      'https://api.agrotech.co',  // Público
  timeout:     5000,                        // Público
  _apiKey:     'sk-agro-123456',           // 🔒 Secreto (prefijo _)
  _dbPassword: 'secret-db-pass'            // 🔒 Secreto (prefijo _)
});

config.get('apiUrl')           // 'https://api.agrotech.co'
config.hasSecret('apiKey')     // true
config.useSecret('apiKey', key => {
  // La clave se usa aquí pero nunca se expone fuera
});
config.getPublicConfig()       // { apiUrl: '...', timeout: 5000 }
```

---

## 📁 Estructura del Proyecto

```
bc-javascript-week-09/
├── index.html              # Demo interactiva de las 3 clases
├── styles.css              # Estilos con tema AgroTech
├── README.md               # Este archivo
├── starter/
│   └── script.js           # ← Código con TODOs para practicar
└── solution/
    └── script.js           # ← Solución completa de referencia
```

---

## 🖥️ Funcionalidades de la Demo

| Sección | Qué demuestra |
|---------|---------------|
| **SecureOperator** | Crear operador, verificar contraseña, licencia enmascarada, `toJSON()`, `Object.keys()` |
| **SecureWallet** | Depositar, retirar, `toPrimitive` (number/string), iterar transacciones |
| **SecureConfig** | Config pública vs secretos, `hasSecret()`, `useSecret()` |

---

## 🚀 Cómo Ejecutar

1. Abre con **Live Server** en VS Code
2. En **SecureOperator**: crea un operador con licencia `AGR-12345` y contraseña cualquiera
3. Prueba los botones para ver qué datos son visibles y cuáles están ocultos
4. En **SecureWallet**: crea una wallet, haz depósitos y retiros, luego itera las transacciones
5. La sección **SecureConfig** se ejecuta automáticamente al cargar

---

## 📝 Criterios de Evaluación Cubiertos

| Criterio | Puntos | Estado |
|----------|--------|--------|
| `SecureOperator` completo y funcional | 25 pts | ✅ |
| `SecureWallet` completo y funcional | 25 pts | ✅ |
| `SecureConfig` completo y funcional | 20 pts | ✅ |
| Well-known Symbols implementados (`toStringTag`, `toPrimitive`, `iterator`) | 15 pts | ✅ |
| Código limpio y documentado | 10 pts | ✅ |
| UI funcional e interactiva | 5 pts | ✅ |
| **Total** | **100 pts** | ✅ |

---

## 🔍 Diferencia entre `#` y `Symbol` para privacidad

| Característica | `#campo` (privado real) | `Symbol` como clave |
|----------------|------------------------|---------------------|
| Acceso externo | Imposible | Posible con `getOwnPropertySymbols()` |
| Aparece en `Object.keys()` | No | No |
| Aparece en `JSON.stringify()` | No | No |
| Aparece en `for...in` | No | No |
| Uso principal | Encapsulación estricta | Metadatos, extensibilidad |

---

_Week-09 · JavaScript Moderno Bootcamp · SENA · Javier Pérez_
