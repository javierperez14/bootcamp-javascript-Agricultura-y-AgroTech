# 🌾 Proyecto Integrador – Agricultura y AgroTech

Este proyecto implementa una aplicación web para gestionar recursos AgroTech:  
sensores, drones agrícolas, maquinaria, estaciones climáticas, etc.

## 🚀 Funcionalidades Principales

- Crear, editar, eliminar y activar/desactivar elementos.
- Filtros por estado, categoría, prioridad.
- Búsqueda por nombre y descripción.
- Estadísticas automáticas del sistema.
- Persistencia usando LocalStorage.
- Interfaz adaptada al dominio AgroTech.

---

## 📦 Estructura

3-proyecto/  
├── README.md  
├── starter/  
│   ├── index.html  
│   ├── styles.css  
│   └── script.js  
└── solution/  
    └── script.js

---

## 🗂️ Modelo de Datos

```js
{
  id: Number,
  name: String,
  description: String,
  active: Boolean,
  priority: "low" | "medium" | "high",
  category: "maquinaria" | "sensores" | "drones" | "riego" | "fertilización",
  createdAt: String,
  updatedAt: String | null,

  // Propiedades del dominio:
  fieldLocation: String,
  batteryLevel: Number,
  lastMaintenance: String
}
