# 🐉 Dragon Tiger Counter 🐅

Aplicación minimalista para contar cartas en Dragon Tiger en Jugabet.

## ✨ Características

- **Conteo automático** de cartas (Running Count + True Count)
- **Señales claras**: cuándo apostar a Dragón, Tigre o esperar
- **Registro de resultados**: manos jugadas, ganancias/pérdidas
- **Persistencia**: guarda datos en localStorage (no se pierden al cerrar)
- **Diseño optimizado para celular**: fácil de usar con una mano
- **Sin dependencias externas**: HTML, CSS y JavaScript vanilla

## 🎮 Cómo usar

1. **Abre la app en el segundo celular** (mientras juegas Dragon Tiger en el primero)
2. **Toca el botón de cada carta** que sale:
   - 🐉 DRAGÓN
   - 🐅 TIGRE
   - EMPATE
3. **Lee la señal**:
   - Rojo 🐉 = Apuesta a DRAGÓN (True Count >= +4)
   - Amarillo 🐅 = Apuesta a TIGRE (True Count <= -4)
   - Verde ⏸️ = Espera o apuesta mínimo (True Count entre -3 y +3)
4. **Registra los resultados**: toca ✓ GANÉ o ✗ PERDÍ
5. **Cuando veas el DIVISOR**: toca "🔁 Mezcla"

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
