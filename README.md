# ⚡ POKÉ-OH! — Duelo de Cartas Estratégico (Pokémon × Yu-Gi-Oh!)

> **Versión Actual:** `v0.3.3 Beta`  
> **Juego Web Oficial:** [https://pokeoh-admin.github.io/poke-oh/](https://pokeoh-admin.github.io/poke-oh/)  
> **Licencia & Motor:** Antigravity Duel Engine (Vanilla JS + HTML5 + CSS3 + Colyseus / Supabase)

**Poké-Oh!** es un juego de cartas coleccionables y estrategia por turnos en el navegador que fusiona los **151 Pokémon clásicos de Kanto**, **Megaevoluciones** y objetos multigeneración con las mecánicas tácticas de invocación, sacrificios, efectos activos, magias, equipos y cartas trampa de **Yu-Gi-Oh!**.

---

## 🎮 Características Principales

- **🃏 Más de 200 Cartas Jugables:**
  - **151 Pokémon de Kanto** divididos por etapas (*Básico*, *Etapa 1*, *Etapa 2* y *Legendario*) con requerimiento de sacrificios (Tributos) y evolución directa reducida.
  - **⚡ Efectos Activos de 1 Solo Uso:** Más del 30% de los Pokémon cuentan con habilidades tácticas únicas basadas en su elemento (devolver a la mano, bloquear ataques, congelar, quemar, robar cartas) accionables con el botón `EFECTO` en tu Fase Principal.
  - **🧬 14 Megaevoluciones con Side Deck:** Mazo lateral con transformaciones legendarias (Charizard X/Y, Mewtwo X/Y, Blastoise, Venusaur, Gengar, Alakazam, etc.) activables mediante la carta mágica *Megaevolución* sin ocupar espacio en tu baraja de 40 cartas.
  - **🪄 Magias Tácticas de Nivel Competitivo:** Hechizos de alto impacto inspirados en TCG profesional como *Ceniza Sagrada* (revivir de cementerio), *Muro Prismático* (escudo protector de 3 turnos), *Viento Feérico* (limpieza de M/T), *Fisura Sísmica* (destrucción de atacantes) y *Señuelo Telepático* (control mental).
  - **Cartas de Equipo y Trampas Secretas:** Objetos icónicos (*Cinta Elegida*, *Restos*, *Casco Dentado*) y trampas secretas boca abajo (*Protección*, *Manto Espejo*, *Contador*, *Paralizador*).
- **🔥 Tabla Elemental de Tipos:**
  - Bonificaciones tácticas de **+300 ATK/DEF** por ventaja de tipo elemental y penalizaciones por debilidad (*Fuego, Agua, Planta, Eléctrico, Psíquico, Fantasma, Dragón, Hada, Lucha, Roca, Tierra, Hielo, Veneno, Bicho y Normal*).
- **🎨 Diseños SVG Personalizados:**
  - Marcos frontales vectoriales temáticos exclusivos para cada tipo elemental, soportes y dorso oficial SVG con animaciones de combate.
- **⚔️ Modos de Juego:**
  - **Jugador vs IA (PvE):** Duelos individuales contra Blue con 3 niveles de dificultad (*Fácil, Medio y Difícil* con counter-deck dinámico), Puntos de Vida configurables y uso de efectos especiales.
  - **2 Jugadores Online (PvP 1v1):** Partidas en tiempo real punto a punto con **Colyseus WebSockets** y **Supabase Realtime**:
    - **Explorador de Salas Abiertas:** Búsqueda y listado interactivo en vivo de salas disponibles para unirse con 1 clic.
    - **Sorteo de Moneda 50/50:** Lanzamiento de moneda balanceado para decidir quién toma el primer turno.
    - **Selección Previa de Baraja:** Elección interactiva de tu mazo antes del combate.
    - **Panel de Acciones en Vivo:** Registro lateral visual mostrando en tiempo real cada movimiento del rival.
- **🔥💧🌱 Mazos Iniciales al Registrarse:**
  - Nuevos jugadores escogen entre 3 barajas equilibradas de 40 cartas (20 Básicos, 5 Invocaciones y 15 Soportes): *Furia Ígnea* (Charmander), *Torrente Abisal* (Squirtle) o *Selva Floral* (Bulbasaur).
- **🧰 Constructor de Barajas (Deck Builder):**
  - Personaliza hasta **5 barajas propias de 40 cartas** con stock ilimitado de 3 copias de cada carta existente y proporción oficial 20/5/15.
- **🛡️ Panel de Administración y Cuentas:**
  - Registro e inicio de sesión con persistencia en **Supabase** y almacenamiento local, estadísticas de duelos, rangos de duelista y panel exclusivo de admin con herramientas de bloqueo, reseteo de estadísticas y gestión de cuentas.

---

## 🚀 Cómo Jugar

1. Abre la página oficial del juego en tu navegador: **[Poké-Oh! Web](https://pokeoh-admin.github.io/poke-oh/)**
2. Registra tu cuenta de duelista o inicia sesión como invitado. Si es tu primera vez, elige tu baraja inicial (Fuego, Agua o Planta).
3. Personaliza tus barajas en el **Constructor de Barajas** o utiliza tus mazos temáticos preconstruidos.
4. Selecciona **Jugar vs IA** o **2 Jugadores Online** (con opción de explorar salas abiertas o crear sala privada con código).

---

## 📐 Reglas Rápidas del Duelo

1. **Puntos de Vida (LP):** Cada duelista comienza con **8000 LP** (configurable) y una mano inicial de **5 cartas** de un mazo de **40 cartas**.
2. **Límite de Mano (5 cartas):** Al finalizar tu turno no puedes tener más de **5 cartas** en la mano; si tienes 6 o más, deberás descartar el exceso al cementerio antes de ceder el turno.
3. **Invocación Normal y Sacrificios:**
   - **Básico:** Invocación directa sin tributos (0 sacrificios). Máximo 1 invocación normal por turno.
   - **Etapa 1:** Requiere sacrificar **1 Pokémon** de tu campo.
   - **Etapa 2 / Legendario:** Requiere sacrificar **2 Pokémon** de tu campo (reducido a 1 si sacrificas su pre-evolución directa).
4. **Efectos Activos (Botón ⚡ EFECTO):** Durante tu Fase Principal, selecciona tu Pokémon en el campo para activar su habilidad especial (1 uso por monstruo).
5. **Megaevolución:** Con el Pokémon base en tu campo, activa la carta mágica *Megaevolución* para convocar a tu monstruo supremo desde el Side Deck.
6. **Condiciones de Victoria:**
   - Reducir los **LP** del oponente a `0`.
   - Que el rival se quede sin cartas para robar en su baraja (**Deck Out**).
   - Rendición o abandono del oponente en partidas online.

---

## 📜 Registro de Cambios (Changelog)

### 🍪 v0.3.3 Beta (25 de Octubre de 2026) — Persistencia de Sesión, Configuración de Audio y Optimización de Barajas
- 🍪 **Persistencia Automática de Sesión:** Mayor comodidad al acceder al juego. Tu sesión activa se mantiene disponible al reabrir o recargar la página, eliminando la necesidad de ingresar credenciales en cada visita.
- 🔊 **Memoria de Preferencias de Audio:** Los niveles de volumen (General, Música de Fondo y Efectos), silenciador y selección de idioma se conservan automáticamente entre sesiones.
- 🎴 **Estandarización de Barajas Temáticas:** Sincronización y actualización de barajas equilibradas de 40 cartas (Fuego, Agua y Planta) en las cuentas de usuario, garantizando acceso directo a mazos estructurados para duelos inmediatos.
- 🚀 **Inicio Limpio y Fluido:** Optimización en la secuencia de carga inicial, permitiendo explorar el juego y solicitando autenticación únicamente al ingresar a modalidades que lo requieran.

---

### 🪤 v0.3.2 Beta (24 de Octubre de 2026) — Selección de Múltiples Trampas y Limpieza de Interfaz
- 🪤 **Selección Interactiva de Múltiples Trampas:** Si el jugador defensor tiene varias cartas trampa preparadas boca abajo al momento en que se declara un ataque, el sistema despliega un menú interactivo para elegir con precisión cuál activar o si prefiere reservarlas.
- 🃏 **Claridad de Acción para Trampas en Mano:** Al seleccionar una carta trampa en mano, la interfaz aclara de forma didáctica su colocación boca abajo en el campo para su posterior activación en el turno rival.
- 🖥️ **Aislamiento de Pantallas en Modo Online:** Transición limpia e independiente entre el menú de emparejamiento, el explorador de salas y la sala de espera, eliminando solapamientos de interfaz.
- 🔄 **Actualización Dinámica de Salas:** Control estilizado y optimizado para refrescar la lista de partidas disponibles en tiempo real.
- 🧹 **Navegación Unificada:** Flujo simplificado y accesible para cancelar esperas o retornar al menú principal con un solo clic.

---

### ⚡ v0.3.1 Beta (24 de Octubre de 2026) — Interfaz Horizontal, Indicadores de Efecto y Correcciones
- 🖥️ **Interfaz Horizontal 2 Jugadores:** Rediseño panorámico del menú multijugador en 2 columnas equilibradas (barajas a la izquierda y modos de juego 2x2 a la derecha), eliminando scroll vertical excesivo en pantallas panorámicas.
- ⚡ **Indicador de Efecto en el Frente de las Cartas:** Las criaturas con habilidades activas lucen ahora un distintivo visible de rayito dorado (`⚡`) con animación de pulso que se atenúa una vez consumido su uso por estancia en campo.
- 🐛 **Corrección en Efectos de Estadísticas (Eevee y Aerodactyl):** Corregido el cálculo en habilidades dinámicas para asegurar la asignación correcta y balanceada de aumentos de ATK y DEF en combate.
- 📖 **Inspector de Cartas Enriquecido:** Guía detallada con modo de uso explícito para cartas Mágicas, de Equipo y Trampas, y bloque destacado de efectos activos en monstruos.
- 🛡️ **Blindaje de Estadísticas:** Protección contra valores indefinidos o nulos en las funciones de cálculo de estadísticas de combate en el tablero.

---

### 🌟 v0.3.0 Beta (24 de Octubre de 2026) — Gran Actualización TCG & Tácticas
- ⚡ **Efectos Activos de Monstruos:** Más del 30% de los Pokémon ahora cuentan con habilidades tácticas de 1 solo uso mediante el botón `EFECTO` en tu Fase Principal.
- 🧬 **14 Megaevoluciones & Side Deck:** Nuevo Side Deck independiente con 14 formas legendarias activables con la carta mágica *Megaevolución*, incluyendo selector visual de ramas para Charizard y Mewtwo.
- 🪄 **8 Nuevas Cartas Mágicas Tácticas:** Cartas de alto impacto como revivir del cementerio (*Ceniza Sagrada*), escudo por 3 turnos (*Muro Prismático*), barrido de trampas (*Viento Feérico*), destrucción masiva (*Fisura Sísmica*), robo acelerado (*Cofre Reliquia*) y control de monstruo rival (*Señuelo Telepático*).
- 🔥💧🌱 **Selección de Mazo Inicial:** Nuevos entrenadores escogen entre barajas equilibradas de 40 cartas de Fuego, Agua o Planta al registrarse.
- 🌐 **Explorador de Salas JcJ en Vivo:** Búsqueda y listado interactivo en tiempo real de partidas abiertas en 2 Jugadores con un solo clic.
- 🛡️ **Herramientas de Moderación y Soporte:** Herramientas de gestión y seguridad para perfiles de usuario, garantizando un entorno balanceado y confiable.
- 📜 **Pestaña de Notas de Versión en el Juego:** Vista interactiva de novedades dentro del modal de reglas y acceso directo desde el botón de versión del Menú Principal.

---

### 🌐 v0.2.0 Beta (23 de Octubre de 2026) — Gran Actualización Multijugador Realtime
- 🌐 **Multijugador en Línea:** Duelos JcJ 1v1 en tiempo real con sincronización de estado y emparejamiento interactivo.
- 🎴 **Elección Previa de Baraja:** Selector interactivo para escoger cuál de tus barajas usar antes de comenzar el duelo contra otro jugador.
- 🪙 **Sorteo de Moneda 50/50:** Azar balanceado al iniciar para definir limpiamente quién juega el primer turno.
- 📜 **Panel Lateral de Acciones:** Registro visual a la derecha que muestra en vivo todas las jugadas del rival durante su turno.
- 🔔 **Aviso de Cambio de Turno Gigante:** Cartel animado de alta visibilidad para identificar el cambio de turno al instante.
- 🐛 **Sincronización de Trampas y M/T:** Corrección del comportamiento de activación de trampas defensivas y resolución adecuada de cartas de soporte tras su uso.
- 🪦 **Contadores Sincronizados:** Vista precisa del número de cartas en el mazo y cementerio para ambos duelistas.
- 🏳️ **Penalización por Abandono:** Salir de una partida JcJ en curso concede automáticamente la victoria al rival y registra derrota propia.
- 🖥️ **Pantalla Completa en PC:** Optimización del modo pantalla completa para maximizar en cualquier navegador de escritorio.

---

### 📱 v0.1.3 Beta (22 de Octubre de 2026) — Fluidez y Control Táctil
- 📱 **Invocación Táctil Protegida:** Modal de confirmación al presionar una carta en móviles y tablets para evitar invocaciones accidentales.
- 🛑 **Trampas Interactivas:** Pregunta de confirmación al usuario antes de disparar una trampa cuando el rival declara un ataque.
- ⚔️ **Animación de Combate Pausada:** Ralentización visual del ataque y resaltado gráfico claro del Pokémon atacante y su objetivo.

---

### 🛡️ v0.1.2 Beta (21 de Octubre de 2026) — Depuración de Acciones y Posiciones
- 🛡️ **Menú de Acción Limpio:** Eliminada la opción redundante de defender en cartas de monstruo; solo se muestra la acción Atacar.
- 🔒 **Bloqueo de Posición en Batalla:** Las cartas no pueden alternar entre ataque y defensa durante la Fase de Batalla ni en el turno del rival.

---

### 📱 v0.1.1 Beta (21 de Octubre de 2026) — Optimización para Celulares y Tablets
- 📱 **Mayor Visibilidad Móvil:** Números de ATK y DEF aumentados y optimizados para celulares y tablets.
- 🔄 **Rotación en Defensa:** Las cartas se orientan horizontalmente de forma realista al colocarse en modo de Defensa.
- ⚠️ **Alerta de Invocación Única:** Mensaje claro de advertencia cuando se intenta invocar más de un monstruo normal por turno.
- 📱 **Ajuste de Altura de Menú:** Optimización del scroll en el menú previo para visualizar el botón "!Comenzar Duelo!".
- 🖼️ **Icono de Fullscreen:** Restaurado el icono gráfico para salir de pantalla completa.

---

### 🚀 v0.1.0 Beta (20 de Octubre de 2026) — Lanzamiento Inicial Poké-Oh!
- 🎴 **Lanzamiento Base:** Tablero de juego interactivo con 5 zonas de monstruos, 5 zonas de magias/trampas, mano y cementerio.
- ⚡ **151 Pokémon de Kanto:** Colección completa con atributos elementales, estadísticas de combate y sistema de sacrificios para Fase 1 y Fase 2.
- ✨ **Ventaja Elemental (±300):** Tabla de tipos con bonificación y penalización en cálculos de combate.
- 🪄 **Cartas de Soporte:** Pociones curativas, objetos de equipo permanentes y cartas trampa secretas boca abajo.
- 🤖 **Modo Duelo contra Blue:** IA con 3 niveles de dificultad (Fácil, Medio, Difícil) y Puntos de Vida configurables.
- 🎴 **Deck Builder:** Creador de barajas personalizado con soporte para 5 mazos de 40 cartas y regla 20/5/15.

---

### 📌 Política de Versionado Semántico
El proyecto sigue el estándar de versionado semántico:
* **Grandes Actualizaciones (`Major / Feature`):** Incrementan el segundo dígito (ej: `0.1.0` ➔ `0.2.0` ➔ `0.3.0`) cuando se incorporan nuevas mecánicas clave, sistemas de juego o arquitecturas de red.
* **Parches y Ajustes (`Patch / Fix`):** Incrementan el tercer dígito (ej: `0.1.0` ➔ `0.1.1` ➔ `0.1.2`) para correcciones visuales, calibración de controles o afinamiento de interfaz.
* **Mantenimiento Continuo:** En toda nueva actualización se actualizará de forma simultánea:
  1. La constante de versión en el motor (`src/js/logica.js`) y las etiquetas en `index.html`.
  2. La pestaña interactiva `#tab-rules-changelog` dentro del cliente del juego.
  3. La sección de **Changelog** de este `README.md`.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5 Semántico, CSS3 Modular (Flexbox / Grid / Variables), JavaScript ES6+ Vanilla.
- **Gráficos & Arte:** Diseños frontales vectoriales SVG, arte oficial de PokeAPI y sprites animados de Pokémon Blanco/Negro.
- **Audio:** Web Audio API, gritos oficiales Pokémon Showdown y bandas sonoras remasterizadas de Pokémon Esmeralda en bucle continuo.
- **Base de Datos & Auth:** Supabase (PostgreSQL, Row Level Security, REST API y caché reactivo en `localStorage`).
- **Multijugador Realtime:** Supabase Realtime (Presence & Broadcast) + Servidor Node.js con Colyseus WebSockets (`@colyseus/ws-transport`).
