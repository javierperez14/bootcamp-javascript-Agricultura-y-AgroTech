# 📦 Proyecto Semana 03: Sistema de Gestión con POO

> **🎯 ÚNICO ENTREGABLE**: Este proyecto es el **único entregable obligatorio** para aprobar la semana.

## 🏛️ Política de Dominios Únicos

**Tu dominio fue asignado por el instructor al inicio del trimestre.** Este proyecto debe implementarse completamente dentro del contexto de tu dominio asignado.

### ¿Por qué dominios únicos?

- Previene copia entre compañeros
- Fomenta implementaciones originales
- Desarrolla capacidad de abstracción
- Aplica conceptos de POO a contextos específicos

---

## 🎯 Objetivo

Crear un sistema completo de gestión usando clases ES2023, herencia, encapsulación y todos los conceptos de POO aprendidos durante la semana, aplicado a tu dominio asignado.

---

## 📋 Descripción

Desarrollarás una aplicación web que permita gestionar entidades de tu dominio con:

- Catálogo de elementos (con diferentes tipos/subclases)
- Sistema de usuarios (diferentes roles)
- Operaciones CRUD con validación
- Sistema de estados y transiciones
- Búsqueda y filtrado

---

## 🏗️ Arquitectura de Clases (Genérica)

Debes adaptar esta estructura a tu dominio:

```
BaseItem (clase base abstracta)
├── ItemType1
├── ItemType2
└── ItemType3

Person (clase base)
├── UserRole1
└── UserRole2

MainSystem (clase principal)
├── Transaction (operaciones)
└── Record (historial)
```

### 💡 Ejemplo: Planetario (NO es un dominio asignable)

```
CelestialBody (clase base abstracta)
├── Planet
├── Star
└── Satellite
    ├── NaturalSatellite
    └── ArtificialSatellite

Person (clase base)
├── Visitor
└── Astronomer

Observatory (clase principal)
├── Observation (observaciones)
└── Event (eventos astronómicos)
```

---

## 📝 Requisitos Técnicos

### 1. Clase Base `BaseItem` (Abstracta)

Tu clase base debe incluir:

```javascript
class BaseItem {
  // Campos privados obligatorios
  #id;
  #name;
  #active;
  #location;
  #dateCreated;

  constructor(name, location) { /* ... */ }

  // Getters obligatorios
  get id() { /* ... */ }
  get name() { /* ... */ }
  get isActive() { /* ... */ }
  get location() { /* ... */ }
  get dateCreated() { /* ... */ }

  // Setter con validación
  set location(value) { /* validar y asignar */ }

  // Métodos de estado
  activate() { /* ... */ }
  deactivate() { /* ... */ }

  // Método abstracto - debe sobrescribirse
  getInfo() {
    throw new Error('Método getInfo() debe ser implementado');
  }

  // Método para obtener el tipo
  getType() {
    return this.constructor.name;
  }
}
```

### 2. Clases Derivadas (mínimo 3)

Crea al menos 3 clases que extiendan tu clase base:

- Propiedades privadas adicionales específicas
- Implementación del método `getInfo()`
- Getters para todas las propiedades
- Métodos específicos del tipo

### 3. Clase `Person` (Base para usuarios)

```javascript
class Person {
  #id;
  #name;
  #email;
  #registrationDate;

  constructor(name, email) { /* ... */ }

  get id() { /* ... */ }
  get name() { /* ... */ }
  get email() { /* ... */ }

  set email(value) { /* validar formato */ }
}
```

### 4. Clases de Roles (mínimo 2)

- Diferentes permisos/capacidades
- Métodos específicos del rol
- Propiedades privadas adicionales

### 5. Clase Principal del Sistema

```javascript
class MainSystem {
  #items = [];
  #users = [];
  #transactions = [];

  // Bloque estático para configuración
  static {
    this.VERSION = '1.0.0';
    this.MAX_ITEMS = 1000;
  }

  // Métodos CRUD
  addItem(item) { /* ... */ }
  removeItem(id) { /* ... */ }
  findItem(id) { /* ... */ }

  // Métodos de búsqueda
  searchByName(query) { /* ... */ }
  filterByType(type) { /* ... */ }

  // Estadísticas
  getStats() { /* ... */ }
}
```

---

## 💡 Ejemplos de Adaptación por Dominio

| Concepto | Planetario 🔭 | Acuario 🐠 |
|----------|---------------|------------|
| **BaseItem** | CelestialBody | MarineSpecies |
| **Tipo 1** | Planet | Fish |
| **Tipo 2** | Star | Mammal |
| **Tipo 3** | Satellite | Invertebrate |
| **Rol 1** | Visitor | Guest |
| **Rol 2** | Astronomer | Biologist |
| **Sistema** | Observatory | Aquarium |
| **Transacción** | Observation | Feeding |

---

## 🎨 Interfaz de Usuario

### Secciones Requeridas

1. **Header**: Nombre del sistema y estadísticas
2. **Formulario**: Crear/editar elementos
3. **Lista de Elementos**: Con información según tipo
4. **Filtros**: Por tipo, estado, búsqueda
5. **Detalles**: Modal con información completa

### Estados Visuales

- Elementos activos/inactivos
- Diferentes iconos por tipo
- Badges de categoría

---

## ✅ Criterios de Evaluación

### Clases y Herencia (40 puntos)

- [ ] Clase base abstracta correcta (10pts)
- [ ] Mínimo 3 clases derivadas (10pts)
- [ ] Uso correcto de `extends` y `super` (10pts)
- [ ] Métodos sobrescritos correctamente (10pts)

### Encapsulación (30 puntos)

- [ ] Campos privados `#` correctos (10pts)
- [ ] Getters y setters apropiados (10pts)
- [ ] Validación en setters (10pts)

### Características Modernas (30 puntos)

- [ ] Static blocks para configuración (10pts)
- [ ] Métodos estáticos apropiados (10pts)
- [ ] Integración con DOM funcional (10pts)

**Total: 100 puntos**
**Mínimo para aprobar: 70 puntos**

---

## 🚀 Cómo Empezar

### 1. Define tu Jerarquía de Clases

Dibuja primero tu arquitectura de clases adaptada a tu dominio.

### 2. Implementa de Abajo hacia Arriba

1. Clase base `BaseItem`
2. Clases derivadas (tipos de elementos)
3. Clase `Person`
4. Clases de roles
5. Clase principal del sistema
6. Integración con DOM

### 3. Prueba Incrementalmente

Después de cada clase, crea instancias de prueba en la consola.

---

## 💡 Pistas y Consejos

### Campos Privados

```javascript
class Example {
  #privateField;

  constructor(value) {
    this.#privateField = value;
  }

  get privateField() {
    return this.#privateField;
  }
}
```

### Herencia

```javascript
class Child extends Parent {
  constructor(parentProp, childProp) {
    super(parentProp); // Llamar al padre primero
    this.#childProp = childProp;
  }
}
```

### Static Blocks

```javascript
class Config {
  static {
    this.settings = {
      theme: 'dark',
      language: 'es'
    };
  }
}
```

---

## 🎓 Conceptos Aplicados

| Concepto | Uso en el Proyecto |
|----------|-------------------|
| **Clases** | Definir entidades del dominio |
| **Herencia** | Especializar tipos de elementos |
| **Campos privados** | Encapsular datos sensibles |
| **Getters/Setters** | Controlar acceso a propiedades |
| **Métodos estáticos** | Utilidades y configuración |
| **Static blocks** | Inicialización compleja |

---

## ⏱️ Tiempo Estimado

- **Definir arquitectura**: 30 minutos
- **Clases base**: 1 hora
- **Clases derivadas**: 1.5 horas
- **Sistema principal**: 1 hora
- **Integración DOM**: 1 hora

**Total: ~5 horas**

---

## 📋 Entregables

1. **Código funcional** con jerarquía de clases completa
2. **Diagrama de clases** (puede ser texto o imagen)
3. **README personal** explicando tu implementación
4. **Todo el código debe usar**:
   - Nomenclatura técnica en inglés
   - Comentarios en español
   - Sintaxis ES2023 (campos privados `#`, static blocks)

---

_Proyecto Week-03 - JavaScript Moderno Bootcamp_