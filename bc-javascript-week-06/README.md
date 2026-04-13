# 🌱 Week-06 – Validador de Formularios AgroTech

**Autor:** Javier Pérez  
**Programa:** Desarrollo de Software – SENA  
**Dominio:** Agricultura y AgroTech  
**Semana:** 06 – Expresiones Regulares y Métodos de Strings

---

## 📋 Descripción

Formulario de registro de operadores AgroTech con validación completa en tiempo real usando expresiones regulares (RegExp) y métodos modernos de strings. Incluye validaciones comunes y campos específicos del dominio agrícola, con feedback visual inmediato y medidor de fortaleza de contraseña.

---

## 🎯 Objetivos Alcanzados

| Objetivo | Estado |
|----------|--------|
| Crear patrones RegExp para validación de datos | ✅ |
| Implementar validación en tiempo real con eventos | ✅ |
| Usar grupos de captura nombrados para extraer datos | ✅ |
| Aplicar template literals para mensajes dinámicos | ✅ |
| Sanitizar inputs para prevenir XSS | ✅ |
| Formateo automático de teléfono y código de lote | ✅ |
| Medidor de fortaleza de contraseña | ✅ |

---

## 🔧 Patrones RegExp Implementados

| Campo | Patrón | Descripción |
|-------|--------|-------------|
| **Nombre** | `/^[a-záéíóúüñA-Z\s]{2,50}$/` | Solo letras (con tildes y ñ) y espacios |
| **Email** | `/^(?<user>...)@(?<domain>...)\.(?<tld>...)$/` | Con grupos nombrados para extraer partes |
| **Teléfono** | `/^\+57[\s]?\d{3}[\s]?\d{3}[\s]?\d{4}$/` | Formato colombiano +57 |
| **Contraseña** | `/^.{8,}$/` + criterios individuales | Fortaleza evaluada por criterios |
| **Código de lote** | `/^LOT-\d{4}-\d{3}$/` | Formato AgroTech: LOT-YYYY-NNN |
| **Hectáreas** | `/^\d{1,4}(\.\d{1,2})?$/` | Decimal positivo 0.1–9999.99 |
| **GPS** | `/^(?<lat>-?\d{1,2}(\.\d+)?),(?<lng>-?\d{1,3}(\.\d+)?)$/` | Coordenadas con grupos nombrados |

---

## 🌾 Campos del Formulario

### Campos Comunes
- **Nombre completo** — Solo letras y espacios, 2-50 chars. Formatea automáticamente a Title Case
- **Correo electrónico** — Formato estándar con grupos nombrados que muestran usuario y dominio detectados
- **Teléfono** — Formato colombiano +57, se auto-formatea a `+57 XXX XXX XXXX`
- **Contraseña** — Mínimo 8 chars con barra de fortaleza visual (débil / media / fuerte)
- **Confirmar contraseña** — Verificación en tiempo real de coincidencia

### Campos Específicos AgroTech
- **Código de lote** — Formato `LOT-YYYY-NNN`, se convierte automáticamente a mayúsculas
- **Área (hectáreas)** — Número decimal entre 0.1 y 9999.99
- **Coordenadas GPS** — Formato `latitud,longitud` con validación de rangos geográficos

---

## 💡 Técnicas Clave

### Grupos de captura nombrados
```javascript
const emailPattern = /^(?<user>[a-zA-Z0-9._%+-]+)@(?<domain>[a-zA-Z0-9.-]+)\.(?<tld>[a-zA-Z]{2,})$/;

const match = emailPattern.exec('operador@agrotech.co');
const { user, domain, tld } = match.groups;
// user: 'operador', domain: 'agrotech', tld: 'co'
```

### Sanitización XSS
```javascript
function sanitizeInput(input) {
  return String(input)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
```

### Medidor de fortaleza
```javascript
function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8)          score++;
  if (password.length >= 12)         score++;
  if (/[a-z]/.test(password))        score++;
  if (/[A-Z]/.test(password))        score++;
  if (/\d/.test(password))           score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  return score; // 0-6
}
```

### Formateo automático de teléfono
```javascript
const digits = cleaned.replace('+57', '');
const formatted = `+57 ${digits.slice(0,3)} ${digits.slice(3,6)} ${digits.slice(6)}`;
```

---

## 📁 Estructura del Proyecto

```
bc-javascript-week-06/
├── index.html              # Formulario de registro
├── styles.css              # Estilos con estados válido/inválido
├── README.md               # Este archivo
├── starter/
│   └── script.js           # ← Código con TODOs para practicar
└── solution/
    └── script.js           # ← Solución completa de referencia
```

---

## 🚀 Cómo Ejecutar

1. Abre con **Live Server** en VS Code
2. Completa el formulario para ver la validación en tiempo real
3. El botón "Registrar Operador" solo se habilita cuando todos los campos son válidos
4. Al enviar, se muestra un resumen con los datos sanitizados

---

## 📝 Criterios de Evaluación Cubiertos

| Criterio | Puntos | Estado |
|----------|--------|--------|
| Todos los campos se validan correctamente | 15 pts | ✅ |
| Mensajes de error específicos y útiles | 10 pts | ✅ |
| Validación en tiempo real | 10 pts | ✅ |
| Formateo automático funciona | 5 pts | ✅ |
| RegExp correctas y eficientes | 15 pts | ✅ |
| Uso de métodos modernos de strings | 10 pts | ✅ |
| Código limpio y organizado (DRY) | 5 pts | ✅ |
| Feedback visual claro | 10 pts | ✅ |
| Medidor de fortaleza de contraseña | 10 pts | ✅ |
| No permite envío si hay errores | 5 pts | ✅ |
| Sanitización implementada | 5 pts | ✅ |
| **Total** | **100 pts** | ✅ |

---

_Week-06 · JavaScript Moderno Bootcamp · SENA · Javier Pérez_
