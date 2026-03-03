# 🌱 Week-03: Sistema de Gestión AgroTech con POO

**Dominio:** Agricultura y AgroTech  
**Autor:** Javier Pérez  
**Fecha:** Semana 03 - Trimestre 3

---

## 📋 Descripción del Proyecto

Sistema completo de gestión de equipos agrícolas implementado con Programación Orientada a Objetos (POO) usando JavaScript ES2023. El sistema permite administrar diferentes tipos de equipos AgroTech (tractores, sensores IoT y drones agrícolas) con una arquitectura de clases robusta que incluye herencia, encapsulación y polimorfismo.

---

## 🏗️ Arquitectura de Clases

### Diagrama de Jerarquía

```
AgriculturalEquipment (clase base abstracta)
├── Tractor
├── Sensor
└── Drone

Person (clase base)
├── Operator
└── Administrator

AgroTechSystem (clase principal)
├── Gestión de equipos (CRUD)
├── Gestión de usuarios
└── Sistema de transacciones
```

### Descripción de Clases

#### 1. AgriculturalEquipment (Clase Base Abstracta)

**Propósito:** Clase base para todos los equipos agrícolas

**Campos Privados:**
- `#id` - Identificador único generado automáticamente
- `#name` - Nombre del equipo
- `#active` - Estado activo/inactivo
- `#location` - Ubicación física del equipo
- `#dateCreated` - Fecha de registro

**Métodos Principales:**
- `activate()` / `deactivate()` - Cambiar estado del equipo
- `getInfo()` - Método abstracto (debe implementarse en clases derivadas)
- `getType()` - Retorna el nombre de la clase
- `getIcon()` - Retorna el ícono representativo

**Características:**
- No puede ser instanciada directamente (clase abstracta)
- Validación en setter de `location`
- Generación automática de ID único

---

#### 2. Tractor (Clase Derivada)

**Hereda de:** AgriculturalEquipment

**Campos Privados Adicionales:**
- `#horsepower` - Caballos de fuerza
- `#fuelType` - Tipo de combustible (Diesel, Gasolina, Eléctrico)
- `#hoursWorked` - Horas de trabajo acumuladas

**Métodos Específicos:**
- `addWorkHours(hours)` - Agregar horas de trabajo
- `getInfo()` - Implementación del método abstracto

**Ícono:** 🚜

---

#### 3. Sensor (Clase Derivada)

**Hereda de:** AgriculturalEquipment

**Campos Privados Adicionales:**
- `#sensorType` - Tipo de sensor (Humedad, Temperatura, pH, Nutrientes)
- `#measurementUnit` - Unidad de medida (%, °C, etc.)
- `#lastReading` - Última lectura registrada
- `#batteryLevel` - Nivel de batería (0-100%)

**Métodos Específicos:**
- `updateReading(value)` - Actualizar lectura del sensor
- `updateBattery(level)` - Actualizar nivel de batería
- `getInfo()` - Implementación del método abstracto

**Ícono:** 📡

---

#### 4. Drone (Clase Derivada)

**Hereda de:** AgriculturalEquipment

**Campos Privados Adicionales:**
- `#maxFlightTime` - Tiempo máximo de vuelo en minutos
- `#cameraResolution` - Resolución de cámara (HD, Full HD, 4K)
- `#flightHours` - Horas de vuelo acumuladas
- `#lastMaintenance` - Fecha del último mantenimiento

**Métodos Específicos:**
- `addFlightHours(hours)` - Agregar horas de vuelo
- `performMaintenance()` - Registrar mantenimiento
- `getInfo()` - Implementación del método abstracto

**Ícono:** 🚁

---

#### 5. Person (Clase Base)

**Propósito:** Clase base para usuarios del sistema

**Campos Privados:**
- `#id` - Identificador único
- `#name` - Nombre del usuario
- `#email` - Correo electrónico
- `#registrationDate` - Fecha de registro

**Características:**
- Validación de formato de email en setter
- Generación automática de ID con prefijo "USR-"

---

#### 6. Operator (Clase Derivada de Person)

**Hereda de:** Person

**Campos Privados Adicionales:**
- `#certifications` - Array de certificaciones
- `#assignedEquipment` - Array de IDs de equipos asignados

**Métodos Específicos:**
- `addCertification(cert)` - Agregar certificación
- `assignEquipment(equipmentId)` - Asignar equipo
- `unassignEquipment(equipmentId)` - Desasignar equipo

---

#### 7. Administrator (Clase Derivada de Person)

**Hereda de:** Person

**Campos Privados Adicionales:**
- `#accessLevel` - Nivel de acceso (full, limited, read-only)
- `#department` - Departamento

**Métodos Específicos:**
- `canModify()` - Verificar permisos de modificación
- `canDelete()` - Verificar permisos de eliminación

---

#### 8. AgroTechSystem (Clase Principal)

**Propósito:** Sistema central de gestión

**Campos Privados:**
- `#equipment` - Array de equipos
- `#users` - Array de usuarios
- `#transactions` - Array de transacciones

**Bloque Estático:**
```javascript
static {
    this.VERSION = '1.0.0';
    this.MAX_EQUIPMENT = 1000;
    this.SUPPORTED_TYPES = ['Tractor', 'Sensor', 'Drone'];
}
```

**Métodos CRUD:**
- `addEquipment(equipment)` - Agregar equipo
- `removeEquipment(id)` - Eliminar equipo
- `findEquipment(id)` - Buscar equipo por ID
- `getAllEquipment()` - Obtener todos los equipos

**Métodos de Búsqueda:**
- `searchByName(query)` - Buscar por nombre
- `filterByType(type)` - Filtrar por tipo
- `filterByStatus(active)` - Filtrar por estado

**Métodos de Usuarios:**
- `addUser(user)` - Agregar usuario
- `getAllUsers()` - Obtener todos los usuarios

**Métodos de Estadísticas:**
- `getStats()` - Obtener estadísticas del sistema
- `getTransactions()` - Obtener historial de transacciones

**Método Estático:**
- `getSystemInfo()` - Información del sistema

---

## ✨ Características Implementadas

### Conceptos de POO Aplicados

✅ **Clases y Herencia**
- Clase base abstracta `AgriculturalEquipment`
- 3 clases derivadas: `Tractor`, `Sensor`, `Drone`
- Uso correcto de `extends` y `super()`
- Métodos sobrescritos (`getInfo()`, `getIcon()`)

✅ **Encapsulación**
- Todos los campos son privados usando `#`
- Getters para acceso controlado
- Setters con validación (location, email, accessLevel)
- Métodos privados (`#generateId`, `#logTransaction`)

✅ **Características ES2023**
- Static blocks para configuración de clase
- Métodos estáticos (`getSystemInfo()`)
- Campos privados con `#`
- Arrow functions en eventos

✅ **Polimorfismo**
- Método `getInfo()` implementado diferente en cada clase
- Método `getIcon()` personalizado por tipo

---

## 🎨 Funcionalidades de la Interfaz

### 1. Dashboard con Estadísticas
- Total de equipos registrados
- Equipos activos
- Total de usuarios

### 2. Formulario Dinámico
- Selección de tipo de equipo
- Campos específicos según el tipo seleccionado
- Validación de datos

### 3. Lista de Equipos
- Vista en tarjetas con información resumida
- Íconos y badges por tipo
- Estados visuales (activo/inactivo)

### 4. Filtros Avanzados
- Por tipo de equipo
- Por estado (activo/inactivo)
- Búsqueda por nombre

### 5. Acciones por Equipo
- Ver detalles completos (modal)
- Activar/desactivar
- Eliminar con confirmación

### 6. Modal de Detalles
- Información general
- Especificaciones técnicas
- Datos específicos según tipo

---

## 🚀 Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con CSS Grid y Flexbox
- **JavaScript ES2023** - POO con sintaxis moderna
- **Módulos ES6** - Organización del código

---

## 📊 Datos de Ejemplo Incluidos

### Usuarios
- **Administrador:** Juan Pérez (juan@agrotech.com)
- **Operador:** María García (maria@agrotech.com)

### Equipos
- **Tractor:** John Deere 6M - 120 HP, Diesel
- **Sensor:** Sensor Humedad SH-01 - Medición en %
- **Drone:** DJI Agras T30 - 45 min vuelo, 4K

---

## 💡 Conceptos Técnicos Destacados

### 1. Clase Abstracta
```javascript
if (new.target === AgriculturalEquipment) {
    throw new Error('Clase abstracta no puede ser instanciada');
}
```

### 2. Campos Privados
```javascript
#id;
#name;
#active;
```

### 3. Static Block
```javascript
static {
    this.VERSION = '1.0.0';
    this.MAX_EQUIPMENT = 1000;
}
```

### 4. Validación en Setters
```javascript
set email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        throw new Error('Formato de email inválido');
    }
    this.#email = value;
}
```

---

## ✅ Criterios de Evaluación Cumplidos

| Criterio | Puntos | Estado |
|----------|--------|--------|
| Clase base abstracta correcta | 10 | ✅ |
| Mínimo 3 clases derivadas | 10 | ✅ |
| Uso correcto de extends y super | 10 | ✅ |
| Métodos sobrescritos correctamente | 10 | ✅ |
| Campos privados # correctos | 10 | ✅ |
| Getters y setters apropiados | 10 | ✅ |
| Validación en setters | 10 | ✅ |
| Static blocks para configuración | 10 | ✅ |
| Métodos estáticos apropiados | 10 | ✅ |
| Integración con DOM funcional | 10 | ✅ |
| **TOTAL** | **100** | **✅** |

---

## 🎯 Aprendizajes Clave

1. **Abstracción:** Crear clases base que definen comportamiento común
2. **Herencia:** Especializar funcionalidad en clases derivadas
3. **Encapsulación:** Proteger datos con campos privados
4. **Polimorfismo:** Implementar métodos de forma específica en cada clase
5. **Static Features:** Usar bloques y métodos estáticos para configuración
6. **Validación:** Implementar validaciones en setters
7. **Arquitectura:** Diseñar sistemas escalables y mantenibles

---

## 📁 Estructura de Archivos

```
bc-javascript-week-03/
├── index.html          # Estructura HTML
├── styles.css          # Estilos CSS
├── script.js           # Lógica POO y DOM
├── README.md           # Documentación (este archivo)
└── contexto.md         # Requisitos del proyecto
```

---

## 🔄 Posibles Mejoras Futuras

- Persistencia con LocalStorage
- Exportar/importar datos (JSON)
- Gráficas de estadísticas
- Sistema de notificaciones
- Historial de cambios por equipo
- Asignación de operadores a equipos
- Sistema de mantenimiento programado
- Reportes en PDF

---

## 👨‍💻 Autor

**Javier Pérez**  
Aprendiz SENA - Análisis y Desarrollo de Software  
Trimestre 3 - Competencia JavaScript

---

## 📝 Notas Técnicas

- Todo el código usa nomenclatura en inglés
- Comentarios en español para claridad
- Sintaxis ES2023 (campos privados, static blocks)
- Código modular y reutilizable
- Principios SOLID aplicados
- Clean Code en toda la implementación

---

_Proyecto desarrollado como parte del programa de formación SENA - 2024_
