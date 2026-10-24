# DOCUMENTACIÓN TÉCNICA Y GUÍA DE DESARROLLO — POKÉ-OH! 🎴⚡

> **Proyecto:** Poké-Oh! — Duelo Estratégico de Cartas (Pokémon x Yu-Gi-Oh!)  
> **Versión Actual:** 0.3.0 Beta (Efectos Activos de Monstruos + Megaevoluciones Side Deck + 8 Magias Tácticas + Mazos Iniciales + Explorador de Salas Realtime + Panel Admin Avanzado)  
> **Arquitectura:** Pure Vanilla JavaScript (ES6+), HTML5 Semántico, CSS3 Modular (Variables CSS, Flexbox, Grid), WebSockets (Colyseus v0.18) y Cloud Realtime (Supabase v2).  
> **Dependencias Externas:** Colyseus Client (`lib/colyseus.js`) y Supabase JS (`lib/supabase.js`) incluidos localmente sin dependencias en runtime cliente.  
> 
> 📌 **Protocolo Obligatorio de Versionado y Changelogs:**  
> En toda nueva versión, parche o ampliación del juego, es mandatario y estricto actualizar simultáneamente:  
> 1. La constante de versión del motor (`POKEOH_VERSION` en `src/js/logica.js`) y las etiquetas visuales en `index.html`.  
> 2. El registro interactivo de cambios en la interfaz (`#tab-rules-changelog`).  
> 3. El manual técnico integral en este archivo (`DOCUMENTACION_TECNICA.md`), registrando los cambios en la sección de Historial de Versiones.

---

## 1. INTRODUCCIÓN Y ARQUITECTURA GENERAL

**Poké-Oh!** es un simulador de juego de cartas coleccionables por turnos que fusiona la profundidad de combate y fases de *Yu-Gi-Oh!* con las criaturas, tipos elementales, evoluciones e ítems de *Pokémon*.

### Estructura del Árbol de Archivos:
```text
poke-oh/
│
├── index.html                   # Marcador semántico principal: tablero, modales, inspector, galería
├── server.js                    # Servidor web Node.js y Colyseus (puerto 2567)
├── DOCUMENTACION_TECNICA.md     # Manual técnico integral para desarrolladores
├── package.json                 # Dependencias y scripts del proyecto
├── lib/
│   └── colyseus.js              # Bundle cliente Colyseus para WebSockets
├── rooms/
│   └── PokeOhRoom.js            # Lógica autoritativa de sala multijugador online
└── src/
    ├── css/
    │   └── style.css            # Estilos visuales: tablero, cartas, animaciones y responsive
    ├── img/
    │   ├── back.svg             # Dorso vectorial oficial de cartas Poké-Oh (.SVG)
    │   ├── front_fuego.svg      # Frontal vectorial temático de Fuego
    │   ├── front_agua.svg       # Frontal vectorial temático de Agua
    │   ├── front_planta.svg     # Frontal vectorial temático de Planta
    │   ├── front_electrico.svg  # Frontal vectorial temático de Eléctrico
    │   ├── front_tierra.svg     # Frontal vectorial temático de Tierra
    │   ├── front_roca.svg       # Frontal vectorial temático de Roca
    │   ├── front_hielo.svg      # Frontal vectorial temático de Hielo
    │   ├── front_lucha.svg      # Frontal vectorial temático de Lucha
    │   ├── front_veneno.svg     # Frontal vectorial temático de Veneno
    │   ├── front_psiquico.svg   # Frontal vectorial temático de Psíquico
    │   ├── front_bicho.svg      # Frontal vectorial temático de Bicho
    │   ├── front_fantasma.svg   # Frontal vectorial temático de Fantasma
    │   ├── front_dragon.svg     # Frontal vectorial temático de Dragón
    │   ├── front_hada.svg       # Frontal vectorial temático de Hada
    │   ├── front_normal.svg     # Frontal vectorial temático de Normal
    │   ├── front_equipo.svg     # Frontal vectorial temático de Cartas de Equipo
    │   ├── front_magia.svg      # Frontal vectorial temático de Cartas Mágicas
    │   └── front_trampa.svg     # Frontal vectorial temático de Cartas de Trampa
    └── js/
        ├── cartas.js            # Base de datos completa: 151 Pokémon + Ítems de soporte
        ├── generar_cartas.js    # Generador automatizado de la base de datos de cartas
        ├── generar_front_svgs.js# Generador de los 18 diseños frontales vectoriales SVG
        └── logica.js            # Motor de reglas, combate, IA, audio, mazos y eventos
```

### Principios Arquitectónicos Clave:
1. **Single Source of Truth para Cartas (`src/js/cartas.js`):** La base de datos `bdCartas` contiene todas las definiciones originales.
2. **Dorso y Frontales Vectoriales Oficiales (`src/img/*.svg`):**
   * El reverso de todas las cartas utiliza el arte vectorial SVG de `src/img/back.svg`.
   * El anverso de cada carta cuenta con un marco temático vectorial exclusivo (`front_[tipo].svg` para los 15 elementos Pokémon, `front_equipo.svg`, `front_magia.svg` y `front_trampa.svg`) garantizando legibilidad, efectos metálicos, crestas elementales y ambientación estética única.
3. **Inmutabilidad de Estadísticas Base:** Para evitar que mejoras de cartas de equipo persistan tras finalizar una partida, se almacena una instantánea inmutable en `statsBaseOriginales` y se invoca `restaurarStatsBase()` al iniciar y reiniciar partidas.
4. **Persistencia Local (`localStorage`):** La configuración del usuario (audio, idioma, dificultad) y las 5 barajas personalizadas se almacenan y recuperan de forma reactiva y con tolerancia a fallos (`pokeoh_custom_decks_v3`).
5. **Motor de Render Reactivo:** Cada actualización del estado (`estadoJugador`, `estadoOponente`, `estadoJuego`) dispara funciones dedicadas de render (`renderizarCampoJugador`, `renderizarCampoOponente`, `renderizarMano`, `actualizarUIFases`, `actualizarMarcadorLateral`).
6. **Jerarquía de Capas (Z-Index) e Inicialización Inmediata:** La interfaz utiliza un sistema de apilamiento ordenado donde los modales (`.modal-overlay` a `z-index: 60000`, modales hijos como Deck Builder a `65000` y avisos a `70000`) se sitúan siempre por encima del menú inicial (`.main-menu-overlay` a `40000`). La inicialización se ejecuta de inmediato en `DOMContentLoaded` para evitar bloqueos por carga de recursos multimedia externos.

---

## 2. MODELO DE DATOS Y DEFINICIÓN DE CARTAS (`src/js/cartas.js`)

El archivo `src/js/cartas.js` define el objeto global `bdCartas` indexado por el ID numérico de cada carta.

### 2.1. Estructura de Carta de Monstruo (Pokémon IDs 1 al 151)
```javascript
{
  id: 6,                                 // Identificador numérico único (Pokedex Kanto)
  nombre: "Charizard",                   // Nombre oficial
  slug: "charizard",                     // Identificador para llamadas a API de gritos/audio
  tipoCarta: "monstruo",                 // Tipo principal: 'monstruo'
  elemento: "fuego",                     // Tipo elemental (fuego, agua, planta, etc.)
  etapa: "Fase 2",                       // 'Básico', 'Fase 1' o 'Fase 2'
  sacrificios: 2,                        // Monstruos requeridos como tributo genérico (reducido a 1 con Charmeleon)
  atk: 2800,                             // Puntos de Ataque (ATK)
  def: 2300,                             // Puntos de Defensa (DEF)
  esLegendario: false,                   // Flag de rareza legendaria
  imagenOficial: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
  spriteCampo: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/6.gif",
  spriteEstatico: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
  descripcion: "Evolución Suprema. Escupe llamaradas capaces de derretir rocas enormes.",
  descripcionCorta: "Fase 2: Requiere 2 Sacrificios (o 1 si es Charmeleon)"
}
```

### 2.2. Estructura de Cartas de Soporte (Magias, Equipos y Trampas IDs 201 al 243)
```javascript
{
  id: 220,
  nombre: "Cinta Elegida",
  tipoCarta: "magia",                    // 'magia' o 'trampa'
  subtipo: "Objeto",                     // 'Objeto', 'curacion', 'evolucion', 'equipo', 'trampa'
  descripcion: "Aumenta el ATAQUE de un Pokémon seleccionado en +500 puntos de forma permanente.",
  imagenOficial: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/choice-band.png"
}
```

#### Categorización de Soporte:
- **Magias y Pociones (IDs 201–215):** Curación instantánea (+500, +1000, +2000 LP), robo de cartas (Carta del Profesor, Poké Ball, Super Ball, Ultra Ball), revivir del cementerio (Revivir, Revivir Máximo), y piedras evolutivas que otorgan buffs permanentes (+400/+400).
- **Cartas de Equipo (IDs 220–230):** Cinta Elegida (+500 ATK), Pañuelo Seda (+300 ATK), Restos (+400 DEF), Casco Dentado (+500 DEF), Chaleco Asalto (+600 DEF), Perla Grande (+400/+400), Vidasfera (+700 ATK), etc.
- **Cartas Trampa (IDs 240–243):** Protección (cancela ataque rival), Manto Espejo (refleja el 100% del daño al rival), Contador (contraataque de 800 LP fijos), Paralizador (inmoviliza al atacante).

---

## 3. MÁQUINA DE ESTADOS Y CONTROL DE FLUJO (`src/js/logica.js`)

### 3.1. Objetos Centrales de Estado

#### `estadoJuego`
```javascript
{
  turno: 1,                              // Número de turno actual
  turnoDe: 'jugador',                    // 'jugador' (Red) | 'oponente' (Blue)
  faseActual: 'PRINCIPAL',               // 'ROBO' | 'PRINCIPAL' | 'BATALLA' | 'FIN'
  atacanteSeleccionado: null,            // Slot index del monstruo atacante en fase de batalla
  haInvocadoMonstruoEsteTurno: false     // Restricción: máximo 1 invocación normal por turno
}
```

#### `estadoJugador` / `estadoOponente`
```javascript
{
  lp: 8000,                              // Puntos de Vida (configurables de 1000 a 20000)
  mano: [],                              // Array de IDs de cartas en mano
  zonaMonstruos: [null, null, null, null, null],      // 5 casillas de monstruo
  zonaMagiasTrampas: [null, null, null, null, null],  // 5 casillas de magias/trampas
  cementerio: [],                        // Array de IDs de cartas destruidas o usadas
  mazo: []                               // Array de 40 IDs de cartas restantes en la baraja
}
```

### 3.2. Fases del Turno e Invocaciones
1. **Fase de Robo (`ROBO`):** Se roba automáticamente 1 carta de la baraja. Si la baraja está vacía, se pierde por *Deck Out*.
2. **Fase Principal (`PRINCIPAL`):**
   - Invocación de monstruos: Solo **1 monstruo por turno** (Básico gratis; Fase 1 requiere 1 sacrificio; Fase 2 requiere 2 sacrificios genéricos).
   - **Mecánica de Evolución Directa (Ramas de 3 Etapas):**
     - En todas las líneas evolutivas de 3 etapas (ej. Bulbasaur line, Charmander line, Squirtle line, Gastly line, Abra line, Geodude line, Dratini line, etc.), la criatura final (Fase 2) requiere **2 sacrificios** si se utilizan monstruos genéricos, pero si se sacrifica su **pre-evolución directa de Fase 1** (ej. Charmeleon para Charizard, Ivysaur para Venusaur, Wartortle para Blastoise, Haunter para Gengar, etc.), **solo se requiere 1 sacrificio** (el de esa especie).
     - Si el jugador o la IA arrastra o selecciona directamente la pre-evolución, se ejecuta la invocación inmediatamente consumiendo únicamente ese tributo.
     - En ramas de 2 etapas (estilo Pikachu -> Raichu), Raichu requiere **1 sacrificio** constante sin reducción a 0.
     - Los Legendarios (Articuno, Zapdos, Moltres, Mewtwo, Mew, Snorlax) se mantienen en **2 sacrificios genéricos**.
   - Uso de cartas de magia y equipo (sin límite de activación mientras haya casillas y objetivos disponibles).
   - Colocación de cartas boca abajo en la zona de Magias y Trampas.
   - Cambio manual de posición de batalla (Ataque ↔ Defensa) una vez por turno por monstruo.
3. **Fase de Batalla (`BATALLA`):**
   - **Regla del Primer Turno:** El Jugador (Red) no puede atacar en el turno 1. La IA (Blue), en cambio, sí puede declarar ataques en su primer turno si lo desea.
   - Declaración de ataques: Monstruo vs Monstruo o Ataque Directo a LP si el rival no tiene monstruos en su zona.
4. **Fase Final (`FIN`):**
   - Transición automática e instantánea al turno del oponente (`ejecutarTurnoIA()`) sin requerir clic manual adicional del usuario.

---

## 4. SISTEMA DE COMBATE Y CÁLCULO DE TIPOS ELEMENTALES (±300)

### 4.1. Reglas de Cálculo de Daño
- **Atacante vs Monstruo en Modo Ataque:**
  - El monstruo con menor ATK es destruido y enviado al cementerio.
  - La diferencia se resta directamente de los LP del controlador del monstruo destruido.
  - Si ambos ATK son iguales, ambos monstruos son destruidos sin daño a LP.
- **Atacante vs Monstruo en Modo Defensa:**
  - Si el ATK del atacante supera la DEF del defensor, el defensor es destruido. No hay daño a LP.
  - Si el ATK del atacante es menor que la DEF del defensor, el defensor **no** es destruido y el atacante recibe la diferencia como daño a sus LP.
- **Ataque Directo:** Si el rival no tiene monstruos en campo, el ATK total del atacante impacta directamente sobre los LP del oponente.

### 4.2. Bonificación y Penalización Elemental ($\pm 300$)
Antes del cálculo de daño, se evalúa la tabla elemental clásica:
- Si el atacante tiene ventaja sobre el defensor (ej. Agua vs Fuego, Planta vs Agua, Eléctrico vs Agua):
  $$\text{ATK}_{\text{efectivo}} = \text{ATK}_{\text{base}} + 300$$
- Si el atacante tiene desventaja (ej. Fuego vs Agua, Planta vs Fuego):
  $$\text{ATK}_{\text{efectivo}} = \max(0, \text{ATK}_{\text{base}} - 300)$$
- Tras resolver el combate, los valores vuelven a sus estadísticas base para no distorsionar turnos futuros.

---

## 5. INTELIGENCIA ARTIFICIAL (BLUE) EN 3 DIFICULTADES

### 5.1. Matriz de Dificultades
| Característica | Modo Fácil | Modo Medio | Modo Difícil |
|---|---|---|---|
| **Composición de Baraja** | 20 básicos débiles ($\le 1400$ ATK), 5 evoluciones suaves, 15 magias básicas. | 20 básicos, 5 evoluciones/invocaciones, 15 magias/equipos estándar. | **Counter-Deck Dinámico**: 20 básicos counter, 5 evos élite counter, 15 magias/equipos/trampas counter. |
| **Cálculo de Tipos ($\pm 300$)** | Sí lo calcula, pero con 25% de error/duda aleatoria. | Sí lo calcula de forma estricta para todos los enfrentamientos. | Cálculo óptimo con sinergia de cartas de equipo y bonificaciones de tipo. |
| **Posicionamiento (Ataque/Defensa)** | `evaluarMejorPosicionMonstruo()` con 25% de pifia aleatoria. | Pasa a defensa si Red supera su ATK; ataque si iguala o supera. | Máxima agresión calculada; protege LP resguardando a los más débiles. |
| **Uso de Equipos / Magias** | 50% de probabilidad de evaluar; 25% de error. | Evalúa si un equipo le permite destruir a un monstruo de Red; curación si $\text{LP} < 3000$. | Prioriza al objetivo de mayor valor de Red; curación estratégica de hasta 2000 LP. |
| **Cartas Trampa** | No utiliza trampas. | 20% de probabilidad de colocar trampas boca abajo. | 45% de probabilidad de colocar trampas boca abajo en zona M/T. |
| **Decisión de Ataque** | Solo ataca con ventaja, pero 25% de las veces duda y pasa turno. | Ataca únicamente cuando no sufre daño de vida; no regala monstruos. | Selecciona el ataque que causa el mayor daño letal a Red o destruye su mayor amenaza. |

### 5.2. Invocación por Sacrificio y Evolución Directa en la IA
- **Control de Recursos en Campo:** La IA evalúa la cantidad exacta de monstruos que posee en campo (`numMonstruosBlue`) contra los requisitos de la carta en mano (`reqSac`).
- Si Blue no tiene monstruos en campo, la invocación por tributo está totalmente prohibida y solo puede invocar monstruos Básicos (`sacrificios === 0`).
- **Evolución Directa Inteligente:** Si Blue tiene en su campo la pre-evolución directa (ej. Charmeleon) y tiene a la Fase 2 (Charizard) en su mazo, Blue reconoce que solo requiere **1 sacrificio** y consume exclusivamente a Charmeleon para colocar en juego al Pokémon supremo.
- Si no posee la pre-evolución directa, sacrifica estrictamente los `reqSac` (2) monstruos de menor poder en su campo.

### 5.3. Multi-Ataque en Cadena (`ejecutarFaseBatallaIA`)
- La IA no está limitada a un único ataque por turno.
- La función `ejecutarFaseBatallaIA` orquesta una secuencia asíncrona de ataques: cada atacante disponible (`haAtacado === false` y `posicion === 'ataque'`) evalúa el estado del campo rival.
- Si el rival tiene monstruos, selecciona el combate óptimo; si las casillas rivales quedan despejadas a mitad de la secuencia, los siguientes atacantes de la IA declaran ataques directos a los LP del jugador sucesivamente, hasta que todos los monstruos elegibles hayan actuado o no existan ataques favorables.

---

## 6. CONSTRUCTOR VISUAL DE BARAJAS (DECK BUILDER) Y SETS TEMÁTICOS

### 6.1. Reglas Inmutables de Baraja y Proporción 20 / 5 / 15
- **Tamaño de Baraja:** Exactamente **40 cartas**. Ni más, ni menos.
- **Proporción de los Sets:**
  - **20 Monstruos Básicos** (`sacrificios === 0` y `etapa === 'Básico'`).
  - **5 Monstruos de Invocación / Evolución** (`sacrificios > 0` o `etapa !== 'Básico'`).
  - **15 Cartas de Hechizo, Equipo o Trampa** (`tipoCarta === 'magia'` o `'trampa'`).
- **Límite de Copias:** Máximo **3 copias** de la misma carta por baraja (`Math.max(...copias) <= 3`).
- **Colección del Jugador:** Stock ilimitado de 3 copias de cada una de las 184 cartas existentes (151 Pokémon + 33 soportes).
- **Persistencia en LocalStorage:** Clave `pokeoh_custom_decks_v3`.

### 6.2. Los 5 Sets de Cartas Temáticos Predeterminados
1. **Mazo 1: Selva Floral (Planta & Bicho):** 20 Básicos Planta/Bicho (Bulbasaur, Oddish, Bellsprout, Caterpie, Weedle, Paras, Tangela) + 5 Invocaciones (Ivysaur x2, Venusaur x1, Gloom x1, Vileplume x1) + 15 Magias/Equipos/Trampas (Poción Max, Hiperpoción, Carta Profesor, Poké Ball, Cinta Elegida, Restos, Protección, Manto Espejo).
2. **Mazo 2: Furia Volcánica (Fuego):** 20 Básicos Fuego/Normal/Lucha (Charmander, Vulpix, Growlithe, Ponyta, Eevee, Mankey, Meowth) + 5 Invocaciones (Charmeleon x2, Charizard x1, Arcanine x1, Flareon x1) + 15 Magias/Equipos/Trampas (Poción Max, Poción, Carta Profesor, Ultra Ball, Cinta Elegida, Vidasfera, Protección, Manto Espejo).
3. **Mazo 3: Torrente Abisal (Agua):** 20 Básicos Agua (Squirtle, Psyduck, Poliwag, Tentacool, Slowpoke, Shellder, Seel) + 5 Invocaciones (Wartortle x2, Blastoise x1, Poliwhirl x1, Poliwrath x1) + 15 Magias/Equipos/Trampas (Poción Max, Hiperpoción, Carta Profesor, Super Ball, Restos, Casco Dentado, Protección, Contador).
4. **Mazo 4: Tempestad del Trueno (Eléctrico):** 20 Básicos Eléctrico & Volador (Pikachu, Magnemite, Voltorb, Pidgey, Spearow, Doduo, Rattata) + 5 Invocaciones (Raichu x2, Magneton x1, Pidgeotto x1, Pidgeot x1) + 15 Magias/Equipos/Trampas (Poción Max, Carta Profesor, Poké Ball, Ultra Ball, Cinta Elegida, Pañuelo Seda, Protección, Paralizador).
5. **Mazo 5: Abismo Psíquico (Psíquico & Fantasma):** 20 Básicos Psíquico, Fantasma & Tierra (Abra, Drowzee, Gastly, Geodude, Diglett, Sandshrew, Mr. Mime) + 5 Invocaciones (Kadabra x2, Alakazam x1, Haunter x1, Gengar x1) + 15 Magias/Equipos/Trampas (Poción Max, Hiperpoción, Carta Profesor, Ultra Ball, Cinta Elegida, Chaleco Asalto, Manto Espejo, Contador).

### 6.3. Renderizado Visual Completo con Ilustraciones y Sprites
Tanto en el panel del mazo actual como en la galería de colección, las cartas se renderizan como cartas completas con:
- Marco temático por elemento (fuego, agua, planta, eléctrico, psíquico, etc.).
- Cabecera con nombre, nivel/etapa y estrellas de sacrificio.
- **Ilustración oficial centrada y sprites:** Recuperados desde `c.imagenOficial || c.spriteCampo || c.spriteEstatico`, eliminando sustituciones indeseadas por Pokébolas genéricas.
- Barra inferior con estadísticas de combate (`ATK` y `DEF`) o subtipo de soporte.
- Botones de acción directa `+` y `-` integrados para una gestión ágil.

---

## 7. MOTOR DE AUDIO E INTERNACIONALIZACIÓN (I18N)

### 7.1. Sistema de Audio (`AudioManager`) y Bandas Sonoras de Pokémon Esmeralda
- **Bandas Sonoras Oficiales (Pokémon Esmeralda - Re-Engineered) con Repetición Infinita (`loop = true`):**
  - **Pantalla Principal (Menú / Título):** `03. Title Screen Main Theme.mp3` — Se activa durante el Menú Principal, Deck Builder y modales de configuración.
  - **Inicio y Transcurso del Combate:** `09. Battle! (Wild Pokémon).mp3` — Se reproduce continuamente en bucle durante la partida.
  - **Final de Batalla (Victoria / Fin de Duelo):** `10. Victory! (Wild Pokémon).mp3` — Suena en bucle en el modal de fin de juego hasta reiniciar o regresar al menú.
- **Efectos de Sonido (SFX) y Gritos Oficiales:** SFX Showdown (`hit`, `hit-super`, `enter`, `faint`) y gritos oficiales de los 151 Pokémon reproducidos por Web Audio API y elementos de Audio con sintetizador retro de respaldo.
- **Controles de Mezcla:** Control en tiempo real de volumen Master (`volumenMaster`), Música (`volumenMusica`), SFX (`volumenSFX`), Botón de Silencio Global (`btn-mute-all`), y toggles reactivos en la interfaz y modal de ajustes.

### 7.2. Internacionalización (`I18N`)
- Diccionarios bilingües en `I18N.es` y `I18N.en`.
- Directivas HTML: `data-i18n="clave"` y `data-i18n-placeholder="clave"`.
- Cambio dinámico en caliente sin recargar la página invocando `aplicarIdioma('es' | 'en')`.

---

## 8. INTERFAZ DE USUARIO Y EXPERIENCIA DE DUELO

### 8.1. Notificaciones y Toasts Legibles
- Los mensajes informativos que se muestran al jugador en `.battle-log-toast` no se cortan ni se truncan:
  - Disponen de ancho adaptativo con `word-break: break-word`.
  - Atributo nativo `title` para lectura rápida como tooltip del navegador.
  - Al colocar el cursor (`:hover`) sobre la notificación, se despliega una tarjeta flotante de alta visibilidad con fondo oscuro, borde dorado y z-index prioritario que permite leer el texto completo cómodamente.

### 8.2. Flujo de Fin de Duelo (Post-Battle)
Al concluir una partida por reducción de LP a 0 o por *Deck Out*, el modal de fin de juego presenta dos opciones claras:
1. **Volver a Jugar (`#btn-restart-duel`):** Reinicia el tablero inmediatamente con la baraja y dificultad actuales.
2. **Volver al Menú Principal (`#btn-game-over-menu`):** Cierra el modal de fin de juego y despliega limpiamente el menú principal (`#main-menu-overlay`) para permitir configurar nuevos LP, cambiar dificultad, o editar barajas en el Deck Builder.

---

## 9. GUÍA DE DEPURACIÓN Y PRUEBAS PARA DESARROLLADORES

### 9.1. Verificación Sintáctica y Lógica
Para comprobar la sintaxis de los archivos principales desde la terminal:
```powershell
node -c src/js/cartas.js
node -c src/js/logica.js
node -c src/js/generar_cartas.js
node -c server.js
```

### 9.2. Comandos de Inspección Rápida en la Consola del Navegador (DevTools)
```javascript
// 1. Ver estado completo del juego
console.log(estadoJuego);

// 2. Probar la pre-evolución directa de una carta de Fase 2
console.log("Pre-evolución de Charizard (6):", bdCartas[obtenerPreEvolucionDirecta(6)].nombre); // Charmeleon
console.log("Pre-evolución de Venusaur (3):", bdCartas[obtenerPreEvolucionDirecta(3)].nombre); // Ivysaur

// 3. Probar el cálculo de ventaja de tipo
console.log("Agua vs Fuego:", calcularVentajaTipo('agua', 'fuego')); // Retorna 300
console.log("Fuego vs Agua:", calcularVentajaTipo('fuego', 'agua')); // Retorna -300

// 4. Ver los 5 mazos guardados con desglose 20/5/15
console.table(mazosJugador.map(m => ({
  Nombre: m.nombre,
  Total: m.cartas.length,
  Basicos: m.cartas.filter(id => bdCartas[id].tipoCarta === 'monstruo' && bdCartas[id].sacrificios === 0 && bdCartas[id].etapa === 'Básico').length,
  Invocaciones: m.cartas.filter(id => bdCartas[id].tipoCarta === 'monstruo' && (bdCartas[id].sacrificios > 0 || bdCartas[id].etapa !== 'Básico')).length,
  MagiasTrampas: m.cartas.filter(id => bdCartas[id].tipoCarta === 'magia' || bdCartas[id].tipoCarta === 'trampa').length
})));
```

---

## 10. CHECKLIST DE VERIFICACIÓN Y CONTROL DE CALIDAD

- [x] **151 Pokémon de Kanto:** Todos presentes con imágenes oficiales, estadísticas, etapas y elementos.
- [x] **33 Cartas de Soporte:** Magias, equipos multigeneracionales y trampas secretas operativas.
- [x] **Evolución Directa de 3 Etapas:** Reducción de 2 a 1 sacrificio al usar la pre-evolución directa (ej. Charizard con Charmeleon); líneas de 2 etapas (Pikachu->Raichu) fijadas en 1 sacrificio; Legendarios en 2 sacrificios genéricos.
- [x] **Composición Temática de Mazos 20/5/15:** 5 sets preconstruidos por tipo elemental con exactamente 20 básicos, 5 invocaciones y 15 magias/trampas. Autocompletado respeta la misma fórmula.
- [x] **Ilustraciones Oficiales y Sprites en Deck Builder:** Eliminada la sustitución errónea por Pokébolas; todas las cartas muestran su arte oficial o sprite.
- [x] **Cálculo de Tipos (±300):** Visualizado con números flotantes `+300 TIPO!` y `-300 TIPO!`.
- [x] **IA en 3 Dificultades:** Fácil (errores aleatorios), Medio (cálculos seguros), Difícil (counter-deck adaptativo + combos de equipo + trampas).
- [x] **Invocación por Sacrificio Estricta y Multi-Ataque en la IA:** Blue sacrifica de su propio campo y encadena todos sus ataques disponibles por turno.
- [x] **Toasts Completos en Hover:** Lectura completa sin truncamiento mediante tarjeta emergente y tooltip nativo.
- [x] **Opciones de Fin de Duelo:** Botones funcionales para revancha inmediata y retorno al Menú Principal.
- [x] **Bilingüe (Español / Inglés):** Soporte completo para toda la interfaz, modales y mensajes toast.
- [x] **Límite de Mano Estricto (5 Cartas Máximo):** Descarte obligatorio interactivo al finalizar turno antes de ceder el control al rival. Descarte automático inteligente de la IA.
- [x] **Sistema de Gestión de Usuarios:** Cuenta de administrador preconfigurada (`admin`), registro de nuevos usuarios, persistencia en base de datos local y panel de administración.
- [x] **2 Jugadores Online con Colyseus:** Servidor WebSockets en Node.js para duelos sincronizados en tiempo real punto a punto con salas públicas y privadas con código.

---

## 11. REGLA DEL LÍMITE DE MANO EN FIN DE TURNO (MÁXIMO 5 CARTAS)

### 11.1. Mecánica y Lógica del Jugador (Red)
Al finalizar el turno (ya sea pulsando "Finalizar Turno" desde la Fase Principal en Turno 1 o desde la Fase de Batalla):
1. La función `verificarLimiteManoYPasar(onCompletado)` comprueba si `estadoJugador.mano.length > 5`.
2. Si el número de cartas en mano supera 5:
   - Se bloquea la transición al turno del rival.
   - Se despliega el modal interactivo `#discard-modal`.
   - Se renderizan las cartas en mano con sus estadísticas y un botón "Desechar 🪦".
   - Al pulsar una carta, se retira de la mano (`estadoJugador.mano.splice`) y se envía al cementerio (`estadoJugador.cementerio.push`), actualizando el contador visual del cementerio `#player-gy .slot-sub`.
   - El botón "Finalizar Turno y Pasar" permanece desactivado hasta que `estadoJugador.mano.length <= 5`.
   - Una vez satisfecho el límite, se ejecuta `onCompletado()`, invocando `pasarAutomaticamenteAFin()`.

### 11.2. Lógica de la IA Rival (Blue)
En la función `finalizarTurnoIA()`:
- Se evalúa si `estadoOponente.mano.length > 5`.
- La IA calcula el excedente `exceso = estadoOponente.mano.length - 5`.
- Para cada descarte necesario, la IA analiza sus cartas y descarta prioritariamente aquellas con menor ataque o menor utilidad táctica a su cementerio `estadoOponente.cementerio`.
- Se actualiza la cantidad visual en el cementerio rival y se notifica al jugador mediante un mensaje Toast.

---

## 12. SISTEMA DE GESTIÓN DE USUARIOS Y AUTENTICACIÓN (`UserManager`)

El sistema de usuarios se diseñó siguiendo una arquitectura desacoplada para permitir un almacenamiento inicial en base de datos local (`localStorage`) y facilitar una migración directa a una base de datos en la nube (PostgreSQL, Supabase o Firebase).

### 12.1. Estructura del Modelo de Usuario
```json
{
  "id": "usr_admin",
  "username": "admin",
  "password": "admin",
  "role": "admin",
  "avatar": "👑",
  "createdAt": "2026-10-20T21:40:00.000Z",
  "stats": {
    "duelos": 12,
    "victorias": 10,
    "derrotas": 2,
    "puntos": 9500,
    "rango": "Maestro Poké-Oh 🌟"
  }
}
```

### 12.2. Características Implementadas:
- **Usuario Administrador por Defecto:** Cuenta creada automáticamente (`usuario: admin`, `contraseña: admin`, rol: `admin`).
- **Registro de Nuevos Usuarios:** Formulario con validación de nombre único, longitud mínima y confirmación de contraseña. A cada nuevo usuario se le asigna un avatar temático aleatorio y rol `user`.
- **Sesión Activa Persistente:** Se guarda la sesión del usuario en `pokeoh_current_user_v1`.
- **Perfil de Estadísticas:** Visualización en vivo de duelos totales, victorias, derrotas, tasa de victoria (%), puntos acumulados y rango de liga.
- **Panel de Administración (Admin Only):** Pestaña exclusiva para usuarios con rol `admin` donde se listan todas las cuentas registradas con sus estadísticas completas y la opción de eliminar usuarios (protegiendo siempre la cuenta principal de administrador).
- **Actualización Automática tras Duelo:** Al concluir cualquier duelo (`mostrarFinDelDuelo`), `UserManager.registrarResultadoDuelo(esVictoria, puntos)` actualiza las métricas y el rango del jugador logueado.

---

## 13. SERVIDOR MULTIJUGADOR COLYSEUS (`server.js` y `rooms/PokeOhRoom.js`)

Para habilitar el modo **"2 Jugadores Online"**, se implementó un backend en Node.js utilizando el framework **Colyseus** (v0.18) y el transporte WebSocket puro `@colyseus/ws-transport`.

### 13.1. Arquitectura y Componentes Backend
- `server.js`: Servidor Express unificado que sirve la aplicación web y acopla el transporte WebSocket de Colyseus en el puerto `2567`.
- `rooms/PokeOhRoom.js`: Lógica de sala de juego para 2 jugadores (`maxClients = 2`):
  - **Asignación de Asientos:** El primer cliente que entra toma el asiento `0` (Red / Anfitrión) y el segundo toma el asiento `1` (Blue / Desafiante).
  - **Filtros de Matchmaking:** Las salas pueden ser públicas (Partida Rápida) o privadas con código de sala de 4 letras (`roomCode`).
  - **Canal de Eventos Tácticos (`action`):** Reenvío y sincronización de invocaciones, sacrificios, cambios de posición (ataque/defensa), activación de cartas mágicas y trampas boca abajo, ataques directos o a monstruos, y descarte de mano.
  - **Sincronización Exacta de Destrucción (`RESOLVER_COMBATE` y `SYNC_CAMPO`):** El atacante calcula el resultado y transmite el payload exacto de destrucción de monstruos, daño LP y actualización de cementerios. El defensor aplica inmediatamente la destrucción en su tablero local y actualiza su cementerio, garantizando que ambos jugadores vean exactamente el mismo estado sin cartas fantasma.
  - **Detección de Desconexión / Rendición:** Si un jugador abandona la partida en curso o cierra el navegador, el servidor notifica al rival y otorga la victoria automática por abandono. El jugador desconectado registra automáticamente una derrota en su perfil.
  - **Regla Oficial de Deck Out (Mazo Vacío):** Si cualquier jugador necesita robar cartas y su baraja se encuentra vacía (`mazo.length === 0`), sufre una derrota inmediata por Deck Out y se le otorga la victoria al rival.
  - **Indicador Dinámico de Turno:** El marcador central muestra en todo momento el nombre exacto del jugador activo: `"TURNO DE {nombreUsuario}"` (ej. `TURNO DE ADMIN`, `TURNO DE ASH`, `TURNO DE BLUE`).

### 13.2. Cliente Multijugador (`MultiplayerManager` en `src/js/logica.js`)
- **Detección Dinámica de Servidor:** Se conecta automáticamente a `ws://${location.host}` cuando la web se abre desde el servidor Node o a `ws://localhost:2567` en local.
- **Modal de Matchmaking (`#pvp-online-modal`):**
  - **Partida Rápida:** Empareja automáticamente con un jugador en espera o crea una sala pública.
  - **Crear Sala Privada:** Genera un código único (ej: `A8F2`) y muestra una pantalla de espera mientras el anfitrión comparte el código.
  - **Unirse con Código:** Permite ingresar el código recibido para entrar instantáneamente a la sala del rival.

---

## 14. GUÍA DE PUESTA EN MARCHA PARA EL DESARROLLADOR

### 14.1. Iniciar el Servidor de Poké-Oh!
En la terminal del proyecto, ejecuta:
```bash
npm start
```
El servidor responderá con:
```text
=============================================================
   ⚡ POKÉ-OH! - SERVIDOR MULTIJUGADOR ONLINE (COLYSEUS) ⚡
=============================================================
  🌐 Servidor Local:    http://localhost:2567
  📡 WebSocket Server:  ws://localhost:2567
  🎮 Modo de Juego:     2 Jugadores Online (Punto a Punto)
=============================================================
```

### 14.2. Probar una Partida Multijugador 1v1
1. Abre tu navegador e ingresa a `http://localhost:2567`.
2. Abre una segunda ventana (o ventana de incógnito) e ingresa también a `http://localhost:2567`.
3. En la primera ventana, haz clic en **"2 JUGADORES ONLINE"** y selecciona **"Crear Sala Privada"**. Copia el código generado (ej: `ABCD`).
4. En la segunda ventana, haz clic en **"2 JUGADORES ONLINE"**, selecciona **"Unirse con Código"**, ingresa el código `ABCD` y haz clic en **"Entrar"**.
5. ¡Ambos jugadores quedarán conectados en tiempo real y el duelo comenzará automáticamente!

---

## 15. MOTOR DE EFECTOS ACTIVOS DE MONSTRUOS (`efectoActivo`)

A partir de la versión **0.3.0 Beta**, el 32.5% de las criaturas Pokémon de Kanto (49 de 151) incorporan habilidades activas de un solo uso mientras permanecen en el campo de batalla.

### 15.1. Estructura y Esquema de Datos (`src/js/cartas.js`)
Cada carta de monstruo con habilidad define el objeto `efectoActivo`:
```javascript
{
  id: 65,
  nombre: "Alakazam",
  // ... atributos de combate ...
  efectoActivo: {
    nombre: "Distorsión Kinética",
    tipoEfecto: "regresar_mano",             // Tipo de acción mecánica
    objetivo: "monstruo_rival",              // 'monstruo_rival' | 'monstruo_propio' | 'cementerio_propio' | 'magia_trampa_rival'
    potencia: 0,                             // Modificador numérico (ATK, DEF, LP, turnos)
    duracion: 0,                             // Turnos de persistencia
    descripcion: "Teletransporta a 1 monstruo enemigo de vuelta a la mano de su dueño."
  }
}
```

### 15.2. Catálogo de Tipos de Efectos Implementados
| Tipo de Efecto | Objetivo | Comportamiento en Combate | Ejemplos de Pokémon |
|---|---|---|---|
| `regresar_mano` | `monstruo_rival` | Remueve un monstruo rival del tablero y lo devuelve a la mano de su controlador sin destruir. | Alakazam (65), Hypno (97), Mewtwo (150) |
| `bloquear_ataque` | `monstruo_rival` | Bloquea la declaración de ataques del objetivo durante 2 turnos (`bloqueoAtaqueTurnos: 2`). | Venusaur (3), Tangela (114), Victreebel (71) |
| `destruir_monstruo` | `monstruo_rival` | Destruye instantáneamente a un monstruo enemigo enviándolo al cementerio. | Gengar (94), Nidoking (34), Gyarados (130) |
| `destruir_magia_trampa` | `magia_trampa_rival` | Remueve una carta de Magia o Trampa del campo enemigo. | Pinsir (127), Scyther (123), Beedrill (15) |
| `alterar_atk` | `monstruo_rival` / `monstruo_propio` | Aplica una alteración permanente de ATK (+400 o -500). | Charizard (6), Arcanine (59), Machamp (68) |
| `robar_cartas` | `propio` | Roba 1 carta directamente del mazo a la mano. | Pidgeot (18), Golduck (55), Dragonite (149) |
| `curar_lp` | `propio` | Restaura 1000 a 1500 LP al controlador. | Blastoise (9), Lapras (131), Vaporeon (134) |
| `paralizar` | `monstruo_rival` | Paraliza al objetivo impidiendo que ataque en su siguiente turno. | Raichu (26), Electabuzz (125), Jolteon (135) |

### 15.3. Ciclo de Vida y Regla de 1 Solo Uso
1. **Disponibilidad:** El efecto solo puede ejecutarse durante la **Fase Principal** (`estadoJuego.faseActual === 'PRINCIPAL'`) por el controlador del turno activo.
2. **Flag de Estado:** Cada carta en juego mantiene `slot.haUsadoEfecto = false`. Al detonarse el efecto, muta a `true` y el botón cambia a estado inactivo deshabilitado mostrando `[EFECTO USADO]`.
3. **Persistencia por Instancia:** Si el monstruo abandona el campo (enviado al cementerio o regresado a la mano) y es re-invocado en un turno posterior, se genera una nueva instancia con `haUsadoEfecto = false`.
4. **Modal de Selección Táctica (`#effect-target-modal`):** Si el efecto requiere objetivo, el motor abre una ventana modal con los candidatos válidos (mostrando su sprite, nombre y posición de batalla) antes de ejecutar la acción.
5. **Compatibilidad IA (`ejecutarEfectosActivosIA`):** La IA examina en cada Fase Principal sus monstruos en campo con efectos disponibles. Si detecta objetivos beneficiosos, los activa automáticamente con prioridad estratégica.

---

## 16. SISTEMA DE MEGAEVOLUCIONES Y EL SIDE DECK (`bdMegaevoluciones`)

Las Megaevoluciones representan la cúspide evolutiva de Poké-Oh!, implementadas mediante un **Side Deck** externo accesible por ambos duelistas.

### 16.1. Definición del Side Deck (14 Megaevoluciones)
Las 14 Megaevoluciones se indexan en el rango de IDs 501 al 514 en `bdMegaevoluciones` (`src/js/cartas.js`):
- `501`: Mega Venusaur (Planta/Veneno — 3200 ATK / 3100 DEF)
- `502`: Mega Charizard X (Fuego/Dragón — 3600 ATK / 2800 DEF)
- `503`: Mega Charizard Y (Fuego/Volador — 3800 ATK / 2600 DEF)
- `504`: Mega Blastoise (Agua — 3200 ATK / 3300 DEF)
- `505`: Mega Alakazam (Psíquico — 3500 ATK / 2400 DEF)
- `506`: Mega Gengar (Fantasma/Veneno — 3600 ATK / 2300 DEF)
- `507`: Mega Pinsir (Bicho/Volador — 3300 ATK / 2600 DEF)
- `508`: Mega Gyarados (Agua/Siniestro — 3500 ATK / 2900 DEF)
- `509`: Mega Aerodactyl (Roca/Volador — 3400 ATK / 2500 DEF)
- `510`: Mega Mewtwo X (Psíquico/Lucha — 3800 ATK / 3000 DEF)
- `511`: Mega Mewtwo Y (Psíquico — 3900 ATK / 2700 DEF)
- `512`: Mega Beedrill (Bicho/Veneno — 3200 ATK / 1800 DEF)
- `513`: Mega Pidgeot (Normal/Volador — 3100 ATK / 2400 DEF)
- `514`: Mega Kangaskhan (Normal — 3200 ATK / 3000 DEF)

### 16.2. Reglas del Side Deck
- **Independencia de Baraja:** No consumen ninguna de las 40 cartas obligatorias del mazo principal.
- **Disparador Mágico:** Se activan exclusivamente mediante la carta mágica **Megaevolución (ID 250)**.
- **Condición de Activación:** El jugador debe controlar en su zona de monstruos al menos un Pokémon compatible (`baseNombre` coincidente o `preEvolucionId`).
- **Modal de Selección de Ramas (`#mega-evolucion-modal`):**
  - Si en el campo existe un Pokémon con bifurcación (ej. Charizard puede evolucionar a Mega Charizard X o Y; Mewtwo a Mega Mewtwo X o Y) o hay varios Pokémon compatibles a la vez, se presenta un modal visual con las tarjetas de los candidatos y sus estadísticas comparativas.
  - Si solo existe un candidato con una única megaevolución disponible, la transformación se realiza de manera inmediata.
- **Herencia de Estado:** La Megaevolución ocupa exactamente la misma casilla del monstruo base, preserva los objetos de equipo vinculados, mantiene la posición de combate (Ataque o Defensa) y renueva la disponibilidad de efecto activo.

---

## 17. NUEVAS CARTAS MÁGICAS TÁCTICAS (YUGIOH TIER — IDs 213–219, 250)

Se incorporaron 8 nuevas cartas mágicas inspiradas en los arquetipos de control y ventaja de cartas más icónicos de *Yu-Gi-Oh!*:

### 17.1. Especificación Técnica de Cartas Mágicas
```javascript
// ID 213: Ceniza Sagrada (Monster Reborn)
{
  id: 213,
  nombre: "Ceniza Sagrada",
  subtipo: "magia_revivir",
  descripcion: "Resucita 1 Pokémon de tu cementerio directamente al campo en modo Ataque o Defensa."
}

// ID 214: Muro Prismático (Swords of Revealing Light)
{
  id: 214,
  nombre: "Muro Prismático",
  subtipo: "magia_bloqueo",
  descripcion: "Despliega una barrera que impide todos los ataques rivales durante 3 turnos completos."
}

// ID 215: Viento Feérico (Harpie's Feather Duster)
{
  id: 215,
  nombre: "Viento Feérico",
  subtipo: "magia_limpieza_mt",
  descripcion: "Destruye todas las cartas de Magia y Trampa en ambos campos de juego."
}

// ID 216: Fisura Sísmica (Raigeki / Dark Hole Condicional)
{
  id: 216,
  nombre: "Fisura Sísmica",
  subtipo: "magia_destruccion_ataque",
  descripcion: "Destruye instantáneamente a todos los monstruos en modo Ataque en el campo."
}

// ID 217: Señuelo Telepático (Change of Heart)
{
  id: 217,
  nombre: "Señuelo Telepático",
  subtipo: "magia_control",
  descripcion: "Toma el control de 1 monstruo enemigo hasta el final del turno en curso."
}

// ID 218: Cofre Reliquia (Pot of Greed)
{
  id: 218,
  nombre: "Cofre Reliquia",
  subtipo: "magia_robo",
  descripcion: "Roba inmediatamente 2 cartas de tu baraja a tu mano."
}

// ID 219: Polvo Inmunológico (Skill Drain Ligero)
{
  id: 219,
  nombre: "Polvo Inmunológico",
  subtipo: "magia_silencio",
  descripcion: "Silencia e inmuniza a los monstruos rivales impidiendo que activen efectos."
}

// ID 250: Megaevolución (Super Polymerization / Transformation)
{
  id: 250,
  nombre: "Megaevolución",
  subtipo: "evolucion",
  descripcion: "Convoca la transformación suprema de un Pokémon compatible desde el Side Deck."
}
```

### 17.2. Lógica de Ejecución Táctica
- **Resurrección desde el Cementerio (`#gy-resurrect-modal`):** Al activar *Ceniza Sagrada*, el motor filtra el array `estadoJugador.cementerio` buscando cartas de tipo `monstruo`. Si existen ranuras libres en `zonaMonstruos`, se despliega un selector visual. Al seleccionar una criatura, se elimina del cementerio y se invoca al campo con posición elegible.
- **Contador de Inmunidad de Turnos:** *Muro Prismático* inicializa `estadoJuego.turnosMuroPrismatico = 3`. Durante la Fase de Batalla del rival, la declaración de ataques queda interceptada y se cancela con aviso sonoro y visual hasta el decremento a 0 al inicio de turno del controlador.

---

## 18. SELECCIÓN DE MAZOS INICIALES AL REGISTRO (`MAZOS_INICIALES_SELECCION`)

Para garantizar una curva de aprendizaje óptima y equilibrio competitivo para los nuevos duelistas, se estructuraron 3 barajas iniciales balanceadas de 40 cartas construidas bajo la regla oficial **20 Básicos / 5 Invocaciones / 15 Soportes**.

### 18.1. Los Tres Arquetipos Iniciales
1. **🔥 Mazo Fuego (Furia Ígnea):**
   - **Básicos (20):** Charmander x3, Vulpix x3, Growlithe x3, Ponyta x3, Mankey x2, Magmar x2, Meowth x2, Pidgey x2.
   - **Invocaciones (5):** Charmeleon x2, Charizard x1, Arcanine x1, Ninetales x1.
   - **Soportes (15):** Poción Max x2, Hiperpoción x2, Carta Profesor x2, Cinta Elegida x2, Vidasfera x1, Megaevolución x1, Ceniza Sagrada x1, Protección x2, Manto Espejo x2.
2. **💧 Mazo Agua (Torrente Abisal):**
   - **Básicos (20):** Squirtle x3, Poliwag x3, Psyduck x3, Tentacool x3, Shellder x2, Lapras x2, Staryu x2, Seel x2.
   - **Invocaciones (5):** Wartortle x2, Blastoise x1, Poliwhirl x1, Poliwrath x1.
   - **Soportes (15):** Poción Max x2, Hiperpoción x2, Carta Profesor x2, Restos x2, Casco Dentado x2, Megaevolución x1, Muro Prismático x1, Protección x2, Contador x1.
3. **🌱 Mazo Planta (Selva Floral):**
   - **Básicos (20):** Bulbasaur x3, Oddish x3, Bellsprout x3, Caterpie x3, Paras x2, Tangela x2, Weedle x2, Pinsir x2.
   - **Invocaciones (5):** Ivysaur x2, Venusaur x1, Gloom x1, Vileplume x1.
   - **Soportes (15):** Poción Max x2, Hiperpoción x2, Carta Profesor x2, Cinta Elegida x2, Chaleco Asalto x1, Megaevolución x1, Fisura Sísmica x1, Protección x2, Paralizador x2.

### 18.2. Proceso de Registro y Preservación de Datos
- Durante el registro en `#user-modal`, el nuevo usuario selecciona su mazo inicial mediante radio buttons estilizados.
- La función `UserManager.registrar()` clona el mazo seleccionado y lo asigna a la ranura 0 de sus barajas activas (`mazosJugador[0]`).
- **Inviolabilidad de Cuentas Existentes:** Los usuarios previamente registrados preservan intactas sus barajas y configuraciones sin sobreescritura.

---

## 19. EXPLORADOR DE SALAS REALTIME Y MATCHMAKING ONLINE (`pokeoh_lobby_rooms`)

El sistema multijugador online de 2 Jugadores se potenció con una arquitectura híbrida que integra **Supabase Realtime Presence** para el descubrimiento de salas y **Colyseus** para la sesión de duelo autoritativa.

### 19.1. Flujo de Descubrimiento de Salas Abiertas
1. **Publicación en Presence:** Al crear una sala pública, el anfitrión transmite su presencia al canal global `pokeoh_lobby_rooms` con metadata: `{ roomCode, hostName, avatar, status: 'esperando', timestamp: Date.now() }`.
2. **Explorador Visual (`#pvp-view-rooms`):**
   - Los jugadores en el menú multijugador pueden hacer clic en **"🔍 Explorar Salas Abiertas"**.
   - El explorador consulta el estado reactivo del canal `pokeoh_lobby_rooms` y renderiza una tabla con el anfitrión, avatar, código de sala y botón de acción directa **"Unirse"**.
   - Si no hay salas disponibles, muestra un estado vacío amigable con botón para refrescar en vivo.
3. **Selección Previa de Mazo en JcJ:** Antes de iniciar el combate, ambos participantes eligen cuál de sus 5 barajas utilizarán en el enfrentamiento mediante `#pvp-deck-selector`.
4. **Sorteo de Moneda 50/50 (`lanzarMonedaPrimerTurno`):**
   - El primer turno se define aleatoriamente mediante una moneda virtual 50/50.
   - Ambos clientes sincronizan el resultado; el ganador inicia en Fase de Robo y el cartel gigante en pantalla confirma quién tiene la iniciativa.
5. **Panel Lateral de Acciones en Vivo (`#duel-action-logs-panel`):**
   - Panel persistente en el lateral derecho que registra de forma cronológica y con scroll automático cada acción del rival (invocaciones, cartas boca abajo, activación de efectos y ataques).
6. **Penalización por Abandono / Rendición:**
   - Intentar salir al menú principal durante una partida JcJ despliega el modal de advertencia `#surrender-confirm-modal`.
   - Si el usuario confirma la rendición, el servidor otorga victoria al rival y registra automáticamente la derrota en el perfil del desertor.

---

## 20. PANEL DE ADMINISTRACIÓN AVANZADO Y GESTIÓN DE SEGURIDAD

El módulo de administración (`admin`) provee control exhaustivo sobre las cuentas y el ecosistema de jugadores.

### 20.1. Capacidades Administrativas
- **Métricas Globales en Tiempo Real:** Tarjetas de analítica con Total de Usuarios, Cuentas Activas, Cuentas Bloqueadas y Total de Administradores.
- **Buscador y Filtros Reactivos:** Búsqueda instantánea por nombre de usuario con filtros por estado (`Todos`, `Activos`, `Bloqueados`) y por rol (`admin`, `user`).
- **Bloqueo y Desbloqueo (`UserManager.bloquearUsuario` / `desbloquearUsuario`):** Establece el flag `stats.bloqueado = true`. Si una cuenta bloqueada intenta iniciar sesión, el sistema rechaza el acceso con un mensaje de alerta.
- **Reinicio de Estadísticas (`UserManager.reiniciarStats`):** Restaura duelos, victorias, derrotas y puntos de una cuenta a valores iniciales manteniendo intactas sus barajas y credenciales.
- **Alternancia de Roles (`UserManager.cambiarRol`):** Permite promover a un usuario regular a `admin` o degradar administradores secundarios a `user`.
- **Eliminación Segura (`UserManager.eliminarUsuario`):**
  - Protección estricta: La cuenta principal `admin` no puede ser eliminada bajo ninguna circunstancia.
  - Si un administrador elimina su propia cuenta secundaria, el sistema cierra su sesión automáticamente y devuelve al menú como invitado.

---

## 21. HISTORIAL COMPLETO DE VERSIONES Y PROTOCOLO PERMANENTE (CHANGELOG)

### 21.1. Tabla Resumen de Versiones Semánticas

| Versión | Fecha | Tipo | Resumen de Novedades |
|---|---|---|---|
| **`v0.3.0 Beta`** | **24/10/2026** | **Major Update** | Efectos activos de monstruos (1 uso, botón `EFECTO`), 14 Megaevoluciones con Side Deck, 8 cartas mágicas tácticas Yu-Gi-Oh tier, selección de mazo inicial al registro (Fuego, Agua, Planta), explorador de salas realtime y panel admin avanzado con bloqueo/eliminación. |
| **`v0.2.0 Beta`** | **23/10/2026** | **Major Update** | Multijugador JcJ en tiempo real (Colyseus + Supabase), selección previa de baraja, sorteo de moneda 50/50, panel visual de logs de combate a la derecha, cartel de turno de alta notoriedad, sincronización de M/T y cementerios, penalización por abandono y corrección de fullscreen en PC. |
| **`v0.1.3 Beta`** | **22/10/2026** | **Patch** | Modal de confirmación al presionar cartas en pantallas táctiles para evitar invocaciones accidentales, confirmación interactiva para activar trampas y ralentización visual del ataque con foco claro en combatientes. |
| **`v0.1.2 Beta`** | **21/10/2026** | **Patch** | Eliminación del menú innecesario de defender en monstruos (solo Atacar), y bloqueo estricto de cambio de posición durante la Fase de Batalla y turno del rival. |
| **`v0.1.1 Beta`** | **21/10/2026** | **Patch** | Estadísticas ATK/DEF más visibles en móviles y tablets, rotación visual de cartas en modo defensa, alerta sonora/visual de invocación única por turno, ajuste de altura de menú móvil y nuevo icono de salir de pantalla completa. |
| **`v0.1.0 Beta`** | **20/10/2026** | **Lanzamiento Inicial** | Lanzamiento base de Poké-Oh!: tablero de 5x5, 151 Pokémon de Kanto, tabla de tipos (±300), cartas de soporte, duelos JcIA contra Blue en 3 dificultades y Deck Builder con regla 20/5/15. |

### 21.2. Protocolo Obligatorio para Futuras Versiones
En cada nueva tarea o actualización del proyecto:
1. Determinar el incremento de versión:
   - **Mayor / Feature Importante:** Incrementar versión menor (ej: `0.3.0` -> `0.4.0`).
   - **Corrección o Ajuste Puntual:** Incrementar versión parche (ej: `0.3.0` -> `0.3.1`).
2. Actualizar la constante `POKEOH_VERSION` en `src/js/logica.js` y las etiquetas de versión en `index.html`.
3. Añadir la tarjeta de versión correspondiente en `#tab-rules-changelog` dentro de `index.html` con frases cortas y claras para el jugador.
4. Actualizar la cabecera y la sección 21 de este documento (`DOCUMENTACION_TECNICA.md`).
