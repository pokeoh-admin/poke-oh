# ⚡ POKÉ-OH! — Duelo de Cartas Estratégico (Pokémon × Yu-Gi-Oh!)

**Poké-Oh!** es un juego de cartas coleccionables y estrategia por turnos en el navegador que fusiona los **151 Pokémon clásicos de Kanto** y objetos multigeneración con las mecánicas tácticas de invocación, sacrificios, magias, equipos y cartas trampa de **Yu-Gi-Oh!**.

---

## 🎮 Características Principales

- **🃏 Más de 190 Cartas Jugables:**
  - **151 Pokémon de Kanto** divididos por etapas (*Básico*, *Etapa 1*, *Etapa 2* y *Legendario*) con requerimiento de sacrificios (Tributos) para evoluciones superiores y legendarios.
  - **Cartas Mágicas, de Equipo y de Trampa** inspiradas en objetos icónicos de la saga (*Master Ball*, *Poción Máxima*, *Caramelo Raro*, *Manto Espejo*, *Fuerza Espejo*, *Restos*, etc.).
- **🔥 Tabla Elemental de Tipos:**
  - Bonificaciones tácticas de **+300 ATK/DEF** por ventaja de tipo elemental y penalizaciones por debilidad (*Fuego, Agua, Planta, Eléctrico, Psíquico, Fantasma, Dragón, Hada, Lucha, Roca, Tierra, Hielo, Veneno, Bicho y Normal*).
- **🎨 Diseños SVG Personalizados:**
  - Marcos frontales vectoriales exclusivos para cada tipo elemental de Pokémon, cartas mágicas, de equipo y de trampa, además de dorso oficial en SVG.
- **⚔️ Modos de Juego:**
  - **Jugador vs IA (PvE):** Duelos contra el rival Blue con niveles de dificultad configurables (*Fácil, Medio y Difícil*) y puntos de vida ajustables.
  - **2 Jugadores Online (PvP 1v1):** Partidas en tiempo real mediante **Supabase Realtime** y/o **Colyseus** (Partida Rápida, Salas Privadas con código de 4 caracteres y detección de desconexión/abandono).
- **🧰 Constructor de Barajas (Deck Builder):**
  - Crea, personaliza y guarda hasta **5 mazos propios de 40 cartas** (20 Pokémon Básicos, 5 Evoluciones/Invocaciones y 15 Cartas Mágicas/Equipo/Trampa) sincronizados con tu cuenta de usuario.
- **👤 Cuentas de Usuario y Estadísticas en la Nube:**
  - Sistema de registro e inicio de sesión conectado a **Supabase (PostgreSQL)** con registro de victorias, derrotas, porcentaje de victoria, puntos de liga, rangos de duelista y mazos en la nube.

---

## 🚀 Cómo Jugar

### Opción 1: Directamente en el navegador (Cloud / GitHub Pages)
1. Abre [`index.html`](./index.html) en tu navegador o accede mediante la URL de **GitHub Pages**.
2. Registra tu cuenta de duelista o inicia sesión.
3. Personaliza tus barajas en el **Constructor de Barajas** o elige uno de los 5 mazos temáticos preconstruidos.
4. Selecciona **Jugar vs IA** o **2 Jugadores Online**.

### Opción 2: Servidor Local con Node.js
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor local (http://localhost:2567)
npm start
```

---

## 📐 Reglas Rápidas del Duelo

1. **Puntos de Vida (LP):** Cada duelista comienza con **8000 LP** (configurable) y una mano inicial de **5 cartas** de un mazo de **40 cartas**.
2. **Límite de Mano:** Al finalizar tu turno no puedes tener más de **5 cartas** en la mano; si tienes 6 o más, deberás descartar el exceso al cementerio.
3. **Invocación Normal y Sacrificios:**
   - **Básico:** Invocación directa (0 sacrificios).
   - **Etapa 1:** Requiere sacrificar **1 Pokémon** de tu campo.
   - **Etapa 2 / Legendario:** Requiere sacrificar **2 Pokémon** de tu campo.
4. **Condiciones de Victoria:**
   - Reducir los **LP** del oponente a `0`.
   - Que el rival se quede sin cartas para robar en su mazo (**Deck Out**).
   - Rendición o desconexión del oponente en partidas online.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript ES6+, gráficos SVG dinámicos y Web Audio API + PokeAPI Sprites/Cries.
- **Base de Datos y Autenticación:** Supabase (PostgreSQL + REST API + `localStorage` caché).
- **Multijugador en Tiempo Real:** Supabase Realtime (Broadcast & Presence) / Node.js + Express + Colyseus WebSockets.
