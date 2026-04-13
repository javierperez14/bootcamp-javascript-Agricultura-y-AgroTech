# 🌱 Week-05 – Dashboard de Análisis de Datos AgroTech

**Autor:** Javier Pérez  
**Programa:** Desarrollo de Software – SENA  
**Dominio:** Agricultura y AgroTech  
**Semana:** 05 – Métodos Avanzados de Arrays (ES2023)

---

## 📋 Descripción

Dashboard interactivo que procesa y visualiza registros de monitoreo de cultivos con equipos AgroTech (sensores, drones y tractores). Aplica todos los métodos avanzados de arrays requeridos en la semana, demostrando el poder del procesamiento de datos con JavaScript moderno.

---

## 🎯 Objetivos Alcanzados

| Objetivo | Estado |
|----------|--------|
| Usar `flatMap()` para aplanar estructuras anidadas | ✅ |
| Aplicar `toSorted()` sin mutar el array original | ✅ |
| Implementar `toReversed()` para inversión inmutable | ✅ |
| Usar `findLast()` y `findLastIndex()` (ES2023) | ✅ |
| Aplicar `with()` para modificación inmutable | ✅ |
| Encadenar métodos en pipelines de datos | ✅ |
| Usar `reduce()` para agregaciones complejas | ✅ |
| Generar rangos con `Array.from()` | ✅ |

---

## 🔧 Métodos ES2023 Implementados

### `flatMap()` — Aplanar equipos anidados
```javascript
const getAllEquipment = records =>
  records.flatMap(record =>
    record.equipment.map(eq => ({
      ...eq,
      recordId: record.id,
      field: record.field,
      region: record.region
    }))
  );
```

### `toSorted()` — Ordenar sin mutar
```javascript
const getTopEquipment = (records, n = 5) =>
  getAllEquipment(records)
    .toSorted((a, b) => b.metric - a.metric)
    .slice(0, n);
```

### `findLast()` / `findLastIndex()` — Búsqueda desde el final
```javascript
const getLastVerified = records =>
  records.findLast(record => record.status === 'verified');

const getLastPendingIndex = records =>
  records.findLastIndex(record => record.status === 'pending');
```

### `with()` — Modificar sin mutar
```javascript
const markAsReviewed = (records, index) =>
  records.with(index, { ...records[index], status: 'reviewed' });
```

### `Array.from()` — Generar rangos
```javascript
const generateMonthLabels = year =>
  Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, '0');
    return `${year}-${month}`;
  });
```

---

## 📊 Funcionalidades del Dashboard

| Sección | Descripción | Métodos usados |
|---------|-------------|----------------|
| **Estadísticas Generales** | Total, promedio, máx, mín de métricas | `reduce()`, `flatMap()` |
| **Equipos por Tipo** | Agrupación sensor / drone / tractor | `reduce()` |
| **Top 5 Equipos** | Mayor métrica individual | `toSorted()`, `slice()` |
| **Ranking de Equipos** | Suma acumulada por nombre | `flatMap()`, `reduce()`, `toSorted()` |
| **Métricas por Región** | Barras comparativas | `reduce()` |
| **Tendencia Mensual** | Gráfico de barras por mes | `Array.from()`, `reduce()` |
| **Filtro por Fechas** | Rango de fechas interactivo | `filter()`, chaining |
| **findLast demo** | Último verificado / pendiente | `findLast()`, `findLastIndex()` |
| **with() demo** | Modificación inmutable | `with()` |

---

## 📁 Estructura del Proyecto

```
bc-javascript-week-05/
├── index.html              # Dashboard UI completo
├── styles.css              # Diseño con tema AgroTech
├── README.md               # Este archivo
├── starter/
│   ├── script.js           # ← Código con TODOs para practicar
│   └── data.js             # 12 registros de monitoreo AgroTech
└── solution/
    └── script.js           # ← Solución completa de referencia
```

---

## 🗂️ Estructura de Datos

Cada registro de monitoreo tiene la siguiente forma:

```javascript
{
  id: 'MON001',
  date: '2024-01-10',
  operator: 'Carlos Mendoza',
  field: 'Lote Norte',
  region: 'Cundinamarca',
  status: 'verified',           // 'verified' | 'pending' | 'reviewed'
  equipment: [
    {
      name: 'Sensor Humedad SH-200',
      type: 'sensor',           // 'sensor' | 'drone' | 'tractor'
      metric: 78.5,
      category: 'humidity',
      unit: '%'
    }
    // ... más equipos
  ]
}
```

El dataset incluye **12 registros** con un total de **36 equipos** distribuidos en 3 regiones (Cundinamarca, Boyacá, Tolima).

---

## 🚀 Cómo Ejecutar

> ⚠️ Requiere servidor local por el uso de ES Modules (`type="module"`).

1. Abre la carpeta en VS Code
2. Instala la extensión **Live Server**
3. Clic derecho en `index.html` → **Open with Live Server**
4. El dashboard carga con la solución completa por defecto

### Modo práctica (TODOs)
Cambia el script en `index.html`:
```html
<!-- Cambiar esto: -->
<script type="module" src="solution/script.js"></script>

<!-- Por esto: -->
<script type="module" src="starter/script.js"></script>
```

---

## 📝 Criterios de Evaluación Cubiertos

| Criterio | Puntos | Estado |
|----------|--------|--------|
| Uso correcto de `flatMap()` | 10 pts | ✅ |
| Uso de `toSorted()` en lugar de `sort()` | 10 pts | ✅ |
| Uso de `findLast()` / `findLastIndex()` | 10 pts | ✅ |
| Uso de `with()` para inmutabilidad | 10 pts | ✅ |
| Chaining efectivo de métodos | 10 pts | ✅ |
| Agrupación por categoría con `reduce()` | 10 pts | ✅ |
| Estadísticas calculadas correctamente | 10 pts | ✅ |
| Código limpio y legible | 5 pts | ✅ |
| Dashboard muestra datos correctamente | 10 pts | ✅ |
| Filtros funcionan | 10 pts | ✅ |
| Datos adaptados al dominio asignado | 5 pts | ✅ |
| **Total** | **100 pts** | ✅ |

---

## 🛠️ Tecnologías

- **JavaScript ES2023** — Métodos avanzados de arrays
- **HTML5** — Estructura semántica
- **CSS3** — Variables CSS, Grid, Flexbox, gradientes
- **Google Fonts** — Inter
- **ES Modules** — `import` / `export`

---

_Week-05 · JavaScript Moderno Bootcamp · SENA · Javier Pérez_
