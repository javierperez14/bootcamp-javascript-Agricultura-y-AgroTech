// Dashboard de Análisis de Datos – AgroTech
// Autor: Javier Pérez | Week-05 | ES2023
// 📌 Completa cada TODO usando el método indicado

import { monitoringData } from './data.js';

// ─────────────────────────────────────────────
// 1. APLANAR EQUIPOS ANIDADOS
// Método requerido: flatMap()
// ─────────────────────────────────────────────

/**
 * Extrae todos los equipos de todos los registros en un array plano,
 * enriqueciendo cada equipo con datos del registro padre.
 * @param {Array} records - Array de registros de monitoreo
 * @returns {Array} Array plano de equipos con datos del registro padre
 */
const getAllEquipment = records => {
  // TODO: Usa flatMap() para aplanar record.equipment de cada registro.
  // Cada equipo debe incluir: ...eq, recordId, field, region, date, operator
  // del registro padre.
};

// ─────────────────────────────────────────────
// 2. TOTAL DE MÉTRICA POR REGISTRO
// Métodos requeridos: map() + reduce()
// ─────────────────────────────────────────────

/**
 * Calcula la suma de la métrica de todos los equipos por registro.
 * @returns {Array} Array de objetos { id, field, region, date, totalMetric }
 */
const getTotalMetricPerRecord = records => {
  // TODO: Usa map() para recorrer los registros.
  // Dentro de cada registro, usa reduce() sobre record.equipment
  // para sumar todos los eq.metric.
};

// ─────────────────────────────────────────────
// 3. TOP N EQUIPOS POR MÉTRICA
// Métodos requeridos: toSorted() (ES2023) + slice()
// ─────────────────────────────────────────────

/**
 * Retorna los N equipos con mayor valor de métrica.
 * IMPORTANTE: usa toSorted() en lugar de sort() para no mutar el array.
 * @param {number} n - Cantidad de equipos a retornar (default 5)
 * @returns {Array} Top N equipos ordenados de mayor a menor métrica
 */
const getTopEquipment = (records, n = 5) => {
  // TODO: Llama a getAllEquipment(records), luego encadena:
  // .toSorted() comparando b.metric - a.metric
  // .slice(0, n)
};

// ─────────────────────────────────────────────
// 4. AGRUPAR POR TIPO DE EQUIPO
// Método requerido: reduce()
// ─────────────────────────────────────────────

/**
 * Agrupa todos los equipos por su tipo (sensor, drone, tractor).
 * @returns {Object} { sensor: [...], drone: [...], tractor: [...] }
 */
const groupByType = records => {
  // TODO: Usa getAllEquipment(records).reduce() para construir un objeto
  // donde cada clave es eq.type y el valor es un array de equipos.
  // Usa el operador ?? para inicializar el array si no existe.
};

// ─────────────────────────────────────────────
// 5. ESTADÍSTICAS POR REGIÓN
// Métodos requeridos: reduce() anidado
// ─────────────────────────────────────────────

/**
 * Calcula el total de métrica acumulada agrupada por región.
 * @returns {Object} { Cundinamarca: 123.4, Boyacá: 98.2, ... }
 */
const getStatsByRegion = records => {
  // TODO: Usa records.reduce() para acumular por record.region.
  // Para cada registro, calcula el total de sus equipos con otro reduce()
  // sobre record.equipment sumando eq.metric.
};

// ─────────────────────────────────────────────
// 6. RANKING DE EQUIPOS
// Métodos requeridos: flatMap() + reduce() + toSorted() (ES2023)
// ─────────────────────────────────────────────

/**
 * Suma la métrica total por nombre de equipo y retorna el ranking ordenado.
 * @returns {Array} [{ name, total }, ...] ordenado de mayor a menor
 */
const getEquipmentRanking = records => {
  // TODO: Paso 1 – usa getAllEquipment(records).reduce() para acumular
  // la suma de eq.metric agrupada por eq.name en un objeto.
  // Paso 2 – convierte el objeto a array con Object.entries().map()
  // Paso 3 – ordena con .toSorted() de mayor a menor total.
};

// ─────────────────────────────────────────────
// 7. FILTRAR POR RANGO DE FECHAS
// Métodos requeridos: filter() + chaining
// ─────────────────────────────────────────────

/**
 * Filtra registros dentro de un rango de fechas (inclusive).
 * Las fechas en los datos tienen formato 'YYYY-MM-DD' (comparable como string).
 * @param {string} from - Fecha inicio 'YYYY-MM-DD'
 * @param {string} to   - Fecha fin   'YYYY-MM-DD'
 * @returns {Array} Registros cuya fecha está entre from y to
 */
const filterByDateRange = (records, from, to) => {
  // TODO: Usa records.filter() comparando record.date >= from && record.date <= to
};

// ─────────────────────────────────────────────
// 8. ESTADÍSTICAS GENERALES
// Método requerido: reduce()
// ─────────────────────────────────────────────

/**
 * Calcula total, promedio, máximo y mínimo de métricas de todos los equipos.
 * @returns {{ total, average, max, min, count }}
 */
const getGeneralStats = records => {
  // TODO: Paso 1 – obtén un array plano de métricas con getAllEquipment + map(eq => eq.metric)
  // Paso 2 – usa reduce() para calcular la suma total
  // Paso 3 – calcula average, max (Math.max), min (Math.min) y count
  // Retorna el objeto con los 5 valores redondeados a 2 decimales donde aplique
};

// ─────────────────────────────────────────────
// 9. TENDENCIA TEMPORAL POR MES
// Método requerido: reduce() agrupando por mes
// ─────────────────────────────────────────────

/**
 * Agrupa la suma de métricas por mes (YYYY-MM) para ver tendencias.
 * @returns {Object} { '2024-01': 96.6, '2024-02': 107.8, ... }
 */
const getMonthlyTrend = records => {
  // TODO: Usa records.reduce() para acumular por mes.
  // Extrae el mes con record.date.slice(0, 7) → 'YYYY-MM'
  // Suma el total de equipos de cada registro con otro reduce().
};

// ─────────────────────────────────────────────
// 10. BUSCAR ÚLTIMO ELEMENTO
// Métodos requeridos: findLast() y findLastIndex() – ES2023
// ─────────────────────────────────────────────

/**
 * Encuentra el último registro con status === 'verified'.
 * @returns {Object|undefined} El último registro verificado
 */
const getLastVerified = records => {
  // TODO: Usa records.findLast() con la condición record.status === 'verified'
};

/**
 * Retorna el índice del último registro con status === 'pending'.
 * @returns {number} Índice (-1 si no existe)
 */
const getLastPendingIndex = records => {
  // TODO: Usa records.findLastIndex() con la condición record.status === 'pending'
};

// ─────────────────────────────────────────────
// 11. MODIFICAR SIN MUTAR
// Método requerido: with() – ES2023
// ─────────────────────────────────────────────

/**
 * Retorna un NUEVO array donde el registro en `index` tiene status 'reviewed'.
 * El array original NO debe ser modificado.
 * @param {number} index - Índice del registro a actualizar
 * @returns {Array} Nuevo array con el registro actualizado
 */
const markAsReviewed = (records, index) => {
  // TODO: Usa records.with(index, nuevoElemento)
  // El nuevo elemento debe ser una copia del original con status: 'reviewed'
  // Usa spread: { ...records[index], status: 'reviewed' }
};

// ─────────────────────────────────────────────
// 12. GENERAR RANGOS CON Array.from()
// ─────────────────────────────────────────────

/**
 * Genera los 12 meses del año como etiquetas 'YYYY-MM'.
 * @param {number} year - Año (ej: 2024)
 * @returns {string[]} ['2024-01', '2024-02', ..., '2024-12']
 */
const generateMonthLabels = year => {
  // TODO: Usa Array.from({ length: 12 }, (_, i) => ...)
  // Formatea el mes con String(i + 1).padStart(2, '0')
  // Retorna `${year}-${month}`
};

/**
 * Obtiene las categorías únicas de todos los equipos.
 * @returns {string[]} Array de categorías sin duplicados
 */
const getUniqueCategories = records => {
  // TODO: Usa Array.from(new Set(...))
  // Dentro del Set, mapea getAllEquipment(records) a eq.category
};

// ─────────────────────────────────────────────
// RENDER – DASHBOARD UI
// (No modificar esta sección)
// ─────────────────────────────────────────────

/** Formatea número con 2 decimales */
const fmt = n => Number(n).toFixed(2);

function renderGeneralStats() {
  const stats = getGeneralStats(monitoringData);
  document.getElementById('stat-total').textContent = fmt(stats.total);
  document.getElementById('stat-avg').textContent = fmt(stats.average);
  document.getElementById('stat-max').textContent = fmt(stats.max);
  document.getElementById('stat-min').textContent = fmt(stats.min);
  document.getElementById('stat-count').textContent = stats.count;
}

function renderRanking() {
  const ranking = getEquipmentRanking(monitoringData);
  const list = document.getElementById('ranking-list');
  list.innerHTML = ranking.map((item, i) => `
    <li class="ranking-item">
      <span class="rank-pos">#${i + 1}</span>
      <span class="rank-name">${item.name}</span>
      <span class="rank-value">${fmt(item.total)}</span>
    </li>
  `).join('');
}

function renderGroupByType() {
  const groups = groupByType(monitoringData);
  const container = document.getElementById('type-groups');
  container.innerHTML = Object.entries(groups).map(([type, items]) => `
    <div class="type-card">
      <h3>${getTypeIcon(type)} ${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
      <p class="type-count">${items.length} registros</p>
      <p class="type-metric">Total: ${fmt(items.reduce((s, e) => s + e.metric, 0))}</p>
    </div>
  `).join('');
}

function renderRegionStats() {
  const stats = getStatsByRegion(monitoringData);
  const container = document.getElementById('region-stats');
  const sorted = Object.entries(stats).toSorted((a, b) => b[1] - a[1]);
  container.innerHTML = sorted.map(([region, total]) => `
    <div class="region-bar">
      <span class="region-name">📍 ${region}</span>
      <div class="bar-wrap">
        <div class="bar" style="width:${Math.min(100, (total / 300) * 100).toFixed(1)}%"></div>
      </div>
      <span class="region-value">${fmt(total)}</span>
    </div>
  `).join('');
}

function renderMonthlyTrend() {
  const trend = getMonthlyTrend(monitoringData);
  const labels = generateMonthLabels(2024);
  const container = document.getElementById('monthly-trend');
  const maxVal = Math.max(...Object.values(trend), 1);
  container.innerHTML = labels.map(month => {
    const val = trend[month] ?? 0;
    const height = ((val / maxVal) * 100).toFixed(1);
    return `
      <div class="bar-col">
        <div class="bar-v" style="height:${height}%" title="${val}">
          <span class="bar-label-v">${val > 0 ? fmt(val) : ''}</span>
        </div>
        <span class="month-label">${month.slice(5)}</span>
      </div>
    `;
  }).join('');
}

function renderTop5() {
  const top = getTopEquipment(monitoringData, 5);
  const container = document.getElementById('top5-list');
  container.innerHTML = top.map((eq, i) => `
    <div class="top-item">
      <span class="top-pos">${i + 1}</span>
      <div class="top-info">
        <strong>${eq.name}</strong>
        <small>${eq.field} · ${eq.date}</small>
      </div>
      <span class="top-metric">${fmt(eq.metric)} ${eq.unit}</span>
    </div>
  `).join('');
}

function renderLastItems() {
  const lastVerified = getLastVerified(monitoringData);
  const lastPendingIdx = getLastPendingIndex(monitoringData);

  const lvEl = document.getElementById('last-verified');
  lvEl.innerHTML = lastVerified
    ? `<strong>${lastVerified.id}</strong> – ${lastVerified.field} (${lastVerified.date}) · Operador: ${lastVerified.operator}`
    : 'No encontrado';

  const lpEl = document.getElementById('last-pending');
  lpEl.innerHTML = lastPendingIdx !== -1
    ? `Índice <strong>${lastPendingIdx}</strong> → ${monitoringData[lastPendingIdx].id} – ${monitoringData[lastPendingIdx].field}`
    : 'No encontrado';
}

function renderWithDemo() {
  const updated = markAsReviewed(monitoringData, 3);
  const container = document.getElementById('with-demo');
  container.innerHTML = `
    <p>Original [3]: <code>status = "${monitoringData[3].status}"</code></p>
    <p>Nuevo [3]:    <code>status = "${updated[3].status}"</code></p>
    <p class="note">✅ El array original NO fue mutado.</p>
  `;
}

function handleDateFilter() {
  const from = document.getElementById('date-from').value;
  const to = document.getElementById('date-to').value;
  if (!from || !to) return;

  const filtered = filterByDateRange(monitoringData, from, to);
  const container = document.getElementById('filter-results');

  if (filtered.length === 0) {
    container.innerHTML = '<p class="empty">No hay registros en ese rango.</p>';
    return;
  }

  container.innerHTML = filtered.map(r => `
    <div class="record-card">
      <span class="record-id">${r.id}</span>
      <span class="record-field">📍 ${r.field}</span>
      <span class="record-date">📅 ${r.date}</span>
      <span class="record-status status-${r.status}">${r.status}</span>
      <span class="record-eq">🔧 ${r.equipment.length} equipos</span>
    </div>
  `).join('');
}

function getTypeIcon(type) {
  const icons = { sensor: '📡', drone: '🚁', tractor: '🚜' };
  return icons[type] ?? '🔧';
}

document.addEventListener('DOMContentLoaded', () => {
  renderGeneralStats();
  renderRanking();
  renderGroupByType();
  renderRegionStats();
  renderMonthlyTrend();
  renderTop5();
  renderLastItems();
  renderWithDemo();

  document.getElementById('btn-filter').addEventListener('click', handleDateFilter);
  document.getElementById('date-from').value = '2024-01-01';
  document.getElementById('date-to').value = '2024-06-30';
  handleDateFilter();
});
