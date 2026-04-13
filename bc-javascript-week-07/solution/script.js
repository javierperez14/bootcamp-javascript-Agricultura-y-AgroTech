// Sistema de Gestión AgroTech – Sets y Maps
// Autor: Javier Pérez | Week-07 | Set · Map · WeakMap · WeakSet
// ✅ SOLUCIÓN COMPLETA

// ─────────────────────────────────────────────
// 1. ESTRUCTURAS DE DATOS
// ─────────────────────────────────────────────

const equipmentMap   = new Map();
const registeredIds  = new Set();
const categoriesA    = new Set(['sensor', 'drone', 'tractor']);
const categoriesB    = new Set(['drone', 'tractor', 'irrigacion']);
const activeEquipment = new WeakSet();
const efficiencyCache = new WeakMap();

// ─────────────────────────────────────────────
// 2. GESTIÓN DE EQUIPOS
// ─────────────────────────────────────────────

function registerEquipment({ id, name, type, region }) {
  if (!id || !name || !type || !region)
    return { success: false, message: 'Todos los campos son obligatorios.' };
  if (registeredIds.has(id))
    return { success: false, message: `El ID "${id}" ya está registrado.` };

  const equipment = { id, name, type, region };
  registeredIds.add(id);
  equipmentMap.set(id, equipment);
  return { success: true, message: `Equipo "${name}" registrado correctamente.` };
}

function removeEquipment(id) {
  equipmentMap.delete(id);
  registeredIds.delete(id);
}

function getAllEquipment() {
  return [...equipmentMap.values()];
}

// ─────────────────────────────────────────────
// 3. OPERACIONES DE CONJUNTOS
// ─────────────────────────────────────────────

const union        = (a, b) => new Set([...a, ...b]);
const intersection = (a, b) => new Set([...a].filter(x => b.has(x)));
const difference   = (a, b) => new Set([...a].filter(x => !b.has(x)));

// ─────────────────────────────────────────────
// 4. ESTADOS ACTIVOS (WeakSet)
// ─────────────────────────────────────────────

function activateEquipment(id) {
  const eq = equipmentMap.get(id);
  if (eq) activeEquipment.add(eq);
}

function deactivateEquipment(id) {
  const eq = equipmentMap.get(id);
  if (eq) activeEquipment.delete(eq);
}

function isActive(id) {
  const eq = equipmentMap.get(id);
  return eq ? activeEquipment.has(eq) : false;
}

// ─────────────────────────────────────────────
// 5. CACHÉ (WeakMap)
// ─────────────────────────────────────────────

function getEfficiencyIndex(id) {
  const eq = equipmentMap.get(id);
  if (!eq) return { value: 0, fromCache: false };

  if (efficiencyCache.has(eq))
    return { value: efficiencyCache.get(eq), fromCache: true };

  const value = (eq.name.length * 7 + eq.region.length * 3) % 100;
  efficiencyCache.set(eq, value);
  return { value, fromCache: false };
}

// ─────────────────────────────────────────────
// 6. CONSOLA
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

  sel.innerHTML = '<option value="">Selecciona equipo…</option>' +
    all.map(eq => `<option value="${eq.id}">${eq.name}</option>`).join('');

  renderActiveList();
}

function renderActiveList() {
  const list = document.getElementById('active-list');
  const all  = getAllEquipment();
  list.innerHTML = all.map(eq => `
    <div class="eq-card ${isActive(eq.id) ? 'active' : ''}" data-id="${eq.id}">
      <div>${eq.name} ${isActive(eq.id) ? '⚡ Activo' : '○ Inactivo'}</div>
      <div class="eq-id">${eq.id}</div>
    </div>
  `).join('');

  list.querySelectorAll('.eq-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      if (isActive(id)) { deactivateEquipment(id); log(`Equipo ${id} desactivado`, 'warn'); }
      else               { activateEquipment(id);   log(`Equipo ${id} activado ⚡`); }
      renderEquipment();
    });
  });
}

function renderCategories() {
  const list = document.getElementById('cat-list');
  list.innerHTML = [...categoriesA].map(cat => `
    <span class="tag">${cat}<button data-cat="${cat}" title="Eliminar">×</button></span>
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
  [
    { id: 'EQ-001', name: 'Sensor Humedad SH-200', type: 'sensor',  region: 'Cundinamarca' },
    { id: 'EQ-002', name: 'Drone DJI Agras T40',   type: 'drone',   region: 'Boyacá' },
    { id: 'EQ-003', name: 'Tractor John Deere 6M', type: 'tractor', region: 'Tolima' }
  ].forEach(eq => registerEquipment(eq));

  renderEquipment();
  renderCategories();

  document.getElementById('btn-add-eq').addEventListener('click', () => {
    const id     = document.getElementById('eq-id').value.trim();
    const name   = document.getElementById('eq-name').value.trim();
    const type   = document.getElementById('eq-type').value;
    const region = document.getElementById('eq-region').value.trim();
    const result = registerEquipment({ id, name, type, region });
    const fb = document.getElementById('eq-feedback');
    fb.textContent = result.message;
    fb.style.color = result.success ? 'var(--green)' : '#c62828';
    if (result.success) {
      ['eq-id','eq-name','eq-region'].forEach(f => document.getElementById(f).value = '');
      document.getElementById('eq-type').value = '';
      log(`Equipo registrado: ${name} (${id})`);
      renderEquipment();
    }
  });

  document.getElementById('btn-add-cat').addEventListener('click', () => {
    const val = document.getElementById('cat-input').value.trim().toLowerCase();
    if (val) {
      categoriesA.add(val);
      document.getElementById('cat-input').value = '';
      log(`Categoría "${val}" agregada`);
      renderCategories();
    }
  });

  document.getElementById('btn-union').addEventListener('click', () => {
    const r = union(categoriesA, categoriesB);
    document.getElementById('ops-result').textContent = `A∪B = { ${[...r].join(', ')} }`;
    log(`Unión: { ${[...r].join(', ')} }`);
  });
  document.getElementById('btn-inter').addEventListener('click', () => {
    const r = intersection(categoriesA, categoriesB);
    document.getElementById('ops-result').textContent = `A∩B = { ${[...r].join(', ')} }`;
    log(`Intersección: { ${[...r].join(', ')} }`);
  });
  document.getElementById('btn-diff').addEventListener('click', () => {
    const r = difference(categoriesA, categoriesB);
    document.getElementById('ops-result').textContent = `A-B = { ${[...r].join(', ')} }`;
    log(`Diferencia: { ${[...r].join(', ')} }`);
  });

  document.getElementById('btn-calc').addEventListener('click', () => {
    const id = document.getElementById('cache-eq-select').value;
    if (!id) return;
    const { value, fromCache } = getEfficiencyIndex(id);
    const eq = equipmentMap.get(id);
    document.getElementById('cache-result').innerHTML =
      `<strong>${eq.name}</strong>: Índice = <strong>${value}</strong> ` +
      `<em>(${fromCache ? '⚡ desde caché' : '🔄 calculado'})</em>`;
    log(`Eficiencia ${eq.name}: ${value} ${fromCache ? '[caché]' : '[nuevo]'}`);
  });

  document.getElementById('btn-clear-log').addEventListener('click', () => {
    document.getElementById('console-log').innerHTML = '';
  });

  log('Sistema AgroTech iniciado ✅');
});
