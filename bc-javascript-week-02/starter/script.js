// -------------------------------
// 🌾 Agricultura y AgroTech App
// -------------------------------

// ---------- 1. Estado y Persistencia ----------

function loadItems() {
  const data = localStorage.getItem("agri_items");
  return data ? JSON.parse(data) : [];
}

function saveItems(items) {
  localStorage.setItem("agri_items", JSON.stringify(items));
}

function getInitialState() {
  return loadItems();
}

let items = getInitialState();

// ---------- 2. CRUD Básico ----------

function createItem(itemData) {
  const newItem = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: null,
    active: true,
    ...itemData
  };

  items = [...items, newItem];
  saveItems(items);
  renderItems(items);
}

function updateItem(id, updates) {
  items = items.map(item =>
    item.id === id 
      ? { ...item, ...updates, updatedAt: new Date().toISOString() }
      : item
  );

  saveItems(items);
  renderItems(items);
}

function deleteItem(id) {
  items = items.filter(item => item.id !== id);
  saveItems(items);
  renderItems(items);
}

function toggleItemActive(id) {
  items = items.map(item =>
    item.id === id ? { ...item, active: !item.active } : item
  );
  saveItems(items);
  renderItems(items);
}

// ---------- 3. Filtros y Búsqueda ----------

function filterByStatus(items, status) {
  if (status === "all") return items;
  return items.filter(i => status === "active" ? i.active : !i.active);
}

function filterByCategory(items, category) {
  return category === "all" ? items : items.filter(i => i.category === category);
}

function filterByPriority(items, priority) {
  return priority === "all" ? items : items.filter(i => i.priority === priority);
}

function searchItems(items, query) {
  if (!query) return items;

  const q = query.toLowerCase();
  return items.filter(i =>
    i.name.toLowerCase().includes(q) ||
    (i.description && i.description.toLowerCase().includes(q))
  );
}

function applyFilters(items, filters) {
  let result = items;
  result = filterByStatus(result, filters.status);
  result = filterByCategory(result, filters.category);
  result = filterByPriority(result, filters.priority);
  result = searchItems(result, filters.search);
  return result;
}

// ---------- 4. Estadísticas ----------

function getStats(items) {
  return items.reduce((acc, item) => {
    acc.total++;
    if (item.active) acc.active++;
    else acc.inactive++;
    return acc;
  }, { total: 0, active: 0, inactive: 0 });
}

function getItemsByCategory(items) {
  return items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
}

// ---------- 5. Renderizado ----------

function renderItem(item) {
  return `
    <div class="item ${item.active ? "" : "inactive"} priority-${item.priority}">
      <h3>${item.name}</h3>
      <p>${item.description || "Sin descripción"}</p>
      <span class="badge">${item.category}</span>

      <p><strong>Batería:</strong> ${item.batteryLevel}%</p>
      <p><strong>Ubicación:</strong> ${item.fieldLocation}</p>

      <div class="actions">
        <button onclick="toggleItemActive(${item.id})">Activar/Desactivar</button>
        <button onclick="deleteItem(${item.id})">Eliminar</button>
      </div>
    </div>
  `;
}

function renderItems(itemsList) {
  const container = document.getElementById("items-list");

  const filters = {
    status: document.getElementById("filter-status").value,
    category: document.getElementById("filter-category").value,
    priority: document.getElementById("filter-priority").value,
    search: document.getElementById("search").value
  };

  const filtered = applyFilters(itemsList, filters);
  container.innerHTML = filtered.map(renderItem).join("");

  renderStats(getStats(itemsList));
}

function renderStats(stats) {
  document.getElementById("stats").innerHTML = `
    <p>Total: ${stats.total}</p>
    <p>Activos: ${stats.active}</p>
    <p>Inactivos: ${stats.inactive}</p>
  `;
}

function toggleCheck(li) {
  if (li.textContent.trim().startsWith("✔️")) {
    li.textContent = li.textContent.replace("✔️", "❌");
    li.style.color = "red";
  } else {
    li.textContent = li.textContent.replace("❌", "✔️");
    li.style.color = "green";
  }
}


// ---------- 6. Eventos ----------

document.getElementById("create-form").addEventListener("submit", e => {
  e.preventDefault();

  const itemData = {
    name: e.target.name.value,
    description: e.target.description.value,
    category: e.target.category.value,
    priority: e.target.priority.value,
    fieldLocation: e.target.fieldLocation.value,
    batteryLevel: Number(e.target.batteryLevel.value),
    lastMaintenance: e.target.lastMaintenance.value
  };

  createItem(itemData);
  e.target.reset();
});

// Inicial render
renderItems(items);

