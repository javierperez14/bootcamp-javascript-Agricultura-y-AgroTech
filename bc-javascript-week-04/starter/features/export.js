// ============================================
// FEATURE: Export (Lazy Loaded)
// ============================================

import { formatCurrency, formatShortDate } from '../utils/index.js';
import { getCategoryById } from '../config.js';

// Exportar como JSON
export const exportToJSON = (equipment) => {
  const data = equipment.map(eq => eq.toJSON());
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  downloadFile(blob, 'agrotech-equipment.json');
};

// Exportar como CSV (usando destructuring)
export const exportToCSV = (equipment) => {
  // Encabezados
  const headers = ['ID', 'Nombre', 'Categoría', 'Valor', 'Ubicación', 'Cantidad', 'Stock Mínimo', 'Estado', 'Fecha Creación'];
  
  // Filas de datos
  const rows = equipment.map(({ id, name, category, value, location, quantity, minStock, active, createdAt }) => {
    const categoryData = getCategoryById(category);
    return [
      id,
      name,
      categoryData?.name || category,
      value,
      location,
      quantity,
      minStock,
      active ? 'Activo' : 'Inactivo',
      formatShortDate(createdAt),
    ];
  });

  // Combinar encabezados y filas
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadFile(blob, 'agrotech-equipment.csv');
};

// Exportar reporte detallado como texto
export const exportDetailedReport = (equipment, stats) => {
  const { total, active, inactive, lowStock, totalValue, averageValue } = stats;

  let report = '='.repeat(60) + '\n';
  report += '  REPORTE DETALLADO - SISTEMA AGROTECH\n';
  report += '='.repeat(60) + '\n\n';

  report += 'RESUMEN GENERAL\n';
  report += '-'.repeat(60) + '\n';
  report += `Total de Equipos:     ${total}\n`;
  report += `Equipos Activos:      ${active}\n`;
  report += `Equipos Inactivos:    ${inactive}\n`;
  report += `Stock Bajo:           ${lowStock}\n`;
  report += `Valor Total:          ${formatCurrency(totalValue)}\n`;
  report += `Valor Promedio:       ${formatCurrency(averageValue)}\n\n`;

  report += 'LISTADO DE EQUIPOS\n';
  report += '-'.repeat(60) + '\n';

  equipment.forEach(({ name, category, value, location, quantity, active }) => {
    const categoryData = getCategoryById(category);
    report += `\n${name}\n`;
    report += `  Categoría:  ${categoryData?.emoji} ${categoryData?.name}\n`;
    report += `  Ubicación:  ${location}\n`;
    report += `  Valor:      ${formatCurrency(value)} x ${quantity} = ${formatCurrency(value * quantity)}\n`;
    report += `  Estado:     ${active ? 'Activo' : 'Inactivo'}\n`;
  });

  report += '\n' + '='.repeat(60) + '\n';
  report += `Generado: ${new Date().toLocaleString('es-ES')}\n`;

  const blob = new Blob([report], { type: 'text/plain;charset=utf-8;' });
  downloadFile(blob, 'agrotech-report.txt');
};

// Función auxiliar para descargar archivo
const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Exportar datos para backup
export const createBackup = (equipment) => {
  const backup = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    data: equipment.map(eq => eq.toJSON()),
  };

  const jsonStr = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  downloadFile(blob, `agrotech-backup-${Date.now()}.json`);
};

console.log('📥 Módulo de exportación cargado');
