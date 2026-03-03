// ============================================
// UI: Event Handlers
// ============================================

import { EquipmentManager } from '../services/index.js';
import { getCategoriesArray } from '../config.js';
import { validateEquipmentForm } from '../utils/index.js';
import { 
  renderEquipmentList, 
  renderStats, 
  showError, 
  showSuccess,
  populateForm,
  resetFormToAdd,
  clearForm
} from './render.js';

// Instancia del manager
const manager = new EquipmentManager();

// Inicializar eventos
export const initializeEvents = () => {
  // Evento: envío del formulario
  document.getElementById('equipmentForm').addEventListener('submit', handleFormSubmit);

  // Evento: cancelar edición
  document.getElementById('cancelEdit').addEventListener('click', handleCancelEdit);

  // Eventos: filtros
  document.getElementById('filterCategory').addEventListener('change', handleFilterChange);
  document.getElementById('filterStatus').addEventListener('change', handleFilterChange);
  document.getElementById('searchQuery').addEventListener('input', handleFilterChange);

  // Eventos: botones de acciones (dynamic imports)
  document.getElementById('reportsBtn').addEventListener('click', handleReportsClick);
  document.getElementById('exportBtn').addEventListener('click', handleExportClick);

  // Evento: cerrar modal
  document.getElementById('closeReports').addEventListener('click', () => {
    document.getElementById('reportsModal').classList.remove('show');
  });

  // Exponer funciones globales para los botones de las tarjetas
  window.editEquipment = handleEdit;
  window.toggleEquipmentStatus = handleToggleStatus;
  window.deleteEquipment = handleDelete;

  // Renderizado inicial
  updateUI();
};

// Manejar envío del formulario (usando destructuring)
const handleFormSubmit = (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    category: document.getElementById('category').value,
    value: document.getElementById('value').value,
    location: document.getElementById('location').value,
    quantity: document.getElementById('quantity').value,
    minStock: document.getElementById('minStock').value,
  };

  // Validar formulario
  const validation = validateEquipmentForm(formData, getCategoriesArray());
  
  if (!validation.valid) {
    showError(validation.errors.join('\n'));
    return;
  }

  const editId = e.target.dataset.editId;

  if (editId) {
    // Actualizar equipo existente
    manager.updateEquipment(editId, validation.values);
    showSuccess('Equipo actualizado exitosamente');
    resetFormToAdd();
  } else {
    // Agregar nuevo equipo
    manager.addEquipment(validation.values);
    showSuccess('Equipo agregado exitosamente');
    clearForm();
  }

  updateUI();
};

// Manejar cancelación de edición
const handleCancelEdit = () => {
  resetFormToAdd();
};

// Manejar cambios en filtros (usando destructuring)
const handleFilterChange = () => {
  const filters = {
    category: document.getElementById('filterCategory').value,
    status: document.getElementById('filterStatus').value,
    searchQuery: document.getElementById('searchQuery').value,
  };

  const filtered = manager.filterEquipment(filters);
  renderEquipmentList(filtered);
};

// Manejar edición de equipo
const handleEdit = (id) => {
  const equipment = manager.findById(id);
  if (!equipment) {
    showError('Equipo no encontrado');
    return;
  }

  populateForm(equipment);
  
  // Scroll al formulario
  document.getElementById('equipmentForm').scrollIntoView({ behavior: 'smooth' });
};

// Manejar cambio de estado
const handleToggleStatus = (id) => {
  const equipment = manager.toggleEquipmentStatus(id);
  if (equipment) {
    showSuccess(`Equipo ${equipment.active ? 'activado' : 'desactivado'}`);
    updateUI();
  }
};

// Manejar eliminación
const handleDelete = (id) => {
  if (!confirm('¿Estás seguro de eliminar este equipo?')) return;

  const success = manager.deleteEquipment(id);
  if (success) {
    showSuccess('Equipo eliminado exitosamente');
    updateUI();
  } else {
    showError('No se pudo eliminar el equipo');
  }
};

// Manejar clic en reportes (DYNAMIC IMPORT)
const handleReportsClick = async () => {
  try {
    // Cargar módulo de reportes bajo demanda
    const { generateReport, renderReportHTML } = await import('../features/reports.js');
    
    const stats = manager.getStatistics();
    const alerts = manager.getAlerts();
    const equipment = manager.getAllEquipment();
    
    const report = generateReport({ stats, alerts, equipment });
    const reportHTML = renderReportHTML(report);
    
    document.getElementById('reportsContent').innerHTML = reportHTML;
    document.getElementById('reportsModal').classList.add('show');
  } catch (error) {
    console.error('Error al cargar reportes:', error);
    showError('Error al cargar el módulo de reportes');
  }
};

// Manejar clic en exportar (DYNAMIC IMPORT)
const handleExportClick = async () => {
  try {
    // Cargar módulo de exportación bajo demanda
    const { exportToJSON, exportToCSV } = await import('../features/export.js');
    
    const equipment = manager.getAllEquipment();
    
    // Preguntar formato
    const format = confirm('¿Exportar como JSON? (Cancelar para CSV)') ? 'json' : 'csv';
    
    if (format === 'json') {
      exportToJSON(equipment);
    } else {
      exportToCSV(equipment);
    }
    
    showSuccess('Datos exportados exitosamente');
  } catch (error) {
    console.error('Error al exportar:', error);
    showError('Error al cargar el módulo de exportación');
  }
};

// Actualizar UI completa
const updateUI = () => {
  const equipment = manager.getAllEquipment();
  const stats = manager.getStatistics();
  
  renderEquipmentList(equipment);
  renderStats(stats);
};

// Exportar manager para uso externo si es necesario
export { manager };
