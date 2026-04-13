// App – AgroTech Manager
// Week-12 | Proyecto Integrador
// ✅ SOLUCIÓN COMPLETA – Arquitectura 3 capas (Models → Services → UI)

import { ProductList }      from './ui/ProductList.js';
import { CartView }         from './ui/CartView.js';
import { AuthView }         from './ui/AuthView.js';
import { ReservationsView } from './ui/ReservationsView.js';
import { Notifications }    from './ui/Notifications.js';
import { StorageService }   from './services/StorageService.js';

class App {
  init() {
    console.log('🌱 Inicializando AgroTech Manager...');
    try {
      // Limpiar carrito si tiene formato incompatible (migración de versión anterior)
      const savedCart = StorageService.loadCart();
      if (savedCart && !Array.isArray(savedCart?.items)) {
        StorageService.clearCart();
      }

      // Capa UI: cada componente se suscribe a sus servicios internamente
      ProductList.init();
      CartView.init();
      AuthView.init();
      ReservationsView.init();

      console.log('✅ AgroTech Manager inicializado correctamente');
      Notifications.success('¡Bienvenido a AgroTech Manager! 🌱');
    } catch (error) {
      console.error('❌ Error al inicializar:', error);
      Notifications.error('Error al cargar la aplicación. Recarga la página.');
    }
  }
}

export const app = new App();
