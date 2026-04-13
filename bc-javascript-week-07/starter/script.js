// Sistema de Gestión AgroTech – Sets y Maps
// Autor: Javier Pérez | Week-07 | Set · Map · WeakMap · WeakSet
// 📌 Completa cada TODO

// ─────────────────────────────────────────────
// 1. ESTRUCTURAS DE DATOS PRINCIPALES
// ─────────────────────────────────────────────

// TODO: Crea un Map para almacenar equipos por ID
// equipmentMap: Map<string, { id, name, type, region }>
const equipmentMap = null; // TODO: new Map()

// TODO: Crea un Set para almacenar IDs únicos registrados
const registeredIds = null; // TODO: new Set()

// TODO: Crea un Set para las categorías del sistema
const categoriesA = null; // TODO: new Set(['sensor', 'drone', 'tractor'])
const categoriesB = null; // TODO: new Set(['drone', 'tractor', 'irrigacion'])

// TODO: Crea un WeakSet para rastrear equipos activos (objetos)
const activeEquipment = null; // TODO: new WeakSet()

// TODO: Crea un WeakMap para cachear cálculos de eficiencia
const efficiencyCache = null; // TODO: new WeakMap()

// ─────────────────────────────────────────────
// 2. GESTIÓN DE EQUIPOS (Map + Set)
// ─────────────────────────────────────────────

/**
 * Registra un nuevo equipo en el sistema.
 * Usa registeredIds (Set) para evitar duplicados.
 * Usa equipmentMap (Map) para almacenar los datos.
 * @returns {{ success: boolean, message: string }}
 */
function registerEquipment({ id, name, type, region }) {
  // TODO:
  // 1. Verifica que todos los campos estén presentes
  // 2. Verifica con registeredIds.has(id) que no exista
  // 3. Crea el objeto equipo
  // 4. Agrega el id a registeredIds con .add()
  // 5. Guarda en equipmentMap con .set(id, equipo)
  // 6. Retorna { success: true, message: '...' }
}

/**
 * Elimina un equipo del sistema.
 * Debe eliminarlo del Map y del Set de IDs.
 */
function removeEquipment(id) {
  // TODO: equipmentMap.delete(id) y registeredIds.delete(id)
}

/**
 * Retorna todos los equipos como array.
 */
function getAllEquipment() {
  // TODO: return [...equipmentMap.values()]
}

// ─────────────────────────────────────────────
// 3. OPERACIONES DE CONJUNTOS (Set)
// ─────────────────────────────────────────────

/**
 * Unión de dos Sets: todos los elementos de A y B.
 * @returns {Set}
 */
function union(setA, setB) {
  // TODO: return new Set([...setA, ...setB])
}

/**
 * Intersección: elementos que están en A Y en B.
 * @returns {Set}
 */
function intersection(setA, setB) {
  // TODO: return new Set([...setA].filter(x => setB.has(x)))
}

/**
 * Diferencia: elementos que están en A pero NO en B.
 * @returns {Set}
 */
function difference(setA, setB) {
  // TODO: return new Set([...setA].filter(x => !setB.has(x)))
}

// ─────────────────────────────────────────────
// 4. ESTADOS ACTIVOS (WeakSet)
// ─────────────────────────────────────────────

/**
 * Activa un equipo (lo agrega al WeakSet).
 * El objeto equipo debe ser una referencia del Map.
 */
function activateEquipment(id) {
  // TODO: Obtén el objeto del equipmentMap con .get(id)
  // Agrega al activeEquipment WeakSet con .add(objeto)
}

/**
 * Desactiva un equipo (lo elimina del WeakSet).
 */
function deactivateEquipment(id) {
  // TODO: Obtén el objeto y llama activeEquipment.delete(objeto)
}

/**
 * Verifica si un equipo está activo.
 * @returns {boolean}
 */
function isActive(id) {
  // TODO: const eq = equipmentMap.get(id); return activeEquipment.has(eq)
}

// ─────────────────────────────────────────────
// 5. CACHÉ DE CÁLCULOS (WeakMap)
// ─────────────────────────────────────────────

/**
 * Calcula el índice de eficiencia de un equipo.
 * Si ya fue calculado, retorna el valor cacheado.
 * Fórmula simulada: (nombre.length * 7 + región.length * 3) % 100
 * @returns {{ value: number, fromCache: boolean }}
 */
function getEfficiencyIndex(id) {
  // TODO:
  // 1. Obtén el objeto equipo del Map
  // 2. Verifica si efficiencyCache.has(equipo)
  //    - Si sí: retorna { value: efficiencyCache.get(equipo), fromCache: true }
  // 3. Calcula el índice con la fórmula
  // 4. Guarda en efficiencyCache.set(equipo, valor)
  // 5. Retorna { value, fromCache: false }
}

// ─────────────────────────────────────────────
// 6. CONSOLA DE OPERACIONES
// ─────────────────────────────────────────────

function log(msg, type = 'info') {
  const box  = document.getElementById('console-log');
  const line = document.createElement('div');
  line.className = `log-line ${type}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
}

// ─────────────────────────────────────────────
// 7. RENDER
// ─────────────────────────────────────────────

function renderEquipment() {
  const list  = document.getElementById('eq-list');
  const count = document.getElementById('eq-count');
  const sel   = document.getElementById('cache-eq-select');
  const all   = getAllEquipment();

  count.textContent = all.length;

  list.innerHTML = all.map(eq => `
    <div class="eq-card ${isActive(eq.id) ? 'active' : ''}" data-id="${eq.id}">
      <div>${eq.name} ${isActive(eq.id) ? '⚡' : ''}</div>
      <div class="eq-id">${eq.id} · ${eq.type} · ${eq.region}</div>
    </div>
  `).join('');

  // Actualizar selector de caché
  sel.innerHTML = '<option value="">Selecciona equipo…</option>' +
    all.map(eq => `<option value="${eq.id}">${eq.name}</option>`).join('');

  renderActiveList();
}

function renderActiveList() {
  const list = document.getElementById('active-list');
  const all  = getAllEquipment();
  list.innerHTML = all.map(eq => `
    <div class="eq-card ${isActive(eq.id) ? 'active' : ''}" data-id="${eq.id}" id="active-${eq.id}">
      <div>${eq.name} ${isActive(eq.id) ? '⚡ Activo' : '○ Inactivo'}</div>
      <div class="eq-id">${eq.id}</div>
    </div>
  `).join('');

  list.querySelectorAll('.eq-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      if (isActive(id)) {
        deactivateEquipment(id);
        log(`Equipo ${id} desactivado`, 'warn');
      } else {
        activateEquipment(id);
        log(`Equipo ${id} activado ⚡`);
      }
      renderEquipment();
    });
  });
}

function renderCategories() {
  const list = document.getElementById('cat-list');
  list.innerHTML = [...categoriesA].map(cat => `
    <span class="tag">
      ${cat}
      <button data-cat="${cat}" title="Eliminar">×</button>
    </span>
  `).join('');
  list.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      categoriesA.delete(btn.dataset.cat);
      log(`Categoría "${btn.dataset.cat}" eliminada`, 'warn');
      renderCategories();
    });
  });
}

// ─────────────────────────────────────────────
// 8. INICIALIZACIÓN
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Datos iniciales
  [
    { id: 'EQ-001', name: 'Sensor Humedad SH-200', type: 'sensor', region: 'Cundinamarca' },
    { id: 'EQ-002', name: 'Drone DJI Agras T40',   type: 'drone',  region: 'Boyacá' },
    { id: 'EQ-003', name: 'Tractor John Deere 6M', type: 'tractor',region: 'Tolima' }
  ].forEach(eq => registerEquipment(eq));

  renderEquipment();
  renderCategories();

  // Registrar equipo
  document.getElementById('btn-add-eq').addEventListener('click', () => {
    const id     = document.getElementById('eq-id').value.trim();
    const name   = document.getElementById('eq-name').value.trim();
    const type   = document.getElementById('eq-type').value;
    const region = document.getElementById('eq-region').value.trim();
    const result = registerEquipment({ id, name, type, region });
    const fb = document.getElementById('eq-feedback');
    fb.textContent = result?.message ?? '';
    fb.style.color = result?.success ? 'var(--green)' : '#c62828';
    if (result?.success) {
      ['eq-id','eq-name','eq-region'].forEach(f => document.getElementById(f).value = '');
      document.getElementById('eq-type').value = '';
      log(`Equipo registrado: ${name} (${id})`);
      renderEquipment();
    }
  });

  // Agregar categoría
  document.getElementById('btn-add-cat').addEventListener('click', () => {
    const val = document.getElementById('cat-input').value.trim().toLowerCase();
    if (val) {
      categoriesA.add(val);
      document.getElementById('cat-input').value = '';
      log(`Categoría "${val}" agregada`);
      renderCategories();
    }
  });

  // Operaciones de conjuntos
  document.getElementById('btn-union').addEventListener('click', () => {
    const result = union(categoriesA, categoriesB);
    document.getElementById('ops-result').textContent = `A∪B = { ${[...result].join(', ')} }`;
    log(`Unión: { ${[...result].join(', ')} }`);
  });
  document.getElementById('btn-inter').addEventListener('click', () => {
    const result = intersection(categoriesA, categoriesB);
    document.getElementById('ops-result').textContent = `A∩B = { ${[...result].join(', ')} }`;
    log(`Intersección: { ${[...result].join(', ')} }`);
  });
  document.getElementById('btn-diff').addEventListener('click', () => {
    const result = difference(categoriesA, categoriesB);
    document.getElementById('ops-result').textContent = `A-B = { ${[...result].join(', ')} }`;
    log(`Diferencia: { ${[...result].join(', ')} }`);
  });

  // Caché
  document.getElementById('btn-calc').addEventListener('click', () => {
    const id = document.getElementById('cache-eq-select').value;
    if (!id) return;
    const { value, fromCache } = getEfficiencyIndex(id);
    const eq = equipmentMap.get(id);
    document.getElementById('cache-result').innerHTML =
      `<strong>${eq.name}</strong>: Índice de eficiencia = <strong>${value}</strong> ` +
      `<em>(${fromCache ? '⚡ desde caché' : '🔄 calculado'})</em>`;
    log(`Eficiencia ${eq.name}: ${value} ${fromCache ? '[caché]' : '[nuevo]'}`);
  });

  // Limpiar consola
  document.getElementById('btn-clear-log').addEventListener('click', () => {
    document.getElementById('console-log').innerHTML = '';
  });

  log('Sistema AgroTech iniciado ✅');
});
