# 🌱 Proyecto Trimestral – Desarrollo Web (SENA)

**Dominio:** Agricultura y AgroTech  
**Autor:** Javier Pérez

---

## 📋 Descripción General

Este repositorio contiene todas las actividades, entregables y proyectos desarrollados a lo largo del trimestre de formación. Cada carpeta corresponde a una **Week** (Semana), donde se aplican conceptos incrementales de desarrollo web, buenas prácticas, arquitectura y programación moderna con JavaScript (ES2023).

El objetivo del trimestre es construir soluciones completas, escalables y bien estructuradas dentro de un dominio asignado: **Agricultura y AgroTech**.

---

## 📦 Contenido por Semana

A medida que avances, aquí se irán documentando tus Weeks. 📌 Cada Week tendrá un resumen profesional de lo que se trabajó.

---

### ✅ Week-01 – Ficha de Información Interactiva (ES2023)

**Tema:** JavaScript Moderno (Variables, Template Literals, Arrow Functions, Destructuring, Arrays)  
**Entregable:** Aplicación web interactiva que muestra una ficha informativa del dominio AgroTech.

#### 🔍 Lo que se realizó:

- Creación de un proyecto web con:
  - `index.html`
  - `styles.css`
  - `script.js`
  - `README.md` interno
- Implementación de un objeto de datos del dominio (AgroTech)
- Uso de destructuring para extraer datos del objeto
- Generación de HTML dinámico con template literals
- Implementación de eventos con arrow functions
- Cálculo dinámico de estadísticas (promedios) con `map` y `reduce`
- Botón mostrar/ocultar detalles
- Botón copiar al portapapeles usando Web API
- Implementación de tema claro/oscuro con toggle y CSS variables
- Mensajes tipo toast para retroalimentación
- Código siguiendo estándares ES2023 y estilo limpio (clean code)

### ✅ Week-02 – CRUD Interactivo AgroTech

**Tema:** Aplicación web con gestión completa de recursos AgroTech (CRUD + filtros + estadísticas)  
**Carpeta:** `Week-02/`

#### 🔍 Lo que se realizó:

- **Implementación de CRUD completo:**
  - Crear, leer, actualizar y eliminar recursos AgroTech
  - Activar/desactivar elementos en tiempo real
- **Filtros avanzados:**
  - Por estado (activo/inactivo)
  - Por categoría (maquinaria, sensores, drones, etc.)
  - Por prioridad (baja, media, alta)
  - Búsqueda por nombre y descripción
- **Persistencia con LocalStorage:** los datos se mantienen al recargar la página
- **Estadísticas dinámicas:**
  - Total de recursos, activos, inactivos
  - Conteo por categoría
- Interfaz adaptada al dominio AgroTech con estilo limpio y moderno
- **Aplicación de ES2023:**
  - Arrow functions
  - Destructuring
  - Spread operator
  - Funciones puras y modularización lógica
- Checklist interactivo para seguimiento de funcionalidades implementadas

---

### ✅ Week-03 – Sistema de Gestión con POO

**Tema:** Programación Orientada a Objetos con JavaScript ES2023  
**Carpeta:** `bc-javascript-week-03/`

#### 🔍 Lo que se realizó:

- **Arquitectura de clases completa:**
  - Clase base abstracta `AgriculturalEquipment`
  - 3 clases derivadas: `Tractor`, `Sensor`, `Drone`
  - Clase base `Person` con roles: `Operator` y `Administrator`
  - Clase principal `AgroTechSystem` para gestión del sistema
- **Encapsulación total:**
  - Todos los campos privados usando `#`
  - Getters y setters con validación
  - Métodos privados para lógica interna
- **Herencia y Polimorfismo:**
  - Uso correcto de `extends` y `super()`
  - Métodos abstractos implementados en clases derivadas
  - Sobrescritura de métodos (`getInfo()`, `getIcon()`)
- **Características ES2023:**
  - Static blocks para configuración de clase
  - Métodos estáticos
  - Campos privados con sintaxis `#`
- **Sistema completo de gestión:**
  - CRUD de equipos agrícolas
  - Gestión de usuarios con roles
  - Sistema de transacciones y auditoría
  - Filtros y búsqueda avanzada
  - Estadísticas en tiempo real
- **Interfaz profesional:**
  - Dashboard con métricas
  - Formularios dinámicos según tipo de equipo
  - Modal de detalles completos
  - Estados visuales y badges
- **Documentación completa:**
  - README detallado con arquitectura
  - Diagrama de clases visual
  - Ejemplos de uso

---

### ✅ Week-04 – Sistema Modular con ES6 Modules

**Tema:** Arquitectura Modular, Destructuring Avanzado y Dynamic Imports  
**Carpeta:** `bc-javascript-week-04/`

#### 🔍 Lo que se realizó:

- **Arquitectura modular completa:**
  - Estructura organizada en carpetas (models, services, ui, utils, features)
  - Separación clara de responsabilidades
  - Código reutilizable y mantenible
- **ES6 Modules:**
  - Named exports para funciones y constantes
  - Default exports para clases principales
  - Barrel exports (index.js) para simplificar imports
  - Imports organizados y optimizados
- **Destructuring avanzado:**
  - En parámetros de funciones con valores por defecto
  - En retornos de funciones
  - En iteraciones de arrays y objetos
  - En asignaciones de variables
- **Dynamic Imports (Lazy Loading):**
  - Módulo de reportes cargado bajo demanda
  - Módulo de exportación cargado bajo demanda
  - Manejo de errores en imports dinámicos
  - Optimización de carga inicial
- **Sistema completo de gestión:**
  - CRUD con validación robusta
  - Persistencia en LocalStorage
  - Filtros combinados (categoría, estado, búsqueda)
  - Estadísticas en tiempo real
  - Alertas de stock bajo
- **Features avanzadas:**
  - Reportes detallados con estadísticas
  - Exportación a JSON y CSV
  - Backup del sistema
  - Top equipos más valiosos
- **Validación y formateo:**
  - Validadores para todos los campos
  - Formateadores de moneda, fechas y números
  - Mensajes de error descriptivos
- **Documentación profesional:**
  - README técnico detallado
  - Ejemplos de uso del código
  - Explicación de patrones aplicados

---

## 🚀 Tecnologías Usadas en el Trimestre

- **HTML5** – Estructura del proyecto
- **CSS3** – Diseño, estilos y efectos visuales
- **JavaScript ES2023** – Lógica, filtros, estadísticas, persistencia
- **LocalStorage** – Guardado local de datos
- **Buenas prácticas** – Clean Code, modularidad, comentarios claros

---

## 📄 Convenciones del Repositorio

- Cada Week tiene su propia carpeta
- Cada Week contiene un `README.md` interno explicando el entregable y resultados
- Todo el código sigue principios de:
  - ES2023
  - Clean Code
  - Organización modular

---

## 👨‍💻 Autor

**Javier Pérez**  
Aprendiz SENA – Desarrollo de Software

---

## 📌 Próximos pasos

- **Week-05** → Asincronía, Promises y Async/Await
- **Week-06** → Integración con APIs REST
- Dashboard con gráficas y análisis de datos
- Mejorar diseño responsive y experiencia de usuario

---
