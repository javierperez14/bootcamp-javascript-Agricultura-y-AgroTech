# 🌱 Week-08 – Paginación con Generadores AgroTech

**Autor:** Javier Pérez  
**Programa:** Desarrollo de Software – SENA  
**Dominio:** Agricultura y AgroTech  
**Semana:** 08 – Generadores · Iterables · Lazy Loading

---

## 📋 Descripción

Catálogo paginado de 80 equipos AgroTech construido con generadores JavaScript. El sistema carga los datos de forma **lazy** (bajo demanda), lo que significa que solo se procesan los elementos de la página actual sin cargar todo el dataset en memoria. Incluye filtros por tipo, búsqueda por nombre y selector de items por página.

---

## 🎯 Objetivos Alcanzados

| Objetivo | Estado |
|----------|--------|
| Aplicar generadores para lazy loading de datos | ✅ |
| Implementar iterables personalizados con `Symbol.iterator` | ✅ |
| Usar `yield` para controlar el flujo de datos | ✅ |
| Crear funciones auxiliares `take()` y `skip()` con generadores | ✅ |
| Implementar clase `Paginator` con generador `currentPageItems()` | ✅ |
| Construir interfaz de paginación interactiva completa | ✅ |

---

## 🔧 Generadores Implementados

### Generador de datos — Lazy por naturaleza
```javascript
function* equipmentGenerator(total) {
  for (let i = 1; i <= total; i++) {
    const type   = TYPES[i % TYPES.length];
    const name   = NAMES[type][(i - 1) % 5];
    const region = REGIONS[i % REGIONS.length];

    yield {
      id:         `EQ-${String(i).padStart(3, '0')}`,
      name,
      type,
      region,
      efficiency: Math.round(50 + (i * 17) % 50),
      active:     i % 3 !== 0
    };
  }
}
// Solo produce valores cuando se los pedimos — no genera los 80 de golpe
```

### `take()` — Tomar N elementos
```javascript
function* take(iterator, n) {
  for (let i = 0; i < n; i++) {
    const { value, done } = iterator.next();
    if (done) return;
    yield value;
  }
}
```

### `skip()` — Saltar N elementos
```javascript
function* skip(iterator, n) {
  for (let i = 0; i < n; i++) {
    const { done } = iterator.next();
    if (done) return;
  }
  yield* iterator;
}
```

### Clase `Paginator` — Generador de página actual
```javascript
class Paginator {
  constructor(data, itemsPerPage = 10) {
    this.data         = data;
    this.itemsPerPage = itemsPerPage;
    this.currentPage  = 1;
    this.totalPages   = Math.ceil(data.length / itemsPerPage);
  }

  *currentPageItems() {
    const offset   = (this.currentPage - 1) * this.itemsPerPage;
    const iterator = this.data[Symbol.iterator]();
    const skipped  = skip(iterator, offset);
    yield* take(skipped, this.itemsPerPage);
  }
}
```

---

## 📁 Estructura del Proyecto

```
bc-javascript-week-08/
├── index.html              # Catálogo con paginación
├── styles.css              # Grid de tarjetas + controles
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
| **Catálogo paginado** | 80 equipos generados lazy, 10 por página por defecto |
| **Items por página** | Selector: 5 / 10 / 20 items |
| **Filtro por tipo** | Sensor / Drone / Tractor |
| **Búsqueda** | Filtra por nombre en tiempo real |
| **Navegación** | Primera / Anterior / Números / Siguiente / Última |
| **Indicador** | "Página X de Y · Z equipos" actualizado dinámicamente |

---

## 💡 ¿Por qué Generadores para Paginación?

Con un array normal, al filtrar o paginar se recorre todo el dataset cada vez. Con generadores:

```javascript
// ❌ Sin generadores — procesa los 80 items para mostrar 10
const page = allData.slice(offset, offset + itemsPerPage);

// ✅ Con generadores — solo procesa los 10 items necesarios
function* currentPageItems() {
  const iterator = data[Symbol.iterator]();
  yield* take(skip(iterator, offset), itemsPerPage);
}
```

En datasets grandes (miles de registros), la diferencia de rendimiento es significativa.

---

## 🚀 Cómo Ejecutar

1. Abre con **Live Server** en VS Code
2. El catálogo carga con 80 equipos, 10 por página
3. Usa los filtros para reducir el conjunto de datos
4. Cambia los items por página para ver cómo se recalcula la paginación
5. Navega con los botones o haciendo click en los números de página

---

## 📝 Criterios de Evaluación Cubiertos

| Criterio | Puntos | Estado |
|----------|--------|--------|
| Generador de datos funcional | 20 pts | ✅ |
| Clase `Paginator` con generador `currentPageItems()` | 25 pts | ✅ |
| Navegación anterior/siguiente | 20 pts | ✅ |
| Indicador de página correcto | 15 pts | ✅ |
| Selector de items por página | 10 pts | ✅ |
| Código limpio y documentado | 10 pts | ✅ |
| **Total** | **100 pts** | ✅ |

---

_Week-08 · JavaScript Moderno Bootcamp · SENA · Javier Pérez_
