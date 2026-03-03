# 🌱 Week-04: Sistema Modular AgroTech con ES6 Modules

**Dominio:** Agricultura y AgroTech  
**Autor:** Javier Pérez  
**Fecha:** Semana 04 - Trimestre 3

---

## 📋 Descripción del Proyecto

Sistema completo de gestión de equipos agrícolas implementado con arquitectura modular ES6, destructuring avanzado y dynamic imports. El proyecto demuestra el uso profesional de módulos JavaScript modernos para crear aplicaciones escalables y mantenibles.

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
starter/
├── main.js                 # Punto de entrada principal
├── config.js               # Configuración y constantes
├── models/
│   ├── index.js            # Barrel export de modelos
│   ├── BaseEntity.js       # Clase AgriculturalEquipment
│   └── Category.js         # Clase Category
├── services/
│   ├── index.js            # Barrel export de servicios
│   ├── storage.js          # Servicio de LocalStorage
│   └── manager.js          # EquipmentManager (lógica CRUD)
├── ui/
│   ├── index.js            # Barrel export de UI
│   ├── render.js           # Funciones de renderizado
│   └── events.js           # Event handlers
├── utils/
│   ├── index.js            # Barrel export de utilidades
│   ├── formatters.js       # Funciones de formateo
│   └── validators.js       # Funciones de validación
└── features/
    ├── reports.js          # Reportes (lazy load)
    └── export.js           # Exportación (lazy load)
```

---

## ✨ Características Implementadas

### 1. Destructuring Avanzado (25 puntos)

#### En Parámetros de Funciones
```javascript
// BaseEntity.js
constructor({ id = null, name, category, value, location, quantity = 1, minStock = 1 }) {
  // Destructuring con valores por defecto
}

// manager.js
addEquipment({ name, category, value, location, quantity, minStock }) {
  // Destructuring en parámetros
}
```

#### En Retornos y Asignaciones
```javascript
// manager.js
getStatistics() {
  return {
    total,
    active,
    inactive,
    lowStock,
    totalValue,
    averageValue,
    byCategory,
  };
}

// events.js
const { total, active, totalValue } = manager.getStatistics();
```

#### En Iteraciones
```javascript
// manager.js
searchByName(query) {
  return this.equipment.filter(({ name }) => 
    name.toLowerCase().includes(lowerQuery)
  );
}

// Iteración con destructuring
equipment.forEach(({ id, name, category }) => {
  console.log(id, name, category);
});
```

#### Con Valores por Defecto
```javascript
// render.js
const renderEquipmentCard = ({ 
  id, 
  name, 
  category, 
  value, 
  location, 
  quantity = 1, 
  minStock = 1, 
  active = true 
}) => {
  // Valores por defecto en destructuring
};
```

---

### 2. Módulos ES6 (40 puntos)

#### Named Exports
```javascript
// formatters.js
export const formatCurrency = (value) => { ... };
export const formatDate = (dateString) => { ... };
export const formatNumber = (num) => { ... };

// validators.js
export const validateName = (name) => { ... };
export const validateValue = (value) => { ... };
```

#### Default Exports
```javascript
// BaseEntity.js
export default class AgriculturalEquipment { ... }

// manager.js
export default class EquipmentManager { ... }

// Category.js
export default class Category { ... }
```

#### Barrel Exports (index.js)
```javascript
// models/index.js
export { default as AgriculturalEquipment } from './BaseEntity.js';
export { default as Category } from './Category.js';

// services/index.js
export { saveToStorage, loadFromStorage, clearStorage } from './storage.js';
export { default as EquipmentManager } from './manager.js';

// utils/index.js
export * from './formatters.js';
export * from './validators.js';

// ui/index.js
export * from './render.js';
export * from './events.js';
```

#### Imports Organizados
```javascript
// main.js
import { APP_CONFIG, getCategoriesArray } from './config.js';
import { initializeEvents } from './ui/events.js';
import { renderCategoryOptions } from './ui/render.js';

// events.js
import { EquipmentManager } from '../services/index.js';
import { getCategoriesArray } from '../config.js';
import { validateEquipmentForm } from '../utils/index.js';
```

---

### 3. Dynamic Imports (20 puntos)

#### Módulo de Reportes (Lazy Loading)
```javascript
// events.js
const handleReportsClick = async () => {
  try {
    // Cargar módulo bajo demanda
    const { generateReport, renderReportHTML } = await import('../features/reports.js');
    
    const stats = manager.getStatistics();
    const alerts = manager.getAlerts();
    const equipment = manager.getAllEquipment();
    
    const report = generateReport({ stats, alerts, equipment });
    const reportHTML = renderReportHTML(report);
    
    document.getElementById('reportsContent').innerHTML = reportHTML;
    document.getElementById('reportsModal').classList.add('show');
  } catch (error) {
    console.error('Error al cargar reportes:', error);
    showError('Error al cargar el módulo de reportes');
  }
};
```

#### Módulo de Exportación (Lazy Loading)
```javascript
// events.js
const handleExportClick = async () => {
  try {
    // Cargar módulo bajo demanda
    const { exportToJSON, exportToCSV } = await import('../features/export.js');
    
    const equipment = manager.getAllEquipment();
    const format = confirm('¿Exportar como JSON? (Cancelar para CSV)') ? 'json' : 'csv';
    
    if (format === 'json') {
      exportToJSON(equipment);
    } else {
      exportToCSV(equipment);
    }
    
    showSuccess('Datos exportados exitosamente');
  } catch (error) {
    console.error('Error al exportar:', error);
    showError('Error al cargar el módulo de exportación');
  }
};
```

---

### 4. Funcionalidad Completa (15 puntos)

#### CRUD Completo
- ✅ Crear equipos con validación
- ✅ Leer/listar equipos
- ✅ Actualizar equipos existentes
- ✅ Eliminar equipos con confirmación

#### Persistencia en LocalStorage
- ✅ Guardar automáticamente después de cada operación
- ✅ Cargar datos al iniciar la aplicación
- ✅ Manejo de errores en storage

#### Filtros y Búsqueda
- ✅ Filtrar por categoría
- ✅ Filtrar por estado (activo/inactivo/stock bajo)
- ✅ Búsqueda por nombre
- ✅ Filtros combinados

#### Estadísticas
- ✅ Total de equipos
- ✅ Equipos activos/inactivos
- ✅ Valor total de inventario
- ✅ Distribución por categoría
- ✅ Alertas de stock bajo

---

## 🎯 Conceptos Técnicos Aplicados

### 1. Barrel Exports Pattern
Uso de archivos `index.js` para centralizar exports y simplificar imports:

```javascript
// En lugar de:
import { formatCurrency } from './utils/formatters.js';
import { validateName } from './utils/validators.js';

// Usamos:
import { formatCurrency, validateName } from './utils/index.js';
```

### 2. Destructuring en Múltiples Contextos
- Parámetros de funciones
- Retornos de funciones
- Iteraciones de arrays
- Asignaciones de variables
- Con valores por defecto

### 3. Dynamic Imports para Code Splitting
Los módulos de features solo se cargan cuando el usuario los necesita:
- Reduce el tamaño inicial del bundle
- Mejora el tiempo de carga inicial
- Carga bajo demanda de funcionalidades

### 4. Separación de Responsabilidades
- **Models**: Definición de entidades
- **Services**: Lógica de negocio
- **UI**: Presentación y eventos
- **Utils**: Funciones auxiliares
- **Features**: Funcionalidades opcionales

---

## 📊 Categorías de Equipos AgroTech

| Categoría | Emoji | Descripción |
|-----------|-------|-------------|
| Tractor | 🚜 | Maquinaria pesada para labranza |
| Sensor IoT | 📡 | Sensores de monitoreo agrícola |
| Drone Agrícola | 🚁 | Drones para fumigación y monitoreo |
| Sistema de Riego | 💧 | Equipos de irrigación |

---

## 🚀 Funcionalidades del Sistema

### Gestión de Equipos
- Agregar nuevos equipos con validación completa
- Editar equipos existentes
- Eliminar equipos con confirmación
- Activar/desactivar equipos
- Alertas de stock bajo

### Filtros y Búsqueda
- Filtrar por categoría
- Filtrar por estado (activo/inactivo/stock bajo)
- Búsqueda en tiempo real por nombre
- Combinación de múltiples filtros

### Reportes (Dynamic Import)
- Resumen general de estadísticas
- Distribución por categoría
- Top 5 equipos más valiosos
- Lista de alertas

### Exportación (Dynamic Import)
- Exportar a JSON
- Exportar a CSV
- Reporte detallado en texto plano
- Backup completo del sistema

---

## ✅ Criterios de Evaluación Cumplidos

| Criterio | Puntos | Estado |
|----------|--------|--------|
| **Destructuring** | | |
| En parámetros de funciones | 7 | ✅ |
| En retornos/asignaciones | 6 | ✅ |
| En iteraciones de arrays | 6 | ✅ |
| Con valores por defecto | 6 | ✅ |
| **Módulos ES6** | | |
| Named exports correctos | 10 | ✅ |
| Default exports apropiados | 10 | ✅ |
| Barrel exports (index.js) | 10 | ✅ |
| Estructura modular clara | 10 | ✅ |
| **Dynamic Imports** | | |
| Al menos 2 módulos lazy loading | 10 | ✅ |
| Manejo de errores en imports | 10 | ✅ |
| **Funcionalidad** | | |
| CRUD funcional | 10 | ✅ |
| Persistencia en localStorage | 5 | ✅ |
| **TOTAL** | **100** | **✅** |

---

## 💡 Ejemplos de Uso del Código

### Agregar Equipo
```javascript
manager.addEquipment({
  name: 'Tractor John Deere 6M',
  category: 'tractor',
  value: 85000,
  location: 'Sector A',
  quantity: 2,
  minStock: 1
});
```

### Filtrar Equipos
```javascript
const filtered = manager.filterEquipment({
  category: 'sensor',
  status: 'active',
  searchQuery: 'humedad'
});
```

### Obtener Estadísticas
```javascript
const { total, active, totalValue, byCategory } = manager.getStatistics();
console.log(`Total: ${total}, Activos: ${active}, Valor: $${totalValue}`);
```

### Cargar Reportes (Dynamic Import)
```javascript
const { generateReport } = await import('./features/reports.js');
const report = generateReport({ stats, alerts, equipment });
```

---

## 🎓 Aprendizajes Clave

1. **Módulos ES6**: Organización profesional del código en módulos reutilizables
2. **Destructuring**: Sintaxis moderna para trabajar con objetos y arrays
3. **Dynamic Imports**: Optimización de carga con code splitting
4. **Barrel Exports**: Patrón para simplificar imports
5. **Separación de Responsabilidades**: Arquitectura limpia y mantenible
6. **Validación**: Validación robusta de datos de entrada
7. **Persistencia**: Manejo de LocalStorage con error handling

---

## 📁 Archivos del Proyecto

```
bc-javascript-week-04/
├── index.html                      # HTML principal
├── styles.css                      # Estilos CSS
├── README.md                       # Requisitos del proyecto
├── PROYECTO-README.md              # Este archivo
└── starter/
    ├── main.js                     # Punto de entrada
    ├── config.js                   # Configuración
    ├── models/
    │   ├── index.js
    │   ├── BaseEntity.js
    │   └── Category.js
    ├── services/
    │   ├── index.js
    │   ├── storage.js
    │   └── manager.js
    ├── ui/
    │   ├── index.js
    │   ├── render.js
    │   └── events.js
    ├── utils/
    │   ├── index.js
    │   ├── formatters.js
    │   └── validators.js
    └── features/
        ├── reports.js
        └── export.js
```

---

## 🔄 Flujo de Datos

```
Usuario → UI Events → Manager → Models → Storage
                ↓
            Validators
                ↓
            Formatters
                ↓
            UI Render
```

---

## 🚀 Cómo Ejecutar

1. Abrir `index.html` en un navegador moderno
2. El sistema cargará automáticamente los módulos necesarios
3. Los módulos de features se cargarán bajo demanda al hacer clic en los botones

---

## 📝 Notas Técnicas

- Todos los módulos usan sintaxis ES6 (`import`/`export`)
- Nunca se usa CommonJS (`require`/`module.exports`)
- Destructuring aplicado en todo el código
- Nomenclatura en inglés, comentarios en español
- Validación completa de datos
- Manejo de errores en dynamic imports
- LocalStorage con error handling

---

## 👨‍💻 Autor

**Javier Pérez**  
Aprendiz SENA - Análisis y Desarrollo de Software  
Trimestre 3 - Competencia JavaScript

---

_Proyecto desarrollado como parte del programa de formación SENA - 2024_
