// ============================================
// UI: Render Functions
// ============================================

import { getCategoryById } from '../config.js';
import { formatCurrency, formatShortDate } from '../utils/index.js';

// Renderizar lista de equipos (usando destructuring)
export const renderEquipmentList = (equipment, containerId = 'equipmentList') => {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (equipment.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #6b7280;">No hay equipos registrados</p>';
    return;
  }

  container.innerHTML = equipment.map(eq => renderEquipmentCard(eq)).join('');
};

// Renderizar tarjeta de equipo (usando destructuring)
export const renderEquipmentCard = ({ id, name, category, value, location, quantity, minStock, active }) => {
  const categoryData = getCategoryById(category);
  const isLowStock = quantity <= minStock;
  const totalValue = value * quantity;

  const statusClass = active ? 'status-active' : 'status-inactive';
  const statusText = active ? 'Activo' : 'Inactivo';
  const cardClass = `equipment-card ${!active ? 'inactive' : ''} ${isLowStock ? 'low-stock' : ''}`;

  return `
    <div class="${cardClass}">
      <div class="equipment-header">
        <span class="equipment-icon">${categoryData?.emoji || '🌱'}</span>
        <span class="equipment-badge badge-${category}">${categoryData?.name || category}</span>
      </div>
      <h3 class="equipment-title">${name}</h3>
      <div class="equipment-info">
        <p><strong>Ubicación:</strong> ${location}</p>
        <p><strong>Valor unitario:</strong> ${formatCurrency(value)}</p>
        <p><strong>Cantidad:</strong> ${quantity} ${isLowStock ? '<span class="status-low-stock">⚠️ Stock bajo</span>' : ''}</p>
        <p><strong>Valor total:</strong> ${formatCurrency(totalValue)}</p>
        <p><strong>Estado:</strong> <span class="status-badge ${statusClass}">${statusText}</span></p>
      </div>
      <div class="equipment-actions">
        <button class="btn btn-secondary btn-sm" onclick="window.editEquipment('${id}')">Editar</button>
        <button class="btn ${active ? 'btn-danger' : 'btn-primary'} btn-sm" 
                onclick="window.toggleEquipmentStatus('${id}')">
          ${active ? 'Desactivar' : 'Activar'}
        </button>
        <button class="btn btn-danger btn-sm" onclick="window.deleteEquipment('${id}')">Eliminar</button>
      </div>
    </div>
  `;
};

// Renderizar estadísticas (usando destructuring)
export const renderStats = ({ total, active, totalValue }) => {
  document.getElementById('totalItems').textContent = total;
  document.getElementById('activeItems').textContent = active;
  document.getElementById('totalValue').textContent = formatCurrency(totalValue);
};

// Renderizar opciones de categorías
export const renderCategoryOptions = (categories, selectId) => {
  const select = document.getElementById(selectId);
  if (!select) return;

  const options = categories.map(({ id, name, emoji }) => 
    `<option value="${id}">${emoji} ${name}</option>`
  ).join('');

  // Mantener la primera opción si existe
  const firstOption = select.querySelector('option[value=""]');
  select.innerHTML = firstOption ? firstOption.outerHTML + options : options;
};

// Limpiar formulario
export const clearForm = (formId = 'equipmentForm') => {
  const form = document.getElementById(formId);
  if (form) form.reset();
};

// Mostrar mensaje de error
export const showError = (message) => {
  alert(`❌ Error: ${message}`);
};

// Mostrar mensaje de éxito
export const showSuccess = (message) => {
  // Crear toast notification
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = `✅ ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

// Poblar formulario para edición (usando destructuring)
export const populateForm = ({ id, name, category, value, location, quantity, minStock }) => {
  document.getElementById('name').value = name;
  document.getElementById('category').value = category;
  document.getElementById('value').value = value;
  document.getElementById('location').value = location;
  document.getElementById('quantity').value = quantity;
  document.getElementById('minStock').value = minStock;

  // Cambiar texto del botón
  document.getElementById('formButtonText').textContent = 'Actualizar Equipo';
  document.getElementById('cancelEdit').style.display = 'inline-block';

  // Guardar ID en el formulario
  document.getElementById('equipmentForm').dataset.editId = id;
};

// Resetear formulario a modo agregar
export const resetFormToAdd = () => {
  clearForm();
  document.getElementById('formButtonText').textContent = 'Agregar Equipo';
  document.getElementById('cancelEdit').style.display = 'none';
  delete document.getElementById('equipmentForm').dataset.editId;
};
