// Paginación con Generadores – AgroTech
// Autor: Javier Pérez | Week-08 | Generators · Iterables
// ✅ SOLUCIÓN COMPLETA

const TYPES   = ['sensor', 'drone', 'tractor'];
const REGIONS = ['Cundinamarca', 'Boyacá', 'Tolima', 'Antioquia', 'Valle'];
const NAMES   = {
  sensor:  ['Humedad SH-200', 'Temperatura ST-100', 'pH SP-300', 'Luminosidad SL-50', 'CO2 SC-400'],
  drone:   ['DJI Agras T40', 'Parrot Bluegrass', 'Wingtra One', 'senseFly eBee', 'Autel EVO II'],
  tractor: ['John Deere 6M', 'New Holland T7', 'Massey Ferguson 7S', 'Fendt 724', 'Kubota M7']
};

// ─── Generador de datos ───
function* equipmentGenerator(total) {
  for (let i = 1; i <= total; i++) {
    const type   = TYPES[i % TYPES.length];
    const name   = NAMES[type][(i - 1) % 5];
    const region = REGIONS[i % REGIONS.length];
    yield {
      id:         `EQ-${String(i).padStart(3, '0')}`,
      name,
      type,
      region,
      efficiency: Math.round(50 + (i * 17) % 50),
      active:     i % 3 !== 0
    };
  }
}

// ─── Auxiliares de iteradores ───
function* take(iterator, n) {
  for (let i = 0; i < n; i++) {
    const { value, done } = iterator.next();
    if (done) return;
    yield value;
  }
}

function* skip(iterator, n) {
  for (let i = 0; i < n; i++) {
    const { done } = iterator.next();
    if (done) return;
  }
  yield* iterator;
}

// ─── Clase Paginator ───
class Paginator {
  constructor(data, itemsPerPage = 10) {
    this.data         = data;
    this.itemsPerPage = itemsPerPage;
    this.currentPage  = 1;
    this.totalPages   = Math.ceil(data.length / itemsPerPage);
  }

  *currentPageItems() {
    const offset   = (this.currentPage - 1) * this.itemsPerPage;
    const iterator = this.data[Symbol.iterator]();
    const skipped  = skip(iterator, offset);
    yield* take(skipped, this.itemsPerPage);
  }

  next()     { if (this.currentPage < this.totalPages) this.currentPage++; }
  previous() { if (this.currentPage > 1) this.currentPage--; }
  first()    { this.currentPage = 1; }
  last()     { this.currentPage = this.totalPages; }
  goTo(page) {
    if (page >= 1 && page <= this.totalPages) this.currentPage = page;
  }
  setItemsPerPage(n) {
    this.itemsPerPage = n;
    this.totalPages   = Math.ceil(this.data.length / n);
    this.currentPage  = 1;
  }
}

// ─── Estado ───
const TOTAL_ITEMS = 80;
let allData   = [...take(equipmentGenerator(TOTAL_ITEMS), TOTAL_ITEMS)];
let filtered  = [...allData];
let paginator = new Paginator(filtered, 10);

// ─── Render ───
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
  const total   = paginator.totalPages;
  const current = paginator.currentPage;
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

document.addEventListener('DOMContentLoaded', () => {
  renderGrid();
  document.getElementById('btn-first').addEventListener('click', () => { paginator.first();    renderGrid(); });
  document.getElementById('btn-prev') .addEventListener('click', () => { paginator.previous(); renderGrid(); });
  document.getElementById('btn-next') .addEventListener('click', () => { paginator.next();     renderGrid(); });
  document.getElementById('btn-last') .addEventListener('click', () => { paginator.last();     renderGrid(); });
  document.getElementById('items-per-page').addEventListener('change', e => {
    paginator.setItemsPerPage(Number(e.target.value)); renderGrid();
  });
  document.getElementById('filter-type') .addEventListener('change', applyFilters);
  document.getElementById('search-input').addEventListener('input',  applyFilters);
});
