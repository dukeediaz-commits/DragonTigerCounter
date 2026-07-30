# 🐉 Dragon Tiger Counter v2 🐅

Aplicación inteligente para contar cartas en Dragon Tiger en Jugabet.

## ✨ Características

- **Input de datos históricos**: ingresa números de sesiones anteriores
- **Conteo en vivo**: suma datos históricos + cartas que salen ahora
- **True Count automático**: recalcula cada vez que agregas una carta
- **Señales inteligentes**: 🐉 DRAGÓN, 🐅 TIGRE, ⏸️ ESPERA
- **Solo apuestas ganadoras**: GANÉ/PERDÍ registra solo cuando apostaste
- **Estadísticas detalladas**: porcentajes, acierto, tendencias
- **Sin dependencias**: HTML, CSS y JavaScript vanilla
- **Optimizado para celular**: muy rápido, un dedo

## 🎮 Cómo usar

### SETUP (Primera vez o nueva sesión)
1. Abre la app
2. **Ingresa datos históricos** (de Jugabet):
   - Dragones: `136`
   - Tigres: `146`
   - Empates: `18`
3. Toca **"▶️ COMENZAR SESIÓN"**

### DURANTE EL JUEGO
1. **Toca el botón de cada carta** que sale:
   - 🐉 (Dragón)
   - 🐅 (Tigre)
   - E (Empate)

2. **Lee la SEÑAL** (pantalla grande):
   - 🐉 **Rojo** = APUESTA A DRAGÓN (True Count >= +4)
   - 🐅 **Amarillo** = APUESTA A TIGRE (True Count <= -4)
   - ⏸️ **Verde** = ESPERA (True Count entre -3 y +3)

3. **Cuando la señal te dice que apuestes**, toca DRAGÓN/TIGRE en Jugabet

4. **Registra el resultado**:
   - Tocá ✓ GANÉ (si ganaste)
   - Tocá ✗ PERDÍ (si perdiste)

5. **Sigue contando** más cartas

### ESTADÍSTICAS
- Toca **"📊 Estadísticas"** para ver porcentajes y acierto
- La app te dice dónde ganas más

## 📊 Estadísticas

La app guarda automáticamente:
- Total de manos jugadas
- Manos ganadas/perdidas
- Balance (running count actual)
- Mazos restantes en el zapato
- True Count (el número que importa)

## 🔧 Instalación en GitHub

1. **Crear un nuevo repo**: `DragonTigerCounter`
2. **Clonar**:
   ```bash
   git clone https://github.com/TU_USUARIO/DragonTigerCounter.git
   cd DragonTigerCounter
   ```
3. **Copiar los archivos**:
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`

4. **Push a GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit: Dragon Tiger Counter"
   git push origin main
   ```

5. **Habilitar GitHub Pages**:
   - Ve a Settings del repo
   - Activa GitHub Pages en `main` branch
   - La app estará en: `https://TU_USUARIO.github.io/DragonTigerCounter`

## 📱 Usar desde el navegador del celular

- **URL**: `https://TU_USUARIO.github.io/DragonTigerCounter`
- O abre `file://` si lo tienes localmente
- La app funciona **offline** una vez cargada

## 💡 Estrategia básica

- **True Count > +4**: Dragón tiene ventaja (cartas altas salieron)
- **True Count < -4**: Tigre tiene ventaja (cartas bajas salieron)
- **True Count cerca de 0**: Margen de la casa (no apostar)

## 🗑️ Datos guardados

Los datos se guardan en:
- **localStorage** del navegador (no se borran al cerrar)
- Para limpiar: usa el botón "🗑️ Limpiar Historial"
- O borra datos del navegador (Ajustes > Datos del navegador)

## ⚙️ Personalización

Puedes editar:
- `style.css` para cambiar colores/tamaño
- `app.js` para cambiar señales de True Count
- `index.html` para agregar más botones

## ⚠️ Disclaimer

Esta app es para **educación/análisis** en juegos de azar. 
- No garantiza ganancias
- Úsala bajo tu propio riesgo
- Contar cartas puede estar prohibido en algunos casinos (online generalmente no, pero verifica)

## 🐛 Bugs / Mejoras

Si encuentras problemas, reporta en Issues del repo.

---

**Made for Dragon Tiger in Jugabet 🎰**
