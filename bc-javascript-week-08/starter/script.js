// Paginación con Generadores – AgroTech
// Autor: Javier Pérez | Week-08 | Generators · Iterables
// 📌 Completa cada TODO

// ─────────────────────────────────────────────
// 1. GENERADOR DE DATOS
// ─────────────────────────────────────────────

const TYPES    = ['sensor', 'drone', 'tractor'];
const REGIONS  = ['Cundinamarca', 'Boyacá', 'Tolima', 'Antioquia', 'Valle'];
const NAMES = {
  sensor:  ['Humedad SH-200', 'Temperatura ST-100', 'pH SP-300', 'Luminosidad SL-50', 'CO2 SC-400'],
  drone:   ['DJI Agras T40', 'Parrot Bluegrass', 'Wingtra One', 'senseFly eBee', 'Autel EVO II'],
  tractor: ['John Deere 6M', 'New Holland T7', 'Massey Ferguson 7S', 'Fendt 724', 'Kubota M7']
};

/**
 * Generador que produce equipos AgroTech bajo demanda (lazy).
 * Cada equipo tiene: id, name, type, region, efficiency, active
 * @param {number} total - Total de equipos a generar
 */
function* equipmentGenerator(total) {
  // TODO: Usa un bucle for de 1 a total
  // Para cada i, calcula:
  //   type   = TYPES[i % TYPES.length]
  //   name   = NAMES[type][(i - 1) % 5]
  //   region = REGIONS[i % REGIONS.length]
  //   efficiency = Math.round(50 + (i * 17) % 50)
  //   active = i % 3 !== 0
  // yield el objeto { id: `EQ-${String(i).padStart(3,'0')}`, name, type, region, efficiency, active }
}

// ─────────────────────────────────────────────
// 2. FUNCIONES AUXILIARES DE ITERADORES
// ─────────────────────────────────────────────

/**
 * Toma los primeros n elementos de un iterador.
 * @param {Iterator} iterator
 * @param {number} n
 * @yields items
 */
function* take(iterator, n) {
  // TODO: Bucle for de 0 a n
  // Llama iterator.next(), si done: return
  // yield value
}

/**
 * Salta los primeros n elementos de un iterador.
 * @param {Iterator} iterator
 * @param {number} n
 * @yields items restantes
 */
function* skip(iterator, n) {
  // TODO: Bucle for de 0 a n llamando iterator.next()
  // Luego yield* iterator para pasar el resto
}

// ─────────────────────────────────────────────
// 3. CLASE PAGINATOR
// ─────────────────────────────────────────────

class Paginator {
  /**
   * @param {Array} data - Array de todos los datos
   * @param {number} itemsPerPage
   */
  constructor(data, itemsPerPage = 10) {
    // TODO: Guarda data, itemsPerPage
    // Inicializa currentPage = 1
    // Calcula totalPages = Math.ceil(data.length / itemsPerPage)
  }

  /**
   * Generador que produce los items de la página actual.
   * Usa skip() y take() sobre un iterador del array data.
   */
  *currentPageItems() {
    // TODO:
    // Calcula offset = (this.currentPage - 1) * this.itemsPerPage
    // Crea un iterador: data[Symbol.iterator]()
    // Aplica skip(iterator, offset)
    // Aplica take(skipped, this.itemsPerPage)
    // yield* el resultado
  }

  /** Avanza a la siguiente página si existe */
  next() {
    // TODO: if (this.currentPage < this.totalPages) this.currentPage++
  }

  /** Retrocede a la página anterior si existe */
  previous() {
    // TODO: if (this.currentPage > 1) this.currentPage--
  }

  /** Va a la primera página */
  first() {
    // TODO: this.currentPage = 1
  }

  /** Va a la última página */
  last() {
    // TODO: this.currentPage = this.totalPages
  }

  /** Va a una página específica */
  goTo(page) {
    // TODO: Valida que page esté entre 1 y totalPages
    // this.currentPage = page
  }

  /** Cambia items por página y resetea a página 1 */
  setItemsPerPage(n) {
    // TODO: this.itemsPerPage = n
    // Recalcula totalPages
    // this.currentPage = 1
  }
}

// ─────────────────────────────────────────────
// 4. ESTADO DE LA APP
// ─────────────────────────────────────────────

const TOTAL_ITEMS = 80;
let allData    = [...take(equipmentGenerator(TOTAL_ITEMS), TOTAL_ITEMS)];
let filtered   = [...allData];
let paginator  = new Paginator(filtered, 10);

// ─────────────────────────────────────────────
// 5. RENDER
// ─────────────────────────────────────────────

const typeIcon = { sensor: '📡', drone: '🚁', tractor: '🚜' };

function renderGrid() {
  const grid  = document.getElementById('equipment-grid');
  const items = [...paginator.currentPageItems()];

  grid.innerHTML = items.map(eq => `
    <div class="eq-card">
      <div class="eq-icon">${typeIcon[eq.type] ?? '🔧'}</div>
      <div class="eq-name">${eq.name}</div>
      <div class="eq-meta">📍 ${eq.region}</div>
      <div class="eq-meta">⚡ Eficiencia: ${eq.efficiency}%</div>
      <div class="eq-meta">${eq.active ? '🟢 Activo' : '🔴 Inactivo'}</div>
      <span class="eq-badge badge-${eq.type}">${eq.type}</span>
    </div>
  `).join('');

  document.getElementById('page-info').textContent =
    `Página ${paginator.currentPage} de ${paginator.totalPages} · ${filtered.length} equipos`;

  renderPageNumbers();
  updateButtons();
}

function renderPageNumbers() {
  const container = document.getElementById('page-numbers');
  const total = paginator.totalPages;
  const current = paginator.currentPage;

  // Mostrar máximo 5 botones de página
  let start = Math.max(1, current - 2);
  let end   = Math.min(total, start + 4);
  start = Math.max(1, end - 4);

  container.innerHTML = Array.from({ length: end - start + 1 }, (_, i) => {
    const p = start + i;
    return `<button class="page-btn ${p === current ? 'active' : ''}" data-page="${p}">${p}</button>`;
  }).join('');

  container.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      paginator.goTo(Number(btn.dataset.page));
      renderGrid();
    });
  });
}

function updateButtons() {
  document.getElementById('btn-first').disabled = paginator.currentPage === 1;
  document.getElementById('btn-prev').disabled  = paginator.currentPage === 1;
  document.getElementById('btn-next').disabled  = paginator.currentPage === paginator.totalPages;
  document.getElementById('btn-last').disabled  = paginator.currentPage === paginator.totalPages;
}

function applyFilters() {
  const type   = document.getElementById('filter-type').value;
  const search = document.getElementById('search-input').value.toLowerCase();

  filtered = allData.filter(eq =>
    (!type   || eq.type === type) &&
    (!search || eq.name.toLowerCase().includes(search))
  );

  paginator = new Paginator(filtered, Number(document.getElementById('items-per-page').value));
  renderGrid();
}

// ─────────────────────────────────────────────
// 6. INICIALIZACIÓN
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderGrid();

  document.getElementById('btn-first').addEventListener('click', () => { paginator.first();    renderGrid(); });
  document.getElementById('btn-prev') .addEventListener('click', () => { paginator.previous(); renderGrid(); });
  document.getElementById('btn-next') .addEventListener('click', () => { paginator.next();     renderGrid(); });
  document.getElementById('btn-last') .addEventListener('click', () => { paginator.last();     renderGrid(); });

  document.getElementById('items-per-page').addEventListener('change', e => {
    paginator.setItemsPerPage(Number(e.target.value));
    renderGrid();
  });

  document.getElementById('filter-type')  .addEventListener('change', applyFilters);
  document.getElementById('search-input') .addEventListener('input',  applyFilters);
});
