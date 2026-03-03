// ============================================
// CLASE BASE ABSTRACTA: AgriculturalEquipment
// ============================================

class AgriculturalEquipment {
    // Campos privados obligatorios
    #id;
    #name;
    #active;
    #location;
    #dateCreated;

    constructor(name, location) {
        if (new.target === AgriculturalEquipment) {
            throw new Error('AgriculturalEquipment es una clase abstracta y no puede ser instanciada directamente');
        }

        this.#id = this.#generateId();
        this.#name = name;
        this.#location = location;
        this.#active = true;
        this.#dateCreated = new Date();
    }

    // Generador de ID único
    #generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    // Getters obligatorios
    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get isActive() {
        return this.#active;
    }

    get location() {
        return this.#location;
    }

    get dateCreated() {
        return this.#dateCreated;
    }

    // Setter con validación
    set location(value) {
        if (!value || value.trim() === '') {
            throw new Error('La ubicación no puede estar vacía');
        }
        this.#location = value.trim();
    }

    // Métodos de estado
    activate() {
        this.#active = true;
    }

    deactivate() {
        this.#active = false;
    }

    // Método abstracto - debe sobrescribirse
    getInfo() {
        throw new Error('El método getInfo() debe ser implementado en las clases derivadas');
    }

    // Método para obtener el tipo
    getType() {
        return this.constructor.name;
    }

    // Método para obtener ícono según tipo
    getIcon() {
        return '🌱';
    }
}

// ============================================
// CLASE DERIVADA 1: Tractor
// ============================================

class Tractor extends AgriculturalEquipment {
    #horsepower;
    #fuelType;
    #hoursWorked;

    constructor(name, location, horsepower, fuelType) {
        super(name, location);
        this.#horsepower = horsepower;
        this.#fuelType = fuelType;
        this.#hoursWorked = 0;
    }

    get horsepower() {
        return this.#horsepower;
    }

    get fuelType() {
        return this.#fuelType;
    }

    get hoursWorked() {
        return this.#hoursWorked;
    }

    // Método específico
    addWorkHours(hours) {
        if (hours > 0) {
            this.#hoursWorked += hours;
        }
    }

    // Implementación del método abstracto
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            type: this.getType(),
            location: this.location,
            active: this.isActive,
            horsepower: this.#horsepower,
            fuelType: this.#fuelType,
            hoursWorked: this.#hoursWorked,
            dateCreated: this.dateCreated
        };
    }

    getIcon() {
        return '🚜';
    }
}

// ============================================
// CLASE DERIVADA 2: Sensor (IoT)
// ============================================

class Sensor extends AgriculturalEquipment {
    #sensorType;
    #measurementUnit;
    #lastReading;
    #batteryLevel;

    constructor(name, location, sensorType, measurementUnit) {
        super(name, location);
        this.#sensorType = sensorType;
        this.#measurementUnit = measurementUnit;
        this.#lastReading = null;
        this.#batteryLevel = 100;
    }

    get sensorType() {
        return this.#sensorType;
    }

    get measurementUnit() {
        return this.#measurementUnit;
    }

    get lastReading() {
        return this.#lastReading;
    }

    get batteryLevel() {
        return this.#batteryLevel;
    }

    // Métodos específicos
    updateReading(value) {
        this.#lastReading = {
            value,
            timestamp: new Date()
        };
    }

    updateBattery(level) {
        if (level >= 0 && level <= 100) {
            this.#batteryLevel = level;
        }
    }

    // Implementación del método abstracto
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            type: this.getType(),
            location: this.location,
            active: this.isActive,
            sensorType: this.#sensorType,
            measurementUnit: this.#measurementUnit,
            lastReading: this.#lastReading,
            batteryLevel: this.#batteryLevel,
            dateCreated: this.dateCreated
        };
    }

    getIcon() {
        return '📡';
    }
}

// ============================================
// CLASE DERIVADA 3: Drone
// ============================================

class Drone extends AgriculturalEquipment {
    #maxFlightTime;
    #cameraResolution;
    #flightHours;
    #lastMaintenance;

    constructor(name, location, maxFlightTime, cameraResolution) {
        super(name, location);
        this.#maxFlightTime = maxFlightTime;
        this.#cameraResolution = cameraResolution;
        this.#flightHours = 0;
        this.#lastMaintenance = new Date();
    }

    get maxFlightTime() {
        return this.#maxFlightTime;
    }

    get cameraResolution() {
        return this.#cameraResolution;
    }

    get flightHours() {
        return this.#flightHours;
    }

    get lastMaintenance() {
        return this.#lastMaintenance;
    }

    // Métodos específicos
    addFlightHours(hours) {
        if (hours > 0) {
            this.#flightHours += hours;
        }
    }

    performMaintenance() {
        this.#lastMaintenance = new Date();
        this.#flightHours = 0;
    }

    // Implementación del método abstracto
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            type: this.getType(),
            location: this.location,
            active: this.isActive,
            maxFlightTime: this.#maxFlightTime,
            cameraResolution: this.#cameraResolution,
            flightHours: this.#flightHours,
            lastMaintenance: this.#lastMaintenance,
            dateCreated: this.dateCreated
        };
    }

    getIcon() {
        return '🚁';
    }
}

// ============================================
// CLASE BASE: Person
// ============================================

class Person {
    #id;
    #name;
    #email;
    #registrationDate;

    constructor(name, email) {
        this.#id = this.#generateId();
        this.#name = name;
        this.#email = email;
        this.#registrationDate = new Date();
    }

    #generateId() {
        return `USR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get email() {
        return this.#email;
    }

    get registrationDate() {
        return this.#registrationDate;
    }

    set email(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error('Formato de email inválido');
        }
        this.#email = value;
    }
}

// ============================================
// CLASE DE ROL 1: Operator
// ============================================

class Operator extends Person {
    #certifications;
    #assignedEquipment;

    constructor(name, email, certifications = []) {
        super(name, email);
        this.#certifications = certifications;
        this.#assignedEquipment = [];
    }

    get certifications() {
        return [...this.#certifications];
    }

    get assignedEquipment() {
        return [...this.#assignedEquipment];
    }

    addCertification(cert) {
        if (!this.#certifications.includes(cert)) {
            this.#certifications.push(cert);
        }
    }

    assignEquipment(equipmentId) {
        if (!this.#assignedEquipment.includes(equipmentId)) {
            this.#assignedEquipment.push(equipmentId);
        }
    }

    unassignEquipment(equipmentId) {
        this.#assignedEquipment = this.#assignedEquipment.filter(id => id !== equipmentId);
    }
}

// ============================================
// CLASE DE ROL 2: Administrator
// ============================================

class Administrator extends Person {
    #accessLevel;
    #department;

    constructor(name, email, accessLevel = 'full', department = 'Operations') {
        super(name, email);
        this.#accessLevel = accessLevel;
        this.#department = department;
    }

    get accessLevel() {
        return this.#accessLevel;
    }

    get department() {
        return this.#department;
    }

    set accessLevel(level) {
        const validLevels = ['full', 'limited', 'read-only'];
        if (validLevels.includes(level)) {
            this.#accessLevel = level;
        }
    }

    canModify() {
        return this.#accessLevel === 'full';
    }

    canDelete() {
        return this.#accessLevel === 'full';
    }
}

// ============================================
// CLASE PRINCIPAL: AgroTechSystem
// ============================================

class AgroTechSystem {
    #equipment = [];
    #users = [];
    #transactions = [];

    // Bloque estático para configuración
    static {
        this.VERSION = '1.0.0';
        this.MAX_EQUIPMENT = 1000;
        this.SUPPORTED_TYPES = ['Tractor', 'Sensor', 'Drone'];
    }

    // Métodos CRUD para equipos
    addEquipment(equipment) {
        if (this.#equipment.length >= AgroTechSystem.MAX_EQUIPMENT) {
            throw new Error('Se alcanzó el límite máximo de equipos');
        }

        this.#equipment.push(equipment);
        this.#logTransaction('add', equipment.id, equipment.getType());
        return equipment;
    }

    removeEquipment(id) {
        const index = this.#equipment.findIndex(eq => eq.id === id);
        if (index !== -1) {
            const removed = this.#equipment.splice(index, 1)[0];
            this.#logTransaction('remove', id, removed.getType());
            return removed;
        }
        return null;
    }

    findEquipment(id) {
        return this.#equipment.find(eq => eq.id === id);
    }

    getAllEquipment() {
        return [...this.#equipment];
    }

    // Métodos de búsqueda y filtrado
    searchByName(query) {
        const lowerQuery = query.toLowerCase();
        return this.#equipment.filter(eq => 
            eq.name.toLowerCase().includes(lowerQuery)
        );
    }

    filterByType(type) {
        return this.#equipment.filter(eq => eq.getType() === type);
    }

    filterByStatus(active) {
        return this.#equipment.filter(eq => eq.isActive === active);
    }

    // Métodos para usuarios
    addUser(user) {
        this.#users.push(user);
        return user;
    }

    getAllUsers() {
        return [...this.#users];
    }

    // Estadísticas
    getStats() {
        const total = this.#equipment.length;
        const active = this.#equipment.filter(eq => eq.isActive).length;
        const inactive = total - active;

        const byType = {};
        AgroTechSystem.SUPPORTED_TYPES.forEach(type => {
            byType[type] = this.#equipment.filter(eq => eq.getType() === type).length;
        });

        return {
            total,
            active,
            inactive,
            byType,
            users: this.#users.length,
            transactions: this.#transactions.length
        };
    }

    // Registro de transacciones
    #logTransaction(action, equipmentId, equipmentType) {
        this.#transactions.push({
            id: `TXN-${Date.now()}`,
            action,
            equipmentId,
            equipmentType,
            timestamp: new Date()
        });
    }

    getTransactions() {
        return [...this.#transactions];
    }

    // Método estático de utilidad
    static getSystemInfo() {
        return {
            version: this.VERSION,
            maxEquipment: this.MAX_EQUIPMENT,
            supportedTypes: this.SUPPORTED_TYPES
        };
    }
}

// ============================================
// INICIALIZACIÓN Y MANEJO DEL DOM
// ============================================

// Instancia global del sistema
const system = new AgroTechSystem();

// Referencias del DOM
const equipmentForm = document.getElementById('equipmentForm');
const equipmentTypeSelect = document.getElementById('equipmentType');
const specificFieldsDiv = document.getElementById('specificFields');
const equipmentList = document.getElementById('equipmentList');
const filterType = document.getElementById('filterType');
const filterStatus = document.getElementById('filterStatus');
const searchQuery = document.getElementById('searchQuery');
const detailsModal = document.getElementById('detailsModal');
const modalBody = document.getElementById('modalBody');

// Crear usuarios de ejemplo
const admin = new Administrator('Juan Pérez', 'juan@agrotech.com', 'full', 'Operations');
const operator = new Operator('María García', 'maria@agrotech.com', ['Tractor', 'Drone']);
system.addUser(admin);
system.addUser(operator);

// Crear equipos de ejemplo
const tractor1 = new Tractor('Tractor John Deere 6M', 'Sector A', 120, 'Diesel');
const sensor1 = new Sensor('Sensor Humedad SH-01', 'Sector B', 'Humedad', '%');
const drone1 = new Drone('Drone DJI Agras T30', 'Hangar Principal', 45, '4K');

system.addEquipment(tractor1);
system.addEquipment(sensor1);
system.addEquipment(drone1);

// Evento: cambio de tipo de equipo
equipmentTypeSelect.addEventListener('change', (e) => {
    const type = e.target.value;
    renderSpecificFields(type);
});

// Función para renderizar campos específicos según tipo
function renderSpecificFields(type) {
    specificFieldsDiv.innerHTML = '';

    if (type === 'Tractor') {
        specificFieldsDiv.innerHTML = `
            <div class="form-group">
                <label for="horsepower">Caballos de Fuerza (HP)</label>
                <input type="number" id="horsepower" required min="1" placeholder="Ej: 120">
            </div>
            <div class="form-group">
                <label for="fuelType">Tipo de Combustible</label>
                <select id="fuelType" required>
                    <option value="Diesel">Diesel</option>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Eléctrico">Eléctrico</option>
                </select>
            </div>
        `;
    } else if (type === 'Sensor') {
        specificFieldsDiv.innerHTML = `
            <div class="form-group">
                <label for="sensorType">Tipo de Sensor</label>
                <select id="sensorType" required>
                    <option value="Humedad">Humedad</option>
                    <option value="Temperatura">Temperatura</option>
                    <option value="pH">pH del Suelo</option>
                    <option value="Nutrientes">Nutrientes</option>
                </select>
            </div>
            <div class="form-group">
                <label for="measurementUnit">Unidad de Medida</label>
                <input type="text" id="measurementUnit" required placeholder="Ej: %, °C">
            </div>
        `;
    } else if (type === 'Drone') {
        specificFieldsDiv.innerHTML = `
            <div class="form-group">
                <label for="maxFlightTime">Tiempo Máximo de Vuelo (min)</label>
                <input type="number" id="maxFlightTime" required min="1" placeholder="Ej: 45">
            </div>
            <div class="form-group">
                <label for="cameraResolution">Resolución de Cámara</label>
                <select id="cameraResolution" required>
                    <option value="HD">HD (720p)</option>
                    <option value="Full HD">Full HD (1080p)</option>
                    <option value="4K">4K (2160p)</option>
                </select>
            </div>
        `;
    }
}

// Evento: envío del formulario
equipmentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = equipmentTypeSelect.value;
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;

    let equipment;

    try {
        if (type === 'Tractor') {
            const horsepower = parseInt(document.getElementById('horsepower').value);
            const fuelType = document.getElementById('fuelType').value;
            equipment = new Tractor(name, location, horsepower, fuelType);
        } else if (type === 'Sensor') {
            const sensorType = document.getElementById('sensorType').value;
            const measurementUnit = document.getElementById('measurementUnit').value;
            equipment = new Sensor(name, location, sensorType, measurementUnit);
        } else if (type === 'Drone') {
            const maxFlightTime = parseInt(document.getElementById('maxFlightTime').value);
            const cameraResolution = document.getElementById('cameraResolution').value;
            equipment = new Drone(name, location, maxFlightTime, cameraResolution);
        }

        system.addEquipment(equipment);
        equipmentForm.reset();
        specificFieldsDiv.innerHTML = '';
        renderEquipment();
        updateStats();
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

// Función para renderizar equipos
function renderEquipment() {
    let equipment = system.getAllEquipment();

    // Aplicar filtros
    const typeFilter = filterType.value;
    const statusFilter = filterStatus.value;
    const searchTerm = searchQuery.value.trim();

    if (typeFilter) {
        equipment = equipment.filter(eq => eq.getType() === typeFilter);
    }

    if (statusFilter === 'active') {
        equipment = equipment.filter(eq => eq.isActive);
    } else if (statusFilter === 'inactive') {
        equipment = equipment.filter(eq => !eq.isActive);
    }

    if (searchTerm) {
        equipment = equipment.filter(eq => 
            eq.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    equipmentList.innerHTML = equipment.map(eq => {
        const info = eq.getInfo();
        const badgeClass = `badge-${eq.getType().toLowerCase()}`;
        const statusClass = eq.isActive ? 'status-active' : 'status-inactive';
        const statusText = eq.isActive ? 'Activo' : 'Inactivo';
        const cardClass = eq.isActive ? '' : 'inactive';

        return `
            <div class="equipment-card ${cardClass}">
                <div class="equipment-header">
                    <span class="equipment-icon">${eq.getIcon()}</span>
                    <span class="equipment-badge ${badgeClass}">${eq.getType()}</span>
                </div>
                <h3 class="equipment-title">${eq.name}</h3>
                <div class="equipment-info">
                    <p><strong>Ubicación:</strong> ${eq.location}</p>
                    <p><strong>Estado:</strong> <span class="status-badge ${statusClass}">${statusText}</span></p>
                </div>
                <div class="equipment-actions">
                    <button class="btn btn-secondary btn-sm" onclick="showDetails('${eq.id}')">Ver Detalles</button>
                    <button class="btn ${eq.isActive ? 'btn-danger' : 'btn-primary'} btn-sm" 
                            onclick="toggleStatus('${eq.id}')">
                        ${eq.isActive ? 'Desactivar' : 'Activar'}
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteEquipment('${eq.id}')">Eliminar</button>
                </div>
            </div>
        `;
    }).join('');
}

// Función para actualizar estadísticas
function updateStats() {
    const stats = system.getStats();
    document.getElementById('totalItems').textContent = stats.total;
    document.getElementById('activeItems').textContent = stats.active;
    document.getElementById('totalUsers').textContent = stats.users;
}

// Función para mostrar detalles
window.showDetails = (id) => {
    const equipment = system.findEquipment(id);
    if (!equipment) return;

    const info = equipment.getInfo();
    let specificInfo = '';

    if (equipment instanceof Tractor) {
        specificInfo = `
            <p><strong>Caballos de Fuerza:</strong> ${info.horsepower} HP</p>
            <p><strong>Tipo de Combustible:</strong> ${info.fuelType}</p>
            <p><strong>Horas Trabajadas:</strong> ${info.hoursWorked} hrs</p>
        `;
    } else if (equipment instanceof Sensor) {
        specificInfo = `
            <p><strong>Tipo de Sensor:</strong> ${info.sensorType}</p>
            <p><strong>Unidad de Medida:</strong> ${info.measurementUnit}</p>
            <p><strong>Nivel de Batería:</strong> ${info.batteryLevel}%</p>
            <p><strong>Última Lectura:</strong> ${info.lastReading ? info.lastReading.value : 'N/A'}</p>
        `;
    } else if (equipment instanceof Drone) {
        specificInfo = `
            <p><strong>Tiempo Máximo de Vuelo:</strong> ${info.maxFlightTime} min</p>
            <p><strong>Resolución de Cámara:</strong> ${info.cameraResolution}</p>
            <p><strong>Horas de Vuelo:</strong> ${info.flightHours} hrs</p>
            <p><strong>Último Mantenimiento:</strong> ${info.lastMaintenance.toLocaleDateString()}</p>
        `;
    }

    modalBody.innerHTML = `
        <h2>${equipment.getIcon()} ${info.name}</h2>
        <div class="detail-section">
            <h3>Información General</h3>
            <p><strong>ID:</strong> ${info.id}</p>
            <p><strong>Tipo:</strong> ${info.type}</p>
            <p><strong>Ubicación:</strong> ${info.location}</p>
            <p><strong>Estado:</strong> ${info.active ? 'Activo' : 'Inactivo'}</p>
            <p><strong>Fecha de Registro:</strong> ${info.dateCreated.toLocaleDateString()}</p>
        </div>
        <div class="detail-section">
            <h3>Especificaciones</h3>
            ${specificInfo}
        </div>
    `;

    detailsModal.classList.add('show');
};

// Función para cambiar estado
window.toggleStatus = (id) => {
    const equipment = system.findEquipment(id);
    if (!equipment) return;

    if (equipment.isActive) {
        equipment.deactivate();
    } else {
        equipment.activate();
    }

    renderEquipment();
    updateStats();
};

// Función para eliminar equipo
window.deleteEquipment = (id) => {
    if (confirm('¿Estás seguro de eliminar este equipo?')) {
        system.removeEquipment(id);
        renderEquipment();
        updateStats();
    }
};

// Cerrar modal
document.querySelector('.close').addEventListener('click', () => {
    detailsModal.classList.remove('show');
});

detailsModal.addEventListener('click', (e) => {
    if (e.target === detailsModal) {
        detailsModal.classList.remove('show');
    }
});

// Eventos de filtros
filterType.addEventListener('change', renderEquipment);
filterStatus.addEventListener('change', renderEquipment);
searchQuery.addEventListener('input', renderEquipment);

// Renderizado inicial
renderEquipment();
updateStats();

// Mostrar información del sistema en consola
console.log('Sistema AgroTech inicializado');
console.log('Información del sistema:', AgroTechSystem.getSystemInfo());
console.log('Estadísticas:', system.getStats());
