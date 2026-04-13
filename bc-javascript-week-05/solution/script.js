// Dashboard de Análisis de Datos – AgroTech
// Autor: Javier Pérez | Week-05 | ES2023
// ✅ SOLUCIÓN COMPLETA – Referencia

import { monitoringData } from '../starter/data.js';

// ─────────────────────────────────────────────
// 1. APLANAR EQUIPOS ANIDADOS (flatMap)
// ─────────────────────────────────────────────

/**
 * Extrae todos los equipos de todos los registros en un array plano,
 * enriqueciendo cada equipo con datos del registro padre.
 */
const getAllEquipment = records =>
  records.flatMap(record =>
    record.equipment.map(eq => ({
      ...eq,
      recordId: record.id,
      field: record.field,
      region: record.region,
      date: record.date,
      operator: record.operator
    }))
  );

// ─────────────────────────────────────────────
// 2. TOTAL DE MÉTRICA POR REGISTRO (map + reduce)
// ─────────────────────────────────────────────

/**
 * Calcula la suma de la métrica de todos los equipos por registro.
 */
const getTotalMetricPerRecord = records =>
  records.map(record => ({
    id: record.id,
    field: record.field,
    region: record.region,
    date: record.date,
    totalMetric: record.equipment.reduce((sum, eq) => sum + eq.metric, 0)
  }));

// ─────────────────────────────────────────────
// 3. TOP N EQUIPOS POR MÉTRICA (chaining + toSorted)
// ─────────────────────────────────────────────

/**
 * Retorna los N equipos con mayor valor de métrica.
 * Usa toSorted() para no mutar el array original (ES2023).
 */
const getTopEquipment = (records, n = 5) =>
  getAllEquipment(records)
    .toSorted((a, b) => b.metric - a.metric)
    .slice(0, n);

// ─────────────────────────────────────────────
// 4. AGRUPAR POR TIPO DE EQUIPO (reduce)
// ─────────────────────────────────────────────

/**
 * Agrupa todos los equipos por su tipo (sensor, drone, tractor).
 */
const groupByType = records =>
  getAllEquipment(records).reduce((acc, eq) => {
    acc[eq.type] = acc[eq.type] ?? [];
    acc[eq.type].push(eq);
    return acc;
  }, {});

// ─────────────────────────────────────────────
// 5. ESTADÍSTICAS POR REGIÓN (flatMap + reduce)
// ─────────────────────────────────────────────

/**
 * Calcula el total de métrica acumulada agrupada por región.
 */
const getStatsByRegion = records =>
  records.reduce((acc, record) => {
    const total = record.equipment.reduce((s, eq) => s + eq.metric, 0);
    acc[record.region] = (acc[record.region] ?? 0) + total;
    return acc;
  }, {});

// ─────────────────────────────────────────────
// 6. RANKING DE EQUIPOS (flatMap + reduce + toSorted)
// ─────────────────────────────────────────────

/**
 * Suma la métrica total por nombre de equipo y retorna el ranking ordenado.
 */
const getEquipmentRanking = records => {
  const totals = getAllEquipment(records).reduce((acc, eq) => {
    acc[eq.name] = (acc[eq.name] ?? 0) + eq.metric;
    return acc;
  }, {});

  return Object.entries(totals)
    .map(([name, total]) => ({ name, total }))
    .toSorted((a, b) => b.total - a.total);
};

// ─────────────────────────────────────────────
// 7. FILTRAR POR RANGO DE FECHAS (filter + chaining)
// ─────────────────────────────────────────────

/**
 * Filtra registros dentro de un rango de fechas (inclusive).
 */
const filterByDateRange = (records, from, to) =>
  records.filter(record => record.date >= from && record.date <= to);

// ─────────────────────────────────────────────
// 8. ESTADÍSTICAS GENERALES (reduce)
// ─────────────────────────────────────────────

/**
 * Calcula total, promedio, máximo y mínimo de métricas de todos los equipos.
 */
const getGeneralStats = records => {
  const allMetrics = getAllEquipment(records).map(eq => eq.metric);
  const total = allMetrics.reduce((s, v) => s + v, 0);
  return {
    total: +total.toFixed(2),
    average: +(total / allMetrics.length).toFixed(2),
    max: Math.max(...allMetrics),
    min: Math.min(...allMetrics),
    count: allMetrics.length
  };
};

// ─────────────────────────────────────────────
// 9. TENDENCIA TEMPORAL POR MES (reduce)
// ─────────────────────────────────────────────

/**
 * Agrupa la suma de métricas por mes (YYYY-MM) para ver tendencias.
 */
const getMonthlyTrend = records =>
  records.reduce((acc, record) => {
    const month = record.date.slice(0, 7); // 'YYYY-MM'
    const total = record.equipment.reduce((s, eq) => s + eq.metric, 0);
    acc[month] = +(((acc[month] ?? 0) + total).toFixed(2));
    return acc;
  }, {});

// ─────────────────────────────────────────────
// 10. BUSCAR ÚLTIMO ELEMENTO (findLast / findLastIndex – ES2023)
// ─────────────────────────────────────────────

/**
 * Encuentra el último registro verificado.
 */
const getLastVerified = records =>
  records.findLast(record => record.status === 'verified');

/**
 * Índice del último registro con estado 'pending'.
 */
const getLastPendingIndex = records =>
  records.findLastIndex(record => record.status === 'pending');

// ─────────────────────────────────────────────
// 11. MODIFICAR SIN MUTAR (with() – ES2023)
// ─────────────────────────────────────────────

/**
 * Marca un registro como 'reviewed' en el índice dado sin mutar el array.
 */
const markAsReviewed = (records, index) =>
  records.with(index, { ...records[index], status: 'reviewed' });

// ─────────────────────────────────────────────
// 12. GENERAR RANGOS CON Array.from()
// ─────────────────────────────────────────────

/**
 * Genera los 12 meses del año como etiquetas 'YYYY-MM'.
 */
const generateMonthLabels = year =>
  Array.from({ length: 12 }, (_, i) => {
    const month = String(i + 1).padStart(2, '0');
    return `${year}-${month}`;
  });

/**
 * Obtiene categorías únicas de equipos.
 */
const getUniqueCategories = records =>
  Array.from(new Set(getAllEquipment(records).map(eq => eq.category)));

// ─────────────────────────────────────────────
// RENDER – DASHBOARD UI
// ─────────────────────────────────────────────

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
