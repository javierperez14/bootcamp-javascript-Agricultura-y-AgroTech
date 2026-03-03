// ============================================
// FEATURE: Reports (Lazy Loaded)
// ============================================

import { formatCurrency, formatPercentage } from '../utils/index.js';
import { getCategoryById } from '../config.js';

// Generar reporte completo (usando destructuring)
export const generateReport = ({ stats, alerts, equipment }) => {
  const { total, active, inactive, lowStock, totalValue, averageValue, byCategory } = stats;

  // Calcular distribución por categoría
  const categoryDistribution = Object.entries(byCategory).map(([categoryId, count]) => {
    const category = getCategoryById(categoryId);
    return {
      category: category?.name || categoryId,
      emoji: category?.emoji || '🌱',
      count,
      percentage: formatPercentage(count, total),
    };
  });

  // Equipos más valiosos
  const topValueEquipment = [...equipment]
    .sort((a, b) => b.getTotalValue() - a.getTotalValue())
    .slice(0, 5)
    .map(({ name, value, quantity }) => ({
      name,
      totalValue: value * quantity,
    }));

  return {
    summary: {
      total,
      active,
      inactive,
      lowStock,
      totalValue,
      averageValue,
    },
    categoryDistribution,
    topValueEquipment,
    alerts,
  };
};

// Renderizar reporte como HTML (usando destructuring)
export const renderReportHTML = ({ summary, categoryDistribution, topValueEquipment, alerts }) => {
  const { total, active, inactive, lowStock, totalValue, averageValue } = summary;

  return `
    <div class="report-section">
      <h3>📈 Resumen General</h3>
      <div class="report-grid">
        <div class="report-item">
          <strong>Total de Equipos</strong>
          <span>${total}</span>
        </div>
        <div class="report-item">
          <strong>Equipos Activos</strong>
          <span>${active}</span>
        </div>
        <div class="report-item">
          <strong>Equipos Inactivos</strong>
          <span>${inactive}</span>
        </div>
        <div class="report-item">
          <strong>Stock Bajo</strong>
          <span>${lowStock}</span>
        </div>
        <div class="report-item">
          <strong>Valor Total</strong>
          <span>${formatCurrency(totalValue)}</span>
        </div>
        <div class="report-item">
          <strong>Valor Promedio</strong>
          <span>${formatCurrency(averageValue)}</span>
        </div>
      </div>
    </div>

    <div class="report-section">
      <h3>📊 Distribución por Categoría</h3>
      <div class="report-grid">
        ${categoryDistribution.map(({ emoji, category, count, percentage }) => `
          <div class="report-item">
            <strong>${emoji} ${category}</strong>
            <span>${count} (${percentage})</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="report-section">
      <h3>💰 Top 5 Equipos Más Valiosos</h3>
      <ul class="alert-list">
        ${topValueEquipment.map(({ name, totalValue }) => `
          <li>
            <strong>${name}</strong><br>
            Valor total: ${formatCurrency(totalValue)}
          </li>
        `).join('')}
      </ul>
    </div>

    ${alerts.length > 0 ? `
      <div class="report-section">
        <h3>⚠️ Alertas (${alerts.length})</h3>
        <ul class="alert-list">
          ${alerts.map(({ name, message }) => `
            <li>
              <strong>${name}</strong><br>
              ${message}
            </li>
          `).join('')}
        </ul>
      </div>
    ` : ''}
  `;
};

// Calcular estadísticas avanzadas (usando destructuring)
export const calculateAdvancedStats = (equipment) => {
  if (equipment.length === 0) {
    return {
      totalInvestment: 0,
      averageQuantity: 0,
      stockEfficiency: 0,
    };
  }

  // Calcular inversión total
  const totalInvestment = equipment.reduce(
    (sum, { value, quantity }) => sum + (value * quantity),
    0
  );

  // Calcular cantidad promedio
  const averageQuantity = equipment.reduce(
    (sum, { quantity }) => sum + quantity,
    0
  ) / equipment.length;

  // Calcular eficiencia de stock (equipos con stock adecuado)
  const adequateStock = equipment.filter(
    ({ quantity, minStock }) => quantity > minStock
  ).length;
  const stockEfficiency = (adequateStock / equipment.length) * 100;

  return {
    totalInvestment,
    averageQuantity,
    stockEfficiency,
  };
};

console.log('📊 Módulo de reportes cargado');
