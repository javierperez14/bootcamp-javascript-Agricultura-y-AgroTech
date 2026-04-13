# 🌱 Week-12 – AgroTech Manager (Aplicación Integral)

**Autor:** Javier Pérez  
**Programa:** Desarrollo de Software – SENA  
**Dominio:** Agricultura y AgroTech  
**Semana:** 12 – Proyecto Integrador ES2023 (Semanas 1-11)

---

## 📋 Descripción

Aplicación de gestión integral que integra todos los conceptos de ES2023 aprendidos durante el trimestre. AgroTech Manager es una tienda/catálogo de equipos agrícolas con sistema de autenticación, carrito de pedidos, reservas y persistencia completa en localStorage. Implementa arquitectura de 3 capas (Models → Services → UI) con módulos ES6.

---

## 🎯 Conceptos ES2023 Integrados

| Concepto | Semana | Dónde se aplica |
|----------|--------|-----------------|
| Variables, destructuring, template literals | 01 | Todos los módulos |
| CRUD con arrays | 02 | `ReservationService` |
| Clases y POO | 03 | `Product`, `User`, `Cart` |
| Módulos ES6 | 04 | Toda la arquitectura |
| Métodos de arrays (`toSorted`, `filter`, `map`) | 05 | `ProductService.filter()` |
| RegExp y validación | 06 | `User.validate()` |
| `Set` y `Map` | 07 | `Cart` usa `Map`, categorías usan `Set` |
| Campos privados `#` | 09 | Todos los modelos |
| `try/catch` y errores | 11 | `AuthService`, `ReservationService` |

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────┐
│                    UI Layer                  │
│         app.js — renderCatalog, renderCart   │
│         updateAuthUI, renderReservations     │
└──────────────────┬──────────────────────────┘
                   │ usa
┌──────────────────▼──────────────────────────┐
│                Service Layer                 │
│  ProductService  AuthService  Reservation   │
│  filter()        login()      create()      │
│  getById()       register()   getByUser()   │
└──────────────────┬──────────────────────────┘
                   │ usa
┌──────────────────▼──────────────────────────┐
│                 Model Layer                  │
│    Product         User          Cart        │
│    #id #price      #password     #items(Map) │
│    formattedPrice  verifyPass()  add/remove  │
│    toJSON()        toJSON()      total       │
└─────────────────────────────────────────────┘
```

---

## 🔧 Modelos

### `Product` — Campos privados + getters
```javascript
class Product {
  #id; #name; #price; #category; #icon; #stock; #rating;

  get inStock()        { return this.#stock > 0; }
  get formattedPrice() {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency', currency: 'COP', maximumFractionDigits: 0
    }).format(this.#price);
  }
  get stars() { return '⭐'.repeat(Math.round(this.#rating)); }

  static create(data) { return new Product(data); }
}
```

### `Cart` — Map para items únicos
```javascript
class Cart {
  #items = new Map(); // Map<productId, { product, quantity }>

  add(product) {
    const existing = this.#items.get(product.id);
    if (existing) existing.quantity++;
    else this.#items.set(product.id, { product, quantity: 1 });
  }

  get total() {
    return [...this.#items.values()]
      .reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  }
}
```

### `User` — Validación estática + campos privados
```javascript
class User {
  #id; #name; #email; #password;

  verifyPassword(input) { return this.#password === input; }
  toJSON() { return { id, name, email }; } // Sin password

  static validate({ name, email, password }) {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new Error('Email inválido.');
    if (!password || password.length < 6)
      throw new Error('Contraseña mínimo 6 caracteres.');
  }
}
```

---

## 📁 Estructura del Proyecto

```
bc-javascript-week-12/
├── index.html                  # App completa (catálogo + modales)
├── styles.css                  # Diseño responsive con modales
├── README.md                   # Este archivo
│
├── starter/js/                 # ← TODOs para practicar
│   ├── main.js                 # Entry point
│   ├── app.js                  # Integración (renderCatalog, renderCart...)
│   ├── config.js               # Datos iniciales y constantes
│   ├── models/
│   │   ├── Product.js          # Modelo con campos privados
│   │   ├── User.js             # Modelo con validación estática
│   │   └── Cart.js             # Carrito con Map
│   └── services/
│       ├── ProductService.js   # Filtrado y búsqueda
│       ├── AuthService.js      # Login, registro, sesión
│       └── ReservationService.js # CRUD de reservas
│
└── solution/js/                # ← Solución completa de referencia
    ├── main.js
    ├── app.js
    ├── models/  (Product, User, Cart)
    └── services/ (ProductService, AuthService, ReservationService)
```

---

## 🖥️ Funcionalidades

| Funcionalidad | Descripción |
|---------------|-------------|
| **Catálogo** | 12 productos con filtro por categoría, búsqueda y ordenamiento |
| **Filtros** | Por categoría (sensor/drone/tractor/irrigación), nombre, precio |
| **Carrito** | Agregar, incrementar, decrementar, eliminar, vaciar, total |
| **Autenticación** | Registro y login con validación, sesión persistida |
| **Reservas** | Se crean al confirmar el carrito, se pueden cancelar |
| **Persistencia** | Carrito y sesión se guardan en localStorage |

---

## 🗂️ Catálogo de Productos

| Categoría | Productos | Rango de precio |
|-----------|-----------|-----------------|
| 📡 Sensores | Humedad, Temperatura, pH, Luminosidad, CO2 | $95 – $320 |
| 🚁 Drones | DJI Agras T40, Parrot Bluegrass, Wingtra One | $4.200 – $8.500 |
| 🚜 Tractores | John Deere 6M, New Holland T7 | $88.000 – $95.000 |
| 💧 Irrigación | Netafim, DripKit | $1.800 – $3.200 |

---

## 🚀 Cómo Ejecutar

1. Abre con **Live Server** en VS Code
2. El catálogo carga con todos los productos disponibles
3. Agrega productos al carrito haciendo click en **"+ Agregar"**
4. El ícono 🛒 en el header muestra la cantidad de items
5. Regístrate o inicia sesión para confirmar pedidos
6. Las reservas confirmadas aparecen en la sección **"Mis Reservas"**

---

## 📝 Criterios de Evaluación Cubiertos

| Criterio | Puntos | Estado |
|----------|--------|--------|
| Uso correcto de ES2023 en todos los módulos | 25 pts | ✅ |
| Arquitectura modular (Models → Services → UI) | 25 pts | ✅ |
| Funcionalidad completa (catálogo, carrito, auth, reservas) | 30 pts | ✅ |
| Clean code (nombres descriptivos, funciones pequeñas, DRY) | 20 pts | ✅ |
| **Total** | **100 pts** | ✅ |

---

_Week-12 · JavaScript Moderno Bootcamp · SENA · Javier Pérez_
