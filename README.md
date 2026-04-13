# 🌱 Proyecto Trimestral – Desarrollo Web (SENA)

**Dominio:** Agricultura y AgroTech  
**Autor:** Javier Pérez  
**Programa:** Tecnología en Desarrollo de Software  
**Institución:** SENA

---

## 📋 Descripción General

Este repositorio contiene todos los entregables desarrollados a lo largo del trimestre de formación en JavaScript moderno. Cada carpeta corresponde a una **Week** (Semana), donde se aplican conceptos incrementales de desarrollo web, buenas prácticas, arquitectura y programación moderna con **JavaScript ES2023**.

El objetivo del trimestre es construir soluciones completas, escalables y bien estructuradas dentro del dominio asignado: **Agricultura y AgroTech**. Cada semana introduce nuevos conceptos que se integran sobre los anteriores, culminando en una aplicación integral en la semana 12.

---

## 🗂️ Estructura del Repositorio

```
📁 repositorio/
├── 📁 bc-javascript-week-05/   Dashboard de Análisis de Datos
├── 📁 bc-javascript-week-06/   Validador de Formularios
├── 📁 bc-javascript-week-07/   Sistema con Sets y Maps
├── 📁 bc-javascript-week-08/   Paginación con Generadores
├── 📁 bc-javascript-week-09/   Objetos Seguros con Symbols
├── 📁 bc-javascript-week-10/   Validación Reactiva con Proxy
├── 📁 bc-javascript-week-11/   Sistema Robusto con Errores
├── 📁 bc-javascript-week-12/   Aplicación Integral AgroTech Manager
└── 📄 README.md                Este archivo
```

Cada carpeta contiene:
- `index.html` — Interfaz funcional y completa
- `styles.css` — Estilos con diseño AgroTech
- `starter/` — Código con TODOs para practicar
- `solution/` — Solución completa de referencia
- `README.md` — Documentación detallada de la semana

---

## 📦 Contenido por Semana

---

### ✅ Week-01 – Ficha de Información Interactiva

**Tema:** JavaScript Moderno — Variables, Template Literals, Arrow Functions, Destructuring  
**Concepto clave:** Fundamentos ES2023

#### Lo que se realizó:
- Objeto de datos del dominio AgroTech con destructuring
- Generación de HTML dinámico con template literals
- Eventos con arrow functions
- Cálculo de estadísticas con `map` y `reduce`
- Botón copiar al portapapeles (Web API)
- Tema claro/oscuro con CSS variables
- Mensajes tipo toast para retroalimentación

---

### ✅ Week-02 – CRUD Interactivo AgroTech

**Tema:** Gestión completa de recursos con CRUD, filtros y estadísticas  
**Concepto clave:** Manipulación de arrays y LocalStorage

#### Lo que se realizó:
- CRUD completo: crear, leer, actualizar, eliminar recursos AgroTech
- Activar/desactivar elementos en tiempo real
- Filtros avanzados: por estado, categoría, prioridad y búsqueda
- Persistencia con LocalStorage
- Estadísticas dinámicas: total, activos, inactivos, conteo por categoría
- Aplicación de spread operator, destructuring y funciones puras

---

### ✅ Week-03 – Sistema de Gestión con POO

**Tema:** Programación Orientada a Objetos con JavaScript ES2023  
**Concepto clave:** Clases, herencia, encapsulación, polimorfismo

#### Lo que se realizó:
- Clase base abstracta `AgriculturalEquipment` con 3 clases derivadas: `Tractor`, `Sensor`, `Drone`
- Clase `Person` con roles: `Operator` y `Administrator`
- Encapsulación total con campos privados `#` y getters/setters con validación
- Herencia con `extends` y `super()`, métodos abstractos y polimorfismo
- Static blocks, métodos estáticos y campos privados (ES2023)
- Sistema completo: CRUD de equipos, gestión de usuarios, auditoría, estadísticas

---

### ✅ Week-04 – Sistema Modular con ES6 Modules

**Tema:** Arquitectura Modular, Destructuring Avanzado y Dynamic Imports  
**Concepto clave:** ES6 Modules, lazy loading, separación de responsabilidades

#### Lo que se realizó:
- Arquitectura organizada en carpetas: `models/`, `services/`, `ui/`, `utils/`, `features/`
- Named exports, default exports y barrel exports (`index.js`)
- Destructuring avanzado en parámetros, retornos e iteraciones
- Dynamic Imports para reportes y exportación (lazy loading)
- Exportación a JSON y CSV, backup del sistema
- Validadores y formateadores de moneda, fechas y números

---

### ✅ Week-05 – Dashboard de Análisis de Datos

**Tema:** Métodos Avanzados de Arrays ES2023  
**Carpeta:** `bc-javascript-week-05/`  
**Concepto clave:** `flatMap`, `toSorted`, `findLast`, `with`, `Array.from`, `reduce`

#### Lo que se realizó:
- Dashboard interactivo con 12 registros de monitoreo AgroTech (sensores, drones, tractores)
- `flatMap()` para aplanar equipos anidados en registros
- `toSorted()` para ordenar sin mutar el array original (ES2023)
- `findLast()` y `findLastIndex()` para búsqueda desde el final (ES2023)
- `with()` para modificar un elemento sin mutar el array (ES2023)
- `Array.from()` para generar etiquetas de meses y categorías únicas
- `reduce()` para agrupaciones, estadísticas y rankings
- Chaining de métodos en pipelines de datos
- Filtro interactivo por rango de fechas
- Gráfico de barras de tendencia mensual

---

### ✅ Week-06 – Validador de Formularios AgroTech

**Tema:** Expresiones Regulares y Métodos de Strings  
**Carpeta:** `bc-javascript-week-06/`  
**Concepto clave:** RegExp, grupos de captura nombrados, sanitización XSS

#### Lo que se realizó:
- Formulario de registro de operadores con 8 campos validados en tiempo real
- Patrones RegExp para: nombre, email, teléfono colombiano (+57), contraseña, código de lote, hectáreas y coordenadas GPS
- Grupos de captura nombrados (`?<user>`, `?<domain>`, `?<lat>`, `?<lng>`) para extraer partes de los valores
- Formateo automático: Title Case en nombres, `+57 XXX XXX XXXX` en teléfonos, mayúsculas en códigos de lote
- Medidor de fortaleza de contraseña con barra visual (débil / media / fuerte)
- Sanitización de inputs para prevenir XSS con `replaceAll()`
- Botón submit habilitado solo cuando todos los campos son válidos

---

### ✅ Week-07 – Sistema de Gestión con Sets y Maps

**Tema:** Set · Map · WeakMap · WeakSet  
**Carpeta:** `bc-javascript-week-07/`  
**Concepto clave:** Estructuras de datos especiales y operaciones de conjuntos

#### Lo que se realizó:
- `Map` para catálogo de equipos con acceso O(1) por ID
- `Set` para garantizar unicidad de IDs y gestión de categorías
- Operaciones de conjuntos: unión (`A∪B`), intersección (`A∩B`), diferencia (`A-B`)
- `WeakSet` para tracking de equipos activos sin memory leaks
- `WeakMap` para caché de índices de eficiencia con limpieza automática por garbage collector
- Consola de operaciones en tiempo real con log de todas las acciones
- Demostración visual de la diferencia entre caché hit y cálculo nuevo

---

### ✅ Week-08 – Paginación con Generadores

**Tema:** Generadores · Iterables · Lazy Loading  
**Carpeta:** `bc-javascript-week-08/`  
**Concepto clave:** `function*`, `yield`, `Symbol.iterator`, lazy evaluation

#### Lo que se realizó:
- Generador `equipmentGenerator(total)` que produce 80 equipos AgroTech bajo demanda
- Funciones auxiliares `take(iterator, n)` y `skip(iterator, n)` con generadores
- Clase `Paginator` con método generador `*currentPageItems()` usando `skip` + `take`
- Navegación completa: primera, anterior, números de página, siguiente, última
- Filtros por tipo (sensor/drone/tractor) y búsqueda por nombre
- Selector de items por página: 5 / 10 / 20
- Indicador dinámico "Página X de Y · Z equipos"

---

### ✅ Week-09 – Objetos Seguros con Symbols

**Tema:** Symbols · Well-known Symbols · Propiedades Privadas  
**Carpeta:** `bc-javascript-week-09/`  
**Concepto clave:** `Symbol()`, `Symbol.toStringTag`, `Symbol.toPrimitive`, `Symbol.iterator`

#### Lo que se realizó:
- `SecureOperator`: contraseña y licencia ocultas con Symbols, `verifyPassword()` sin exponer el valor, licencia enmascarada (`AGR-*****`), `toJSON()` sin datos sensibles, `Symbol.toStringTag`
- `SecureWallet`: balance e historial protegidos, `Symbol.toPrimitive` para conversión a número/string, `Symbol.iterator` para iterar transacciones con `for...of`
- `SecureConfig`: separación automática de claves públicas y secretas (prefijo `_`), `useSecret()` ejecuta callback sin exponer el valor
- Verificación de ocultación: los datos privados no aparecen en `Object.keys()`, `JSON.stringify()` ni `for...in`

---

### ✅ Week-10 – Sistema de Validación Reactivo con Proxy

**Tema:** Proxy · Reflect · Patrón Observer  
**Carpeta:** `bc-javascript-week-10/`  
**Concepto clave:** Traps `set` y `get`, `Reflect.set`, suscripciones reactivas

#### Lo que se realizó:
- Fábrica de validadores reutilizables: `string(min, max)`, `number(min, max)`, `date()`, `enum(options)`
- Schema de validación AgroTech con 7 campos: lote, operador, fecha, humedad, temperatura, pH, estado
- `createReactiveForm(schema)` — Proxy que intercepta asignaciones con el trap `set` y valida automáticamente
- Trap `get` expone métodos: `subscribe()`, `onError()`, `isValid()`, `getErrors()`, `getData()`
- `Reflect.set` para guardar el valor correctamente después de validar
- Panel de estado reactivo que muestra el valor y validez de cada campo en tiempo real
- Botón submit habilitado automáticamente cuando todos los campos son válidos

---

### ✅ Week-11 – Sistema Robusto con Manejo de Errores

**Tema:** Custom Errors · Retry · Fallback · Error Handling  
**Carpeta:** `bc-javascript-week-11/`  
**Concepto clave:** Jerarquía de errores, exponential backoff, fallback patterns

#### Lo que se realizó:
- Jerarquía de errores: `AppError` (base) → `ValidationError`, `NetworkError`, `StorageError`
- `ValidationError` con `field`, `value` y `toUserMessage()` para mensajes amigables
- `NetworkError` con `status` e `isRetryable` para controlar si se reintenta
- `withRetry(fn, maxRetries, onAttempt)` con exponential backoff (1s → 2s → 4s)
- Simulación de API con 60% de probabilidad de fallo para demostrar el retry
- `loadRecords()` con fallback a `[]` ante datos corruptos en localStorage
- Botón "Simular datos corruptos" para probar el fallback en vivo
- Consola dark de errores con tipo, mensaje, código y timestamp de cada error

---

### ✅ Week-12 – AgroTech Manager (Aplicación Integral)

**Tema:** Integración de todos los conceptos ES2023 (Semanas 1-11)  
**Carpeta:** `bc-javascript-week-12/`  
**Concepto clave:** Arquitectura 3 capas, ES Modules, aplicación completa

#### Lo que se realizó:
- **Arquitectura modular de 3 capas:** Models → Services → UI
- **Modelos con campos privados `#`:** `Product` (con `formattedPrice`, `stars`, `inStock`), `User` (con `verifyPassword`, validación estática), `Cart` (con `Map` interno, `add/remove/total`)
- **Servicios:** `ProductService` (filtrado con `toSorted`, búsqueda, categorías con `Set`), `AuthService` (registro, login, sesión persistida), `ReservationService` (CRUD con localStorage)
- **Catálogo:** 12 productos AgroTech con filtro por categoría, búsqueda por nombre y ordenamiento por precio/nombre
- **Carrito:** agregar, incrementar, decrementar, eliminar, vaciar, total formateado con `Intl.NumberFormat`
- **Autenticación:** registro y login con validación, sesión persistida en localStorage
- **Reservas:** se crean al confirmar el carrito, se pueden cancelar individualmente
- **Persistencia completa:** carrito, sesión y reservas en localStorage

---

## 🚀 Tecnologías Usadas en el Trimestre

| Tecnología | Uso |
|-----------|-----|
| **HTML5** | Estructura semántica de cada proyecto |
| **CSS3** | Variables CSS, Grid, Flexbox, gradientes, animaciones |
| **JavaScript ES2023** | Toda la lógica: arrays, clases, módulos, generadores, Proxy, Symbols |
| **Google Fonts (Inter)** | Tipografía moderna y legible |
| **ES Modules** | `import` / `export` en semanas 04-12 |
| **LocalStorage** | Persistencia de datos en semanas 02, 11, 12 |
| **Web APIs** | `crypto.randomUUID()`, `Intl.NumberFormat`, `Clipboard API` |

---

## 📄 Convenciones del Repositorio

- Cada Week tiene su propia carpeta `bc-javascript-week-XX/`
- Cada carpeta contiene un `README.md` interno con documentación completa
- Todos los proyectos tienen `starter/` (TODOs) y `solution/` (referencia)
- El `index.html` de cada semana carga la solución por defecto
- Para practicar: cambiar el `src` del script a `starter/script.js`
- Todo el código sigue principios de **ES2023**, **Clean Code** y **organización modular**
- Nomenclatura técnica en inglés, comentarios en español

---

## 👨‍💻 Autor

**Javier Pérez**  
Aprendiz SENA – Tecnología en Desarrollo de Software  

---

## 📌 Progreso del Trimestre

| Semana | Tema | Estado |
|--------|------|--------|
| Week-01 | Fundamentos ES2023 | ✅ Completada |
| Week-02 | CRUD + LocalStorage | ✅ Completada |
| Week-03 | POO – Clases y Herencia | ✅ Completada |
| Week-04 | ES6 Modules | ✅ Completada |
| Week-05 | Métodos Avanzados de Arrays | ✅ Completada |
| Week-06 | RegExp y Strings | ✅ Completada |
| Week-07 | Set, Map, WeakMap, WeakSet | ✅ Completada |
| Week-08 | Generadores e Iterables | ✅ Completada |
| Week-09 | Symbols y Well-known Symbols | ✅ Completada |
| Week-10 | Proxy y Reflect | ✅ Completada |
| Week-11 | Manejo de Errores | ✅ Completada |
| Week-12 | Aplicación Integral | ✅ Completada |
