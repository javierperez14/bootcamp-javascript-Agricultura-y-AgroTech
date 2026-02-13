const agroTechData = {
  name: 'SmartFarm Analytics',
  description: 'Plataforma de agricultura inteligente basada en sensores IoT y análisis predictivo.',
  code: 'AGT-2026-01',

  location: {
    region: 'Valle del Cauca',
    country: 'Colombia'
  },

  crops: [
    { name: 'Maíz', efficiency: 92, status: 'Óptimo' },
    { name: 'Café', efficiency: 85, status: 'Bueno' },
    { name: 'Arroz', efficiency: 78, status: 'Estable' }
  ],

  stats: {
    monitoredHectares: 1250,
    activeSensors: 340,
    waterSavings: 28,
    productivityIndex: 87
  }
};

const {
  name,
  description,
  code,
  location: { region, country },
  crops,
  stats
} = agroTechData;


const averageEfficiency = crops.reduce(
  (acc, crop) => acc + crop.efficiency,
  0
) / crops.length;

const highPerformanceCrops = crops.filter(
  crop => crop.efficiency > 80
);

const cropNames = crops.map(
  crop => crop.name
).join(', ');


const renderInfo = () => {

  const mainInfo = document.getElementById('mainInfo');
  const statsSection = document.getElementById('statsSection');

  mainInfo.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Código:</strong> ${code}</p>
    <p>${description}</p>

    <h3>📍 Ubicación</h3>
    <p>${region}, ${country}</p>

    <h3>🌾 Cultivos Monitoreados</h3>
    <ul>
      ${crops.map(crop => `
        <li>
          ${crop.name} - ${crop.efficiency}% (${crop.status})
        </li>
      `).join('')}
    </ul>
  `;

  statsSection.innerHTML = `
    <h3> Estadísticas</h3>
    <p>Hectáreas monitoreadas: ${stats.monitoredHectares}</p>
    <p>Sensores activos: ${stats.activeSensors}</p>
    <p>Ahorro de agua: ${stats.waterSavings}%</p>
    <p>Índice productividad: ${stats.productivityIndex}</p>
    <p><strong>Promedio eficiencia:</strong> ${averageEfficiency.toFixed(2)}%</p>
    <p><strong>Cultivos alto rendimiento:</strong> ${highPerformanceCrops.length}</p>
  `;
};


let isDarkMode = false;

const toggleTheme = () => {
  document.body.classList.toggle('dark');
  isDarkMode = !isDarkMode;
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
};


const copyInfo = () => {

  const text = `
${name}
Código: ${code}
Ubicación: ${region}, ${country}
Cultivos: ${cropNames}
Promedio eficiencia: ${averageEfficiency.toFixed(2)}%
`;

  navigator.clipboard.writeText(text)
    .then(() => showToast('Información copiada correctamente'))
    .catch(() => showToast('Error al copiar'));
};


const showToast = (message) => {

  const toast = document.getElementById('toast');

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};


const toggleStats = () => {

  const statsSection = document.getElementById('statsSection');

  statsSection.style.display =
    statsSection.style.display === 'none'
      ? 'block'
      : 'none';
};


document.getElementById('themeBtn')
  .addEventListener('click', () => toggleTheme());

document.getElementById('copyBtn')
  .addEventListener('click', () => copyInfo());

document.getElementById('toggleBtn')
  .addEventListener('click', () => toggleStats());


const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  isDarkMode = true;
}

renderInfo();
