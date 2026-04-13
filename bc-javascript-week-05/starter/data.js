// Datos del dominio: Agricultura y AgroTech
// Registros de monitoreo de cultivos con sensores y drones

export const monitoringData = [
  {
    id: 'MON001',
    date: '2024-01-10',
    operator: 'Carlos Mendoza',
    field: 'Lote Norte',
    region: 'Cundinamarca',
    status: 'verified',
    equipment: [
      { name: 'Sensor Humedad SH-200', type: 'sensor', metric: 78.5, category: 'humidity', unit: '%' },
      { name: 'Drone DJI Agras T40', type: 'drone', metric: 12.3, category: 'spraying', unit: 'ha' },
      { name: 'Tractor John Deere 6M', type: 'tractor', metric: 5.8, category: 'tillage', unit: 'ha' }
    ]
  },
  {
    id: 'MON002',
    date: '2024-01-15',
    operator: 'Ana Rodríguez',
    field: 'Lote Sur',
    region: 'Boyacá',
    status: 'verified',
    equipment: [
      { name: 'Sensor Temperatura ST-100', type: 'sensor', metric: 24.2, category: 'temperature', unit: '°C' },
      { name: 'Sensor pH SP-300', type: 'sensor', metric: 6.8, category: 'ph', unit: 'pH' },
      { name: 'Drone Parrot Bluegrass', type: 'drone', metric: 8.7, category: 'imaging', unit: 'ha' }
    ]
  },
  {
    id: 'MON003',
    date: '2024-02-03',
    operator: 'Luis Gómez',
    field: 'Lote Este',
    region: 'Tolima',
    status: 'verified',
    equipment: [
      { name: 'Drone DJI Agras T40', type: 'drone', metric: 20.1, category: 'spraying', unit: 'ha' },
      { name: 'Tractor New Holland T7', type: 'tractor', metric: 9.4, category: 'harvesting', unit: 'ha' },
      { name: 'Sensor Humedad SH-200', type: 'sensor', metric: 65.3, category: 'humidity', unit: '%' },
      { name: 'Sensor Luminosidad SL-50', type: 'sensor', metric: 4200, category: 'light', unit: 'lux' }
    ]
  },
  {
    id: 'MON004',
    date: '2024-02-18',
    operator: 'María Torres',
    field: 'Lote Oeste',
    region: 'Cundinamarca',
    status: 'pending',
    equipment: [
      { name: 'Tractor John Deere 6M', type: 'tractor', metric: 7.2, category: 'tillage', unit: 'ha' },
      { name: 'Sensor pH SP-300', type: 'sensor', metric: 7.1, category: 'ph', unit: 'pH' }
    ]
  },
  {
    id: 'MON005',
    date: '2024-03-05',
    operator: 'Carlos Mendoza',
    field: 'Lote Norte',
    region: 'Cundinamarca',
    status: 'verified',
    equipment: [
      { name: 'Drone Parrot Bluegrass', type: 'drone', metric: 15.6, category: 'imaging', unit: 'ha' },
      { name: 'Sensor Humedad SH-200', type: 'sensor', metric: 82.1, category: 'humidity', unit: '%' },
      { name: 'Sensor Temperatura ST-100', type: 'sensor', metric: 22.8, category: 'temperature', unit: '°C' }
    ]
  },
  {
    id: 'MON006',
    date: '2024-03-20',
    operator: 'Pedro Vargas',
    field: 'Lote Central',
    region: 'Boyacá',
    status: 'verified',
    equipment: [
      { name: 'Tractor New Holland T7', type: 'tractor', metric: 11.0, category: 'harvesting', unit: 'ha' },
      { name: 'Drone DJI Agras T40', type: 'drone', metric: 18.4, category: 'spraying', unit: 'ha' },
      { name: 'Sensor Luminosidad SL-50', type: 'sensor', metric: 3800, category: 'light', unit: 'lux' }
    ]
  },
  {
    id: 'MON007',
    date: '2024-04-02',
    operator: 'Ana Rodríguez',
    field: 'Lote Sur',
    region: 'Boyacá',
    status: 'verified',
    equipment: [
      { name: 'Sensor pH SP-300', type: 'sensor', metric: 6.5, category: 'ph', unit: 'pH' },
      { name: 'Sensor Humedad SH-200', type: 'sensor', metric: 71.4, category: 'humidity', unit: '%' },
      { name: 'Tractor John Deere 6M', type: 'tractor', metric: 6.3, category: 'tillage', unit: 'ha' },
      { name: 'Drone Parrot Bluegrass', type: 'drone', metric: 9.9, category: 'imaging', unit: 'ha' }
    ]
  },
  {
    id: 'MON008',
    date: '2024-04-17',
    operator: 'Luis Gómez',
    field: 'Lote Este',
    region: 'Tolima',
    status: 'pending',
    equipment: [
      { name: 'Drone DJI Agras T40', type: 'drone', metric: 22.5, category: 'spraying', unit: 'ha' },
      { name: 'Sensor Temperatura ST-100', type: 'sensor', metric: 27.3, category: 'temperature', unit: '°C' }
    ]
  },
  {
    id: 'MON009',
    date: '2024-05-08',
    operator: 'María Torres',
    field: 'Lote Oeste',
    region: 'Cundinamarca',
    status: 'verified',
    equipment: [
      { name: 'Sensor Luminosidad SL-50', type: 'sensor', metric: 5100, category: 'light', unit: 'lux' },
      { name: 'Tractor New Holland T7', type: 'tractor', metric: 8.8, category: 'harvesting', unit: 'ha' },
      { name: 'Sensor Humedad SH-200', type: 'sensor', metric: 59.7, category: 'humidity', unit: '%' }
    ]
  },
  {
    id: 'MON010',
    date: '2024-05-22',
    operator: 'Pedro Vargas',
    field: 'Lote Central',
    region: 'Tolima',
    status: 'verified',
    equipment: [
      { name: 'Drone DJI Agras T40', type: 'drone', metric: 25.0, category: 'spraying', unit: 'ha' },
      { name: 'Drone Parrot Bluegrass', type: 'drone', metric: 13.2, category: 'imaging', unit: 'ha' },
      { name: 'Sensor pH SP-300', type: 'sensor', metric: 6.9, category: 'ph', unit: 'pH' },
      { name: 'Tractor John Deere 6M', type: 'tractor', metric: 10.5, category: 'tillage', unit: 'ha' }
    ]
  },
  {
    id: 'MON011',
    date: '2024-06-10',
    operator: 'Carlos Mendoza',
    field: 'Lote Norte',
    region: 'Cundinamarca',
    status: 'verified',
    equipment: [
      { name: 'Sensor Temperatura ST-100', type: 'sensor', metric: 19.5, category: 'temperature', unit: '°C' },
      { name: 'Tractor New Holland T7', type: 'tractor', metric: 14.2, category: 'harvesting', unit: 'ha' }
    ]
  },
  {
    id: 'MON012',
    date: '2024-06-25',
    operator: 'Ana Rodríguez',
    field: 'Lote Sur',
    region: 'Boyacá',
    status: 'verified',
    equipment: [
      { name: 'Drone DJI Agras T40', type: 'drone', metric: 17.8, category: 'spraying', unit: 'ha' },
      { name: 'Sensor Humedad SH-200', type: 'sensor', metric: 88.2, category: 'humidity', unit: '%' },
      { name: 'Sensor Luminosidad SL-50', type: 'sensor', metric: 4600, category: 'light', unit: 'lux' },
      { name: 'Tractor John Deere 6M', type: 'tractor', metric: 7.9, category: 'tillage', unit: 'ha' }
    ]
  }
];
