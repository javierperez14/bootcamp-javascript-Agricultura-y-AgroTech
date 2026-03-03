// ============================================
// PUNTO DE ENTRADA PRINCIPAL
// Sistema Modular AgroTech con ES6 Modules
// ============================================

import { APP_CONFIG, getCategoriesArray } from './config.js';
import { initializeEvents } from './ui/events.js';
import { renderCategoryOptions } from './ui/render.js';

// Inicializar aplicación
const initApp = () => {
  console.log(`🌱 Iniciando ${APP_CONFIG.APP_NAME} v${APP_CONFIG.VERSION}`);

  // Renderizar opciones de categorías en los selectores
  const categories = getCategoriesArray();
  renderCategoryOptions(categories, 'category');
  renderCategoryOptions(categories, 'filterCategory');

  // Inicializar eventos
  initializeEvents();

  console.log('✅ Aplicación inicializada correctamente');
  console.log('📦 Módulos cargados:');
  console.log('  - Config');
  console.log('  - Models (BaseEntity, Category)');
  console.log('  - Services (Storage, Manager)');
  console.log('  - Utils (Formatters, Validators)');
  console.log('  - UI (Render, Events)');
  console.log('⏳ Features disponibles para carga bajo demanda:');
  console.log('  - Reports (dynamic import)');
  console.log('  - Export (dynamic import)');
};

// Esperar a que el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Exportar para debugging (opcional)
export { APP_CONFIG };
