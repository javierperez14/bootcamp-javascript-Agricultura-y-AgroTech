# 🌱 Week-07 – Sistema de Gestión con Sets y Maps

**Autor:** Javier Pérez  
**Programa:** Desarrollo de Software – SENA  
**Dominio:** Agricultura y AgroTech  
**Semana:** 07 – Set · Map · WeakMap · WeakSet

---

## 📋 Descripción

Sistema de gestión de equipos AgroTech que demuestra el uso práctico de las cuatro estructuras de datos especiales de JavaScript: `Set`, `Map`, `WeakMap` y `WeakSet`. Cada estructura resuelve un problema real del dominio: unicidad de IDs, almacenamiento estructurado, caché de cálculos y tracking de estados sin memory leaks.

---

## 🎯 Objetivos Alcanzados

| Objetivo | Estado |
|----------|--------|
| Usar `Set` para garantizar unicidad de entidades | ✅ |
| Usar `Map` para almacenar datos estructurados por clave | ✅ |
| Implementar `WeakMap` para caché sin memory leaks | ✅ |
| Usar `WeakSet` para tracking de estados activos | ✅ |
| Crear operaciones de conjuntos (unión, intersección, diferencia) | ✅ |
| Iterar sobre Map y Set con spread y destructuring | ✅ |

---

## 🔧 Estructuras de Datos Utilizadas

### `Map` — Catálogo de equipos
```javascript
const equipmentMap = new Map();

// Registrar equipo
equipmentMap.set('EQ-001', { id: 'EQ-001', name: 'Sensor Humedad SH-200', type: 'sensor', region: 'Cundinamarca' });

// Obtener equipo
const eq = equipmentMap.get('EQ-001');

// Iterar todos
const allEquipment = [...equipmentMap.values()];
```

### `Set` — IDs únicos y categorías
```javascript
const registeredIds = new Set();

// Verificar duplicado antes de registrar
if (registeredIds.has(id)) {
  return { success: false, message: `El ID "${id}" ya está registrado.` };
}
registeredIds.add(id);
```

### `WeakSet` — Estados activos (sin memory leak)
```javascript
const activeEquipment = new WeakSet();

// Activar (referencia al objeto del Map)
const eq = equipmentMap.get(id);
activeEquipment.add(eq);

// Verificar estado
const isActive = activeEquipment.has(eq); // true/false
```

### `WeakMap` — Caché de cálculos
```javascript
const efficiencyCache = new WeakMap();

function getEfficiencyIndex(id) {
  const eq = equipmentMap.get(id);

  // Retornar desde caché si ya fue calculado
  if (efficiencyCache.has(eq)) {
    return { value: efficiencyCache.get(eq), fromCache: true };
  }

  // Calcular y cachear
  const value = (eq.name.length * 7 + eq.region.length * 3) % 100;
  efficiencyCache.set(eq, value);
  return { value, fromCache: false };
}
```

---

## ➕ Operaciones de Conjuntos

```javascript
// Unión: todos los elementos de A y B
const union = (a, b) => new Set([...a, ...b]);

// Intersección: elementos en A Y en B
const intersection = (a, b) => new Set([...a].filter(x => b.has(x)));

// Diferencia: elementos en A pero NO en B
const difference = (a, b) => new Set([...a].filter(x => !b.has(x)));
```

**Ejemplo con categorías AgroTech:**
```
Set A: { sensor, drone, tractor }
Set B: { drone, tractor, irrigacion }

A ∪ B = { sensor, drone, tractor, irrigacion }
A ∩ B = { drone, tractor }
A - B = { sensor }
```

---

## 📁 Estructura del Proyecto

```
bc-javascript-week-07/
├── index.html              # Interfaz del sistema de gestión
├── styles.css              # Estilos con tema AgroTech
├── README.md               # Este archivo
├── starter/
│   └── script.js           # ← Código con TODOs para practicar
└── solution/
    └── script.js           # ← Solución completa de referencia
```

---

## 🖥️ Funcionalidades de la Interfaz

| Sección | Descripción |
|---------|-------------|
| **Registrar Equipo** | Agrega equipos al `Map` verificando unicidad con `Set` |
| **Catálogo de Equipos** | Lista todos los equipos del `Map` con contador |
| **Categorías (Set)** | Gestiona categorías únicas, permite agregar y eliminar |
| **Operaciones de Conjuntos** | Calcula unión, intersección y diferencia entre Set A y Set B |
| **Estados Activos (WeakSet)** | Click en un equipo para activarlo/desactivarlo |
| **Caché de Cálculos (WeakMap)** | Calcula índice de eficiencia, muestra si viene del caché |
| **Consola de Operaciones** | Log en tiempo real de todas las acciones del sistema |

---

## 🚀 Cómo Ejecutar

1. Abre con **Live Server** en VS Code
2. El sistema carga con 3 equipos iniciales (sensor, drone, tractor)
3. Prueba registrar un equipo con un ID duplicado para ver la validación
4. Activa equipos haciendo click en la sección "Estados Activos"
5. Calcula el índice de eficiencia dos veces para ver el caché en acción
6. Prueba las operaciones de conjuntos con los Sets A y B predefinidos

---

## 📝 Criterios de Evaluación Cubiertos

| Criterio | Puntos | Estado |
|----------|--------|--------|
| Registro de entidades únicas con `Map` + `Set` | 20 pts | ✅ |
| Gestión de categorías con `Set` | 20 pts | ✅ |
| Operaciones de conjuntos (unión, intersección, diferencia) | 20 pts | ✅ |
| Sistema de estados activos con `WeakSet` | 20 pts | ✅ |
| Caché de cálculos con `WeakMap` | 20 pts | ✅ |
| **Total** | **100 pts** | ✅ |

---

## 💡 ¿Por qué WeakMap y WeakSet?

A diferencia de `Map` y `Set`, las versiones `Weak` no impiden que el garbage collector libere los objetos referenciados. Esto es crucial cuando:

- **WeakSet**: Los equipos pueden ser eliminados del sistema sin que el WeakSet retenga referencias "fantasma" en memoria
- **WeakMap**: El caché de cálculos se limpia automáticamente cuando el objeto equipo ya no existe en ningún otro lugar

---

_Week-07 · JavaScript Moderno Bootcamp · SENA · Javier Pérez_
