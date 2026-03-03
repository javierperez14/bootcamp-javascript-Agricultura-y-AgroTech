# 📐 Diagrama de Clases - Sistema AgroTech

## Jerarquía Completa de Clases

```
┌─────────────────────────────────────────────────────────────┐
│                  AgriculturalEquipment                      │
│                   (Clase Abstracta)                         │
├─────────────────────────────────────────────────────────────┤
│ Campos Privados:                                            │
│  #id: string                                                │
│  #name: string                                              │
│  #active: boolean                                           │
│  #location: string                                          │
│  #dateCreated: Date                                         │
├─────────────────────────────────────────────────────────────┤
│ Métodos:                                                    │
│  + constructor(name, location)                              │
│  + get id(): string                                         │
│  + get name(): string                                       │
│  + get isActive(): boolean                                  │
│  + get location(): string                                   │
│  + get dateCreated(): Date                                  │
│  + set location(value): void                                │
│  + activate(): void                                         │
│  + deactivate(): void                                       │
│  + getInfo(): object (abstracto)                            │
│  + getType(): string                                        │
│  + getIcon(): string                                        │
│  - #generateId(): string                                    │
└─────────────────────────────────────────────────────────────┘
                            △
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        │                   │                   │
┌───────▼────────┐  ┌───────▼────────┐  ┌──────▼─────────┐
│    Tractor     │  │     Sensor     │  │     Drone      │
├────────────────┤  ├────────────────┤  ├────────────────┤
│ #horsepower    │  │ #sensorType    │  │ #maxFlightTime │
│ #fuelType      │  │ #measurementU. │  │ #cameraRes.    │
│ #hoursWorked   │  │ #lastReading   │  │ #flightHours   │
│                │  │ #batteryLevel  │  │ #lastMaint.    │
├────────────────┤  ├────────────────┤  ├────────────────┤
│ +addWorkHours()│  │ +updateReading │  │ +addFlightHrs()│
│ +getInfo()     │  │ +updateBattery │  │ +performMaint()│
│ +getIcon()🚜   │  │ +getInfo()     │  │ +getInfo()     │
│                │  │ +getIcon()📡   │  │ +getIcon()🚁   │
└────────────────┘  └────────────────┘  └────────────────┘
```

---

## Jerarquía de Usuarios

```
┌─────────────────────────────────────────────────────────────┐
│                         Person                              │
│                     (Clase Base)                            │
├─────────────────────────────────────────────────────────────┤
│ Campos Privados:                                            │
│  #id: string                                                │
│  #name: string                                              │
│  #email: string                                             │
│  #registrationDate: Date                                    │
├─────────────────────────────────────────────────────────────┤
│ Métodos:                                                    │
│  + constructor(name, email)                                 │
│  + get id(): string                                         │
│  + get name(): string                                       │
│  + get email(): string                                      │
│  + get registrationDate(): Date                             │
│  + set email(value): void (con validación)                  │
│  - #generateId(): string                                    │
└─────────────────────────────────────────────────────────────┘
                            △
                            │
                ┌───────────┴───────────┐
                │                       │
        ┌───────▼────────┐      ┌──────▼──────────┐
        │    Operator    │      │ Administrator   │
        ├────────────────┤      ├─────────────────┤
        │ #certifications│      │ #accessLevel    │
        │ #assignedEquip.│      │ #department     │
        ├────────────────┤      ├─────────────────┤
        │ +addCert()     │      │ +canModify()    │
        │ +assignEquip() │      │ +canDelete()    │
        │ +unassignEquip │      │                 │
        └────────────────┘      └─────────────────┘
```

---

## Sistema Principal

```
┌─────────────────────────────────────────────────────────────┐
│                     AgroTechSystem                          │
│                   (Clase Principal)                         │
├─────────────────────────────────────────────────────────────┤
│ Campos Privados:                                            │
│  #equipment: Array<AgriculturalEquipment>                   │
│  #users: Array<Person>                                      │
│  #transactions: Array<Transaction>                          │
├─────────────────────────────────────────────────────────────┤
│ Campos Estáticos:                                           │
│  static VERSION = '1.0.0'                                   │
│  static MAX_EQUIPMENT = 1000                                │
│  static SUPPORTED_TYPES = ['Tractor','Sensor','Drone']      │
├─────────────────────────────────────────────────────────────┤
│ Métodos CRUD:                                               │
│  + addEquipment(equipment): Equipment                       │
│  + removeEquipment(id): Equipment                           │
│  + findEquipment(id): Equipment                             │
│  + getAllEquipment(): Array<Equipment>                      │
├─────────────────────────────────────────────────────────────┤
│ Métodos de Búsqueda:                                        │
│  + searchByName(query): Array<Equipment>                    │
│  + filterByType(type): Array<Equipment>                     │
│  + filterByStatus(active): Array<Equipment>                 │
├─────────────────────────────────────────────────────────────┤
│ Métodos de Usuarios:                                        │
│  + addUser(user): User                                      │
│  + getAllUsers(): Array<User>                               │
├─────────────────────────────────────────────────────────────┤
│ Métodos de Estadísticas:                                    │
│  + getStats(): object                                       │
│  + getTransactions(): Array<Transaction>                    │
│  - #logTransaction(action, id, type): void                  │
├─────────────────────────────────────────────────────────────┤
│ Métodos Estáticos:                                          │
│  + static getSystemInfo(): object                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Relaciones entre Clases

```
┌──────────────────┐
│ AgroTechSystem   │
└────────┬─────────┘
         │
         │ contiene (1:N)
         │
    ┌────▼────────────────────────┐
    │                             │
    │                             │
┌───▼──────────────┐    ┌─────────▼────────┐
│ AgriculturalEquip│    │     Person       │
│   (abstracta)    │    │                  │
└───┬──────────────┘    └─────────┬────────┘
    │                             │
    │ hereda                      │ hereda
    │                             │
┌───▼────┬────────┬────┐    ┌────▼────┬──────────┐
│Tractor │ Sensor │Drone│    │Operator │Admin     │
└────────┴────────┴─────┘    └─────────┴──────────┘
```

---

## Flujo de Datos

```
┌─────────────┐
│   Usuario   │
│   (HTML)    │
└──────┬──────┘
       │
       │ Interacción
       │
┌──────▼──────────────────────────────────────────┐
│           Capa de Presentación (DOM)            │
│  - Formularios                                  │
│  - Eventos                                      │
│  - Renderizado                                  │
└──────┬──────────────────────────────────────────┘
       │
       │ Llamadas a métodos
       │
┌──────▼──────────────────────────────────────────┐
│         AgroTechSystem (Lógica)                 │
│  - Validación                                   │
│  - CRUD                                         │
│  - Filtros                                      │
│  - Estadísticas                                 │
└──────┬──────────────────────────────────────────┘
       │
       │ Gestiona
       │
┌──────▼──────────────────────────────────────────┐
│    Instancias de Clases (Datos)                │
│  - Tractor                                      │
│  - Sensor                                       │
│  - Drone                                        │
│  - Operator                                     │
│  - Administrator                                │
└─────────────────────────────────────────────────┘
```

---

## Ejemplo de Instanciación

```javascript
// 1. Crear el sistema
const system = new AgroTechSystem();

// 2. Crear usuarios
const admin = new Administrator(
    'Juan Pérez',
    'juan@agrotech.com',
    'full',
    'Operations'
);

const operator = new Operator(
    'María García',
    'maria@agrotech.com',
    ['Tractor', 'Drone']
);

// 3. Agregar usuarios al sistema
system.addUser(admin);
system.addUser(operator);

// 4. Crear equipos
const tractor = new Tractor(
    'Tractor John Deere 6M',
    'Sector A',
    120,
    'Diesel'
);

const sensor = new Sensor(
    'Sensor Humedad SH-01',
    'Sector B',
    'Humedad',
    '%'
);

const drone = new Drone(
    'Drone DJI Agras T30',
    'Hangar Principal',
    45,
    '4K'
);

// 5. Agregar equipos al sistema
system.addEquipment(tractor);
system.addEquipment(sensor);
system.addEquipment(drone);

// 6. Usar métodos específicos
tractor.addWorkHours(8);
sensor.updateReading(65);
drone.addFlightHours(2);

// 7. Obtener estadísticas
const stats = system.getStats();
console.log(stats);
```

---

## Principios SOLID Aplicados

### 1. Single Responsibility Principle (SRP)
- Cada clase tiene una única responsabilidad
- `Tractor` solo maneja datos de tractores
- `AgroTechSystem` solo gestiona el sistema

### 2. Open/Closed Principle (OCP)
- Clases abiertas para extensión (herencia)
- Cerradas para modificación (campos privados)

### 3. Liskov Substitution Principle (LSP)
- Cualquier clase derivada puede sustituir a la base
- `Tractor`, `Sensor`, `Drone` son intercambiables

### 4. Interface Segregation Principle (ISP)
- Métodos específicos en cada clase
- No se fuerzan métodos innecesarios

### 5. Dependency Inversion Principle (DIP)
- Sistema depende de abstracciones (`AgriculturalEquipment`)
- No de implementaciones concretas

---

## Patrones de Diseño Utilizados

### 1. Factory Pattern (implícito)
```javascript
// El sistema actúa como factory
system.addEquipment(new Tractor(...));
system.addEquipment(new Sensor(...));
```

### 2. Template Method Pattern
```javascript
// Método abstracto getInfo() implementado en cada clase
class AgriculturalEquipment {
    getInfo() { throw new Error('Debe implementarse'); }
}
```

### 3. Strategy Pattern (implícito)
```javascript
// Diferentes estrategias de filtrado
system.filterByType('Tractor');
system.filterByStatus(true);
system.searchByName('John');
```

---

_Diagrama de Clases - Sistema AgroTech POO_
