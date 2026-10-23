// ==========================================================
// POKÉ-OH! - MOTOR DE JUEGO Y LÓGICA PRINCIPAL (VANILLA JS)
// ==========================================================
// La base de datos de cartas (bdCartas) con los 151 Pokémon
// e ítems de todas las generaciones se carga desde cartas.js.

// ==========================================================
// POKÉ-OH! - MOTOR DE JUEGO Y LÓGICA PRINCIPAL (VANILLA JS)
// ==========================================================
// La base de datos de cartas (bdCartas) con los 151 Pokémon
// e ítems de todas las generaciones se carga desde cartas.js.

// ==========================================
// CONFIGURACIÓN GLOBAL Y BILINGÜE DEL JUEGO
// ==========================================
const configuracionJuego = {
  idioma: 'es',
  lpInicial: 8000,
  lpMax: 8000,
  dificultadIA: 'medio', // 'facil', 'medio', 'dificil'
  mazoSeleccionadoIdx: 0,
  volumenMaster: 1.0,
  volumenMusica: 0.8,
  volumenSFX: 0.8,
  silenciadoTotal: false
};

// Diccionario Internacionalizado (Español / English)
const I18N = {
  es: {
    menuSubtitle: "DUELO DE CARTAS ESTRATÉGICO (POKÉMON x YU-GI-OH!)",
    menuTag: "151 POKÉMON • ITEMS MULTIGENERACIÓN • TABLA DE TIPOS",
    menuPveTitle: "JUGADOR VS IA",
    menuPveDesc: "Duelo individual contra Blue con dificultad, LP y mazos personalizables",
    menuDeckTitle: "DECK BUILDER & COLECCIÓN",
    menuDeckDesc: "Personaliza hasta 5 barajas de 40 cartas y explora los 151 Pokémon",
    menuRulesTitle: "CÓMO JUGAR / REGLAS",
    menuRulesDesc: "Guía completa de fases, sacrificios, combates y tipos",
    menuPvpTitle: "2 JUGADORES ONLINE",
    menuPvpDesc: "Duelos en tiempo real punto a punto",
    menuShopTitle: "TIENDA DE CARTAS",
    menuShopDesc: "Sobres de refuerzo, cartas raras y cosméticos",
    menuSettingsTitle: "CONFIGURACIÓN & AUDIO",
    menuSettingsDesc: "Idioma (Español / English), volumen general, música y efectos",
    badgeSoon: "PRÓXIMAMENTE",
    preGameTitle: "⚔️ Configurar Partida",
    setupLpLabel: "PUNTOS DE VIDA INICIALES (LP)",
    setupAiLabel: "NIVEL DEL RIVAL (BLUE)",
    setupDeckLabel: "BARAJA DEL JUGADOR (RED)",
    btnDeckBuilderShortcut: "🎴 Editar en Deck Builder",
    diffEasyName: "FÁCIL",
    diffEasyDesc: "La IA comete errores basados en aleatoriedad y su mazo contiene menos evoluciones.",
    diffMediumName: "MEDIO",
    diffMediumDesc: "Juego estándar sin errores. Mazo similar al del jugador en ataque y defensa.",
    diffHardName: "DIFÍCIL",
    diffHardDesc: "La IA posee cartas de mayor ataque/defensa, evoluciones letales y juego estratégico.",
    btnStartDuel: "⚔️ ¡Comenzar Duelo!",
    btnCancel: "Volver al Menú",
    settingsTitle: "⚙️ Ajustes & Configuración",
    langSectionTitle: "IDIOMA / LANGUAGE",
    audioSectionTitle: "CONTROL DE AUDIO Y VOLUMEN",
    btnMuteAll: "🔊 Silenciar Todo",
    btnUnmuteAll: "🔇 Reactivar Sonido",
    masterVolLabel: "🔊 Sonido General:",
    musicVolLabel: "🎵 Música de Batalla (BGM):",
    sfxVolLabel: "💥 Efectos de Sonido (SFX):",
    lblActive: "Activo",
    btnSaveClose: "✔️ Guardar y Cerrar",
    spellConfirmTitle: "✨ Usar Carta Mágica",
    spellConfirmQuestion: "¿Cómo deseas jugar esta carta?",
    btnActivateNow: "✨ Activar Ahora",
    btnSetFaceDown: "🃏 Colocar Boca Abajo",
    btnKeepInHand: "❌ Mantener en Mano",
    targetLabel: "Objetivo:",
    activateSetTitle: "🃏 Carta Boca Abajo",
    activateSetQuestion: "¿Deseas activar esta carta ahora?",
    btnKeepFaceDown: "Cerrar / Mantener Oculta",
    btnSettings: "AJUSTES",
    btnMainMenu: "MENÚ",
    btnRules: "REGLAS",
    btnDeckShort: "MAZOS",
    noticeTitle: "Próximamente",
    noticeDesc: "Esta función se encuentra actualmente en desarrollo para futuras actualizaciones.",
    btnUnderstood: "Entendido ✔️",
    yourTurn: "TU TURNO",
    rivalTurn: "TURNO DEL RIVAL (BLUE)",
    phaseDraw: "ROBO",
    phaseMain: "PRINCIPAL",
    phaseBattle: "BATALLA",
    phaseEnd: "FIN",
    btnNextPhase: "Siguiente Fase ⏭️",
    btnToBattle: "A Fase Batalla ⚔️",
    btnEndTurn: "Finalizar Turno 🏁",
    btnPassingRival: "Pasando al rival... ⏳",
    secretCardName: "Carta Boca Abajo",
    secretCardType: "SECRETO",
    secretCardDesc: "Esta carta está colocada boca abajo. Su contenido y efectos son secretos hasta que sea activada.",
    faceDownSuffix: "(Boca Abajo)",
    toastSetCard: "colocada boca abajo en la Zona M/T.",
    toastTurn1NoAttack: "Turno 1: No se puede atacar en el primer turno.",
    toastBattlePhase: "Fase de Batalla: ¡Declara ataques con tus Pokémon en modo Ataque!",
    toastAutoPassing: "Fase Final: Pasando turno automáticamente al rival Blue...",
    toastDirectAttack: "¡Ataque directo del rival!",
    toastTypeAdvantage: "¡Ventaja Elemental!",
    toastTypeDisadvantage: "¡Desventaja Elemental!",
    toastVictorious: "¡VICTORIA!",
    toastDefeat: "DERROTA",
    rankAspirant: "Rango: Aspirante",
    rankNovice: "Rango: Duelista Novato",
    rankAdvanced: "Rango: Entrenador Avanzado",
    rankExpert: "Rango: Maestro Poké-Oh",
    rankLegend: "Rango: Leyenda de la Liga",
    deckBuilderTitle: "🎴 Constructor de Barajas & Colección",
    deckBuilderSubtitle: "Crea hasta 5 mazos de exactamente 40 cartas (máx. 3 copias de cada una).",
    btnSaveDeck: "💾 Guardar Mazo",
    btnAutoFill: "🎲 Autocompletar",
    btnClearDeck: "🗑️ Vaciar",
    deckCurrentTitle: "BARAJA ACTUAL",
    btnSaveAndClose: "✔️ Listo / Cerrar",
    rulesTitle: "📖 Guía y Reglamento de Poké-Oh!",
    ruleTabObjective: "🎯 Objetivo & Fases",
    ruleTabSummons: "⭐ Invocación & Sacrificios",
    ruleTabBattle: "⚔️ Combate & Tipos (±300)",
    ruleTabSpells: "🪄 Magias, Equipos & Trampas",
    ruleTabSecrets: "🃏 Boca Abajo & Secretos",
    searchPlaceholder: "Buscar por nombre o ataque...",
    deckSavedSuccess: "¡Baraja guardada correctamente con 40 cartas!",
    deckInvalidCount: "La baraja debe tener exactamente 40 cartas para ser válida.",
    deckMaxCopies: "Límite alcanzado: Máximo 3 copias de esta carta en el mazo.",
    deckFull: "La baraja ya tiene 40 cartas (máximo alcanzado).",
    btnPlayAgain: "Jugar Otra Partida ⚔️",
    btnReturnMainMenu: "Volver al Menú Principal 🏠",
    rotateTitle: "¡Gira tu Dispositivo!",
    rotateDesc: "Para disfrutar del tablero de duelo completo de Poké-Oh! en celulares y tabletas, por favor coloca tu pantalla en posición horizontal (Landscape).",
    rotateBadge: "📱 ↔️ Modo Horizontal Requerido",
    btnFullscreen: "Pantalla Full",
    btnFullscreenShort: "PANTALLA FULL"
  },
  en: {
    menuSubtitle: "STRATEGIC CARD DUEL (POKÉMON x YU-GI-OH!)",
    menuTag: "151 POKÉMON • MULTI-GEN ITEMS • TYPE EFFECTIVENESS",
    menuPveTitle: "PLAYER VS AI",
    menuPveDesc: "Solo duel against Blue with customizable LP, difficulty and decks",
    menuDeckTitle: "DECK BUILDER & COLLECTION",
    menuDeckDesc: "Customize up to 5 decks of 40 cards and explore all 151 Pokémon",
    menuRulesTitle: "HOW TO PLAY / RULES",
    menuRulesDesc: "Comprehensive guide to phases, tributes, combat and types",
    menuPvpTitle: "2 PLAYERS ONLINE",
    menuPvpDesc: "Real-time peer-to-peer online battles",
    menuShopTitle: "CARD SHOP",
    menuShopDesc: "Booster packs, rare cards and cosmetics",
    menuSettingsTitle: "SETTINGS & AUDIO",
    menuSettingsDesc: "Language (Spanish / English), master volume, music and SFX",
    badgeSoon: "COMING SOON",
    preGameTitle: "⚔️ Duel Setup",
    setupLpLabel: "STARTING LIFE POINTS (LP)",
    setupAiLabel: "RIVAL AI LEVEL (BLUE)",
    setupDeckLabel: "PLAYER DECK (RED)",
    btnDeckBuilderShortcut: "🎴 Edit in Deck Builder",
    diffEasyName: "EASY",
    diffEasyDesc: "AI makes randomized mistakes and its deck contains fewer evolutions.",
    diffMediumName: "MEDIUM",
    diffMediumDesc: "Standard play without blunders. Deck balanced with player in ATK and DEF.",
    diffHardName: "HARD",
    diffHardDesc: "AI has higher ATK/DEF cards, lethal evolutions and optimal strategy.",
    btnStartDuel: "⚔️ Start Duel!",
    btnCancel: "Return to Menu",
    settingsTitle: "⚙️ Settings & Configuration",
    langSectionTitle: "LANGUAGE / IDIOMA",
    audioSectionTitle: "AUDIO & VOLUME CONTROL",
    btnMuteAll: "🔊 Mute All",
    btnUnmuteAll: "🔇 Unmute All",
    masterVolLabel: "🔊 Master Volume:",
    musicVolLabel: "🎵 Battle Music (BGM):",
    sfxVolLabel: "💥 Sound Effects (SFX):",
    lblActive: "Active",
    btnSaveClose: "✔️ Save & Close",
    spellConfirmTitle: "✨ Use Spell Card",
    spellConfirmQuestion: "How do you want to play this card?",
    btnActivateNow: "✨ Activate Now",
    btnSetFaceDown: "🃏 Set Face-Down",
    btnKeepInHand: "❌ Keep in Hand",
    targetLabel: "Target:",
    activateSetTitle: "🃏 Face-Down Card",
    activateSetQuestion: "Do you want to activate this card now?",
    btnKeepFaceDown: "Close / Keep Face-Down",
    btnSettings: "SETTINGS",
    btnMainMenu: "MENU",
    btnRules: "RULES",
    btnDeckShort: "DECKS",
    noticeTitle: "Coming Soon",
    noticeDesc: "This feature is currently in development for future updates.",
    btnUnderstood: "Understood ✔️",
    yourTurn: "YOUR TURN",
    rivalTurn: "RIVAL'S TURN (BLUE)",
    phaseDraw: "DRAW",
    phaseMain: "MAIN",
    phaseBattle: "BATTLE",
    phaseEnd: "END",
    btnNextPhase: "Next Phase ⏭️",
    btnToBattle: "To Battle Phase ⚔️",
    btnEndTurn: "End Turn 🏁",
    btnPassingRival: "Passing to rival... ⏳",
    secretCardName: "Face-Down Card",
    secretCardType: "SECRET",
    secretCardDesc: "This card is placed face-down. Its identity and effects remain secret until activated.",
    faceDownSuffix: "(Face-Down)",
    toastSetCard: "placed face-down in S/T Zone.",
    toastTurn1NoAttack: "Turn 1: Attacks cannot be declared during the first turn.",
    toastBattlePhase: "Battle Phase: Declare attacks with your Attack-position Pokémon!",
    toastAutoPassing: "End Phase: Automatically passing turn to Blue...",
    toastDirectAttack: "Direct attack from rival!",
    toastTypeAdvantage: "Elemental Advantage!",
    toastTypeDisadvantage: "Elemental Disadvantage!",
    toastVictorious: "VICTORY!",
    toastDefeat: "DEFEAT",
    rankAspirant: "Rank: Aspirant",
    rankNovice: "Rank: Novice Duelist",
    rankAdvanced: "Rank: Advanced Trainer",
    rankExpert: "Rank: Poké-Oh Master",
    rankLegend: "Rank: League Legend",
    deckBuilderTitle: "🎴 Deck Builder & Collection",
    deckBuilderSubtitle: "Build up to 5 decks of exactly 40 cards (max 3 copies each).",
    btnSaveDeck: "💾 Save Deck",
    btnAutoFill: "🎲 Auto-Fill",
    btnClearDeck: "🗑️ Clear",
    deckCurrentTitle: "CURRENT DECK",
    btnSaveAndClose: "✔️ Done / Close",
    rulesTitle: "📖 Poké-Oh! Rulebook & Guide",
    ruleTabObjective: "🎯 Objective & Phases",
    ruleTabSummons: "⭐ Summons & Tributes",
    ruleTabBattle: "⚔️ Combat & Types (±300)",
    ruleTabSpells: "🪄 Spells, Equips & Traps",
    ruleTabSecrets: "🃏 Face-Down & Secrets",
    searchPlaceholder: "Search by name or attack...",
    deckSavedSuccess: "Deck saved successfully with 40 cards!",
    deckInvalidCount: "A valid deck must contain exactly 40 cards.",
    deckMaxCopies: "Limit reached: Maximum 3 copies of this card in the deck.",
    deckFull: "The deck already has 40 cards (maximum reached).",
    btnPlayAgain: "Play Again ⚔️",
    btnReturnMainMenu: "Main Menu 🏠",
    rotateTitle: "Rotate Your Device!",
    rotateDesc: "To enjoy the full Poké-Oh! duel board on mobile phones and tablets, please rotate your screen to horizontal (Landscape) mode.",
    rotateBadge: "📱 ↔️ Landscape Mode Required",
    btnFullscreen: "Fullscreen",
    btnFullscreenShort: "FULLSCREEN"
  }
};

function aplicarIdioma(lang) {
  configuracionJuego.idioma = lang;
  const dict = I18N[lang] || I18N.es;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  const btnEs = document.getElementById('btn-lang-es');
  const btnEn = document.getElementById('btn-lang-en');
  if (btnEs && btnEn) {
    btnEs.classList.toggle('active', lang === 'es');
    btnEn.classList.toggle('active', lang === 'en');
  }

  const pDraw = document.getElementById('phase-draw');
  const pMain = document.getElementById('phase-main');
  const pBattle = document.getElementById('phase-battle');
  const pEnd = document.getElementById('phase-end');
  if (pDraw) pDraw.textContent = dict.phaseDraw;
  if (pMain) pMain.textContent = dict.phaseMain;
  if (pBattle) pBattle.textContent = dict.phaseBattle;
  if (pEnd) pEnd.textContent = dict.phaseEnd;

  actualizarUIFases();

  if (typeof renderizarSelectorMazosPrePartida === 'function') {
    renderizarSelectorMazosPrePartida();
  }
}

// ==========================================
// 1. SISTEMA DE 5 MAZOS DEL JUGADOR & PERSISTENCIA
// ==========================================

// Tabla de evolución directa de 3 etapas: la Fase 2 reduce su costo de 2 sacrificios a solo 1 si se sacrifica su Fase 1
const PRE_EVOLUCIONES_DIRECTAS = {
  3: 2,     // Venusaur <- Ivysaur
  6: 5,     // Charizard <- Charmeleon
  9: 8,     // Blastoise <- Wartortle
  12: 11,   // Butterfree <- Metapod
  15: 14,   // Beedrill <- Kakuna
  18: 17,   // Pidgeot <- Pidgeotto
  31: 30,   // Nidoqueen <- Nidorina
  34: 33,   // Nidoking <- Nidorino
  45: 44,   // Vileplume <- Gloom
  62: 61,   // Poliwrath <- Poliwhirl
  65: 64,   // Alakazam <- Kadabra
  68: 67,   // Machamp <- Machoke
  71: 70,   // Victreebel <- Weepinbell
  76: 75,   // Golem <- Graveler
  94: 93,   // Gengar <- Haunter
  149: 148  // Dragonite <- Dragonair
};

function obtenerPreEvolucionDirecta(cartaId) {
  return PRE_EVOLUCIONES_DIRECTAS[cartaId] || null;
}

function obtenerSlotsPreEvolucion(cartaId, estadoLado) {
  const preEvoId = obtenerPreEvolucionDirecta(cartaId);
  if (!preEvoId || !estadoLado || !Array.isArray(estadoLado.zonaMonstruos)) return [];
  const slots = [];
  estadoLado.zonaMonstruos.forEach((m, idx) => {
    if (m !== null && m.id === preEvoId) {
      slots.push(idx);
    }
  });
  return slots;
}

// 5 Sets de Cartas Temáticos con Composición Exacta: 20 Básicos, 5 Invocaciones/Evoluciones, 15 Hechizos/Equipos/Trampas (40 cartas totales, máx 3 copias)
const MAZOS_DEFAULT = [
  {
    id: 0,
    nombre: "Mazo 1: Selva Floral (Planta)",
    cartas: [
      // 20 Básicos Planta & Bicho
      1, 1, 1, 43, 43, 43, 69, 69, 69, 10, 10, 10, 13, 13, 13, 46, 46, 46, 114, 114,
      // 5 Invocaciones (Ivysaur x2, Venusaur x1, Gloom x1, Vileplume x1)
      2, 2, 3, 44, 45,
      // 15 Hechizos, Equipos y Trampas
      201, 201, 202, 202, 204, 204, 206, 206, 220, 220, 222, 222, 240, 240, 241
    ]
  },
  {
    id: 1,
    nombre: "Mazo 2: Furia Volcánica (Fuego)",
    cartas: [
      // 20 Básicos Fuego & Normal/Lucha
      4, 4, 4, 37, 37, 37, 58, 58, 58, 77, 77, 77, 133, 133, 133, 56, 56, 56, 52, 52,
      // 5 Invocaciones (Charmeleon x2, Charizard x1, Arcanine x1, Flareon x1)
      5, 5, 6, 59, 136,
      // 15 Hechizos, Equipos y Trampas
      201, 201, 203, 203, 204, 204, 208, 208, 220, 220, 226, 226, 240, 240, 241
    ]
  },
  {
    id: 2,
    nombre: "Mazo 3: Torrente Abisal (Agua)",
    cartas: [
      // 20 Básicos Agua
      7, 7, 7, 54, 54, 54, 60, 60, 60, 72, 72, 72, 79, 79, 79, 90, 90, 90, 86, 86,
      // 5 Invocaciones (Wartortle x2, Blastoise x1, Poliwhirl x1, Poliwrath x1)
      8, 8, 9, 61, 62,
      // 15 Hechizos, Equipos y Trampas
      201, 201, 202, 202, 204, 204, 207, 207, 222, 222, 223, 223, 240, 240, 242
    ]
  },
  {
    id: 3,
    nombre: "Mazo 4: Tempestad del Trueno (Eléctrico)",
    cartas: [
      // 20 Básicos Eléctrico & Volador/Normal
      25, 25, 25, 81, 81, 81, 100, 100, 100, 16, 16, 16, 21, 21, 21, 84, 84, 84, 19, 19,
      // 5 Invocaciones (Raichu x2, Magneton x1, Pidgeotto x1, Pidgeot x1)
      26, 26, 82, 17, 18,
      // 15 Hechizos, Equipos y Trampas
      201, 201, 204, 204, 206, 206, 208, 208, 220, 220, 221, 221, 240, 240, 243
    ]
  },
  {
    id: 4,
    nombre: "Mazo 5: Abismo Psíquico (Psíquico)",
    cartas: [
      // 20 Básicos Psíquico, Fantasma & Tierra
      63, 63, 63, 96, 96, 96, 92, 92, 92, 74, 74, 74, 50, 50, 50, 27, 27, 27, 122, 122,
      // 5 Invocaciones (Kadabra x2, Alakazam x1, Haunter x1, Gengar x1)
      64, 64, 65, 93, 94,
      // 15 Hechizos, Equipos y Trampas
      201, 201, 202, 202, 204, 204, 208, 208, 220, 220, 224, 224, 241, 241, 242
    ]
  }
];

function obtenerClaveMazosUsuario() {
  const username = (typeof UserManager !== 'undefined' && UserManager.currentUser && UserManager.currentUser.username)
    ? UserManager.currentUser.username.toLowerCase().trim()
    : 'invitado';
  return `pokeoh_user_decks_${username}_v1`;
}

function esMazosValidos(arr) {
  return Array.isArray(arr) && arr.length === 5 && arr.every(m => m && Array.isArray(m.cartas) && m.cartas.length === 40);
}

function cargarMazos() {
  try {
    // 1. Priorizar los mazos sincronizados en la cuenta de Supabase del usuario activo
    if (typeof UserManager !== 'undefined' && UserManager.currentUser && esMazosValidos(UserManager.currentUser.mazos)) {
      const clave = obtenerClaveMazosUsuario();
      localStorage.setItem(clave, JSON.stringify(UserManager.currentUser.mazos));
      return JSON.parse(JSON.stringify(UserManager.currentUser.mazos));
    }

    // 2. Fallback a caché local del usuario en localStorage
    const clave = obtenerClaveMazosUsuario();
    const raw = localStorage.getItem(clave);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (esMazosValidos(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Error cargando mazos, usando predeterminados:", err);
  }
  return JSON.parse(JSON.stringify(MAZOS_DEFAULT));
}

function guardarMazos(mazos) {
  try {
    const clave = obtenerClaveMazosUsuario();
    localStorage.setItem(clave, JSON.stringify(mazos));
    if (typeof UserManager !== 'undefined' && UserManager.currentUser) {
      UserManager.currentUser.mazos = JSON.parse(JSON.stringify(mazos));
      if (typeof UserManager.guardarMazosEnNube === 'function') {
        UserManager.guardarMazosEnNube(mazos);
      }
    }
    return true;
  } catch (err) {
    console.error("Error guardando mazos:", err);
    return false;
  }
}

let mazosJugador = cargarMazos();

// ==========================================
// 1.1. GENERADOR DE MAZOS SEGÚN DIFICULTAD Y DECK DEL JUGADOR
// ==========================================
function generarMazoSegunDificultad(dificultad = 'medio', esJugador = false, mazoJugadorCartas = null) {
  const todasLasCartas = Object.values(bdCartas);

  // Si es para el jugador, usar el mazo personalizado seleccionado
  if (esJugador) {
    const idx = configuracionJuego.mazoSeleccionadoIdx || 0;
    const mazoActual = mazosJugador[idx] || mazosJugador[0];
    if (mazoActual && Array.isArray(mazoActual.cartas) && mazoActual.cartas.length === 40) {
      const copia = [...mazoActual.cartas];
      barajarMazo(copia);
      return copia;
    }
    // Fallback a mazo predeterminado de 40 cartas
    const fallback = [...MAZOS_DEFAULT[0].cartas];
    barajarMazo(fallback);
    return fallback;
  }

  // --- MODO FÁCIL PARA LA IA ---
  if (dificultad === 'facil') {
    let basicosDebiles = todasLasCartas
      .filter(c => c.tipoCarta === 'monstruo' && c.etapa === 'Básico' && c.atk <= 1400)
      .map(c => c.id);
    if (basicosDebiles.length === 0) basicosDebiles = [10, 13, 16, 19, 21, 29, 32, 41, 43, 46, 50, 60, 69, 74];

    let evolucionesSuaves = todasLasCartas
      .filter(c => c.tipoCarta === 'monstruo' && c.etapa === 'Fase 1' && c.atk <= 1800)
      .map(c => c.id);
    if (evolucionesSuaves.length === 0) evolucionesSuaves = [11, 14, 17, 20];

    const magiasBasicas = [201, 202, 207, 208, 209, 210, 212, 213, 214, 215];

    const mazo = [];
    for (let i = 0; i < 20; i++) mazo.push(basicosDebiles[Math.floor(Math.random() * basicosDebiles.length)]);
    for (let i = 0; i < 5; i++) mazo.push(evolucionesSuaves[Math.floor(Math.random() * evolucionesSuaves.length)]);
    for (let i = 0; i < 15; i++) mazo.push(magiasBasicas[Math.floor(Math.random() * magiasBasicas.length)]);
    barajarMazo(mazo);
    return mazo;
  }

  // --- MODO MEDIO PARA LA IA ---
  if (dificultad === 'medio') {
    const basicos = todasLasCartas
      .filter(c => c.tipoCarta === 'monstruo' && c.sacrificios === 0 && c.etapa === 'Básico')
      .map(c => c.id);
    const evoluciones = todasLasCartas
      .filter(c => c.tipoCarta === 'monstruo' && (c.sacrificios > 0 || c.etapa !== 'Básico'))
      .map(c => c.id);
    const magiasOEquipos = todasLasCartas
      .filter(c => c.tipoCarta === 'magia' || c.tipoCarta === 'trampa')
      .map(c => c.id);

    const mazo = [];
    for (let i = 0; i < 20; i++) mazo.push(basicos[Math.floor(Math.random() * basicos.length)]);
    for (let i = 0; i < 5; i++) mazo.push(evoluciones[Math.floor(Math.random() * evoluciones.length)]);
    for (let i = 0; i < 15; i++) mazo.push(magiasOEquipos[Math.floor(Math.random() * magiasOEquipos.length)]);
    barajarMazo(mazo);
    return mazo;
  }

  // --- MODO DIFÍCIL PARA LA IA: CONTRARRESTA EL MAZO DEL JUGADOR ---
  if (dificultad === 'dificil') {
    // 1. Analizar elementos dominantes en el mazo del jugador
    let tiposPredominantes = [];
    if (mazoJugadorCartas && Array.isArray(mazoJugadorCartas) && mazoJugadorCartas.length > 0) {
      const conteoTipos = {};
      mazoJugadorCartas.forEach(id => {
        const c = bdCartas[id];
        if (c && c.tipoCarta === 'monstruo' && c.elemento) {
          conteoTipos[c.elemento] = (conteoTipos[c.elemento] || 0) + 1;
        }
      });
      tiposPredominantes = Object.entries(conteoTipos)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(entry => entry[0]);
    }

    // 2. Encontrar contra-tipos elementales (tipos que tienen ventaja contra los del jugador)
    const contraTipos = new Set();
    tiposPredominantes.forEach(tipoRed => {
      Object.entries(TABLA_TIPOS).forEach(([tipoCandidato, info]) => {
        if (info.fuerteContra && info.fuerteContra.includes(tipoRed)) {
          contraTipos.add(tipoCandidato);
        }
      });
    });

    const listaContraTipos = Array.from(contraTipos);

    // 3. Seleccionar básicos fuertes dando prioridad a contra-tipos
    let basicosCounter = todasLasCartas
      .filter(c => c.tipoCarta === 'monstruo' && c.etapa === 'Básico' && c.atk >= 1100 && listaContraTipos.includes(c.elemento))
      .map(c => c.id);
    let basicosFuertesGenerales = todasLasCartas
      .filter(c => c.tipoCarta === 'monstruo' && c.etapa === 'Básico' && c.atk >= 1200)
      .map(c => c.id);

    const poolBasicos = basicosCounter.length >= 6 ? basicosCounter.concat(basicosFuertesGenerales) : basicosFuertesGenerales;

    // 4. Seleccionar evoluciones élite y Legendarios dando prioridad a contra-tipos
    let evosCounter = todasLasCartas
      .filter(c => c.tipoCarta === 'monstruo' && c.etapa !== 'Básico' && c.atk >= 1800 && listaContraTipos.includes(c.elemento))
      .map(c => c.id);
    let evosTopGenerales = todasLasCartas
      .filter(c => c.tipoCarta === 'monstruo' && (c.etapa === 'Fase 2' || c.etapa === 'Legendario' || c.atk >= 2000))
      .map(c => c.id);

    const poolEvos = evosCounter.length >= 6 ? evosCounter.concat(evosTopGenerales) : evosTopGenerales;

    // 5. Cartas de Equipo y Trampas letales
    const itemsTop = [220, 221, 224, 230, 203, 206, 222, 223, 240, 241, 242, 243];

    const mazo = [];
    for (let i = 0; i < 20; i++) mazo.push(poolBasicos[Math.floor(Math.random() * poolBasicos.length)]);
    for (let i = 0; i < 5; i++) mazo.push(poolEvos[Math.floor(Math.random() * poolEvos.length)]);
    for (let i = 0; i < 15; i++) mazo.push(itemsTop[Math.floor(Math.random() * itemsTop.length)]);
    barajarMazo(mazo);
    return mazo;
  }

  return generarMazoSegunDificultad('medio', true);
}

// ==========================================
// 1.2. EVALUADOR ESTRATÉGICO DE POSICIÓN (TABLA DE TIPOS EN 3 DIFICULTADES)
// ==========================================
function evaluarMejorPosicionMonstruo(cartaId, elemento, miAtk, miDef, monstruosRed, dificultad = 'medio') {
  // Si Red no tiene monstruos en campo, la mejor posición indiscutible es ataque
  if (!monstruosRed || monstruosRed.length === 0) {
    if (dificultad === 'facil' && Math.random() < 0.25) {
      return 'defensa'; // Pifia en fácil
    }
    return 'ataque';
  }

  // En FÁCIL: 25% de cometer un error aleatorio
  if (dificultad === 'facil' && Math.random() < 0.25) {
    return Math.random() < 0.5 ? 'defensa' : 'ataque';
  }

  // Evaluar enfrentamiento contra cada monstruo de Red considerando TABLA DE TIPOS (+/- 300)
  let amenazaMayor = 0;
  let puedeDestruirAlguno = false;
  let puedeDestruirTodos = true;

  const elemBlue = elemento || 'normal';

  monstruosRed.forEach(r => {
    if (!r) return;
    const elemRed = (r.datos && r.datos.elemento) || 'normal';
    const atkRed = (typeof r.atk === 'number') ? r.atk : 0;
    const defRed = (typeof r.def === 'number') ? r.def : 0;
    const posRed = (r.obj && r.obj.posicion) || 'ataque';

    // Daño efectivo que Blue haría a Red con ventaja/desventaja
    const modTipoBlue = calcularVentajaTipo(elemBlue, elemRed);
    const atkEfectivoBlue = Math.max(0, (miAtk || 0) + modTipoBlue);

    // Daño efectivo que Red haría a Blue si Red ataca en su turno
    const modTipoRed = calcularVentajaTipo(elemRed, elemBlue);
    const atkEfectivoRed = Math.max(0, atkRed + modTipoRed);

    if (atkEfectivoRed > amenazaMayor) {
      amenazaMayor = atkEfectivoRed;
    }

    const statRed = posRed === 'ataque' ? atkRed : defRed;
    if (atkEfectivoBlue > statRed) {
      puedeDestruirAlguno = true;
    } else {
      puedeDestruirTodos = false;
    }
  });

  // Lógica de decisión:
  // - Si Blue en ataque es más débil que la mayor amenaza de Red (miAtk < amenazaMayor):
  //   Poner en DEFENSA para que el daño no reste LP directamente
  // - Si Blue supera o iguala a la mayor amenaza de Red:
  //   Poner en ATAQUE para presionar o contraatacar
  if ((miAtk || 0) < amenazaMayor) {
    // Si su defensa es decente o no puede destruir a todos, resguardar LP en defensa
    return 'defensa';
  } else if ((miAtk || 0) === amenazaMayor) {
    // Mismo daño: en ataque para disputar el campo y no ser presa fácil
    return 'ataque';
  } else {
    // Superior a las amenazas: ataque
    return 'ataque';
  }
}

// Snapshot inmutable de las estadísticas base de bdCartas (garantiza que NINGUNA partida altere las cartas base)
const statsBaseOriginales = {};
if (typeof bdCartas !== 'undefined') {
  for (const [id, c] of Object.entries(bdCartas)) {
    if (c.atk !== undefined || c.def !== undefined) {
      statsBaseOriginales[id] = { atk: c.atk, def: c.def };
    }
  }
}

function restaurarStatsBase() {
  for (const [id, stats] of Object.entries(statsBaseOriginales)) {
    if (bdCartas[id]) {
      bdCartas[id].atk = stats.atk;
      bdCartas[id].def = stats.def;
    }
  }
}

function obtenerAtkActual(slotData) {
  if (!slotData) return 0;
  const baseAtk = bdCartas[slotData.id] ? bdCartas[slotData.id].atk : 0;
  const mod = (typeof slotData.atkMod === 'number') ? slotData.atkMod : (slotData.modAtk || 0);
  return Math.max(0, baseAtk + mod);
}

function obtenerDefActual(slotData) {
  if (!slotData) return 0;
  const baseDef = bdCartas[slotData.id] ? bdCartas[slotData.id].def : 0;
  const mod = (typeof slotData.defMod === 'number') ? slotData.defMod : (slotData.modDef || 0);
  return Math.max(0, baseDef + mod);
}

// ==========================================
// 1.1 TABLA DE TIPOS POKÉMON Y EFECTIVIDADES (BONO +/- 300 ATK/DEF)
// ==========================================
const TABLA_TIPOS = {
  agua: {
    nombre: 'Agua',
    icono: '💧',
    color: '#3498db',
    fuerteContra: ['fuego', 'tierra', 'roca'],
    debilContra: ['electrico', 'planta']
  },
  fuego: {
    nombre: 'Fuego',
    icono: '🔥',
    color: '#e74c3c',
    fuerteContra: ['planta', 'hielo', 'bicho'],
    debilContra: ['agua', 'tierra', 'roca']
  },
  planta: {
    nombre: 'Planta',
    icono: '🌿',
    color: '#2ecc71',
    fuerteContra: ['agua', 'tierra', 'roca'],
    debilContra: ['fuego', 'hielo', 'veneno', 'bicho']
  },
  electrico: {
    nombre: 'Eléctrico',
    icono: '⚡',
    color: '#f1c40f',
    fuerteContra: ['agua'],
    debilContra: ['tierra']
  },
  tierra: {
    nombre: 'Tierra',
    icono: '🌍',
    color: '#d35400',
    fuerteContra: ['fuego', 'electrico', 'veneno', 'roca'],
    debilContra: ['agua', 'planta', 'hielo']
  },
  roca: {
    nombre: 'Roca',
    icono: '🪨',
    color: '#95a5a6',
    fuerteContra: ['fuego', 'hielo', 'bicho'],
    debilContra: ['agua', 'planta', 'lucha', 'tierra']
  },
  hielo: {
    nombre: 'Hielo',
    icono: '❄️',
    color: '#74b9ff',
    fuerteContra: ['planta', 'tierra', 'dragon'],
    debilContra: ['fuego', 'lucha', 'roca']
  },
  lucha: {
    nombre: 'Lucha',
    icono: '🥊',
    color: '#c0392b',
    fuerteContra: ['normal', 'hielo', 'roca'],
    debilContra: ['psiquico', 'hada']
  },
  veneno: {
    nombre: 'Veneno',
    icono: '☠️',
    color: '#8e44ad',
    fuerteContra: ['planta', 'hada'],
    debilContra: ['tierra', 'psiquico']
  },
  psiquico: {
    nombre: 'Psíquico',
    icono: '🔮',
    color: '#e056fd',
    fuerteContra: ['lucha', 'veneno'],
    debilContra: ['bicho', 'fantasma']
  },
  bicho: {
    nombre: 'Bicho',
    icono: '🐛',
    color: '#badc58',
    fuerteContra: ['planta', 'psiquico'],
    debilContra: ['fuego', 'roca', 'veneno']
  },
  fantasma: {
    nombre: 'Fantasma',
    icono: '👻',
    color: '#6c5ce7',
    fuerteContra: ['psiquico', 'fantasma'],
    debilContra: ['fantasma']
  },
  dragon: {
    nombre: 'Dragón',
    icono: '🐉',
    color: '#4834d4',
    fuerteContra: ['dragon'],
    debilContra: ['hielo', 'hada']
  },
  hada: {
    nombre: 'Hada',
    icono: '✨',
    color: '#ff9ff3',
    fuerteContra: ['lucha', 'dragon'],
    debilContra: ['veneno']
  },
  normal: {
    nombre: 'Normal',
    icono: '⚪',
    color: '#a4b0be',
    fuerteContra: [],
    debilContra: ['lucha']
  }
};

const ICONOS_ELEMENTOS = {
  agua: '💧',
  fuego: '🔥',
  planta: '🌿',
  electrico: '⚡',
  normal: '⚪',
  tierra: '🏜️',
  roca: '🪨',
  hielo: '❄️',
  lucha: '🥊',
  veneno: '☠️',
  psiquico: '🔮',
  bicho: '🐛',
  fantasma: '👻',
  dragon: '🐉',
  hada: '✨'
};

function obtenerInfoTipo(tipo) {
  if (!tipo) return null;
  const t = tipo.toLowerCase();
  return TABLA_TIPOS[t] || { nombre: tipo, icono: '⚪', color: '#a4b0be', fuerteContra: [], debilContra: [] };
}

function obtenerClaseFrontCarta(c) {
  if (!c) return '';
  if (c.tipoCarta === 'monstruo' && c.elemento) {
    return `card-elem-${c.elemento.toLowerCase()}`;
  }
  if (c.subtipo === 'Equipo') {
    return 'card-tipo-equipo';
  }
  if (c.tipoCarta === 'magia') {
    return 'card-tipo-magia';
  }
  if (c.tipoCarta === 'trampa') {
    return 'card-tipo-trampa';
  }
  return '';
}

function calcularVentajaTipo(tipoAtacante, tipoDefensor) {
  if (!tipoAtacante || !tipoDefensor) return 0;
  const tAtk = tipoAtacante.toLowerCase();
  const tDef = tipoDefensor.toLowerCase();
  const info = TABLA_TIPOS[tAtk];
  if (!info) return 0;

  if (info.fuerteContra && info.fuerteContra.includes(tDef)) {
    return 300; // Ventaja elemental: +300
  }
  if (info.debilContra && info.debilContra.includes(tDef)) {
    return -300; // Desventaja elemental: -300
  }
  return 0;
}

function inicializarModalTablaTipos() {
  const modal = document.getElementById('type-chart-modal');
  const btnOpen = document.getElementById('btn-open-type-chart');
  const btnClose = document.getElementById('btn-close-type-chart');
  const btnCloseX = document.getElementById('btn-close-type-chart-x');
  const grid = document.getElementById('type-chart-grid');

  if (!modal || !grid) return;

  grid.innerHTML = '';
  Object.entries(TABLA_TIPOS).forEach(([key, t]) => {
    const card = document.createElement('div');
    card.className = 'type-card-item';
    card.style.borderLeftColor = t.color;

    const strongPills = t.fuerteContra.length > 0
      ? t.fuerteContra.map(k => `<span class="type-pill pill-strong">${TABLA_TIPOS[k]?.icono || ''} ${TABLA_TIPOS[k]?.nombre || k}</span>`).join(' ')
      : '<span class="type-pill">Ninguno</span>';

    const weakPills = t.debilContra.length > 0
      ? t.debilContra.map(k => `<span class="type-pill pill-weak">${TABLA_TIPOS[k]?.icono || ''} ${TABLA_TIPOS[k]?.nombre || k}</span>`).join(' ')
      : '<span class="type-pill">Ninguno</span>';

    card.innerHTML = `
      <div class="type-card-header">
        <span>${t.icono}</span>
        <span style="color:${t.color}">${t.nombre}</span>
      </div>
      <div class="type-card-strong">
        <span class="badge-strong">+300 vs:</span> ${strongPills}
      </div>
      <div class="type-card-weak">
        <span class="badge-weak">-300 vs:</span> ${weakPills}
      </div>
    `;
    grid.appendChild(card);
  });

  const abrirModal = () => {
    modal.classList.remove('hidden');
    AudioManager.reproducirSFX('enter');
  };

  const cerrarModal = () => {
    modal.classList.add('hidden');
  };

  if (btnOpen) btnOpen.onclick = abrirModal;
  if (btnClose) btnClose.onclick = cerrarModal;
  if (btnCloseX) btnCloseX.onclick = cerrarModal;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) cerrarModal();
  });
}

// Modal de confirmación para uso de cartas (con opciones de Activar, Colocar Boca Abajo o Cancelar)
function abrirModalConfirmacionCarta({
  titulo = "✨ Usar Carta",
  datosCarta,
  cartaId,
  infoTarget = null,
  slotMTIndex = null,
  onConfirm = () => {},
  onSet = null
}) {
  const modal = document.getElementById('spell-confirm-modal');
  const titleElem = document.getElementById('spell-confirm-title');
  const previewElem = document.getElementById('spell-confirm-preview');
  const nameElem = document.getElementById('spell-confirm-name');
  const tagElem = document.getElementById('spell-confirm-tag');
  const descElem = document.getElementById('spell-confirm-desc');
  const targetInfoElem = document.getElementById('spell-confirm-target-info');
  const targetNameElem = document.getElementById('spell-confirm-target-name');
  const btnYes = document.getElementById('btn-spell-confirm-yes');
  const btnSet = document.getElementById('btn-spell-confirm-set');
  const btnNo = document.getElementById('btn-spell-confirm-no');

  if (!modal) {
    onConfirm();
    return;
  }

  titleElem.textContent = titulo;
  nameElem.textContent = datosCarta.nombre;
  tagElem.textContent = `${datosCarta.tipoCarta.toUpperCase()} - ${datosCarta.subtipo || 'Soporte'}`;
  descElem.textContent = datosCarta.descripcion || datosCarta.descripcionCorta || '';

  if (infoTarget) {
    targetInfoElem.style.display = 'block';
    targetNameElem.textContent = infoTarget;
  } else {
    targetInfoElem.style.display = 'none';
  }

  const fallbackSrc = datosCarta.spriteEstatico || datosCarta.imagenOficial;
  previewElem.innerHTML = `
    <div class="card-slot preview-card ${datosCarta.claseCss}" style="width: 100%; height: 100%; pointer-events: none;">
      <span class="card-name-mini">${datosCarta.nombre}</span>
      <div class="card-art-container">
        <img class="card-art-img item-art-enlarged" src="${datosCarta.imagenOficial || fallbackSrc}" alt="${datosCarta.nombre}" onerror="this.onerror=null; this.src='${fallbackSrc}';" draggable="false">
      </div>
      <span class="card-stat-mini">${datosCarta.subtipo || 'M/T'}</span>
    </div>
  `;

  btnYes.onclick = () => {
    modal.classList.add('hidden');
    onConfirm();
  };

  if (btnSet) {
    btnSet.onclick = () => {
      modal.classList.add('hidden');
      if (onSet) {
        onSet();
      } else {
        colocarCartaBocaAbajo(datosCarta, cartaId, slotMTIndex);
      }
    };
  }

  btnNo.onclick = () => {
    modal.classList.add('hidden');
    const msg = configuracionJuego.idioma === 'en'
      ? `Cancelled. ${datosCarta.nombre} remains in your hand.`
      : `Uso cancelado. ${datosCarta.nombre} permanece en tu mano.`;
    mostrarMensajeToast(msg);
  };

  modal.classList.remove('hidden');
  AudioManager.reproducirSFX('enter');
}

// Colocar carta mágica, de equipo o trampa boca abajo en el campo sin usarla
function colocarCartaBocaAbajo(datosCarta, cartaId, slotIndex = null) {
  if (slotIndex === null || slotIndex === undefined) {
    slotIndex = estadoJugador.zonaMagiasTrampas.findIndex(s => s === null);
  }
  if (slotIndex === -1 || slotIndex === null) {
    mostrarMensajeToast(configuracionJuego.idioma === 'en' ? "Your S/T zones are occupied." : "Tus zonas de Magia/Trampa están ocupadas.");
    return false;
  }

  // Quitar la carta de la mano
  const idxEnMano = estadoJugador.mano.indexOf(cartaId);
  if (idxEnMano !== -1) {
    estadoJugador.mano.splice(idxEnMano, 1);
  }
  renderizarMano(estadoJugador);

  // Almacenar en la zona como carta boca abajo del jugador
  estadoJugador.zonaMagiasTrampas[slotIndex] = {
    id: cartaId,
    activa: false,
    bocaAbajo: true,
    dueno: 'jugador'
  };

  const slotMTElem = document.querySelector(`#player-side .spells-row .spell-trap-slot[data-slot-index="${slotIndex}"]`);
  if (slotMTElem) {
    slotMTElem.classList.add('occupied');
    slotMTElem.innerHTML = `
      <div class="card-on-field preview-card card-back face-down-card">
        <span class="card-name-mini">POKÉ-OH</span>
        <div class="card-art-container face-down-art">
          <span class="face-down-icon">🃏</span>
        </div>
        <span class="card-stat-mini set-badge">SET</span>
      </div>
    `;

    // El jugador SÍ puede ver su propia carta con el inspector
    const cardEl = slotMTElem.querySelector('.card-on-field');
    configurarInspectorHover(cardEl, datosCarta, true, false);

    slotMTElem.onclick = () => {
      if (estadoJuego.turnoDe === 'jugador' && estadoJuego.faseActual === 'PRINCIPAL') {
        abrirModalActivarCartaColocada(datosCarta, cartaId, slotIndex, slotMTElem);
      }
    };
  }

  AudioManager.reproducirSFX('enter');
  crearNumeroFlotante("SET", slotMTElem, 'buff');
  const msg = configuracionJuego.idioma === 'en'
    ? `${datosCarta.nombre} placed face-down in S/T Zone.`
    : `¡${datosCarta.nombre} colocada boca abajo! Pasa el cursor para inspeccionarla.`;
  mostrarMensajeToast(msg);
  actualizarMarcadorLateral();

  if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
    MultiplayerManager.enviarAccion({
      tipo: 'JUGAR_MAGIA_EQUIPO',
      carta: datosCarta,
      slotIndex: slotIndex,
      bocaAbajo: true,
      manoCount: estadoJugador.mano.length
    });
    MultiplayerManager.sincronizarEstadoCampo();
  }
  return true;
}

// Modal para activar una carta propia colocada boca abajo
function abrirModalActivarCartaColocada(datosCarta, cartaId, slotIndex, slotElem) {
  const modal = document.getElementById('activate-set-modal');
  const previewElem = document.getElementById('activate-set-preview');
  const nameElem = document.getElementById('activate-set-name');
  const tagElem = document.getElementById('activate-set-tag');
  const descElem = document.getElementById('activate-set-desc');
  const btnYes = document.getElementById('btn-activate-set-yes');
  const btnNo = document.getElementById('btn-activate-set-no');

  if (!modal) return;

  nameElem.textContent = datosCarta.nombre;
  tagElem.textContent = `${datosCarta.tipoCarta.toUpperCase()} - ${datosCarta.subtipo || 'Soporte'}`;
  descElem.textContent = datosCarta.descripcion || datosCarta.descripcionCorta || '';

  const fallbackSrc = datosCarta.spriteEstatico || datosCarta.imagenOficial;
  previewElem.innerHTML = `
    <div class="card-slot preview-card ${datosCarta.claseCss}" style="width: 100%; height: 100%; pointer-events: none;">
      <span class="card-name-mini">${datosCarta.nombre}</span>
      <div class="card-art-container">
        <img class="card-art-img item-art-enlarged" src="${datosCarta.imagenOficial || fallbackSrc}" alt="${datosCarta.nombre}" onerror="this.onerror=null; this.src='${fallbackSrc}';" draggable="false">
      </div>
      <span class="card-stat-mini">${datosCarta.subtipo || 'M/T'}</span>
    </div>
  `;

  btnYes.onclick = () => {
    modal.classList.add('hidden');
    // Activar la carta que estaba colocada boca abajo
    if (esCartaEquipo(datosCarta, cartaId)) {
      const monstruosActivos = contarMonstruosEnCampoJugador();
      if (monstruosActivos.length === 0) {
        mostrarMensajeToast("No controlas ningún Pokémon en el campo para equipar esta carta.");
        return;
      }
      if (monstruosActivos.length === 1) {
        aplicarEquipoAMonstruo(datosCarta, cartaId, monstruosActivos[0], slotIndex);
      } else {
        abrirModalSeleccionEquip(datosCarta, cartaId, slotIndex);
      }
    } else if (datosCarta.tipoCarta === 'magia') {
      activarCartaMagica(datosCarta, cartaId, slotIndex, slotElem);
    } else {
      mostrarMensajeToast("Las cartas Trampa se activan automáticamente como respuesta al ataque del rival.");
    }
  };

  btnNo.onclick = () => {
    modal.classList.add('hidden');
  };

  modal.classList.remove('hidden');
  AudioManager.reproducirSFX('enter');
}

// ==========================================
// 2. ESTADO DEL JUGADOR, OPONENTE Y DEL JUEGO
// ==========================================
const estadoJugador = {
  nombre: "Jugador (Red)",
  lp: 8000,
  mano: [],
  zonaMonstruos: [null, null, null, null, null],
  zonaMagiasTrampas: [null, null, null, null, null],
  cementerio: [],
  mazo: []
};

// El Rival Blue comienza SIN cartas en el campo
const estadoOponente = {
  nombre: "Rival (Blue)",
  lp: 8000,
  zonaMonstruos: [null, null, null, null, null],
  zonaMagiasTrampas: [null, null, null, null, null],
  cementerio: [],
  mazo: [],
  mano: []
};

const estadoJuego = {
  turno: 1,
  turnoDe: 'jugador',
  fases: ['ROBO', 'PRINCIPAL', 'BATALLA', 'FIN'],
  faseActual: 'PRINCIPAL',
  atacanteSeleccionado: null,
  haInvocadoMonstruoEsteTurno: false // Regla: Solo 1 invocación de monstruo por turno (magias y equipos libres)
};

// ==========================================
// 3. MARCADOR LATERAL DE PUNTOS DE DUELO
// ==========================================
const marcadorDuelo = {
  puntos: 0,
  sacrificios: 0,
  invocaciones: 0,
  destruidos: 0,
  danoTotal: 0
};

function sumarPuntosDuelo(cantidad, motivo) {
  marcadorDuelo.puntos += cantidad;
  actualizarMarcadorLateral(motivo, cantidad);
}

function actualizarMarcadorLateral(motivo = null, ptsGanados = 0) {
  // 1. Contador numérico de puntos con animación
  const elPuntos = document.getElementById('scoreboard-points');
  if (elPuntos) {
    elPuntos.textContent = String(marcadorDuelo.puntos).padStart(4, '0');
    elPuntos.classList.add('score-pulse');
    setTimeout(() => elPuntos.classList.remove('score-pulse'), 300);
  }

  // 2. Rango / Tier según los puntos
  const elTier = document.getElementById('scoreboard-tier');
  if (elTier) {
    let rango = "Aspirante";
    if (marcadorDuelo.puntos >= 5000) rango = "👑 Maestro Pokémon";
    else if (marcadorDuelo.puntos >= 3000) rango = "⭐ Alto Mando";
    else if (marcadorDuelo.puntos >= 1500) rango = "⚡ Líder de Gimnasio";
    else if (marcadorDuelo.puntos >= 600) rango = "🔥 Entrenador Promesa";
    elTier.textContent = `Rango: ${rango}`;
  }

  // 3. Métricas
  const elSacrificios = document.getElementById('metric-sacrificios');
  if (elSacrificios) elSacrificios.textContent = marcadorDuelo.sacrificios;

  const elInvocaciones = document.getElementById('metric-invocaciones');
  if (elInvocaciones) elInvocaciones.textContent = marcadorDuelo.invocaciones;

  const elDestruidos = document.getElementById('metric-destruidos');
  if (elDestruidos) elDestruidos.textContent = marcadorDuelo.destruidos;

  const elDano = document.getElementById('metric-dano');
  if (elDano) elDano.textContent = marcadorDuelo.danoTotal;

  // 4. Barras de Vida (LP) en el sidebar
  const maxLp = configuracionJuego.lpMax || 8000;
  const elSidePlayerLp = document.getElementById('side-player-lp');
  if (elSidePlayerLp) elSidePlayerLp.textContent = estadoJugador.lp;

  const elSidePlayerBar = document.getElementById('side-player-bar');
  if (elSidePlayerBar) {
    const pct = Math.max(0, Math.min(100, (estadoJugador.lp / maxLp) * 100));
    elSidePlayerBar.style.width = `${pct}%`;
  }

  const elSideOpponentLp = document.getElementById('side-opponent-lp');
  if (elSideOpponentLp) elSideOpponentLp.textContent = estadoOponente.lp;

  const elSideOpponentBar = document.getElementById('side-opponent-bar');
  if (elSideOpponentBar) {
    const pct = Math.max(0, Math.min(100, (estadoOponente.lp / maxLp) * 100));
    elSideOpponentBar.style.width = `${pct}%`;
  }

  // 5. Agregar entrada al registro de puntos si hubo ganancia
  if (motivo && ptsGanados > 0) {
    const logList = document.getElementById('score-log-list');
    if (logList) {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.innerHTML = `
        <span class="log-badge-turn">T${estadoJuego.turno}</span>
        <span class="log-desc" title="${motivo}">${motivo}</span>
        <span class="log-pts">+${ptsGanados}</span>
      `;
      logList.insertBefore(entry, logList.firstChild);
      if (logList.children.length > 20) {
        logList.removeChild(logList.lastChild);
      }
    }
  }
}

// ==========================================
// 4. MOTOR DE AUDIO Y BANDAS SONORAS DE POKÉMON ESMERALDA
// ==========================================
const AudioManager = {
  sfxHabilitado: true,
  musicaHabilitada: true,
  audioCtx: null,
  musicaIntervalo: null,
  musicaAudioActual: null,
  temaActual: null, // 'menu' | 'batalla' | 'victoria'
  volumenMaster: 1.0,
  volumenMusica: 0.8,
  volumenSFX: 0.8,
  silenciadoTotal: false,

  // Bandas sonoras oficiales de Pokémon Esmeralda (Re-Engineered)
  pistasMusica: {
    menu: 'https://nu.vgmtreasurechest.com/soundtracks/pokemon-emerald-re-engineered-soundtrack-2004/xocuqwia/03.%20Title%20Screen%20Main%20Theme.mp3',
    batalla: 'https://nu.vgmtreasurechest.com/soundtracks/pokemon-emerald-re-engineered-soundtrack-2004/wbqcpqlj/09.%20Battle%21%20%28Wild%20Pok%C3%A9mon%29.mp3',
    victoria: 'https://nu.vgmtreasurechest.com/soundtracks/pokemon-emerald-re-engineered-soundtrack-2004/kauwzirj/10.%20Victory%21%20%28Wild%20Pok%C3%A9mon%29.mp3'
  },

  obtenerVolumenSFX(base = 0.6) {
    if (this.silenciadoTotal || !this.sfxHabilitado) return 0;
    return Math.max(0, Math.min(1, base * this.volumenMaster * this.volumenSFX));
  },

  obtenerVolumenMusica(base = 0.5) {
    if (this.silenciadoTotal || !this.musicaHabilitada) return 0;
    return Math.max(0, Math.min(1, base * this.volumenMaster * this.volumenMusica));
  },

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  },

  reproducirMusicaTema(tema) {
    // Si ya está sonando este mismo tema y no está pausado, solo ajustar volumen
    if (this.temaActual === tema && this.musicaAudioActual && !this.musicaAudioActual.paused) {
      this.actualizarVolumenMusica();
      return;
    }

    this.temaActual = tema;
    this.detenerMusica();

    const vol = this.obtenerVolumenMusica(0.5);
    if (vol <= 0 || !this.musicaHabilitada || this.silenciadoTotal) return;

    const url = this.pistasMusica[tema];
    if (!url) return;

    try {
      const audio = new Audio(url);
      audio.loop = true; // Repetición automática al terminar
      audio.volume = vol;
      // Respaldo de bucle infinito para navegadores con soporte de loop estricto
      audio.onended = () => {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      };

      this.musicaAudioActual = audio;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn(`Autoplay diferido para tema '${tema}':`, err);
          if (tema === 'batalla') {
            this.iniciarSintetizadorRetro();
          }
        });
      }
    } catch (e) {
      console.warn("Error reproduciendo pista de música:", e);
      if (tema === 'batalla') this.iniciarSintetizadorRetro();
    }
  },

  detenerMusica() {
    if (this.musicaAudioActual) {
      try {
        this.musicaAudioActual.pause();
        this.musicaAudioActual.currentTime = 0;
      } catch (e) {}
      this.musicaAudioActual = null;
    }
    this.detenerSintetizadorRetro();
  },

  actualizarVolumenMusica() {
    const vol = this.obtenerVolumenMusica(0.5);
    if (this.musicaAudioActual) {
      try {
        this.musicaAudioActual.volume = vol;
      } catch (e) {}
    }
  },

  iniciarMusicaBatalla() {
    this.reproducirMusicaTema('batalla');
  },

  detenerMusicaBatalla() {
    this.detenerMusica();
  },

  iniciarSintetizadorRetro() {
    this.detenerSintetizadorRetro();
    const curVol = this.obtenerVolumenMusica(0.08);
    if (curVol <= 0) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const notas = [146.83, 146.83, 220.00, 196.00, 146.83, 164.81, 174.61, 164.81];
      let step = 0;
      this.musicaIntervalo = setInterval(() => {
        const v = this.obtenerVolumenMusica(0.08);
        if (v <= 0) return;
        try {
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(notas[step % notas.length], now);
          gain.gain.setValueAtTime(v, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
          osc.start(now);
          osc.stop(now + 0.2);
          step++;
        } catch (err) {}
      }, 210);
    } catch (e) {}
  },

  detenerSintetizadorRetro() {
    if (this.musicaIntervalo) {
      clearInterval(this.musicaIntervalo);
      this.musicaIntervalo = null;
    }
  },

  reproducirGrito(slug) {
    const vol = this.obtenerVolumenSFX(0.55);
    if (vol <= 0 || !slug) return;
    const url = `https://play.pokemonshowdown.com/audio/cries/${slug}.mp3`;
    const audio = new Audio(url);
    audio.volume = vol;
    audio.play().catch(() => {
      this.sintetizarGritoRetro(slug);
    });
  },

  reproducirSFX(tipo) {
    const vol = this.obtenerVolumenSFX(0.6);
    if (vol <= 0) return;

    const urls = {
      'enter': 'https://play.pokemonshowdown.com/audio/sfx/enter.mp3',
      'hit': 'https://play.pokemonshowdown.com/audio/sfx/hit.mp3',
      'hit-super': 'https://play.pokemonshowdown.com/audio/sfx/hit-super.mp3',
      'faint': 'https://play.pokemonshowdown.com/audio/sfx/faint.mp3'
    };

    if (urls[tipo]) {
      const audio = new Audio(urls[tipo]);
      audio.volume = vol;
      audio.play().catch(() => {
        this.sintetizarSFXRetro(tipo);
      });
    } else {
      this.sintetizarSFXRetro(tipo);
    }
  },

  sintetizarSFXRetro(tipo) {
    try {
      const vol = this.obtenerVolumenSFX(0.35);
      if (vol <= 0) return;
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (tipo === 'hit' || tipo === 'enter') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
        gain.gain.setValueAtTime(vol * 0.85, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (tipo === 'hit-super') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.3);
        gain.gain.setValueAtTime(vol * 1.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (tipo === 'faint' || tipo === 'sacrificio') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.linearRampToValueAtTime(55, now + 0.45);
        gain.gain.setValueAtTime(vol, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (tipo === 'heal') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.setValueAtTime(440, now + 0.08);
        osc.frequency.setValueAtTime(660, now + 0.16);
        gain.gain.setValueAtTime(vol * 0.7, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {}
  },

  sintetizarGritoRetro(slug) {
    try {
      const vol = this.obtenerVolumenSFX(0.2);
      if (vol <= 0) return;
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(800, now + 0.1);
      osc.frequency.linearRampToValueAtTime(300, now + 0.25);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  },

  actualizarBotonesUI() {
    const btnBgm = document.getElementById('btn-toggle-bgm');
    const statusBgm = document.getElementById('bgm-status');
    const chkMusic = document.getElementById('chk-music-active');

    const bgmActivo = this.musicaHabilitada && !this.silenciadoTotal;
    if (btnBgm) btnBgm.className = bgmActivo ? 'audio-btn active' : 'audio-btn muted';
    if (statusBgm) statusBgm.textContent = bgmActivo ? 'ON' : 'OFF';
    if (chkMusic) chkMusic.checked = this.musicaHabilitada;

    const btnSfx = document.getElementById('btn-toggle-sfx');
    const statusSfx = document.getElementById('sfx-status');
    const chkSfx = document.getElementById('chk-sfx-active');

    const sfxActivo = this.sfxHabilitado && !this.silenciadoTotal;
    if (btnSfx) btnSfx.className = sfxActivo ? 'audio-btn active' : 'audio-btn muted';
    if (statusSfx) statusSfx.textContent = sfxActivo ? 'ON' : 'OFF';
    if (chkSfx) chkSfx.checked = this.sfxHabilitado;
  },

  toggleMusica() {
    this.musicaHabilitada = !this.musicaHabilitada;
    if (this.musicaHabilitada && !this.silenciadoTotal) {
      const isMenuVisible = document.getElementById('main-menu-overlay') && !document.getElementById('main-menu-overlay').classList.contains('hidden');
      const tema = this.temaActual || (isMenuVisible ? 'menu' : 'batalla');
      this.reproducirMusicaTema(tema);
    } else {
      this.detenerMusica();
    }
    this.actualizarBotonesUI();
  },

  toggleSFX() {
    this.sfxHabilitado = !this.sfxHabilitado;
    if (this.sfxHabilitado && !this.silenciadoTotal) {
      this.reproducirSFX('enter');
    }
    this.actualizarBotonesUI();
  }
};

// ==========================================
// 5. ANIMACIONES VISUALES Y COMBATE
// ==========================================
function lanzarEfectoVisual(tipo, elementoDestino) {
  const overlay = document.getElementById('battle-fx-overlay');
  if (!overlay || !elementoDestino || typeof elementoDestino.getBoundingClientRect !== 'function') return;

  const rect = elementoDestino.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const fxDiv = document.createElement('div');
  const clasesFx = {
    'sacrificio': 'fx-vortex',
    'electrico': 'fx-lightning',
    'fuego': 'fx-fire',
    'corte': 'fx-slash',
    'escudo': 'fx-shield'
  };

  fxDiv.className = clasesFx[tipo] || 'fx-slash';
  fxDiv.style.left = `${x}px`;
  fxDiv.style.top = `${y}px`;

  overlay.appendChild(fxDiv);

  setTimeout(() => {
    if (fxDiv.parentNode) {
      fxDiv.parentNode.removeChild(fxDiv);
    }
  }, 900);
}

function crearNumeroFlotante(texto, elementoOrigen, tipo = 'damage') {
  const container = document.getElementById('floating-fx-container');
  if (!container || !elementoOrigen || typeof elementoOrigen.getBoundingClientRect !== 'function') return;

  const rect = elementoOrigen.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  const numElem = document.createElement('div');
  numElem.className = `floating-number floating-${tipo}`;
  numElem.textContent = texto;
  numElem.style.left = `${x}px`;
  numElem.style.top = `${y}px`;

  container.appendChild(numElem);

  setTimeout(() => {
    if (numElem.parentNode) {
      numElem.parentNode.removeChild(numElem);
    }
  }, 1200);
}

function mostrarMensajeToast(mensaje) {
  const toast = document.getElementById('battle-toast');
  if (toast) {
    toast.textContent = mensaje;
    toast.title = mensaje;
  }
}

let alertaReglaTimeout = null;

function mostrarAlertaRegla(mensajeHtml, elementoOrigen = null, textoFlotante = null) {
  let banner = document.getElementById('floating-rule-alert');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'floating-rule-alert';
    banner.className = 'floating-rule-alert';
    banner.addEventListener('click', () => {
      banner.classList.remove('visible');
    });
    document.body.appendChild(banner);
  }

  banner.innerHTML = `<span class="alert-icon">⚠️</span><span class="alert-text">${mensajeHtml}</span>`;
  banner.classList.add('visible');

  if (alertaReglaTimeout) clearTimeout(alertaReglaTimeout);
  alertaReglaTimeout = setTimeout(() => {
    if (banner) banner.classList.remove('visible');
  }, 3000);

  if (elementoOrigen && textoFlotante) {
    crearNumeroFlotante(textoFlotante, elementoOrigen, 'damage');
  }
}

function mostrarAvisoYaInvocoEsteTurno(datosCarta = null, elementoOrigen = null) {
  const isEn = configuracionJuego.idioma === 'en';
  const nombre = datosCarta && datosCarta.nombre ? datosCarta.nombre : 'Pokémon';
  const msgPlano = isEn
    ? `Cannot summon ${nombre}: You already summoned a Pokémon this turn (max 1 per turn).`
    : `¡No puedes invocar a ${nombre}! Ya invocaste un Pokémon en este turno (máximo 1 por turno).`;
  const msgHtml = isEn
    ? `Cannot summon <b>${nombre}</b>: You already summoned a Pokémon this turn (max 1 per turn).`
    : `No puedes invocar a <b>${nombre}</b>: ya realizaste tu única invocación de Pokémon en este turno.`;

  mostrarMensajeToast(msgPlano);
  mostrarAlertaRegla(msgHtml, elementoOrigen, isEn ? "1 SUMMON/TURN!" : "¡YA INVOCASTE!");
  if (typeof AudioManager !== 'undefined' && typeof AudioManager.reproducirSFX === 'function') {
    AudioManager.reproducirSFX('hit');
  }
}

// ==========================================
// 6. INSPECTOR DE CARTAS (HOVER Y TOUCH DETALLADO)
// ==========================================
let inspectorTouchTimeout = null;

function configurarInspectorHover(elemento, datosCarta, esPropiaBocaAbajo = false, esOponenteBocaAbajo = false, obtenerSlotCampoFn = null) {
  const inspector = document.getElementById('card-inspector');
  const imgElem = document.getElementById('inspector-img');
  const nameElem = document.getElementById('inspector-name');
  const typeElem = document.getElementById('inspector-type');
  const statsElem = document.getElementById('inspector-stats');
  const descElem = document.getElementById('inspector-desc');

  if (!inspector || (!datosCarta && !esOponenteBocaAbajo)) return;

  const mostrarInspector = (esTouch = false) => {
    if (inspectorTouchTimeout) {
      clearTimeout(inspectorTouchTimeout);
      inspectorTouchTimeout = null;
    }

    const isEn = configuracionJuego.idioma === 'en';

    // REGLA: Si es una carta boca abajo del rival, NO revelar información
    if (esOponenteBocaAbajo) {
      imgElem.src = 'src/img/back.svg';
      imgElem.style.display = 'block';
      imgElem.alt = isEn ? "Face-Down Card" : "Carta Boca Abajo";
      nameElem.textContent = isEn ? "Face-Down Card" : "Carta Boca Abajo";
      typeElem.textContent = isEn ? "SECRET" : "SECRETO";
      statsElem.style.display = 'none';
      statsElem.classList.remove('stat-buffed');
      descElem.textContent = isEn
        ? "This card is placed face-down. Its identity and effects remain secret until activated."
        : "Esta carta está colocada boca abajo. Su contenido y efectos son secretos hasta que sea activada.";
      inspector.classList.remove('hidden');
      if (esTouch) {
        inspectorTouchTimeout = setTimeout(ocultarInspector, 3200);
      }
      return;
    }

    const fallbackSrc = datosCarta.spriteEstatico || datosCarta.imagenOficial || '';
    const srcFinal = datosCarta.imagenOficial || fallbackSrc;

    if (srcFinal) {
      imgElem.src = srcFinal;
      imgElem.style.display = 'block';
    } else {
      imgElem.style.display = 'none';
      imgElem.removeAttribute('src');
    }

    imgElem.onerror = () => {
      if (fallbackSrc && imgElem.src !== fallbackSrc) {
        imgElem.src = fallbackSrc;
      } else {
        imgElem.style.display = 'none';
      }
    };

    imgElem.alt = datosCarta.nombre || '';
    const suffix = esPropiaBocaAbajo ? (isEn ? " (Face-Down)" : " (Boca Abajo)") : "";
    nameElem.textContent = `${datosCarta.nombre}${suffix}`;

    const slotCampo = (typeof obtenerSlotCampoFn === 'function') ? obtenerSlotCampoFn() : null;
    let descTexto = datosCarta.descripcion || '';

    if (datosCarta.tipoCarta === 'monstruo') {
      const tribText = datosCarta.sacrificios > 0
        ? ` (${datosCarta.sacrificios} ${isEn ? (datosCarta.sacrificios > 1 ? 'Tributes' : 'Tribute') : (datosCarta.sacrificios > 1 ? 'Sacrificios' : 'Sacrificio')})`
        : '';
      typeElem.textContent = `${datosCarta.etapa}${tribText} [${(datosCarta.elemento || 'Normal').toUpperCase()}]`;

      const curAtk = slotCampo ? obtenerAtkActual(slotCampo) : datosCarta.atk;
      const curDef = slotCampo ? obtenerDefActual(slotCampo) : datosCarta.def;
      const atkBonus = curAtk - (datosCarta.atk || 0);
      const defBonus = curDef - (datosCarta.def || 0);

      const atkStr = atkBonus > 0 ? `${curAtk} (+${atkBonus})` : `${curAtk}`;
      const defStr = defBonus > 0 ? `${curDef} (+${defBonus})` : `${curDef}`;

      statsElem.textContent = `ATK ${atkStr} / DEF ${defStr}`;
      statsElem.classList.toggle('stat-buffed', atkBonus > 0 || defBonus > 0);
      statsElem.style.display = 'inline-block';

      if (slotCampo && Array.isArray(slotCampo.equipos) && slotCampo.equipos.length > 0) {
        const listaEquipos = slotCampo.equipos.map(eqId => {
          const eqC = bdCartas[eqId];
          const ef = obtenerEfectoEquipo(eqId);
          return eqC ? `${eqC.nombre} (${ef.texto})` : `#${eqId}`;
        }).join(', ');
        const prefEq = isEn ? '🗡️ Equipped:' : '🗡️ Equipado:';
        descTexto = `${prefEq} ${listaEquipos} — ${descTexto}`;
      }
    } else if (esCartaEquipo(datosCarta, datosCarta.id)) {
      const ef = obtenerEfectoEquipo(datosCarta.id);
      typeElem.textContent = `${datosCarta.tipoCarta.toUpperCase()} (${datosCarta.subtipo || 'Equipo'})`;
      statsElem.textContent = ef.texto;
      statsElem.classList.add('stat-buffed');
      statsElem.style.display = 'inline-block';
    } else {
      typeElem.textContent = `${datosCarta.tipoCarta.toUpperCase()} (${datosCarta.subtipo || ''})`;
      statsElem.classList.remove('stat-buffed');
      statsElem.style.display = 'none';
    }

    descElem.textContent = descTexto;
    inspector.classList.remove('hidden');

    if (esTouch) {
      inspectorTouchTimeout = setTimeout(ocultarInspector, 3200);
    }
  };

  const ocultarInspector = () => {
    inspector.classList.add('hidden');
    imgElem.style.display = 'none';
    imgElem.removeAttribute('src');
    imgElem.alt = '';
  };

  elemento.addEventListener('mouseenter', () => mostrarInspector(false));
  elemento.addEventListener('mouseleave', ocultarInspector);
  elemento.addEventListener('touchstart', () => mostrarInspector(true), { passive: true });
}

// ==========================================
// 7. BARAJAR, ROBAR Y RENDERIZAR MANO
// ==========================================
function barajarMazo(mazo) {
  for (let i = mazo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
  }
}

function robarCartas(jugador, cantidad) {
  const isEn = configuracionJuego.idioma === 'en';
  if (!jugador) return false;
  if (!Array.isArray(jugador.mano)) jugador.mano = [];
  if (!Array.isArray(jugador.mazo)) jugador.mazo = [];

  for (let i = 0; i < cantidad; i++) {
    if (jugador.mazo && jugador.mazo.length > 0) {
      const cartaRobadaId = jugador.mazo.pop();
      jugador.mano.push(cartaRobadaId);
    } else {
      // DECK OUT: No quedan cartas en el mazo para robar. El jugador pierde de inmediato.
      if (jugador === estadoJugador) {
        mostrarMensajeToast(isEn ? "DECK OUT: Your deck is empty! You lose the duel." : "¡DECK OUT: Tu baraja está vacía y no puedes robar! Pierdes el duelo.");
        if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
          try {
            MultiplayerManager.room.send('deck_out');
          } catch (e) {}
        }
        mostrarFinDelDuelo(false);
      } else {
        mostrarMensajeToast(isEn ? "DECK OUT: Rival's deck is empty! You win the duel." : "¡DECK OUT: La baraja del rival está vacía y no puede robar! ¡Ganas el duelo!");
        mostrarFinDelDuelo(true);
      }
      return false;
    }
  }

  // Actualizar contadores visuales del mazo
  const deckSubPlayer = document.querySelector('#player-deck .slot-sub');
  if (deckSubPlayer) {
    deckSubPlayer.textContent = (estadoJugador && estadoJugador.mazo) ? estadoJugador.mazo.length : 0;
  }
  const deckSubOpp = document.querySelector('#opponent-deck .slot-sub');
  if (deckSubOpp) {
    deckSubOpp.textContent = (estadoOponente && estadoOponente.mazo) ? estadoOponente.mazo.length : 0;
  }
  if (jugador === estadoOponente) {
    renderizarManoOponente();
  }
  return true;
}

function renderizarManoOponente() {
  const contenedorMano = document.getElementById('opponent-hand');
  if (!contenedorMano) return;
  contenedorMano.innerHTML = '';
  const numCartas = (estadoOponente && Array.isArray(estadoOponente.mano)) ? estadoOponente.mano.length : 5;
  for (let i = 0; i < numCartas; i++) {
    const cardEl = document.createElement('div');
    cardEl.className = 'card-slot hand-slot card-back';
    cardEl.setAttribute('title', 'Carta oculta del rival');
    configurarInspectorHover(cardEl, null, false, true);
    contenedorMano.appendChild(cardEl);
  }
}

function renderizarMano(jugador) {
  const contenedorMano = document.getElementById('player-hand');
  if (!contenedorMano) return;

  contenedorMano.innerHTML = '';

  jugador.mano.forEach((cartaId, index) => {
    const datosCarta = bdCartas[cartaId];
    if (!datosCarta) return;

    const cartaDiv = document.createElement('div');
    const claseFront = obtenerClaseFrontCarta(datosCarta);
    cartaDiv.className = `card-slot hand-slot preview-card ${datosCarta.claseCss} ${claseFront}`;
    cartaDiv.setAttribute('data-id', cartaId);
    cartaDiv.setAttribute('data-index-mano', index);

    cartaDiv.draggable = true;
    cartaDiv.addEventListener('dragstart', manejarDragStart);
    cartaDiv.addEventListener('dragend', manejarDragEnd);

    cartaDiv.addEventListener('click', (e) => {
      if (cartaDiv._touchDraggedReciente) {
        cartaDiv._touchDraggedReciente = false;
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      manejarClickCartaMano(cartaId, datosCarta, index);
    });

    configurarTouchDragCarta(cartaDiv, cartaId, datosCarta, index);
    configurarInspectorHover(cartaDiv, datosCarta);

    let pieCartaHtml = "";
    let badgeTipoHtml = "";
    let tributosBadgeHtml = "";
    if (datosCarta.tipoCarta === 'monstruo') {
      if (datosCarta.elemento) {
        const infoT = obtenerInfoTipo(datosCarta.elemento);
        if (infoT) {
          badgeTipoHtml = `<div class="card-type-badge" title="Tipo: ${infoT.nombre} (${infoT.icono})">${infoT.icono}</div>`;
        }
      }
      if (datosCarta.sacrificios > 0) {
        tributosBadgeHtml = `<div class="card-tribute-badge" title="Requiere ${datosCarta.sacrificios} sacrificio(s)">★${datosCarta.sacrificios}</div>`;
      }
      pieCartaHtml = `
        <div class="card-stats-row">
          <span class="card-stat-mini stat-atk">A:${datosCarta.atk}</span>
          <span class="card-stat-mini stat-def">D:${datosCarta.def}</span>
        </div>
      `;
    } else {
      pieCartaHtml = `
        <div class="card-desc-container">
          <span class="card-badge-mini">${datosCarta.subtipo || datosCarta.tipoCarta}</span>
          <p class="card-desc-mini">${datosCarta.descripcionCorta || datosCarta.descripcion}</p>
        </div>
      `;
    }

    const fallbackSrc = datosCarta.spriteEstatico || datosCarta.imagenOficial;
    const imagenHtml = `
      <div class="card-art-container">
        <img class="card-art-img" src="${datosCarta.imagenOficial || fallbackSrc}" alt="${datosCarta.nombre}" onerror="this.onerror=null; this.src='${fallbackSrc}';" draggable="false">
      </div>
    `;

    cartaDiv.innerHTML = `
      ${tributosBadgeHtml}
      ${badgeTipoHtml}
      <span class="card-name-mini">${datosCarta.nombre}</span>
      ${imagenHtml}
      ${pieCartaHtml}
    `;

    contenedorMano.appendChild(cartaDiv);
  });
}

// ==========================================
// 7.1. MECÁNICAS DE CARTAS DE EQUIPO Y OBJETIVO
// ==========================================
function esCartaEquipo(datosCarta, cartaId) {
  if (!datosCarta) return false;
  return datosCarta.subtipo === 'Equipo' || (cartaId >= 220 && cartaId <= 231);
}

function obtenerEfectoEquipo(cartaId) {
  switch (cartaId) {
    case 220: return { atk: 500, def: 0, texto: "+500 ATK", fx: 'electrico' };
    case 221: return { atk: 600, def: 0, texto: "+600 ATK", fx: 'fuego' };
    case 222: return { atk: 0, def: 600, texto: "+600 DEF", fx: 'escudo' };
    case 223: return { atk: 400, def: 400, texto: "+400 A/D", fx: 'corte' };
    case 224: return { atk: 800, def: 0, texto: "+800 ATK", fx: 'corte' };
    case 225: return { atk: 400, def: 0, texto: "+400 ATK", fx: 'corte' };
    case 226: return { curaLP: 500, texto: "+500 LP", fx: 'escudo' };
    case 227: return { atk: 0, def: 800, texto: "+800 DEF", fx: 'escudo' };
    case 228: return { atk: 0, def: 1000, texto: "+1000 DEF", fx: 'escudo' };
    case 229: return { atk: 0, def: 600, texto: "+600 DEF", fx: 'escudo' };
    case 230: return { atk: 700, def: 0, texto: "+700 ATK", fx: 'fuego' };
    case 231: return { atk: 0, def: 700, texto: "+700 DEF", fx: 'escudo' };
    default: return { atk: 300, def: 300, texto: "+300 A/D", fx: 'corte' };
  }
}

function aplicarEquipoAMonstruo(datosCarta, cartaId, targetSlotIndex, slotMTIndex = null) {
  const mTarget = estadoJugador.zonaMonstruos[targetSlotIndex];
  if (!mTarget) {
    mostrarMensajeToast("No hay ningún Pokémon en esa zona para equipar.");
    return false;
  }

  const dTarget = bdCartas[mTarget.id];
  const efecto = obtenerEfectoEquipo(cartaId);

  // Quitar la carta de la mano del jugador
  const idxEnMano = estadoJugador.mano.indexOf(cartaId);
  if (idxEnMano !== -1) {
    estadoJugador.mano.splice(idxEnMano, 1);
  }
  renderizarMano(estadoJugador);

  // Si no se especificó un slot M/T, buscar el primero libre
  if (slotMTIndex === null || slotMTIndex === undefined) {
    slotMTIndex = estadoJugador.zonaMagiasTrampas.findIndex(s => s === null);
  }

  let slotMTElem = null;
  if (slotMTIndex !== -1 && slotMTIndex !== null) {
    estadoJugador.zonaMagiasTrampas[slotMTIndex] = { id: cartaId, activa: true };
    slotMTElem = document.querySelector(`#player-side .spells-row .spell-trap-slot[data-slot-index="${slotMTIndex}"]`);
    if (slotMTElem) {
      slotMTElem.classList.add('occupied');
      const fallbackSrc = datosCarta.spriteEstatico || datosCarta.imagenOficial;
      slotMTElem.innerHTML = `
        <div class="card-on-field preview-card ${datosCarta.claseCss} card-activating ${obtenerClaseFrontCarta(datosCarta)}">
          <span class="card-name-mini">${datosCarta.nombre}</span>
          <div class="card-art-container">
            <img class="card-art-img" src="${datosCarta.imagenOficial || fallbackSrc}" alt="${datosCarta.nombre}" onerror="this.onerror=null; this.src='${fallbackSrc}';" draggable="false">
          </div>
          <span class="card-stat-mini">EQUIPANDO</span>
        </div>
      `;
    }
  }

  // Modificar estadísticas ÚNICAMENTE en la instancia de la zona (NUNCA en bdCartas)
  if (efecto.atk) {
    mTarget.atkMod = (mTarget.atkMod || 0) + efecto.atk;
  }
  if (efecto.def) {
    mTarget.defMod = (mTarget.defMod || 0) + efecto.def;
  }
  if (efecto.curaLP) {
    const maxLp = configuracionJuego.lpMax || 8000;
    estadoJugador.lp = Math.min(maxLp, estadoJugador.lp + efecto.curaLP);
    const lpVal = document.getElementById('player-lp-val');
    if (lpVal) lpVal.textContent = estadoJugador.lp;
    crearNumeroFlotante(`+${efecto.curaLP} LP`, lpVal, 'heal');
  }

  mTarget.equipos = mTarget.equipos || [];
  mTarget.equipos.push(cartaId);

  // Efectos visuales y renderizado del monstruo equipado
  const targetSlotElem = document.querySelector(`#player-side .monsters-row .monster-slot[data-slot-index="${targetSlotIndex}"]`);
  if (targetSlotElem) {
    if (efecto.fx) lanzarEfectoVisual(efecto.fx, targetSlotElem);
    crearNumeroFlotante(efecto.texto, targetSlotElem, 'buff');
    renderizarMonstruoEnCampo(targetSlotElem, dTarget, mTarget.posicion, targetSlotIndex);
  }

  AudioManager.reproducirSFX('hit-super');
  sumarPuntosDuelo(150, `${datosCarta.nombre} equipado a ${dTarget.nombre} (${efecto.texto})`);
  mostrarMensajeToast(`¡${datosCarta.nombre} equipado a ${dTarget.nombre}! (${efecto.texto}).`);
  actualizarMarcadorLateral();

  if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
    MultiplayerManager.enviarAccion({
      tipo: 'JUGAR_MAGIA_EQUIPO',
      carta: datosCarta,
      slotIndex: slotMTIndex,
      bocaAbajo: false,
      manoCount: estadoJugador.mano.length
    });
    MultiplayerManager.sincronizarEstadoCampo();
  }

  // Liberar slot M/T y enviar al cementerio tras la activación
  setTimeout(() => {
    estadoJugador.cementerio.push(cartaId);
    if (slotMTIndex !== -1 && slotMTIndex !== null) {
      estadoJugador.zonaMagiasTrampas[slotMTIndex] = null;
      if (slotMTElem) {
        slotMTElem.classList.remove('occupied');
        slotMTElem.innerHTML = `<span class="slot-badge">M / T</span><span class="slot-num">${slotMTIndex + 1}</span>`;
      }
    }
    const gySub = document.querySelector('#player-gy .slot-sub');
    if (gySub) gySub.textContent = estadoJugador.cementerio.length;
    if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
      MultiplayerManager.sincronizarEstadoCampo();
    }
  }, 1300);

  return true;
}

function abrirModalSeleccionEquip(datosCarta, cartaId, slotMTIndex) {
  const modal = document.getElementById('equip-modal');
  const prompt = document.getElementById('equip-prompt');
  const grid = document.getElementById('equip-options');

  if (!modal || !grid) return;

  const efecto = obtenerEfectoEquipo(cartaId);
  prompt.textContent = `Selecciona a qué Pokémon equipar "${datosCarta.nombre}" (${efecto.texto}):`;
  grid.innerHTML = '';

  estadoJugador.zonaMonstruos.forEach((monstruo, idx) => {
    if (monstruo !== null) {
      const datos = bdCartas[monstruo.id];
      const opt = document.createElement('div');
      opt.className = `card-slot preview-card equip-card-option ${datos.claseCss} ${obtenerClaseFrontCarta(datos)}`;

      const curAtk = obtenerAtkActual(monstruo);
      const curDef = obtenerDefActual(monstruo);
      const fallbackSrc = datos.spriteEstatico || datos.imagenOficial;

      opt.innerHTML = `
        <span class="card-name-mini">${datos.nombre}</span>
        <div class="card-art-container">
          <img class="card-art-img" src="${datos.imagenOficial || fallbackSrc}" alt="${datos.nombre}" onerror="this.onerror=null; this.src='${fallbackSrc}';" draggable="false">
        </div>
        <div class="card-stats-row">
          <span class="card-stat-mini stat-atk">A:${curAtk}</span>
          <span class="card-stat-mini stat-def">D:${curDef}</span>
        </div>
        <span class="card-badge-mini" style="margin-top:2px; font-size:0.55rem; color:#54a0ff;">Zona ${idx + 1}</span>
      `;

      opt.addEventListener('click', () => {
        modal.classList.add('hidden');
        aplicarEquipoAMonstruo(datosCarta, cartaId, idx, slotMTIndex);
      });

      grid.appendChild(opt);
    }
  });

  const btnCancel = document.getElementById('btn-cancel-equip');
  if (btnCancel) {
    btnCancel.onclick = () => {
      modal.classList.add('hidden');
      mostrarMensajeToast("Uso de carta de equipo cancelado.");
    };
  }

  modal.classList.remove('hidden');
}

function manejarClickCartaMano(cartaId, datosCarta, indexMano) {
  if (estadoJuego.turnoDe !== 'jugador' || estadoJuego.faseActual !== 'PRINCIPAL') {
    mostrarMensajeToast("Solo puedes jugar cartas en tu Fase Principal.");
    return;
  }

  // 1. Si es un monstruo: verificar regla de 1 invocación por turno
  if (datosCarta.tipoCarta === 'monstruo') {
    const cartaElemMano = document.querySelector(`#player-hand [data-index-mano="${indexMano}"]`);
    if (estadoJuego.haInvocadoMonstruoEsteTurno) {
      mostrarAvisoYaInvocoEsteTurno(datosCarta, cartaElemMano);
      return;
    }

    if (datosCarta.sacrificios > 0) {
      const monstruosEnCampo = contarMonstruosEnCampoJugador();
      const preEvoId = obtenerPreEvolucionDirecta(cartaId);
      const slotsPreEvo = obtenerSlotsPreEvolucion(cartaId, estadoJugador);
      const tienePreEvo = slotsPreEvo.length > 0;
      const minReq = tienePreEvo ? 1 : datosCarta.sacrificios;

      if (monstruosEnCampo.length < minReq) {
        if (preEvoId) {
          const nombrePre = bdCartas[preEvoId].nombre;
          const msg = `¡${datosCarta.nombre} requiere ${datosCarta.sacrificios} sacrificios (o solo 1 si sacrificas a ${nombrePre})! Solo tienes ${monstruosEnCampo.length} Pokémon en el campo.`;
          mostrarMensajeToast(msg);
          mostrarAlertaRegla(msg, cartaElemMano, `¡FALTAN SACRIFICIOS!`);
        } else {
          const msg = `¡${datosCarta.nombre} requiere ${datosCarta.sacrificios} sacrificio(s)! Solo tienes ${monstruosEnCampo.length} Pokémon en el campo.`;
          mostrarMensajeToast(msg);
          mostrarAlertaRegla(msg, cartaElemMano, `¡FALTAN SACRIFICIOS!`);
        }
        return;
      }

      mostrarMensajeToast(`⭐ Modo Sacrificio: Selecciona los Pokémon de tributo para ${datosCarta.nombre}.`);
      const primerSlotLibre = estadoJugador.zonaMonstruos.findIndex(m => m === null);
      const targetSlot = primerSlotLibre !== -1 ? primerSlotLibre : (tienePreEvo ? slotsPreEvo[0] : monstruosEnCampo[0]);
      abrirModalSacrificios(datosCarta, cartaId, targetSlot, datosCarta.sacrificios);
      return;
    }

    // Monstruo básico sin sacrificios: buscar primer slot libre e invocar
    const primerSlotLibre = estadoJugador.zonaMonstruos.findIndex(m => m === null);
    if (primerSlotLibre === -1) {
      mostrarMensajeToast("Todas tus Zonas de Monstruos están ocupadas.");
      return;
    }
    ejecutarInvocacionMonstruo(datosCarta, cartaId, primerSlotLibre);
    sumarPuntosDuelo(100, `Invocación de ${datosCarta.nombre}`);
    marcadorDuelo.invocaciones++;
    actualizarMarcadorLateral();
    return;
  }

  // 2. Si es una carta de Equipo: confirmación previa y selección de objetivo
  if (datosCarta.tipoCarta === 'magia' && esCartaEquipo(datosCarta, cartaId)) {
    const monstruosEnCampo = contarMonstruosEnCampoJugador();
    if (monstruosEnCampo.length === 0) {
      mostrarMensajeToast("No controlas ningún Pokémon en el campo para equipar esta carta.");
      return;
    }

    const primerSlotMT = estadoJugador.zonaMagiasTrampas.findIndex(s => s === null);
    if (primerSlotMT === -1) {
      mostrarMensajeToast("Tus zonas de Magia/Trampa están ocupadas.");
      return;
    }

    if (monstruosEnCampo.length === 1) {
      const targetIdx = monstruosEnCampo[0];
      const targetMonstruo = estadoJugador.zonaMonstruos[targetIdx];
      const targetNombre = bdCartas[targetMonstruo.id].nombre;
      abrirModalConfirmacionCarta({
        titulo: configuracionJuego.idioma === 'en' ? "🗡️ Equip Card" : "🗡️ Equipar Carta",
        datosCarta,
        cartaId,
        infoTarget: `${targetNombre} (Zona ${targetIdx + 1})`,
        slotMTIndex: primerSlotMT,
        onConfirm: () => {
          aplicarEquipoAMonstruo(datosCarta, cartaId, targetIdx, primerSlotMT);
        },
        onSet: () => {
          colocarCartaBocaAbajo(datosCarta, cartaId, primerSlotMT);
        }
      });
      return;
    }

    abrirModalSeleccionEquip(datosCarta, cartaId, primerSlotMT);
    return;
  }

  // 3. Si es una carta Mágica normal (no equipo): pedir confirmación con opción de cancelar
  if (datosCarta.tipoCarta === 'magia') {
    const primerSlotMT = estadoJugador.zonaMagiasTrampas.findIndex(s => s === null);
    if (primerSlotMT === -1) {
      mostrarMensajeToast("Tus zonas de Magia/Trampa están ocupadas.");
      return;
    }
    const slotElem = document.querySelector(`#player-side .spells-row .spell-trap-slot[data-slot-index="${primerSlotMT}"]`);
    abrirModalConfirmacionCarta({
      titulo: configuracionJuego.idioma === 'en' ? "✨ Activate Spell Card" : "✨ Activar Carta Mágica",
      datosCarta,
      cartaId,
      slotMTIndex: primerSlotMT,
      onConfirm: () => {
        activarCartaMagica(datosCarta, cartaId, primerSlotMT, slotElem);
      },
      onSet: () => {
        colocarCartaBocaAbajo(datosCarta, cartaId, primerSlotMT);
      }
    });
    return;
  }

  // 4. Si es una carta Trampa: pedir confirmación con opción de cancelar
  if (datosCarta.tipoCarta === 'trampa') {
    const primerSlotMT = estadoJugador.zonaMagiasTrampas.findIndex(s => s === null);
    if (primerSlotMT === -1) {
      mostrarMensajeToast("Tus zonas de Magia/Trampa están ocupadas.");
      return;
    }
    const slotElem = document.querySelector(`#player-side .spells-row .spell-trap-slot[data-slot-index="${primerSlotMT}"]`);
    abrirModalConfirmacionCarta({
      titulo: configuracionJuego.idioma === 'en' ? "🛡️ Set Trap Card" : "🛡️ Colocar Carta Trampa",
      datosCarta,
      cartaId,
      slotMTIndex: primerSlotMT,
      onConfirm: () => {
        colocarCartaTrampa(datosCarta, cartaId, primerSlotMT, slotElem);
      },
      onSet: () => {
        colocarCartaBocaAbajo(datosCarta, cartaId, primerSlotMT);
      }
    });
    return;
  }
}

// ==========================================
// 8. CONTROLADORES DE DRAG & DROP Y SACRIFICIO
// ==========================================
function manejarDragStart(e) {
  const cartaId = parseInt(this.getAttribute('data-id'));
  const indexMano = parseInt(this.getAttribute('data-index-mano'));
  const datosCarta = bdCartas[cartaId];

  e.dataTransfer.setData('text/plain', JSON.stringify({ cartaId, indexMano }));
  e.dataTransfer.effectAllowed = 'move';
  this.classList.add('dragging');

  if (datosCarta && datosCarta.tipoCarta === 'monstruo') {
    if (estadoJuego.haInvocadoMonstruoEsteTurno) {
      mostrarAvisoYaInvocoEsteTurno(datosCarta, this);
      return;
    }
    if (datosCarta.sacrificios > 0) {
      resaltarMonstruosSacrificables(true);
      mostrarMensajeToast(`⭐ ${datosCarta.nombre} (${datosCarta.etapa}) requiere ${datosCarta.sacrificios} sacrificio(s). ¡Suéltalo sobre un Pokémon en campo!`);
    }
  }
}

function manejarDragEnd(e) {
  this.classList.remove('dragging');
  resaltarMonstruosSacrificables(false);
}

function resaltarMonstruosSacrificables(activar) {
  const slotsMonstruos = document.querySelectorAll('#player-side .monsters-row .monster-slot');
  slotsMonstruos.forEach((slot, idx) => {
    if (activar) {
      if (estadoJugador.zonaMonstruos[idx] !== null) {
        slot.classList.add('tribute-target-highlight');
      }
    } else {
      slot.classList.remove('tribute-target-highlight');
    }
  });
}

function manejarDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function manejarDragEnter(e) {
  e.preventDefault();
  this.classList.add('slot-drag-over');
}

function manejarDragLeave(e) {
  this.classList.remove('slot-drag-over');
}

function contarMonstruosEnCampoJugador() {
  return estadoJugador.zonaMonstruos
    .map((m, idx) => m !== null ? idx : null)
    .filter(idx => idx !== null);
}

// --- DROP PARA MONSTRUOS ---
function manejarDropMonstruo(e) {
  e.preventDefault();
  this.classList.remove('slot-drag-over');
  resaltarMonstruosSacrificables(false);

  if (estadoJuego.turnoDe !== 'jugador' || estadoJuego.faseActual !== 'PRINCIPAL') {
    mostrarMensajeToast("Solo puedes jugar cartas durante tu Fase Principal.");
    return;
  }

  const slotIndex = parseInt(this.getAttribute('data-slot-index'));
  const rawData = e.dataTransfer.getData('text/plain');
  if (!rawData) return;

  let datosArrastre;
  try {
    datosArrastre = JSON.parse(rawData);
  } catch (err) {
    return;
  }

  const { cartaId } = datosArrastre;
  const datosCarta = bdCartas[cartaId];
  const slotOcupado = estadoJugador.zonaMonstruos[slotIndex] !== null;

  // CASO ESPECIAL: Soltar carta de Equipo directamente sobre un Pokémon en campo
  if (datosCarta && datosCarta.tipoCarta === 'magia' && esCartaEquipo(datosCarta, cartaId)) {
    if (slotOcupado) {
      const targetMonstruo = estadoJugador.zonaMonstruos[slotIndex];
      const targetNombre = bdCartas[targetMonstruo.id].nombre;
      abrirModalConfirmacionCarta({
        titulo: configuracionJuego.idioma === 'en' ? "🗡️ Equip Card" : "🗡️ Equipar Carta",
        datosCarta,
        cartaId,
        infoTarget: `${targetNombre} (Zona ${slotIndex + 1})`,
        onConfirm: () => {
          aplicarEquipoAMonstruo(datosCarta, cartaId, slotIndex);
        },
        onSet: () => {
          colocarCartaBocaAbajo(datosCarta, cartaId);
        }
      });
    } else {
      mostrarMensajeToast("Esta zona está vacía. Debes soltar la carta de equipo sobre un Pokémon de tu campo.");
    }
    return;
  }

  if (!datosCarta || datosCarta.tipoCarta !== 'monstruo') {
    mostrarMensajeToast("Solo puedes colocar cartas tipo Pokémon en esta zona (o cartas de equipo sobre un Pokémon).");
    return;
  }

  // Regla: Solo 1 invocación de monstruo por turno (magias y equipos libres)
  if (estadoJuego.haInvocadoMonstruoEsteTurno) {
    mostrarAvisoYaInvocoEsteTurno(datosCarta, this);
    return;
  }

  const monstruosEnCampo = contarMonstruosEnCampoJugador();

  // CASO A: EL MONSTRUO REQUIERE SACRIFICIOS
  if (datosCarta.sacrificios > 0) {
    const preEvoId = obtenerPreEvolucionDirecta(cartaId);
    const slotsPreEvo = obtenerSlotsPreEvolucion(cartaId, estadoJugador);
    const tienePreEvo = slotsPreEvo.length > 0;
    const minReq = tienePreEvo ? 1 : datosCarta.sacrificios;

    if (monstruosEnCampo.length < minReq) {
      if (preEvoId) {
        const nombrePre = bdCartas[preEvoId].nombre;
        const msg = `¡${datosCarta.nombre} (${datosCarta.etapa}) requiere ${datosCarta.sacrificios} sacrificios (o solo 1 si sacrificas a ${nombrePre})! Tienes ${monstruosEnCampo.length} Pokémon.`;
        mostrarMensajeToast(msg);
        mostrarAlertaRegla(msg, this, `¡FALTAN SACRIFICIOS!`);
      } else {
        const msg = `¡${datosCarta.nombre} (${datosCarta.etapa}) requiere ${datosCarta.sacrificios} sacrificio(s)! Tienes ${monstruosEnCampo.length} Pokémon.`;
        mostrarMensajeToast(msg);
        mostrarAlertaRegla(msg, this, `¡FALTAN SACRIFICIOS!`);
      }
      return;
    }

    // Subcaso A1: Se soltó DIRECTAMENTE sobre un monstruo ocupado
    if (slotOcupado) {
      const sacrificadoDirectoId = estadoJugador.zonaMonstruos[slotIndex].id;
      const datosSacrificado = bdCartas[sacrificadoDirectoId];

      // ¿Es la pre-evolución directa de una línea de 3? (ej. Charizard soltado sobre Charmeleon)
      if (preEvoId && sacrificadoDirectoId === preEvoId) {
        lanzarEfectoVisual('sacrificio', this);
        AudioManager.reproducirSFX('faint');
        sacrificarMonstruo(slotIndex, false);

        ejecutarInvocacionMonstruo(datosCarta, cartaId, slotIndex);
        sumarPuntosDuelo(400, `Evolución Directa de ${datosSacrificado.nombre} por ${datosCarta.nombre} (1 solo tributo)`);
        marcadorDuelo.sacrificios++;
        actualizarMarcadorLateral();
        mostrarMensajeToast(`🌟 ¡Evolución Directa! Sacrificaste a ${datosSacrificado.nombre} (1 solo tributo) e invocaste a ${datosCarta.nombre}.`);
        return;
      }

      if (datosCarta.sacrificios === 1) {
        lanzarEfectoVisual('sacrificio', this);
        AudioManager.reproducirSFX('faint');
        sacrificarMonstruo(slotIndex, false);

        ejecutarInvocacionMonstruo(datosCarta, cartaId, slotIndex);
        sumarPuntosDuelo(300, `Sacrificio de ${datosSacrificado.nombre} por ${datosCarta.nombre}`);
        marcadorDuelo.sacrificios++;
        actualizarMarcadorLateral();
        mostrarMensajeToast(`¡Sacrificaste a ${datosSacrificado.nombre} e invocaste a ${datosCarta.nombre}!`);
        return;
      }

      if (datosCarta.sacrificios === 2) {
        abrirModalSacrificiosConPreseleccion(datosCarta, cartaId, slotIndex, [slotIndex]);
        return;
      }
    }

    // Subcaso A2: Se soltó en un slot vacío pero requiere sacrificios
    abrirModalSacrificios(datosCarta, cartaId, slotIndex, datosCarta.sacrificios);
    return;
  }

  // CASO B: MONSTRUO BÁSICO SIN SACRIFICIOS
  if (slotOcupado) {
    mostrarMensajeToast(`La Zona de Monstruos #${slotIndex + 1} ya está ocupada por un Pokémon.`);
    return;
  }

  ejecutarInvocacionMonstruo(datosCarta, cartaId, slotIndex);
  sumarPuntosDuelo(100, `Invocación de ${datosCarta.nombre}`);
  marcadorDuelo.invocaciones++;
  actualizarMarcadorLateral();
}

function ejecutarInvocacionMonstruo(datosCarta, cartaId, slotIndex) {
  estadoJugador.zonaMonstruos[slotIndex] = {
    id: cartaId,
    posicion: 'ataque',
    haAtacado: false,
    atkMod: 0,
    defMod: 0,
    equipos: []
  };

  const idxEnMano = estadoJugador.mano.indexOf(cartaId);
  if (idxEnMano !== -1) {
    estadoJugador.mano.splice(idxEnMano, 1);
  }

  // Marcar que ya se invocó el monstruo de este turno
  estadoJuego.haInvocadoMonstruoEsteTurno = true;

  const slotElem = document.querySelector(`#player-side .monsters-row .monster-slot[data-slot-index="${slotIndex}"]`);
  crearNumeroFlotante("¡INVOCADO!", slotElem, 'buff');
  renderizarMonstruoEnCampo(slotElem, datosCarta, 'ataque', slotIndex);
  renderizarMano(estadoJugador);

  AudioManager.reproducirSFX('enter');
  if (datosCarta.slug) {
    setTimeout(() => AudioManager.reproducirGrito(datosCarta.slug), 150);
  }

  mostrarMensajeToast(`¡${datosCarta.nombre} (${datosCarta.etapa}) invocado en Posición de Ataque!`);

  if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
    MultiplayerManager.enviarAccion({
      tipo: 'INVOCAR_MONSTRUO',
      carta: datosCarta,
      slotIndex: slotIndex,
      posicion: 'ataque',
      manoCount: estadoJugador.mano.length
    });
    MultiplayerManager.sincronizarEstadoCampo();
  }
}

// --- MODAL DE SELECCIÓN DE SACRIFICIOS ---
function abrirModalSacrificios(datosCarta, cartaId, targetSlotIndex, sacrificiosRequeridos) {
  abrirModalSacrificiosConPreseleccion(datosCarta, cartaId, targetSlotIndex, []);
}

function abrirModalSacrificiosConPreseleccion(datosCarta, cartaId, targetSlotIndex, preseleccionados = []) {
  const modal = document.getElementById('tribute-modal');
  const prompt = document.getElementById('tribute-prompt');
  const grid = document.getElementById('tribute-options');

  if (!modal || !grid) return;

  const preEvoId = obtenerPreEvolucionDirecta(cartaId);
  const slotsPreEvo = obtenerSlotsPreEvolucion(cartaId, estadoJugador);
  const tienePreEvo = slotsPreEvo.length > 0;
  const isEn = configuracionJuego.idioma === 'en';

  const requeridos = datosCarta.sacrificios;
  const seleccionados = [...preseleccionados];

  if (tienePreEvo && preEvoId) {
    const nombrePre = bdCartas[preEvoId].nombre;
    prompt.innerHTML = isEn
      ? `Select <b>${requeridos} Pokémon</b> to tribute, or <b>1 single ${escapeHtml(nombrePre)}</b> for Direct Evolution:`
      : `Selecciona <b>${requeridos} Pokémon</b> para sacrificar, o <b>1 solo ${escapeHtml(nombrePre)}</b> para Evolución Directa:`;
  } else {
    prompt.textContent = isEn
      ? `Select ${requeridos} Pokémon from your field to tribute for ${datosCarta.nombre}:`
      : `Selecciona ${requeridos} Pokémon de tu campo para sacrificar por ${datosCarta.nombre}:`;
  }
  grid.innerHTML = '';

  estadoJugador.zonaMonstruos.forEach((monstruo, idx) => {
    if (monstruo !== null) {
      const datos = bdCartas[monstruo.id];
      const opt = document.createElement('div');
      const yaSeleccionado = seleccionados.includes(idx);
      const esPreEvo = (preEvoId && monstruo.id === preEvoId);

      opt.className = `card-slot preview-card tribute-card-option ${datos.claseCss} ${esPreEvo ? 'tribute-direct-evolution' : ''} ${obtenerClaseFrontCarta(datos)}`;
      if (yaSeleccionado) {
        opt.style.borderColor = '#e74c3c';
        opt.style.transform = 'scale(1.08)';
        opt.style.boxShadow = '0 0 16px rgba(231, 76, 60, 0.9)';
      }

      const fallbackSrc = datos.spriteEstatico || datos.imagenOficial;
      opt.innerHTML = `
        ${esPreEvo ? `<span class="tribute-direct-badge">🌟 ${isEn ? "Direct Evo (1)" : "Evolución Directa (1)"}</span>` : ''}
        <span class="card-name-mini">${escapeHtml(datos.nombre)}</span>
        <div class="card-art-container">
          <img class="card-art-img" src="${datos.imagenOficial || fallbackSrc}" alt="${escapeHtml(datos.nombre)}" onerror="this.onerror=null; this.src='${fallbackSrc}';" draggable="false">
        </div>
        <div class="card-stats-row">
          <span class="card-stat-mini stat-atk">A:${datos.atk}</span>
          <span class="card-stat-mini">Zona ${idx + 1}</span>
        </div>
      `;

      opt.addEventListener('click', () => {
        // Atajo de Evolución Directa: si se hace clic en la pre-evolución cuando no hay otros seleccionados
        if (esPreEvo && seleccionados.length === 0) {
          modal.classList.add('hidden');
          const slotTarget = document.querySelector(`#player-side .monsters-row .monster-slot[data-slot-index="${idx}"]`);
          lanzarEfectoVisual('sacrificio', slotTarget);
          sacrificarMonstruo(idx, false);
          AudioManager.reproducirSFX('faint');

          const slotFinal = targetSlotIndex !== null && targetSlotIndex !== undefined ? targetSlotIndex : idx;
          ejecutarInvocacionMonstruo(datosCarta, cartaId, slotFinal);

          sumarPuntosDuelo(400, `Evolución Directa de ${datos.nombre} por ${datosCarta.nombre} (1 solo tributo)`);
          marcadorDuelo.sacrificios++;
          marcadorDuelo.invocaciones++;
          actualizarMarcadorLateral();

          mostrarMensajeToast(isEn
            ? `🌟 Direct Evolution! You tributed ${datos.nombre} (1 single sacrifice) to summon ${datosCarta.nombre}!`
            : `🌟 ¡Evolución Directa! Sacrificaste a ${datos.nombre} (1 solo sacrificio) para invocar a ${datosCarta.nombre}!`);
          return;
        }

        if (seleccionados.includes(idx)) {
          seleccionados.splice(seleccionados.indexOf(idx), 1);
          opt.style.borderColor = '';
          opt.style.transform = '';
          opt.style.boxShadow = '';
        } else {
          seleccionados.push(idx);
          opt.style.borderColor = '#e74c3c';
          opt.style.transform = 'scale(1.08)';
          opt.style.boxShadow = '0 0 16px rgba(231, 76, 60, 0.9)';
        }

        prompt.textContent = isEn
          ? `Selected: ${seleccionados.length} of ${requeridos} to tribute for ${datosCarta.nombre}`
          : `Seleccionados: ${seleccionados.length} de ${requeridos} para sacrificar por ${datosCarta.nombre}`;

        if (seleccionados.length === requeridos) {
          modal.classList.add('hidden');

          seleccionados.forEach(sIdx => {
            const slotTarget = document.querySelector(`#player-side .monsters-row .monster-slot[data-slot-index="${sIdx}"]`);
            lanzarEfectoVisual('sacrificio', slotTarget);
            sacrificarMonstruo(sIdx, false);
          });

          AudioManager.reproducirSFX('faint');

          const slotFinal = targetSlotIndex !== null && targetSlotIndex !== undefined ? targetSlotIndex : seleccionados[0];
          ejecutarInvocacionMonstruo(datosCarta, cartaId, slotFinal);

          sumarPuntosDuelo(300, `Sacrificio de ${requeridos} Pokémon por ${datosCarta.nombre}`);
          marcadorDuelo.sacrificios += requeridos;
          marcadorDuelo.invocaciones++;
          actualizarMarcadorLateral();

          mostrarMensajeToast(isEn
            ? `Tribute summon complete! ${datosCarta.nombre} has entered the field.`
            : `¡Sacrificio completado! ${datosCarta.nombre} ha tomado el campo.`);
        }
      });

      grid.appendChild(opt);
    }
  });

  const btnCancel = document.getElementById('btn-cancel-tribute');
  if (btnCancel) {
    btnCancel.onclick = () => {
      modal.classList.add('hidden');
      mostrarMensajeToast("Invocación por sacrificio cancelada.");
    };
  }

  modal.classList.remove('hidden');
}

// ==========================================
// 9. DROP PARA MAGIAS Y TRAMPAS (ITEMS MULTI-GENERACIÓN)
// ==========================================
function manejarDropMagiaTrampa(e) {
  e.preventDefault();
  this.classList.remove('slot-drag-over');

  if (estadoJuego.turnoDe !== 'jugador' || estadoJuego.faseActual !== 'PRINCIPAL') {
    mostrarMensajeToast("Solo puedes jugar cartas de soporte durante tu Fase Principal.");
    return;
  }

  const slotIndex = parseInt(this.getAttribute('data-slot-index'));
  if (estadoJugador.zonaMagiasTrampas[slotIndex] !== null) {
    mostrarMensajeToast(`La Zona M/T #${slotIndex + 1} ya está ocupada.`);
    return;
  }

  const rawData = e.dataTransfer.getData('text/plain');
  if (!rawData) return;

  let datosArrastre;
  try {
    datosArrastre = JSON.parse(rawData);
  } catch (err) {
    return;
  }

  const { cartaId } = datosArrastre;
  const datosCarta = bdCartas[cartaId];

  if (!datosCarta || (datosCarta.tipoCarta !== 'magia' && datosCarta.tipoCarta !== 'trampa')) {
    mostrarMensajeToast("Solo puedes jugar cartas Mágicas o Trampas en esta zona.");
    return;
  }

  // Si es carta de equipo: permitir seleccionar el objetivo con confirmación
  if (datosCarta.tipoCarta === 'magia' && esCartaEquipo(datosCarta, cartaId)) {
    const monstruosActivos = contarMonstruosEnCampoJugador();
    if (monstruosActivos.length === 0) {
      mostrarMensajeToast("No controlas ningún Pokémon en el campo para equipar esta carta.");
      return;
    }
    if (monstruosActivos.length === 1) {
      const targetIdx = monstruosActivos[0];
      const targetMonstruo = estadoJugador.zonaMonstruos[targetIdx];
      const targetNombre = bdCartas[targetMonstruo.id].nombre;
      abrirModalConfirmacionCarta({
        titulo: configuracionJuego.idioma === 'en' ? "🗡️ Equip Card" : "🗡️ Equipar Carta",
        datosCarta,
        cartaId,
        infoTarget: `${targetNombre} (Zona ${targetIdx + 1})`,
        slotMTIndex: slotIndex,
        onConfirm: () => {
          aplicarEquipoAMonstruo(datosCarta, cartaId, targetIdx, slotIndex);
        },
        onSet: () => {
          colocarCartaBocaAbajo(datosCarta, cartaId, slotIndex);
        }
      });
      return;
    }
    abrirModalSeleccionEquip(datosCarta, cartaId, slotIndex);
    return;
  }

  const slotElementActual = this;
  if (datosCarta.tipoCarta === 'magia') {
    abrirModalConfirmacionCarta({
      titulo: configuracionJuego.idioma === 'en' ? "✨ Activate Spell Card" : "✨ Activar Carta Mágica",
      datosCarta,
      cartaId,
      slotMTIndex: slotIndex,
      onConfirm: () => {
        activarCartaMagica(datosCarta, cartaId, slotIndex, slotElementActual);
      },
      onSet: () => {
        colocarCartaBocaAbajo(datosCarta, cartaId, slotIndex);
      }
    });
  } else {
    abrirModalConfirmacionCarta({
      titulo: configuracionJuego.idioma === 'en' ? "🛡️ Set Trap Card" : "🛡️ Colocar Carta Trampa",
      datosCarta,
      cartaId,
      slotMTIndex: slotIndex,
      onConfirm: () => {
        colocarCartaTrampa(datosCarta, cartaId, slotIndex, slotElementActual);
      },
      onSet: () => {
        colocarCartaBocaAbajo(datosCarta, cartaId, slotIndex);
      }
    });
  }
}

function activarCartaMagica(datosCarta, cartaId, slotIndex, slotElem) {
  if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
    MultiplayerManager.enviarAccion({
      tipo: 'JUGAR_MAGIA_EQUIPO',
      carta: datosCarta,
      slotIndex: slotIndex,
      bocaAbajo: false,
      manoCount: Math.max(0, estadoJugador.mano.length - 1)
    });
    setTimeout(() => {
      if (typeof MultiplayerManager !== 'undefined') MultiplayerManager.sincronizarEstadoCampo();
    }, 50);
  }

  // Si es una carta de equipo que llega aquí directamente, derivar a aplicarEquipoAMonstruo
  if (esCartaEquipo(datosCarta, cartaId)) {
    const monstruosActivos = contarMonstruosEnCampoJugador();
    if (monstruosActivos.length > 0) {
      aplicarEquipoAMonstruo(datosCarta, cartaId, monstruosActivos[0], slotIndex);
      return;
    } else {
      mostrarMensajeToast(`${datosCarta.nombre} activado, pero no controlas ningún Pokémon.`);
      return;
    }
  }

  estadoJugador.zonaMagiasTrampas[slotIndex] = { id: cartaId, activa: true };

  const idxEnMano = estadoJugador.mano.indexOf(cartaId);
  if (idxEnMano !== -1) estadoJugador.mano.splice(idxEnMano, 1);
  renderizarMano(estadoJugador);

  slotElem.classList.add('occupied');
  const fallbackSrc = datosCarta.spriteEstatico || datosCarta.imagenOficial;
  slotElem.innerHTML = `
    <div class="card-on-field preview-card ${datosCarta.claseCss} card-activating ${obtenerClaseFrontCarta(datosCarta)}">
      <span class="card-name-mini">${datosCarta.nombre}</span>
      <div class="card-art-container">
        <img class="card-art-img" src="${datosCarta.imagenOficial || fallbackSrc}" alt="${datosCarta.nombre}" onerror="this.onerror=null; this.src='${fallbackSrc}';" draggable="false">
      </div>
      <span class="card-stat-mini">ACTIVADA</span>
    </div>
  `;

  const monstruosActivos = contarMonstruosEnCampoJugador();

  const maxLp = configuracionJuego.lpMax || 8000;

  // 1. Curación de Vida (LP)
  if (cartaId === 201) { // Poción Max
    estadoJugador.lp = Math.min(maxLp, estadoJugador.lp + 2000);
    AudioManager.reproducirSFX('heal');
    crearNumeroFlotante("+2000 LP", document.getElementById('player-lp-val'), 'heal');
    sumarPuntosDuelo(150, "Poción Max (+2000 LP)");
    mostrarMensajeToast("¡Poción Max activada! Restauraste 2000 LP.");
  } else if (cartaId === 202) { // Hiperpoción
    estadoJugador.lp = Math.min(maxLp, estadoJugador.lp + 1500);
    AudioManager.reproducirSFX('heal');
    crearNumeroFlotante("+1500 LP", document.getElementById('player-lp-val'), 'heal');
    sumarPuntosDuelo(150, "Hiperpoción (+1500 LP)");
    mostrarMensajeToast("¡Hiperpoción activada! +1500 LP.");
  } else if (cartaId === 207) { // Restaura Todo
    estadoJugador.lp = Math.min(maxLp, estadoJugador.lp + 2500);
    AudioManager.reproducirSFX('heal');
    crearNumeroFlotante("+2500 LP", document.getElementById('player-lp-val'), 'heal');
    sumarPuntosDuelo(200, "Restaura Todo (+2500 LP)");
    mostrarMensajeToast("¡Restaura Todo activado! +2500 LP restaurados.");
  } else if (cartaId === 208 || cartaId === 226) { // Baya Zidra o Restos
    const cura = cartaId === 208 ? 1000 : 500;
    estadoJugador.lp = Math.min(maxLp, estadoJugador.lp + cura);
    AudioManager.reproducirSFX('heal');
    crearNumeroFlotante(`+${cura} LP`, document.getElementById('player-lp-val'), 'heal');
    sumarPuntosDuelo(100, `${datosCarta.nombre} (+${cura} LP)`);
    mostrarMensajeToast(`¡${datosCarta.nombre} activada! +${cura} LP.`);
  }

  // 2. Robo de Cartas
  else if (cartaId === 204 || cartaId === 205 || cartaId === 211) { // Oak / Ultra Ball / Elixir
    robarCartas(estadoJugador, 2);
    renderizarMano(estadoJugador);
    AudioManager.reproducirSFX('enter');
    crearNumeroFlotante("+2 Cartas", document.querySelector('#player-deck'), 'buff');
    sumarPuntosDuelo(150, `Efecto de ${datosCarta.nombre} (+2 Cartas)`);
    mostrarMensajeToast(`¡${datosCarta.nombre} activada! Robaste 2 cartas.`);
  } else if (cartaId === 203) { // Caramelo Raro (+1 carta y +400 ATK al monstruo sin mutar base)
    robarCartas(estadoJugador, 1);
    renderizarMano(estadoJugador);
    if (monstruosActivos.length > 0) {
      const idxObj = monstruosActivos[0];
      const mObj = estadoJugador.zonaMonstruos[idxObj];
      mObj.atkMod = (mObj.atkMod || 0) + 400;
      const targetSlot = document.querySelector(`#player-side .monsters-row .monster-slot[data-slot-index="${idxObj}"]`);
      crearNumeroFlotante("+400 ATK", targetSlot, 'buff');
      renderizarMonstruoEnCampo(targetSlot, bdCartas[mObj.id], mObj.posicion, idxObj);
    }
    AudioManager.reproducirSFX('heal');
    sumarPuntosDuelo(200, "Caramelo Raro activado");
    mostrarMensajeToast("¡Caramelo Raro activado! Robaste 1 carta y subiste +400 ATK.");
  } else if (cartaId === 206) { // Master Ball: Busca un Pokémon Legendario en el mazo y lo añade a la mano
    if (!Array.isArray(estadoJugador.mazo)) estadoJugador.mazo = [];
    if (!Array.isArray(estadoJugador.mano)) estadoJugador.mano = [];

    const isEn = configuracionJuego.idioma === 'en';
    const deckElem = document.querySelector('#player-deck');

    // Buscar Pokémon Legendario en el mazo (Articuno, Zapdos, Moltres, Mewtwo, Mew o etapa 'Legendario')
    let legendarioIdx = -1;
    let mejorAtkLegendario = -1;

    for (let i = 0; i < estadoJugador.mazo.length; i++) {
      const idM = estadoJugador.mazo[i];
      const c = bdCartas[idM];
      if (c && c.tipoCarta === 'monstruo') {
        const esLegendario = c.etapa === 'Legendario' || c.subtipo === 'Legendario' || [144, 145, 146, 150, 151].includes(c.id);
        if (esLegendario) {
          if ((c.atk || 0) > mejorAtkLegendario) {
            mejorAtkLegendario = c.atk || 0;
            legendarioIdx = i;
          }
        }
      }
    }

    if (legendarioIdx !== -1) {
      const [cartaLegendariaId] = estadoJugador.mazo.splice(legendarioIdx, 1);
      estadoJugador.mano.push(cartaLegendariaId);
      const datosLegendario = bdCartas[cartaLegendariaId];

      if (deckElem) {
        lanzarEfectoVisual('vortice', deckElem);
        crearNumeroFlotante(`🌟 ${datosLegendario.nombre}`, deckElem, 'buff');
      }
      AudioManager.reproducirSFX('enter');
      if (datosLegendario.slug) AudioManager.reproducirGrito(datosLegendario.slug);

      sumarPuntosDuelo(300, `Master Ball capturó a ${datosLegendario.nombre}`);
      mostrarMensajeToast(isEn
        ? `🌟 Master Ball activated! Captured Legendary Pokémon ${datosLegendario.nombre} from your deck!`
        : `🌟 ¡Master Ball activada! Buscó en tu baraja y capturó al Pokémon Legendario ${datosLegendario.nombre}.`);
    } else {
      // Si no quedan legendarios en el mazo, busca el Pokémon más poderoso de la baraja
      let mejorMonstruoIdx = -1;
      let maxAtk = -1;
      for (let i = 0; i < estadoJugador.mazo.length; i++) {
        const idM = estadoJugador.mazo[i];
        const c = bdCartas[idM];
        if (c && c.tipoCarta === 'monstruo' && (c.atk || 0) > maxAtk) {
          maxAtk = c.atk || 0;
          mejorMonstruoIdx = i;
        }
      }

      if (mejorMonstruoIdx !== -1) {
        const [cartaIdRobada] = estadoJugador.mazo.splice(mejorMonstruoIdx, 1);
        estadoJugador.mano.push(cartaIdRobada);
        const datosC = bdCartas[cartaIdRobada];
        if (deckElem) {
          lanzarEfectoVisual('luz', deckElem);
          crearNumeroFlotante(`⚡ ${datosC.nombre}`, deckElem, 'buff');
        }
        AudioManager.reproducirSFX('enter');
        if (datosC.slug) AudioManager.reproducirGrito(datosC.slug);
        sumarPuntosDuelo(200, `Master Ball capturó a ${datosC.nombre}`);
        mostrarMensajeToast(isEn
          ? `No Legendaries left in deck! Master Ball captured your strongest Pokémon: ${datosC.nombre}!`
          : `¡No quedaban Legendarios en la baraja! Master Ball capturó a tu Pokémon más poderoso: ${datosC.nombre}.`);
      } else {
        mostrarMensajeToast(isEn ? "No Pokémon found in your deck to capture!" : "¡No quedan cartas de Pokémon en tu baraja para capturar!");
      }
    }

    const deckSubPlayer = document.querySelector('#player-deck .slot-sub');
    if (deckSubPlayer) deckSubPlayer.textContent = estadoJugador.mazo.length;
    renderizarMano(estadoJugador);
  } else if (cartaId === 209) { // Repartir Experiencia (+300 ATK a todos los Pokémon en campo)
    monstruosActivos.forEach(idx => {
      const mObj = estadoJugador.zonaMonstruos[idx];
      mObj.atkMod = (mObj.atkMod || 0) + 300;
      const tSlot = document.querySelector(`#player-side .monsters-row .monster-slot[data-slot-index="${idx}"]`);
      crearNumeroFlotante("+300 ATK", tSlot, 'buff');
      renderizarMonstruoEnCampo(tSlot, bdCartas[mObj.id], mObj.posicion, idx);
    });
    AudioManager.reproducirSFX('enter');
    sumarPuntosDuelo(200, "Repartir Experiencia a todos los Pokémon");
    mostrarMensajeToast("¡Repartir Experiencia activado! +300 ATK a todos tus Pokémon.");
  } else if (cartaId === 210) { // Revivir Máximo
    if (estadoJugador.cementerio.length > 0) {
      const cartaRescatada = estadoJugador.cementerio.pop();
      estadoJugador.mano.push(cartaRescatada);
      renderizarMano(estadoJugador);
      const gySub = document.querySelector('#player-gy .slot-sub');
      if (gySub) gySub.textContent = estadoJugador.cementerio.length;
      AudioManager.reproducirSFX('heal');
      sumarPuntosDuelo(150, "Revivir Máximo rescató un Pokémon");
      mostrarMensajeToast(`¡Revivir Máximo rescató a ${bdCartas[cartaRescatada].nombre} del Cementerio!`);
    } else {
      mostrarMensajeToast("Revivir Máximo activado, pero el Cementerio está vacío.");
    }
  } else if (cartaId === 212) { // Poké Flauta (reactiva ataque)
    estadoJugador.zonaMonstruos.forEach((m, idx) => {
      if (m) {
        m.haAtacado = false;
        const tSlot = document.querySelector(`#player-side .monsters-row .monster-slot[data-slot-index="${idx}"]`);
        renderizarMonstruoEnCampo(tSlot, bdCartas[m.id], m.posicion, idx);
      }
    });
    AudioManager.reproducirSFX('enter');
    sumarPuntosDuelo(150, "Poké Flauta reactivó a tus Pokémon");
    mostrarMensajeToast("¡Poké Flauta sonó! Todos tus Pokémon pueden atacar de nuevo.");
  }

  document.getElementById('player-lp-val').textContent = estadoJugador.lp;
  actualizarMarcadorLateral();

  setTimeout(() => {
    estadoJugador.cementerio.push(cartaId);
    estadoJugador.zonaMagiasTrampas[slotIndex] = null;
    slotElem.classList.remove('occupied');
    slotElem.innerHTML = `<span class="slot-badge">M / T</span><span class="slot-num">${slotIndex + 1}</span>`;

    const gySub = document.querySelector('#player-gy .slot-sub');
    if (gySub) gySub.textContent = estadoJugador.cementerio.length;
  }, 1300);
}

function colocarCartaTrampa(datosCarta, cartaId, slotIndex, slotElem) {
  estadoJugador.zonaMagiasTrampas[slotIndex] = { id: cartaId, bocaAbajo: true };

  const idxEnMano = estadoJugador.mano.indexOf(cartaId);
  if (idxEnMano !== -1) estadoJugador.mano.splice(idxEnMano, 1);
  renderizarMano(estadoJugador);

  slotElem.classList.add('occupied');
  slotElem.innerHTML = `
    <div class="card-face-down" title="Trampa Colocada Boca Abajo: ${datosCarta.nombre}">
      <span>POKÉ-OH</span>
    </div>
  `;

  AudioManager.reproducirSFX('enter');
  crearNumeroFlotante("TRAMPA LISTA", slotElem, 'buff');
  sumarPuntosDuelo(100, `Trampa colocada: ${datosCarta.nombre}`);
  mostrarMensajeToast(`¡${datosCarta.nombre} colocada boca abajo como trampa!`);

  if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
    MultiplayerManager.enviarAccion({
      tipo: 'JUGAR_MAGIA_EQUIPO',
      carta: datosCarta,
      slotIndex: slotIndex,
      bocaAbajo: true,
      manoCount: estadoJugador.mano.length
    });
    MultiplayerManager.sincronizarEstadoCampo();
  }
}

// ==========================================
// 10. ACCIONES EN CAMPO (GIRAR, ATACAR - SOLO BOTÓN ATACAR ARRIBA)
// ==========================================
function alternarPosicionMonstruo(slotIndex) {
  const slotData = estadoJugador.zonaMonstruos[slotIndex];
  if (!slotData) return;

  const isEn = configuracionJuego.idioma === 'en';
  const slotElement = document.querySelector(`#player-side .monsters-row .monster-slot[data-slot-index="${slotIndex}"]`);

  // Solo se permite cambiar entre Ataque y Defensa en la Fase PRINCIPAL del turno del jugador
  if (estadoJuego.turnoDe !== 'jugador' || estadoJuego.faseActual !== 'PRINCIPAL') {
    const msgBloqueo = (estadoJuego.turnoDe !== 'jugador' || estadoJuego.faseActual === 'FIN')
      ? (isEn
          ? "Monster positions are locked while waiting for the opponent's turn."
          : "Las cartas están bloqueadas en su última posición mientras esperas el turno del rival.")
      : (isEn
          ? "Monster positions are locked in Battle Phase (you can only switch Attack/Defense in Main Phase)."
          : "Las cartas están bloqueadas en Fase de Batalla (solo puedes cambiar entre Ataque y Defensa en Fase Principal).");
    mostrarMensajeToast(msgBloqueo);
    mostrarAlertaRegla(msgBloqueo, slotElement, isEn ? "POSITION LOCKED!" : "¡POSICIÓN BLOQUEADA!");
    return;
  }

  const nuevaPosicion = slotData.posicion === 'ataque' ? 'defensa' : 'ataque';
  slotData.posicion = nuevaPosicion;

  const datosCarta = bdCartas[slotData.id];

  if (slotElement) {
    const cardEl = slotElement.querySelector('.card-on-field');
    if (cardEl) {
      cardEl.classList.toggle('defense-position', nuevaPosicion === 'defensa');
      cardEl.classList.toggle('attack-position', nuevaPosicion === 'ataque');
    } else {
      renderizarMonstruoEnCampo(slotElement, datosCarta, nuevaPosicion, slotIndex);
    }
  }

  AudioManager.reproducirSFX('enter');
  mostrarMensajeToast(`[${datosCarta.nombre}] cambió a posición de ${nuevaPosicion.toUpperCase()}.`);

  if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
    MultiplayerManager.enviarAccion({
      tipo: 'CAMBIAR_POSICION',
      slotIndex: slotIndex,
      nuevaPosicion: nuevaPosicion
    });
  }
}

function sacrificarMonstruo(slotIndex, mostrarToast = true) {
  const slotData = estadoJugador.zonaMonstruos[slotIndex];
  if (!slotData) return;

  const cartaId = typeof slotData === 'object' ? slotData.id : slotData;
  const datosCarta = bdCartas[cartaId];

  estadoJugador.cementerio.push(cartaId);
  estadoJugador.zonaMonstruos[slotIndex] = null;

  const gySub = document.querySelector('#player-gy .slot-sub');
  if (gySub) {
    gySub.textContent = estadoJugador.cementerio.length;
  }

  const slotElement = document.querySelector(`#player-side .monsters-row .monster-slot[data-slot-index="${slotIndex}"]`);
  if (slotElement) {
    slotElement.classList.remove('occupied');
    slotElement.innerHTML = `
      <span class="slot-badge">MONSTRUO</span>
      <span class="slot-num">${slotIndex + 1}</span>
    `;
  }

  if (mostrarToast) {
    lanzarEfectoVisual('sacrificio', slotElement);
    AudioManager.reproducirSFX('faint');
    crearNumeroFlotante("SACRIFICADO", slotElement, 'damage');
    sumarPuntosDuelo(150, `Sacrificio de ${datosCarta.nombre}`);
    marcadorDuelo.sacrificios++;
    actualizarMarcadorLateral();
    mostrarMensajeToast(`¡${datosCarta.nombre} ha sido sacrificado y enviado al Cementerio!`);
  }
}

// RENDERIZADO DEL MONSTRUO (SE HA ELIMINADO LA OPCIÓN DE SACRIFICIO DEL MENÚ SUPERIOR)
function renderizarMonstruoEnCampo(slotElement, datosCarta, posicion = 'ataque', slotIndex = null) {
  slotElement.classList.add('occupied');

  if (slotIndex === null) {
    slotIndex = parseInt(slotElement.getAttribute('data-slot-index'));
  }

  const slotData = estadoJugador.zonaMonstruos[slotIndex] || { posicion, haAtacado: false, atkMod: 0, defMod: 0 };
  const esDefensa = slotData.posicion === 'defensa';
  const clasePosicion = esDefensa ? 'defense-position' : 'attack-position';

  const curAtk = obtenerAtkActual(slotData);
  const curDef = obtenerDefActual(slotData);
  const atkBuffClass = (slotData.atkMod && slotData.atkMod > 0) ? 'stat-buffed' : '';
  const defBuffClass = (slotData.defMod && slotData.defMod > 0) ? 'stat-buffed' : '';

  const imagenSrc = datosCarta.spriteCampo || datosCarta.spriteEstatico || datosCarta.imagenOficial;
  const fallbackSrc = datosCarta.spriteEstatico || datosCarta.imagenOficial;
  const imagenHtml = `
    <div class="card-art-container field-art">
      <img class="card-art-img field-sprite" src="${imagenSrc}" alt="${datosCarta.nombre}" onerror="this.onerror=null; this.src='${fallbackSrc}';" draggable="false">
    </div>
  `;

  // El botón de atacar SOLO aparece a partir del segundo turno para el jugador Red
  let botonAtacarHtml = "";
  if (estadoJuego.faseActual === 'BATALLA' && estadoJuego.turnoDe === 'jugador' && estadoJuego.turno >= 2) {
    if (!esDefensa && !slotData.haAtacado) {
      botonAtacarHtml = `<button class="monster-action-btn btn-atacar" title="Declarar ataque">⚔️ Atacar</button>`;
    } else if (slotData.haAtacado) {
      botonAtacarHtml = `<button class="monster-action-btn btn-atacar" disabled title="Ya atacó este turno">✔️ Atacó</button>`;
    }
  }

  let badgeTipoHtml = "";
  let tributosBadgeHtml = "";
  if (datosCarta.tipoCarta === 'monstruo') {
    if (datosCarta.elemento) {
      const infoT = obtenerInfoTipo(datosCarta.elemento);
      if (infoT) {
        badgeTipoHtml = `<div class="card-type-badge" title="Tipo: ${infoT.nombre} (${infoT.icono})">${infoT.icono}</div>`;
      }
    }
    if (datosCarta.sacrificios > 0) {
      tributosBadgeHtml = `<div class="card-tribute-badge" title="Requiere ${datosCarta.sacrificios} sacrificio(s)">★${datosCarta.sacrificios}</div>`;
    }
  }

  const barraAccionesHtml = botonAtacarHtml
    ? `<div class="monster-actions-bar">${botonAtacarHtml}</div>`
    : '';

  // MENÚ LIMPIO EN LA PARTE SUPERIOR DE LA CARTA (Solo muestra "Atacar" en Fase de Batalla)
  slotElement.innerHTML = `
    ${barraAccionesHtml}

    <!-- Carta del Monstruo -->
    <div class="card-on-field preview-card ${datosCarta.claseCss} ${clasePosicion} ${obtenerClaseFrontCarta(datosCarta)}" title="Haz clic en Fase Principal para alternar Ataque / Defensa">
      ${tributosBadgeHtml}
      ${badgeTipoHtml}
      <span class="card-name-mini">${datosCarta.nombre}</span>
      ${imagenHtml}
      <div class="card-stats-row">
        <span class="card-stat-mini stat-atk ${atkBuffClass}">A:${curAtk}</span>
        <span class="card-stat-mini stat-def ${defBuffClass}">D:${curDef}</span>
      </div>
    </div>
  `;

  const cardElement = slotElement.querySelector('.card-on-field');
  const btnAtacar = slotElement.querySelector('.btn-atacar');

  configurarInspectorHover(cardElement, datosCarta, false, false, () => estadoJugador.zonaMonstruos[slotIndex]);

  cardElement.addEventListener('click', () => {
    alternarPosicionMonstruo(slotIndex);
  });

  if (btnAtacar && !slotData.haAtacado) {
    btnAtacar.addEventListener('click', (e) => {
      e.stopPropagation();
      iniciarDeclaracionAtaque(slotIndex);
    });
  }
}

function renderizarCampoJugador() {
  const slotsMonstruos = document.querySelectorAll('#player-side .monsters-row .monster-slot');
  slotsMonstruos.forEach((slot, index) => {
    const slotData = estadoJugador.zonaMonstruos[index];
    if (slotData) {
      const datosCarta = bdCartas[slotData.id];
      renderizarMonstruoEnCampo(slot, datosCarta, slotData.posicion, index);
    } else {
      slot.classList.remove('occupied');
      slot.innerHTML = `<span class="slot-badge">MONSTRUO</span><span class="slot-num">${index + 1}</span>`;
    }
  });
}

// ==========================================
// 11. CAMPO DEL RIVAL Y TARGETING
// ==========================================
function renderizarCampoOponente() {
  const slotsRival = document.querySelectorAll('#opponent-side .monsters-row .monster-slot');

  slotsRival.forEach((slot, index) => {
    slot.setAttribute('data-slot-index', index);
    const slotData = estadoOponente.zonaMonstruos[index];

    if (slotData) {
      const datosCarta = bdCartas[slotData.id];
      const esDefensa = slotData.posicion === 'defensa';
      const clasePosicion = esDefensa ? 'defense-position' : 'attack-position';

      const curAtk = obtenerAtkActual(slotData);
      const curDef = obtenerDefActual(slotData);
      const atkBuffClass = (slotData.atkMod && slotData.atkMod > 0) ? 'stat-buffed' : '';
      const defBuffClass = (slotData.defMod && slotData.defMod > 0) ? 'stat-buffed' : '';

      const imagenSrc = datosCarta.spriteCampo || datosCarta.spriteEstatico || datosCarta.imagenOficial;
      const fallbackSrc = datosCarta.spriteEstatico || datosCarta.imagenOficial;

      let badgeTipoHtml = "";
      let tributosBadgeHtml = "";
      if (datosCarta.tipoCarta === 'monstruo') {
        if (datosCarta.elemento) {
          const infoT = obtenerInfoTipo(datosCarta.elemento);
          if (infoT) {
            badgeTipoHtml = `<div class="card-type-badge" title="Tipo: ${infoT.nombre} (${infoT.icono})">${infoT.icono}</div>`;
          }
        }
        if (datosCarta.sacrificios > 0) {
          tributosBadgeHtml = `<div class="card-tribute-badge" title="Requiere ${datosCarta.sacrificios} sacrificio(s)">★${datosCarta.sacrificios}</div>`;
        }
      }

      slot.classList.add('occupied');
      slot.innerHTML = `
        <div class="card-on-field preview-card ${datosCarta.claseCss} ${clasePosicion} ${obtenerClaseFrontCarta(datosCarta)}">
          ${tributosBadgeHtml}
          ${badgeTipoHtml}
          <span class="card-name-mini">${datosCarta.nombre}</span>
          <div class="card-art-container field-art">
            <img class="card-art-img field-sprite" src="${imagenSrc}" alt="${datosCarta.nombre}" onerror="this.onerror=null; this.src='${fallbackSrc}';" draggable="false">
          </div>
          <div class="card-stats-row">
            <span class="card-stat-mini stat-atk ${atkBuffClass}">A:${curAtk}</span>
            <span class="card-stat-mini stat-def ${defBuffClass}">D:${curDef}</span>
          </div>
        </div>
      `;

      configurarInspectorHover(slot.querySelector('.card-on-field'), datosCarta, false, false, () => estadoOponente.zonaMonstruos[index]);

      slot.onclick = () => {
        if (estadoJuego.faseActual === 'BATALLA' && estadoJuego.atacanteSeleccionado !== null) {
          resolverCombate(estadoJuego.atacanteSeleccionado, index);
        }
      };
    } else {
      slot.classList.remove('occupied');
      slot.innerHTML = `<span class="slot-badge">MONSTRUO</span><span class="slot-num">${index + 1}</span>`;
      slot.onclick = null;
    }
  });

  // Renderizar Zonas de Magia / Trampa del Oponente (Siempre boca abajo y secretas)
  const slotsMTRival = document.querySelectorAll('#opponent-side .spells-row .spell-trap-slot');
  slotsMTRival.forEach((slot, index) => {
    slot.setAttribute('data-slot-index', index);
    const mtData = estadoOponente.zonaMagiasTrampas[index];
    if (mtData) {
      slot.classList.add('occupied');
      slot.innerHTML = `
        <div class="card-on-field preview-card card-back face-down-card">
          <span class="card-name-mini">POKÉ-OH</span>
          <div class="card-art-container face-down-art">
            <span class="face-down-icon">🃏</span>
          </div>
          <span class="card-stat-mini set-badge">SET</span>
        </div>
      `;
      // REGLA: La carta boca abajo del rival es SECRETA en el inspector
      const cardEl = slot.querySelector('.card-on-field');
      configurarInspectorHover(cardEl, null, false, true);
    } else {
      slot.classList.remove('occupied');
      slot.innerHTML = `<span class="slot-badge">M / T</span><span class="slot-num">${index + 1}</span>`;
      configurarInspectorHover(slot, null);
    }
  });

  const lpVal = document.getElementById('opponent-lp-val');
  if (lpVal) lpVal.textContent = estadoOponente.lp;
  actualizarMarcadorLateral();
}

// ==========================================
// 12. MECÁNICA DE COMBATE Y ATAQUE (JUGADOR - DESDE TURNO 2)
// ==========================================
function iniciarDeclaracionAtaque(slotIndexAtacante) {
  // Regla: Solo se puede atacar a partir del segundo turno
  if (estadoJuego.turno < 2) {
    mostrarMensajeToast("¡No se puede atacar en el primer turno! Solo es posible a partir del Turno 2.");
    return;
  }

  if (estadoJuego.faseActual !== 'BATALLA') {
    mostrarMensajeToast("Solo puedes atacar durante la Fase de Batalla.");
    return;
  }

  const atacanteData = estadoJugador.zonaMonstruos[slotIndexAtacante];
  if (!atacanteData || atacanteData.posicion === 'defensa' || atacanteData.haAtacado) {
    mostrarMensajeToast("Este monstruo no puede declarar un ataque.");
    return;
  }

  estadoJuego.atacanteSeleccionado = slotIndexAtacante;
  const datosAtacante = bdCartas[atacanteData.id];

  const monstruosRivales = estadoOponente.zonaMonstruos.filter(m => m !== null);

  if (monstruosRivales.length > 0) {
    const slotsRival = document.querySelectorAll('#opponent-side .monsters-row .monster-slot');
    slotsRival.forEach((slot, idx) => {
      if (estadoOponente.zonaMonstruos[idx] !== null) {
        slot.classList.add('targetable-opponent');
      }
    });
    mostrarMensajeToast(`[${datosAtacante.nombre}] listo para atacar. ¡Haz clic en el Pokémon rival!`);
  } else {
    ejecutarAtaqueDirecto(slotIndexAtacante);
  }
}

function limpiarTargetingRivales() {
  const slotsRival = document.querySelectorAll('#opponent-side .monsters-row .monster-slot');
  slotsRival.forEach(slot => slot.classList.remove('targetable-opponent'));
}

function obtenerEfectoVisualAtaque(datosCarta) {
  if (!datosCarta) return 'corte';
  if (datosCarta.elemento === 'electrico') return 'electrico';
  if (datosCarta.elemento === 'fuego') return 'fuego';
  if (datosCarta.elemento === 'agua' || datosCarta.elemento === 'hielo') return 'escudo';
  return 'corte';
}

function ejecutarAtaqueDirecto(slotIndexAtacante) {
  const atacanteData = estadoJugador.zonaMonstruos[slotIndexAtacante];
  const datosAtacante = bdCartas[atacanteData.id];

  const dano = obtenerAtkActual(atacanteData);
  atacanteData.haAtacado = true;
  estadoJuego.atacanteSeleccionado = null;

  // Comprobar trampas del oponente ante ataque directo
  const trampaOponenteIndex = Array.isArray(estadoOponente.zonaMagiasTrampas)
    ? estadoOponente.zonaMagiasTrampas.findIndex(t => t !== null && t.bocaAbajo)
    : -1;

  if (trampaOponenteIndex !== -1) {
    const trampaData = estadoOponente.zonaMagiasTrampas[trampaOponenteIndex];
    const dTrampa = bdCartas[trampaData.id];
    const slotTrampaElem = document.querySelector(`#opponent-side .spells-row .spell-trap-slot[data-slot-index="${trampaOponenteIndex}"]`);
    const slotAtacanteElem = document.querySelector(`#player-side .monsters-row .monster-slot[data-slot-index="${slotIndexAtacante}"]`);

    if (slotTrampaElem) {
      lanzarEfectoVisual('escudo', slotTrampaElem);
      crearNumeroFlotante("¡TRAMPA!", slotTrampaElem, 'buff');
    }
    AudioManager.reproducirSFX('hit-super');

    let danoARed = 0;
    let destruirAtacantePorTrampa = false;

    if (trampaData.id === 240) { // Protección
      mostrarMensajeToast(`¡El rival activó "${dTrampa.nombre}" cancelando tu ataque directo!`);
    } else if (trampaData.id === 241) { // Manto Espejo: Refleja daño directo y destruye al atacante
      danoARed = dano;
      destruirAtacantePorTrampa = true;
      estadoJugador.lp = Math.max(0, estadoJugador.lp - danoARed);
      document.getElementById('player-lp-val').textContent = estadoJugador.lp;
      crearNumeroFlotante(`-${danoARed} LP`, document.getElementById('player-lp-val'), 'damage');

      // Destruir el monstruo atacante del jugador
      if (!Array.isArray(estadoJugador.cementerio)) estadoJugador.cementerio = [];
      estadoJugador.cementerio.push(atacanteData.id);
      estadoJugador.zonaMonstruos[slotIndexAtacante] = null;
      if (slotAtacanteElem) {
        crearNumeroFlotante("DESTRUIDO", slotAtacanteElem, 'damage');
        lanzarEfectoVisual('corte', slotAtacanteElem);
      }
      AudioManager.reproducirSFX('faint');

      mostrarMensajeToast(`¡El rival activó "${dTrampa.nombre}"! Reflejó ${danoARed} LP de daño directo y destruyó a tu ${datosAtacante.nombre}.`);
    } else if (trampaData.id === 242) { // Contador
      danoARed = 800;
      estadoJugador.lp = Math.max(0, estadoJugador.lp - danoARed);
      document.getElementById('player-lp-val').textContent = estadoJugador.lp;
      crearNumeroFlotante("-800 LP", document.getElementById('player-lp-val'), 'damage');
      mostrarMensajeToast(`¡El rival activó "${dTrampa.nombre}" infligiendo 800 LP de daño a tus puntos de vida!`);
    } else if (trampaData.id === 243) { // Paralizador
      mostrarMensajeToast(`¡El rival activó "${dTrampa.nombre}" inmovilizando a tu ${datosAtacante.nombre}!`);
    } else {
      mostrarMensajeToast(`¡El rival activó su trampa "${dTrampa.nombre}" bloqueando el ataque!`);
    }

    if (!Array.isArray(estadoOponente.cementerio)) estadoOponente.cementerio = [];
    estadoOponente.cementerio.push(trampaData.id);
    estadoOponente.zonaMagiasTrampas[trampaOponenteIndex] = null;
    if (slotTrampaElem) {
      slotTrampaElem.classList.remove('occupied');
      slotTrampaElem.innerHTML = `<span class="slot-badge">M / T</span><span class="slot-num">${trampaOponenteIndex + 1}</span>`;
    }
    const gySubOpp = document.querySelector('#opponent-gy .slot-sub');
    if (gySubOpp) gySubOpp.textContent = estadoOponente.cementerio.length;
    const gyPlayer = document.querySelector('#player-gy .slot-sub');
    if (gyPlayer) gyPlayer.textContent = estadoJugador.cementerio.length;

    actualizarMarcadorLateral();
    renderizarCampoJugador();
    renderizarCampoOponente();

    if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
      MultiplayerManager.enviarAccion({
        tipo: 'RESOLVER_COMBATE',
        resultado: {
          atacanteSlot: slotIndexAtacante,
          targetSlot: null,
          esDirecto: true,
          destruirAtacante: destruirAtacantePorTrampa,
          destruirObjetivo: false,
          danoAtacante: danoARed,
          danoObjetivo: 0,
          lpAtacanteFinal: estadoJugador.lp,
          lpObjetivoFinal: estadoOponente.lp,
          trampaActivada: trampaData.id
        }
      });
      MultiplayerManager.sincronizarEstadoCampo();
    }

    comprobarFinDelDuelo();
    return;
  }

  estadoOponente.lp = Math.max(0, estadoOponente.lp - dano);

  const lpRivalElem = document.getElementById('opponent-lp-val');

  lanzarEfectoVisual(obtenerEfectoVisualAtaque(datosAtacante), lpRivalElem);
  AudioManager.reproducirSFX('hit-super');

  lpRivalElem.textContent = estadoOponente.lp;
  crearNumeroFlotante(`-${dano} LP`, lpRivalElem, 'damage');

  sumarPuntosDuelo(dano, `Ataque directo de ${datosAtacante.nombre} (-${dano} LP)`);
  marcadorDuelo.danoTotal += dano;
  actualizarMarcadorLateral();

  if (estadoOponente.lp <= 0) {
    mostrarFinDelDuelo(true);
  } else {
    mostrarMensajeToast(`¡Ataque directo de ${datosAtacante.nombre}! Rival pierde ${dano} LP.`);
  }

  renderizarCampoJugador();

  if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
    MultiplayerManager.enviarAccion({
      tipo: 'RESOLVER_COMBATE',
      resultado: {
        atacanteSlot: slotIndexAtacante,
        targetSlot: null,
        esDirecto: true,
        destruirAtacante: false,
        destruirObjetivo: false,
        danoAtacante: 0,
        danoObjetivo: dano,
        lpAtacanteFinal: estadoJugador.lp,
        lpObjetivoFinal: estadoOponente.lp
      }
    });
    MultiplayerManager.sincronizarEstadoCampo();
  }
}

function resolverCombate(slotIndexAtacante, slotIndexObjetivo) {
  limpiarTargetingRivales();

  const atacanteData = estadoJugador.zonaMonstruos[slotIndexAtacante];
  const objetivoData = estadoOponente.zonaMonstruos[slotIndexObjetivo];

  if (!atacanteData || !objetivoData) {
    estadoJuego.atacanteSeleccionado = null;
    return;
  }

  const datosAtacante = bdCartas[atacanteData.id];
  const datosObjetivo = bdCartas[objetivoData.id];

  // Cálculo de ventaja / desventaja de tipo (+/- 300 temporal solo para este combate)
  const modTipo = calcularVentajaTipo(datosAtacante.elemento, datosObjetivo.elemento);
  const baseAtkAtacante = obtenerAtkActual(atacanteData);
  const atkAtacante = Math.max(0, baseAtkAtacante + modTipo);

  const atkObjetivo = obtenerAtkActual(objetivoData);
  const defObjetivo = obtenerDefActual(objetivoData);

  atacanteData.haAtacado = true;
  estadoJuego.atacanteSeleccionado = null;

  const slotAtacanteElem = document.querySelector(`#player-side .monsters-row .monster-slot[data-slot-index="${slotIndexAtacante}"]`);
  const slotObjetivoElem = document.querySelector(`#opponent-side .monsters-row .monster-slot[data-slot-index="${slotIndexObjetivo}"]`);

  // Comprobar trampas del oponente antes de resolver el combate
  const trampaOponenteIndex = Array.isArray(estadoOponente.zonaMagiasTrampas)
    ? estadoOponente.zonaMagiasTrampas.findIndex(t => t !== null && t.bocaAbajo)
    : -1;

  if (trampaOponenteIndex !== -1) {
    const trampaData = estadoOponente.zonaMagiasTrampas[trampaOponenteIndex];
    const dTrampa = bdCartas[trampaData.id];
    const slotTrampaElem = document.querySelector(`#opponent-side .spells-row .spell-trap-slot[data-slot-index="${trampaOponenteIndex}"]`);

    if (slotTrampaElem) {
      lanzarEfectoVisual('escudo', slotTrampaElem);
      crearNumeroFlotante("¡TRAMPA!", slotTrampaElem, 'buff');
    }
    AudioManager.reproducirSFX('hit-super');

    let danoARed = 0;
    let destruirAtacantePorTrampa = false;

    if (trampaData.id === 240) { // Protección
      mostrarMensajeToast(`¡El rival activó "${dTrampa.nombre}" y canceló el ataque de tu ${datosAtacante.nombre}!`);
    } else if (trampaData.id === 241) { // Manto Espejo: Refleja daño y destruye al atacante
      danoARed = atkAtacante;
      destruirAtacantePorTrampa = true;
      estadoJugador.lp = Math.max(0, estadoJugador.lp - danoARed);
      document.getElementById('player-lp-val').textContent = estadoJugador.lp;
      crearNumeroFlotante(`-${danoARed} LP`, document.getElementById('player-lp-val'), 'damage');

      // Destruir el monstruo atacante del jugador
      if (!Array.isArray(estadoJugador.cementerio)) estadoJugador.cementerio = [];
      estadoJugador.cementerio.push(atacanteData.id);
      estadoJugador.zonaMonstruos[slotIndexAtacante] = null;
      if (slotAtacanteElem) {
        crearNumeroFlotante("DESTRUIDO", slotAtacanteElem, 'damage');
        lanzarEfectoVisual('corte', slotAtacanteElem);
      }
      AudioManager.reproducirSFX('faint');

      mostrarMensajeToast(`¡El rival activó "${dTrampa.nombre}"! Reflejó ${danoARed} LP de daño y destruyó a tu ${datosAtacante.nombre}.`);
    } else if (trampaData.id === 242) { // Contador
      danoARed = 800;
      estadoJugador.lp = Math.max(0, estadoJugador.lp - danoARed);
      document.getElementById('player-lp-val').textContent = estadoJugador.lp;
      crearNumeroFlotante("-800 LP", document.getElementById('player-lp-val'), 'damage');
      mostrarMensajeToast(`¡El rival activó "${dTrampa.nombre}" contraatacando con 800 LP de daño a tus puntos de vida!`);
    } else if (trampaData.id === 243) { // Paralizador
      mostrarMensajeToast(`¡El rival activó "${dTrampa.nombre}" inmovilizando a tu ${datosAtacante.nombre}!`);
    } else {
      mostrarMensajeToast(`¡El rival activó su trampa "${dTrampa.nombre}" absorbiendo el ataque!`);
    }

    // Mover trampa del rival al cementerio
    if (!Array.isArray(estadoOponente.cementerio)) estadoOponente.cementerio = [];
    estadoOponente.cementerio.push(trampaData.id);
    estadoOponente.zonaMagiasTrampas[trampaOponenteIndex] = null;
    if (slotTrampaElem) {
      slotTrampaElem.classList.remove('occupied');
      slotTrampaElem.innerHTML = `<span class="slot-badge">M / T</span><span class="slot-num">${trampaOponenteIndex + 1}</span>`;
    }
    const gySubOpp = document.querySelector('#opponent-gy .slot-sub');
    if (gySubOpp) gySubOpp.textContent = estadoOponente.cementerio.length;
    const gyPlayer = document.querySelector('#player-gy .slot-sub');
    if (gyPlayer) gyPlayer.textContent = estadoJugador.cementerio.length;

    actualizarMarcadorLateral();
    renderizarCampoJugador();
    renderizarCampoOponente();

    if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
      MultiplayerManager.enviarAccion({
        tipo: 'RESOLVER_COMBATE',
        resultado: {
          atacanteSlot: slotIndexAtacante,
          targetSlot: slotIndexObjetivo,
          esDirecto: false,
          destruirAtacante: destruirAtacantePorTrampa,
          destruirObjetivo: false,
          danoAtacante: danoARed,
          danoObjetivo: 0,
          lpAtacanteFinal: estadoJugador.lp,
          lpObjetivoFinal: estadoOponente.lp,
          trampaActivada: trampaData.id
        }
      });
      MultiplayerManager.sincronizarEstadoCampo();
    }

    comprobarFinDelDuelo();
    return;
  }

  if (modTipo > 0) {
    const infoA = obtenerInfoTipo(datosAtacante.elemento);
    const infoO = obtenerInfoTipo(datosObjetivo.elemento);
    crearNumeroFlotante("+300 TIPO!", slotAtacanteElem, 'buff');
    mostrarMensajeToast(`¡Ventaja Elemental! ${datosAtacante.nombre} (${infoA.icono}) supera a ${datosObjetivo.nombre} (${infoO.icono}): +300 ATK/DEF en combate.`);
  } else if (modTipo < 0) {
    const infoA = obtenerInfoTipo(datosAtacante.elemento);
    const infoO = obtenerInfoTipo(datosObjetivo.elemento);
    crearNumeroFlotante("-300 TIPO!", slotAtacanteElem, 'damage');
    mostrarMensajeToast(`¡Desventaja Elemental! ${datosAtacante.nombre} (${infoA.icono}) tiene debilidad frente a ${datosObjetivo.nombre} (${infoO.icono}): -300 ATK/DEF en combate.`);
  }

  lanzarEfectoVisual(obtenerEfectoVisualAtaque(datosAtacante), slotObjetivoElem);

  let destruirObjetivo = false;
  let destruirAtacante = false;
  let danoAtacante = 0;
  let danoObjetivo = 0;

  // CASO A: Rival en Ataque
  if (objetivoData.posicion === 'ataque') {
    if (atkAtacante > atkObjetivo) {
      danoObjetivo = atkAtacante - atkObjetivo;
      estadoOponente.lp = Math.max(0, estadoOponente.lp - danoObjetivo);
      destruirObjetivo = true;
      estadoOponente.cementerio.push(objetivoData.id);
      estadoOponente.zonaMonstruos[slotIndexObjetivo] = null;

      AudioManager.reproducirSFX('hit-super');
      setTimeout(() => AudioManager.reproducirSFX('faint'), 200);

      crearNumeroFlotante(`-${danoObjetivo} LP`, document.getElementById('opponent-lp-val'), 'damage');
      crearNumeroFlotante("DESTRUIDO", slotObjetivoElem, 'damage');

      sumarPuntosDuelo(250 + danoObjetivo, `Destrucción de ${datosObjetivo.nombre} (+250) y daño (-${danoObjetivo} LP)`);
      marcadorDuelo.destruidos++;
      marcadorDuelo.danoTotal += danoObjetivo;

      mostrarMensajeToast(`¡${datosAtacante.nombre} destruyó a ${datosObjetivo.nombre}! Rival pierde ${danoObjetivo} LP.`);
    } else if (atkAtacante < atkObjetivo) {
      danoAtacante = atkObjetivo - atkAtacante;
      estadoJugador.lp = Math.max(0, estadoJugador.lp - danoAtacante);
      destruirAtacante = true;
      estadoJugador.cementerio.push(atacanteData.id);
      estadoJugador.zonaMonstruos[slotIndexAtacante] = null;

      AudioManager.reproducirSFX('hit');
      setTimeout(() => AudioManager.reproducirSFX('faint'), 200);

      crearNumeroFlotante(`-${danoAtacante} LP`, document.getElementById('player-lp-val'), 'damage');
      crearNumeroFlotante("DESTRUIDO", slotAtacanteElem, 'damage');
      mostrarMensajeToast(`¡${datosObjetivo.nombre} contraatacó! Tu ${datosAtacante.nombre} fue destruido y pierdes ${danoAtacante} LP.`);
    } else {
      destruirObjetivo = true;
      destruirAtacante = true;
      estadoOponente.cementerio.push(objetivoData.id);
      estadoOponente.zonaMonstruos[slotIndexObjetivo] = null;
      estadoJugador.cementerio.push(atacanteData.id);
      estadoJugador.zonaMonstruos[slotIndexAtacante] = null;

      AudioManager.reproducirSFX('hit');
      crearNumeroFlotante("EMPATE", slotAtacanteElem, 'damage');
      crearNumeroFlotante("EMPATE", slotObjetivoElem, 'damage');
      sumarPuntosDuelo(150, "Choque mutuo de fuerzas");
      marcadorDuelo.destruidos++;
      mostrarMensajeToast(`¡Empate de fuerzas! Ambos Pokémon chocaron y fueron destruidos.`);
    }
  } 
  // CASO B: Rival en Defensa
  else {
    if (atkAtacante > defObjetivo) {
      destruirObjetivo = true;
      estadoOponente.cementerio.push(objetivoData.id);
      estadoOponente.zonaMonstruos[slotIndexObjetivo] = null;

      AudioManager.reproducirSFX('hit-super');
      setTimeout(() => AudioManager.reproducirSFX('faint'), 200);
      crearNumeroFlotante("DEF PERFORADA", slotObjetivoElem, 'damage');
      sumarPuntosDuelo(250, `Defensa de ${datosObjetivo.nombre} perforada`);
      marcadorDuelo.destruidos++;
      mostrarMensajeToast(`¡${datosAtacante.nombre} perforó la defensa de ${datosObjetivo.nombre} y lo destruyó!`);
    } else if (atkAtacante < defObjetivo) {
      const rebote = defObjetivo - atkAtacante;
      danoAtacante = rebote;
      estadoJugador.lp = Math.max(0, estadoJugador.lp - rebote);
      AudioManager.reproducirSFX('hit');
      crearNumeroFlotante(`-${rebote} LP`, document.getElementById('player-lp-val'), 'damage');
      mostrarMensajeToast(`¡La defensa de ${datosObjetivo.nombre} resistió! Sufres ${rebote} LP de retroceso.`);
    } else {
      AudioManager.reproducirSFX('hit');
      mostrarMensajeToast(`¡Ataque bloqueado! Las defensas de ${datosObjetivo.nombre} aguantaron el golpe.`);
    }
  }

  document.getElementById('player-lp-val').textContent = estadoJugador.lp;
  document.getElementById('opponent-lp-val').textContent = estadoOponente.lp;

  // Actualizar contadores del cementerio
  const gyPlayer = document.querySelector('#player-gy .slot-sub');
  if (gyPlayer) gyPlayer.textContent = estadoJugador.cementerio.length;
  const gyOpp = document.querySelector('#opponent-gy .slot-sub');
  if (gyOpp) gyOpp.textContent = estadoOponente.cementerio.length;

  actualizarMarcadorLateral();
  renderizarCampoJugador();
  renderizarCampoOponente();

  // Sincronización en tiempo real para 2 Jugadores Online
  if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
    MultiplayerManager.enviarAccion({
      tipo: 'RESOLVER_COMBATE',
      resultado: {
        atacanteSlot: slotIndexAtacante,
        targetSlot: slotIndexObjetivo,
        esDirecto: false,
        destruirAtacante: destruirAtacante,
        destruirObjetivo: destruirObjetivo,
        danoAtacante: danoAtacante,
        danoObjetivo: danoObjetivo,
        lpAtacanteFinal: estadoJugador.lp,
        lpObjetivoFinal: estadoOponente.lp,
        posicionObjetivo: objetivoData.posicion
      }
    });
    MultiplayerManager.sincronizarEstadoCampo();
  }

  comprobarFinDelDuelo();
}

// ==========================================
// 13. TURNO DE LA IA (RIVAL INTELIGENTE - BLUE)
// ==========================================
function ejecutarTurnoIA() {
  estadoJuego.turnoDe = 'oponente';
  const isEn = configuracionJuego.idioma === 'en';
  const diff = configuracionJuego.dificultadIA || 'medio';

  // Temporizador de seguridad (Watchdog) para garantizar que la IA NUNCA congele la partida
  if (typeof window !== 'undefined') {
    if (window._aiTurnWatchdog) clearTimeout(window._aiTurnWatchdog);
    window._aiTurnWatchdog = setTimeout(() => {
      if (estadoJuego.turnoDe === 'oponente') {
        console.warn("⚠️ [Watchdog IA] El turno de la IA tardó demasiado o se interrumpió. Forzando devolución de turno al jugador...");
        finalizarTurnoIA();
      }
    }, 4500);
  }

  // Asegurar integridad de estructuras de datos
  if (!Array.isArray(estadoOponente.zonaMonstruos)) estadoOponente.zonaMonstruos = [null, null, null, null, null];
  if (!Array.isArray(estadoOponente.zonaMagiasTrampas)) estadoOponente.zonaMagiasTrampas = [null, null, null, null, null];
  if (!Array.isArray(estadoOponente.mano)) estadoOponente.mano = [];
  if (!Array.isArray(estadoOponente.mazo)) estadoOponente.mazo = [];
  if (!Array.isArray(estadoOponente.cementerio)) estadoOponente.cementerio = [];
  if (!Array.isArray(estadoJugador.zonaMonstruos)) estadoJugador.zonaMonstruos = [null, null, null, null, null];
  if (!Array.isArray(estadoJugador.mano)) estadoJugador.mano = [];

  actualizarUIFases();

  const btnNext = document.getElementById('btn-next-phase');
  if (btnNext) {
    btnNext.disabled = true;
    btnNext.textContent = isEn ? "Rival's Turn (Blue)... ⏳" : "Turno Rival (Blue)... ⏳";
  }

  // En turnos posteriores al primero, Blue roba 1 carta al iniciar su turno
  if (estadoJuego.turno >= 2) {
    const roboOk = robarCartas(estadoOponente, 1);
    if (!roboOk) return; // Deck Out sufrido por Blue
  }

  mostrarMensajeToast(isEn ? "Rival Blue's Turn: Analyzing the battlefield..." : "Turno del Rival Blue: Analizando el campo de batalla...");

  // Paso 1: Fase Principal de la IA (600ms)
  setTimeout(() => {
    try {
      // Evaluar los monstruos de Red en el campo
      const monstruosRed = estadoJugador.zonaMonstruos
        .map((m, idx) => (m && bdCartas[m.id]) ? { slotIdx: idx, obj: m, datos: bdCartas[m.id], atk: obtenerAtkActual(m), def: obtenerDefActual(m) } : null)
        .filter(m => m !== null);
      const maxAtkRed = monstruosRed.length > 0 ? Math.max(...monstruosRed.map(r => r.atk)) : 0;

      // 1. Invocación de 1 monstruo por turno (con tributos estrictos si requiere 1 o 2 sacrificios)
      const monstruosBlueEnCampo = estadoOponente.zonaMonstruos
        .map((m, idx) => (m && bdCartas[m.id]) ? { idx, obj: m, datos: bdCartas[m.id], atk: obtenerAtkActual(m), def: obtenerDefActual(m) } : null)
        .filter(m => m !== null);
      const numMonstruosBlue = monstruosBlueEnCampo.length;

      const slotsLibresRival = estadoOponente.zonaMonstruos
        .map((m, idx) => m === null ? idx : null)
        .filter(idx => idx !== null);

      let cartaElegidaId = null;
      let origen = null;
      let idxOrigen = -1;
      let esEvolucionDirectaIA = false;
      let slotPreEvoIA = null;

      // Extraer monstruo legal de la mano o del mazo de la IA (respetando los sacrificios que Blue puede costear)
      const fuentesMonstruo = [
        { tipo: 'mano', lista: estadoOponente.mano },
        { tipo: 'mazo', lista: estadoOponente.mazo }
      ];

      for (const fuente of fuentesMonstruo) {
        if (!fuente.lista || fuente.lista.length === 0) continue;
        for (let i = 0; i < fuente.lista.length; i++) {
          const idCand = fuente.lista[i];
          const cCand = bdCartas[idCand];
          if (cCand && cCand.tipoCarta === 'monstruo') {
            const reqSac = cCand.sacrificios || 0;
            const preEvoId = obtenerPreEvolucionDirecta(idCand);
            const candidatoPreEvo = preEvoId ? monstruosBlueEnCampo.find(m => m.obj.id === preEvoId) : null;

            if (reqSac === 0 && slotsLibresRival.length > 0) {
              cartaElegidaId = idCand;
              origen = fuente.tipo;
              idxOrigen = i;
              esEvolucionDirectaIA = false;
              slotPreEvoIA = null;
              break;
            } else if (candidatoPreEvo) {
              // ¡Evolución Directa! Solo requiere 1 sacrificio (la pre-evolución de su línea de 3 en campo)
              cartaElegidaId = idCand;
              origen = fuente.tipo;
              idxOrigen = i;
              esEvolucionDirectaIA = true;
              slotPreEvoIA = candidatoPreEvo;
              break;
            } else if (reqSac > 0 && numMonstruosBlue >= reqSac) {
              // Solo sacrifica si el monstruo entrante es más fuerte o aporta ventaja
              monstruosBlueEnCampo.sort((a, b) => a.atk - b.atk);
              const peorMonstruo = monstruosBlueEnCampo[0];
              if (cCand.atk > peorMonstruo.atk || diff === 'dificil') {
                cartaElegidaId = idCand;
                origen = fuente.tipo;
                idxOrigen = i;
                esEvolucionDirectaIA = false;
                slotPreEvoIA = null;
                break;
              }
            }
          }
        }
        if (cartaElegidaId) break;
      }

      if (origen === 'mano' && idxOrigen !== -1) {
        estadoOponente.mano.splice(idxOrigen, 1);
        renderizarManoOponente();
      } else if (origen === 'mazo' && idxOrigen !== -1) {
        estadoOponente.mazo.splice(idxOrigen, 1);
      }

      // Fallback legal si no se extrajo del mazo (solo básicos si hay slots libres)
      if (!cartaElegidaId && slotsLibresRival.length > 0) {
        const poolBasicos = diff === 'facil'
          ? [10, 13, 16, 19, 21, 29, 41, 43, 50, 60]
          : [1, 4, 7, 25, 27, 37, 43, 58, 60, 63, 66, 74, 92, 133, 147];
        cartaElegidaId = poolBasicos[Math.floor(Math.random() * poolBasicos.length)];
      }

      if (cartaElegidaId) {
        const datosM = bdCartas[cartaElegidaId];
        if (datosM) {
          const reqSac = datosM.sacrificios || 0;

          // Si es evolución directa, sacrifica solo la pre-evolución (1 sacrificio)
          if (esEvolucionDirectaIA && slotPreEvoIA && slotPreEvoIA.datos) {
            estadoOponente.zonaMonstruos[slotPreEvoIA.idx] = null;
            estadoOponente.cementerio.push(slotPreEvoIA.obj.id);
            const slotElem = document.querySelector(`#opponent-side .monsters-row .monster-slot[data-slot-index="${slotPreEvoIA.idx}"]`);
            if (slotElem) {
              lanzarEfectoVisual('vortice', slotElem);
              crearNumeroFlotante("EVOLUCIÓN", slotElem, 'buff');
            }
            AudioManager.reproducirSFX('faint');
            mostrarMensajeToast(isEn
              ? `🌟 Direct Evolution! Rival Blue tributed ${slotPreEvoIA.datos.nombre} (1 single tribute) to summon ${datosM.nombre}!`
              : `🌟 ¡Evolución Directa! El Rival Blue sacrificó a ${slotPreEvoIA.datos.nombre} (1 solo sacrificio) para invocar a ${datosM.nombre}!`);
          }
          // Si requiere sacrificios genéricos, Blue DEBE sacrificar exactamente reqSac monstruos de su campo
          else if (reqSac > 0 && numMonstruosBlue >= reqSac) {
            monstruosBlueEnCampo.sort((a, b) => a.atk - b.atk);
            const sacrificados = monstruosBlueEnCampo.slice(0, reqSac);

            sacrificados.forEach(s => {
              estadoOponente.zonaMonstruos[s.idx] = null;
              estadoOponente.cementerio.push(s.obj.id);
              const slotElem = document.querySelector(`#opponent-side .monsters-row .monster-slot[data-slot-index="${s.idx}"]`);
              if (slotElem) {
                lanzarEfectoVisual('vortice', slotElem);
                crearNumeroFlotante("SACRIFICIO", slotElem, 'damage');
              }
            });

            AudioManager.reproducirSFX('faint');
            const nombresSacrificados = sacrificados.map(s => (s.datos && s.datos.nombre) || "Pokémon").join(" y ");
            mostrarMensajeToast(isEn
              ? `Rival Blue tributed ${nombresSacrificados} to summon ${datosM.nombre}!`
              : `¡El Rival Blue sacrificó a ${nombresSacrificados} para invocar a ${datosM.nombre}!`);
          }

          // Buscar el primer slot disponible tras los posibles sacrificios
          const slotFinal = estadoOponente.zonaMonstruos.findIndex(m => m === null);
          if (slotFinal !== -1) {
            const posicionElegida = evaluarMejorPosicionMonstruo(cartaElegidaId, datosM.elemento, datosM.atk, datosM.def, monstruosRed, diff);

            estadoOponente.zonaMonstruos[slotFinal] = {
              id: cartaElegidaId,
              posicion: posicionElegida,
              haAtacado: false,
              atkMod: 0,
              defMod: 0
            };

            renderizarCampoOponente();
            const slotRivalElem = document.querySelector(`#opponent-side .monsters-row .monster-slot[data-slot-index="${slotFinal}"]`);
            if (slotRivalElem) crearNumeroFlotante("¡INVOCADO!", slotRivalElem, 'buff');
            AudioManager.reproducirSFX('enter');
            if (datosM.slug) AudioManager.reproducirGrito(datosM.slug);

            const motivoPos = posicionElegida === 'defensa'
              ? (isEn ? "in DEFENSE mode to protect LP" : "en modo DEFENSA para cuidar sus puntos de vida")
              : (isEn ? "in ATTACK mode" : "en modo ATAQUE");
            if (reqSac === 0) {
              mostrarMensajeToast(isEn ? `Rival Blue summoned ${datosM.nombre} ${motivoPos}.` : `El Rival Blue invocó a ${datosM.nombre} ${motivoPos}.`);
            }
          }
        }
      }

      // 2. Reposicionar de forma inteligente los monstruos existentes de Blue (considerando ventaja de tipos en las 3 dificultades)
      estadoOponente.zonaMonstruos.forEach((m) => {
        if (m !== null && bdCartas[m.id]) {
          const datosCurM = bdCartas[m.id];
          const curAtk = obtenerAtkActual(m);
          const curDef = obtenerDefActual(m);
          m.posicion = evaluarMejorPosicionMonstruo(m.id, datosCurM.elemento, curAtk, curDef, monstruosRed, diff);
        }
      });
      renderizarCampoOponente();

      // 3. Lógica de Cartas de Soporte / Equipos y Magias de Blue (Considerando Tabla de Tipos en Fácil, Medio y Difícil)
      const misMonstruos = estadoOponente.zonaMonstruos
        .map((m, idx) => (m && bdCartas[m.id]) ? { obj: m, idx, datos: bdCartas[m.id], atk: obtenerAtkActual(m) } : null)
        .filter(m => m !== null);

      // Evaluación de Curación (Pociones) si los LP de Blue están bajos
      if (estadoOponente.lp <= (diff === 'facil' ? 2000 : 3500)) {
        const pocionProb = diff === 'facil' ? 0.35 : (diff === 'medio' ? 0.6 : 0.85);
        if (Math.random() < pocionProb) {
          const cura = diff === 'facil' ? 500 : (diff === 'medio' ? 1000 : 2000);
          estadoOponente.lp = Math.min(configuracionJuego.lpMax || 8000, estadoOponente.lp + cura);
          const opLpElem = document.getElementById('opponent-lp-val');
          if (opLpElem) {
            opLpElem.textContent = estadoOponente.lp;
            crearNumeroFlotante(`+${cura} LP`, opLpElem, 'heal');
            lanzarEfectoVisual('luz', opLpElem);
          }
          AudioManager.reproducirSFX('hit');
          mostrarMensajeToast(isEn
            ? `Rival Blue used a Potion recovering +${cura} LP!`
            : `¡El Rival Blue usó una Poción recuperando +${cura} LP!`);
        }
      }

      // Evaluación de Equipos para superar las amenazas del jugador con cálculo de tipos (+/- 300)
      let debeEvaluarEquipos = true;
      if (diff === 'facil') {
        debeEvaluarEquipos = Math.random() < 0.5;
      }

      if (debeEvaluarEquipos && misMonstruos.length > 0 && monstruosRed.length > 0) {
        const poolEquiposIA = diff === 'facil' ? [220, 221] : [220, 221, 224, 230, 223];
        let equipoUsado = false;

        for (const mBlue of misMonstruos) {
          if (equipoUsado) break;
          if (!mBlue || !mBlue.datos || !mBlue.obj) continue;

          for (const r of monstruosRed) {
            if (!r || !r.datos || !r.obj) continue;
            const elemBlue = mBlue.datos.elemento || 'normal';
            const elemRed = r.datos.elemento || 'normal';
            const modTipoActual = calcularVentajaTipo(elemBlue, elemRed);
            const miAtkTotalActual = mBlue.atk + modTipoActual;
            const statRed = r.obj.posicion === 'ataque' ? (r.atk || 0) : (r.def || 0);

            // Si actualmente no supera a la carta de Red
            if (miAtkTotalActual <= statRed) {
              for (const eqId of poolEquiposIA) {
                const eqEffect = obtenerEfectoEquipo(eqId);
                const datosEq = bdCartas[eqId];
                if (datosEq && eqEffect && eqEffect.atk && (miAtkTotalActual + eqEffect.atk) > statRed) {
                  // En fácil, 25% de pifia (ignora la jugada)
                  if (diff === 'facil' && Math.random() < 0.25) continue;

                  // Equipar y pasar a modo ataque
                  mBlue.obj.atkMod = (mBlue.obj.atkMod || 0) + eqEffect.atk;
                  mBlue.obj.posicion = 'ataque';
                  equipoUsado = true;

                  const slotElemR = document.querySelector(`#opponent-side .monsters-row .monster-slot[data-slot-index="${mBlue.idx}"]`);
                  if (slotElemR) {
                    lanzarEfectoVisual(eqEffect.fx || 'fuego', slotElemR);
                    crearNumeroFlotante(eqEffect.texto, slotElemR, 'buff');
                  }
                  AudioManager.reproducirSFX('hit-super');
                  mostrarMensajeToast(isEn
                    ? `Rival Blue equipped "${datosEq.nombre}" to ${mBlue.datos.nombre} (${eqEffect.texto})!`
                    : `¡El Rival Blue equipó "${datosEq.nombre}" a ${mBlue.datos.nombre} (${eqEffect.texto}) para superar a tu ${r.datos.nombre}!`);
                  renderizarCampoOponente();
                  break;
                }
              }
            }
          }
        }
      }

      // 4. Cartas Trampa de Blue en zona M/T (en Medio y Difícil)
      if (diff !== 'facil' && Array.isArray(estadoOponente.zonaMagiasTrampas)) {
        const slotsLibresMTRival = estadoOponente.zonaMagiasTrampas
          .map((s, idx) => s === null ? idx : null)
          .filter(idx => idx !== null);
        const probTrampa = diff === 'dificil' ? 0.45 : 0.2;
        if (slotsLibresMTRival.length > 0 && Math.random() < probTrampa) {
          const poolTrampasIA = [240, 241, 242, 243];
          const trampaId = poolTrampasIA[Math.floor(Math.random() * poolTrampasIA.length)];
          estadoOponente.zonaMagiasTrampas[slotsLibresMTRival[0]] = {
            id: trampaId,
            bocaAbajo: true,
            activa: false,
            dueno: 'oponente'
          };
          renderizarCampoOponente();
        }
      }
    } catch (errPaso1) {
      console.error("⚠️ Error en Paso 1 (Fase Principal) de la IA:", errPaso1);
    }

    // Paso 2: Fase de Batalla de la IA
    // Si la IA no tiene monstruos en posición de ataque, pasar directamente a fin de turno
    const tieneAtacantes = estadoOponente.zonaMonstruos.some(m => m !== null && m.posicion === 'ataque' && !m.haAtacado);

    if (!tieneAtacantes) {
      setTimeout(() => {
        finalizarTurnoIA();
      }, 500);
      return;
    }

    setTimeout(() => {
      try {
        ejecutarFaseBatallaIA(() => {
          setTimeout(() => {
            finalizarTurnoIA();
          }, 600);
        });
      } catch (errBatalla) {
        console.error("Error en Fase de Batalla de la IA:", errBatalla);
        finalizarTurnoIA();
      }
    }, 700);

  }, 600);
}

// SECUENCIA DE BATALLA DE LA IA (PERMITE MÚLTIPLES ATAQUES POR TURNO)
function ejecutarFaseBatallaIA(callbackFin) {
  function siguienteAtaque() {
    try {
      if (estadoJugador.lp <= 0 || estadoOponente.lp <= 0) {
        if (callbackFin) callbackFin();
        return;
      }
      ejecutarAtaqueIA((haAtacado) => {
        try {
          if (haAtacado && estadoJugador.lp > 0 && estadoOponente.lp > 0) {
            // Ataque realizado con éxito: esperar para que se aprecie la animación e intentar atacar con otro monstruo
            setTimeout(siguienteAtaque, 1100);
          } else {
            // No hay más ataques viables o duelo finalizado
            if (callbackFin) callbackFin();
          }
        } catch (eCallback) {
          console.error("Error en callback de ataque IA:", eCallback);
          if (callbackFin) callbackFin();
        }
      });
    } catch (errAtk) {
      console.error("Error en siguienteAtaque IA:", errAtk);
      if (callbackFin) callbackFin();
    }
  }
  siguienteAtaque();
}

// LÓGICA DE UN ATAQUE DE LA IA SEGÚN DIFICULTAD
function ejecutarAtaqueIA(onAtaqueRealizado = null) {
  try {
    const diff = configuracionJuego.dificultadIA || 'medio';
    const isEn = configuracionJuego.idioma === 'en';

    const atacantesIA = [];
    estadoOponente.zonaMonstruos.forEach((m, idx) => {
      if (m !== null && m.posicion === 'ataque' && !m.haAtacado) {
        const d = bdCartas[m.id];
        if (d) {
          atacantesIA.push({
            slotIdx: idx,
            datos: d,
            obj: m,
            atk: obtenerAtkActual(m),
            def: obtenerDefActual(m)
          });
        }
      }
    });

  if (atacantesIA.length === 0) {
    if (onAtaqueRealizado) onAtaqueRealizado(false);
    return;
  }

  const monstruosJugadorIndices = contarMonstruosEnCampoJugador();

  // Caso 1: El jugador NO tiene monstruos -> Ataque directo del rival
  if (monstruosJugadorIndices.length === 0) {
    const atacante = atacantesIA[0];
    atacante.obj.haAtacado = true;
    const dano = atacante.atk;
    estadoJugador.lp = Math.max(0, estadoJugador.lp - dano);

    lanzarEfectoVisual(obtenerEfectoVisualAtaque(atacante.datos), document.getElementById('player-lp-val'));
    AudioManager.reproducirSFX('hit-super');
    crearNumeroFlotante(`-${dano} LP`, document.getElementById('player-lp-val'), 'damage');
    document.getElementById('player-lp-val').textContent = estadoJugador.lp;
    mostrarMensajeToast(isEn
      ? `Direct attack! ${atacante.datos.nombre} dealt ${dano} LP damage.`
      : `¡Ataque directo del rival! ${atacante.datos.nombre} te infligió ${dano} LP de daño.`);

    actualizarMarcadorLateral();
    renderizarCampoJugador();
    comprobarFinDelDuelo();
    if (onAtaqueRealizado) onAtaqueRealizado(true);
    return;
  }

  // En FÁCIL: 25% de error de aleatoriedad (duda y no ataca)
  if (diff === 'facil' && Math.random() < 0.25) {
    mostrarMensajeToast(isEn
      ? "Rival Blue hesitates and holds back attack."
      : "El rival Blue duda de su ataque y decide no atacar este turno.");
    if (onAtaqueRealizado) onAtaqueRealizado(false);
    return;
  }

  // Caso 2: El jugador SÍ tiene monstruos.
  // La IA evalúa ventaja de tipo elemental (+/- 300) y solo atacará si vence sin sufrir daño de vida.
  let jugadaOptima = null;

  for (const atacante of atacantesIA) {
    for (const jIdx of monstruosJugadorIndices) {
      const mTarget = estadoJugador.zonaMonstruos[jIdx];
      if (!mTarget) continue;
      const dTarget = bdCartas[mTarget.id];
      const targetAtk = obtenerAtkActual(mTarget);
      const targetDef = obtenerDefActual(mTarget);

      // Calcular ventaja/desventaja elemental de Blue atacando a Red
      const modTipo = calcularVentajaTipo(atacante.datos.elemento, dTarget.elemento);
      const atkCombate = Math.max(0, atacante.atk + modTipo);

      if (mTarget.posicion === 'ataque') {
        // En ataque: Solo ataca si su ATK efectivo supera estrictamente el ATK del jugador
        if (atkCombate > targetAtk) {
          const dano = atkCombate - targetAtk;
          if (!jugadaOptima || dano > jugadaOptima.danoAlJugador) {
            jugadaOptima = {
              atacanteSlot: atacante.slotIdx,
              targetSlot: jIdx,
              dAtacante: atacante.datos,
              dTarget: dTarget,
              mTarget: mTarget,
              atkAtacante: atkCombate,
              modTipo: modTipo,
              targetStat: targetAtk,
              danoAlJugador: dano,
              tipo: 'ataque'
            };
          }
        }
      } else {
        // En defensa: Solo ataca si su ATK efectivo supera estrictamente la DEF del jugador
        if (atkCombate > targetDef) {
          if (!jugadaOptima || jugadaOptima.tipo !== 'ataque') {
            jugadaOptima = {
              atacanteSlot: atacante.slotIdx,
              targetSlot: jIdx,
              dAtacante: atacante.datos,
              dTarget: dTarget,
              mTarget: mTarget,
              atkAtacante: atkCombate,
              modTipo: modTipo,
              targetStat: targetDef,
              danoAlJugador: 0,
              tipo: 'defensa'
            };
          }
        }
      }
    }
  }

  // Si no hay ninguna jugada segura (todos los monstruos del jugador son más fuertes o iguales):
  // La IA decide inteligentemente NO atacar para no perder puntos de vida
  if (!jugadaOptima) {
    if (onAtaqueRealizado) onAtaqueRealizado(false);
    return;
  }

  // Ejecutar ataque seguro
  const { atacanteSlot, targetSlot, dAtacante, dTarget, mTarget, atkAtacante, modTipo } = jugadaOptima;
  estadoOponente.zonaMonstruos[atacanteSlot].haAtacado = true;

  const slotRivalElem = document.querySelector(`#opponent-side .monsters-row .monster-slot[data-slot-index="${atacanteSlot}"]`);
  const slotJugadorElem = document.querySelector(`#player-side .monsters-row .monster-slot[data-slot-index="${targetSlot}"]`);

  if (modTipo > 0) {
    const infoA = obtenerInfoTipo(dAtacante.elemento);
    const infoT = obtenerInfoTipo(dTarget.elemento);
    crearNumeroFlotante("+300 TIPO!", slotRivalElem, 'buff');
    mostrarMensajeToast(isEn
      ? `Elemental Advantage! Rival's ${dAtacante.nombre} (${infoA.icono}) over ${dTarget.nombre} (${infoT.icono}): +300 ATK/DEF.`
      : `¡Ventaja Elemental Rival! ${dAtacante.nombre} (${infoA.icono}) sobre tu ${dTarget.nombre} (${infoT.icono}): +300 ATK/DEF.`);
  } else if (modTipo < 0) {
    const infoA = obtenerInfoTipo(dAtacante.elemento);
    const infoT = obtenerInfoTipo(dTarget.elemento);
    crearNumeroFlotante("-300 TIPO!", slotRivalElem, 'damage');
    mostrarMensajeToast(isEn
      ? `Elemental Disadvantage! Rival's ${dAtacante.nombre} (${infoA.icono}) against ${dTarget.nombre} (${infoT.icono}): -300 ATK/DEF.`
      : `¡Desventaja Elemental Rival! ${dAtacante.nombre} (${infoA.icono}) frente a tu ${dTarget.nombre} (${infoT.icono}): -300 ATK/DEF.`);
  }

  // Comprobar trampas del jugador
  const trampaIndex = estadoJugador.zonaMagiasTrampas.findIndex(t => t !== null && t.bocaAbajo);
  if (trampaIndex !== -1) {
    const trampaData = estadoJugador.zonaMagiasTrampas[trampaIndex];
    const dTrampa = bdCartas[trampaData.id];

    const slotTrampaElem = document.querySelector(`#player-side .spells-row .spell-trap-slot[data-slot-index="${trampaIndex}"]`);
    lanzarEfectoVisual('escudo', slotTrampaElem);
    AudioManager.reproducirSFX('hit-super');
    crearNumeroFlotante("¡TRAMPA!", slotTrampaElem, 'buff');

    if (trampaData.id === 240) { // Protección
      mostrarMensajeToast(isEn ? `Your trap "${dTrampa.nombre}" negated the attack!` : `¡Tu trampa "${dTrampa.nombre}" canceló el ataque de ${dAtacante.nombre}!`);
      sumarPuntosDuelo(200, `Trampa Protección activada`);
    } else if (trampaData.id === 241) { // Manto Espejo: Devuelve daño y destruye al atacante enemigo
      estadoOponente.lp = Math.max(0, estadoOponente.lp - atkAtacante);
      document.getElementById('opponent-lp-val').textContent = estadoOponente.lp;
      crearNumeroFlotante(`-${atkAtacante} LP`, document.getElementById('opponent-lp-val'), 'damage');

      // Destruir al monstruo enemigo que atacó
      const atacanteMonstruo = estadoOponente.zonaMonstruos[atacanteSlot];
      if (atacanteMonstruo) {
        if (!Array.isArray(estadoOponente.cementerio)) estadoOponente.cementerio = [];
        estadoOponente.cementerio.push(atacanteMonstruo.id);
        estadoOponente.zonaMonstruos[atacanteSlot] = null;
        if (slotRivalElem) {
          crearNumeroFlotante("DESTRUIDO", slotRivalElem, 'damage');
          lanzarEfectoVisual('corte', slotRivalElem);
        }
        AudioManager.reproducirSFX('faint');
      }

      const gySubOpp = document.querySelector('#opponent-gy .slot-sub');
      if (gySubOpp) gySubOpp.textContent = estadoOponente.cementerio.length;
      renderizarCampoOponente();

      mostrarMensajeToast(isEn
        ? `"${dTrampa.nombre}" reflected ${atkAtacante} LP damage and destroyed ${dAtacante.nombre}!`
        : `¡"${dTrampa.nombre}" reflejó ${atkAtacante} LP de daño y destruyó a ${dAtacante.nombre} enemigo!`);
      sumarPuntosDuelo(300 + atkAtacante, `Manto Espejo reflejó ${atkAtacante} LP y destruyó a ${dAtacante.nombre}`);
      marcadorDuelo.destruidos++;
      marcadorDuelo.danoTotal += atkAtacante;
    } else if (trampaData.id === 242) { // Contador
      estadoOponente.lp = Math.max(0, estadoOponente.lp - 800);
      document.getElementById('opponent-lp-val').textContent = estadoOponente.lp;
      crearNumeroFlotante("-800 LP", document.getElementById('opponent-lp-val'), 'damage');
      mostrarMensajeToast(isEn ? `"${dTrampa.nombre}" counter-attacked for 800 LP!` : `¡"${dTrampa.nombre}" contraatacó infligiendo 800 LP al rival!`);
      sumarPuntosDuelo(350, "Trampa Contador activada (-800 LP)");
    } else if (trampaData.id === 243) { // Paralizador
      mostrarMensajeToast(isEn ? `"${dTrampa.nombre}" paralyzed ${dAtacante.nombre}!` : `¡"${dTrampa.nombre}" inmovilizó a ${dAtacante.nombre}!`);
      sumarPuntosDuelo(200, `Trampa Paralizador activada`);
    } else {
      mostrarMensajeToast(isEn ? `Your trap "${dTrampa.nombre}" absorbed the attack!` : `¡Tu trampa "${dTrampa.nombre}" absorbió y anuló el ataque!`);
      sumarPuntosDuelo(250, `Trampa ${dTrampa.nombre} activada`);
    }

    estadoJugador.cementerio.push(trampaData.id);
    estadoJugador.zonaMagiasTrampas[trampaIndex] = null;
    slotTrampaElem.classList.remove('occupied');
    slotTrampaElem.innerHTML = `<span class="slot-badge">M / T</span><span class="slot-num">${trampaIndex + 1}</span>`;
    const gySub = document.querySelector('#player-gy .slot-sub');
    if (gySub) gySub.textContent = estadoJugador.cementerio.length;

    actualizarMarcadorLateral();
    comprobarFinDelDuelo();
    if (onAtaqueRealizado) onAtaqueRealizado(true);
    return;
  }

  // Resolución de combate normal
  lanzarEfectoVisual(obtenerEfectoVisualAtaque(dAtacante), slotJugadorElem);

  const targetAtk = obtenerAtkActual(mTarget);
  const targetDef = obtenerDefActual(mTarget);

  if (mTarget.posicion === 'ataque') {
    if (atkAtacante > targetAtk) {
      const dano = atkAtacante - targetAtk;
      estadoJugador.lp = Math.max(0, estadoJugador.lp - dano);
      estadoJugador.zonaMonstruos[targetSlot] = null;
      AudioManager.reproducirSFX('hit-super');
      setTimeout(() => AudioManager.reproducirSFX('faint'), 200);

      crearNumeroFlotante(`-${dano} LP`, document.getElementById('player-lp-val'), 'damage');
      crearNumeroFlotante("DESTRUIDO", slotJugadorElem, 'damage');
      mostrarMensajeToast(isEn
        ? `Rival's ${dAtacante.nombre} destroyed your ${dTarget.nombre}! You take ${dano} LP damage.`
        : `¡El ${dAtacante.nombre} rival destruyó a tu ${dTarget.nombre}! Pierdes ${dano} LP.`);
    } else if (atkAtacante < targetAtk) {
      const dano = targetAtk - atkAtacante;
      estadoOponente.lp = Math.max(0, estadoOponente.lp - dano);
      estadoOponente.zonaMonstruos[atacanteSlot] = null;
      AudioManager.reproducirSFX('hit-super');
      setTimeout(() => AudioManager.reproducirSFX('faint'), 200);

      crearNumeroFlotante(`-${dano} LP`, document.getElementById('opponent-lp-val'), 'damage');
      crearNumeroFlotante("DESTRUIDO", slotRivalElem, 'damage');
      sumarPuntosDuelo(250 + dano, `Tu ${dTarget.nombre} contraatacó a ${dAtacante.nombre} (-${dano} LP)`);
      mostrarMensajeToast(isEn
        ? `Your ${dTarget.nombre} counter-attacked and destroyed ${dAtacante.nombre}! Rival takes ${dano} LP.`
        : `¡Tu ${dTarget.nombre} contraatacó y destruyó a ${dAtacante.nombre} rival! Rival pierde ${dano} LP.`);
    } else {
      estadoJugador.zonaMonstruos[targetSlot] = null;
      estadoOponente.zonaMonstruos[atacanteSlot] = null;
      AudioManager.reproducirSFX('hit');
      crearNumeroFlotante("EMPATE", slotJugadorElem, 'damage');
      crearNumeroFlotante("EMPATE", slotRivalElem, 'damage');
      sumarPuntosDuelo(150, "Doble destrucción en combate");
      mostrarMensajeToast(isEn ? "Double destruction! Both Pokémon were destroyed." : "¡Empate de fuerzas! Ambos Pokémon fueron destruidos.");
    }
  } else {
    // Objetivo en defensa
    if (atkAtacante > targetDef) {
      estadoJugador.zonaMonstruos[targetSlot] = null;
      AudioManager.reproducirSFX('hit');
      setTimeout(() => AudioManager.reproducirSFX('faint'), 200);
      crearNumeroFlotante("DESTRUIDO", slotJugadorElem, 'damage');
      mostrarMensajeToast(isEn
        ? `Rival's ${dAtacante.nombre} pierced the defense of ${dTarget.nombre}.`
        : `El ${dAtacante.nombre} rival rompió la defensa de tu ${dTarget.nombre}.`);
    } else if (atkAtacante < targetDef) {
      const rebote = targetDef - atkAtacante;
      estadoOponente.lp = Math.max(0, estadoOponente.lp - rebote);
      AudioManager.reproducirSFX('hit');
      crearNumeroFlotante(`-${rebote} LP`, document.getElementById('opponent-lp-val'), 'damage');
      mostrarMensajeToast(isEn
        ? `Your ${dTarget.nombre}'s defense held! Rival took ${rebote} LP recoil.`
        : `¡La defensa de tu ${dTarget.nombre} aguantó! El rival sufre ${rebote} LP de rebote.`);
    } else {
      AudioManager.reproducirSFX('hit');
      mostrarMensajeToast(isEn
        ? `Attack blocked! Defense of ${dTarget.nombre} held.`
        : `¡Ataque bloqueado! Las defensas de tu ${dTarget.nombre} aguantaron.`);
    }
  }

  document.getElementById('player-lp-val').textContent = estadoJugador.lp;
  document.getElementById('opponent-lp-val').textContent = estadoOponente.lp;
  actualizarMarcadorLateral();
  renderizarCampoJugador();
  renderizarCampoOponente();
  comprobarFinDelDuelo();
  if (onAtaqueRealizado) onAtaqueRealizado(true);
} catch (errAtaque) {
  console.error("Error en ejecutarAtaqueIA:", errAtaque);
  if (onAtaqueRealizado) onAtaqueRealizado(false);
}
}

function finalizarTurnoIA() {
  if (typeof window !== 'undefined' && window._aiTurnWatchdog) {
    clearTimeout(window._aiTurnWatchdog);
    window._aiTurnWatchdog = null;
  }

  if (estadoJugador.lp <= 0 || estadoOponente.lp <= 0) return;

  const isEn = configuracionJuego.idioma === 'en';

  try {
    if (!Array.isArray(estadoOponente.mano)) {
      estadoOponente.mano = [];
    }
    // Límite de mano para la IA: Si Blue tiene más de 5 cartas al finalizar su turno, descarta el exceso al cementerio
    if (estadoOponente.mano.length > 5) {
      const exceso = estadoOponente.mano.length - 5;
      for (let d = 0; d < exceso; d++) {
        let peorIdx = 0;
        let menorPoder = 99999;
        for (let c = 0; c < estadoOponente.mano.length; c++) {
          const item = estadoOponente.mano[c];
          const datos = (typeof item === 'object' && item !== null) ? item : (bdCartas[item] || {});
          const val = (datos.tipoCarta === 'monstruo' || datos.tipo === 'monstruo') ? (datos.atk || 0) : 500;
          if (val < menorPoder) {
            menorPoder = val;
            peorIdx = c;
          }
        }
        const descartada = estadoOponente.mano.splice(peorIdx, 1)[0];
        if (!Array.isArray(estadoOponente.cementerio)) estadoOponente.cementerio = [];
        estadoOponente.cementerio.push(descartada);
      }
      const gySubOpp = document.querySelector('#opponent-gy .slot-sub');
      if (gySubOpp) gySubOpp.textContent = estadoOponente.cementerio.length;
      renderizarManoOponente();
      mostrarMensajeToast(isEn
        ? `Blue discarded ${exceso} card(s) to the graveyard due to the 5-card hand limit.`
        : `Blue descartó ${exceso} carta(s) al cementerio por límite de mano (máx 5).`);
    }
  } catch (errMano) {
    console.error("Error al gestionar descarte de la IA:", errMano);
  }

  // Devolver el turno al jugador incondicionalmente
  estadoJuego.turnoDe = 'jugador';
  estadoJuego.turno++;
  estadoJuego.haInvocadoMonstruoEsteTurno = false; // Reiniciar límite de 1 invocación de monstruo por turno
  estadoJuego.faseActual = 'PRINCIPAL';

  if (Array.isArray(estadoJugador.zonaMonstruos)) {
    estadoJugador.zonaMonstruos.forEach(m => {
      if (m) m.haAtacado = false;
    });
  }
  if (Array.isArray(estadoOponente.zonaMonstruos)) {
    estadoOponente.zonaMonstruos.forEach(m => {
      if (m) m.haAtacado = false;
    });
  }

  const btnNext = document.getElementById('btn-next-phase');
  if (btnNext) {
    btnNext.disabled = false;
    btnNext.textContent = estadoJuego.turno >= 2
      ? (isEn ? "To Battle Phase ⚔️" : "A Fase Batalla ⚔️")
      : (isEn ? "End Turn 🏁" : "Finalizar Turno 🏁");
  }

  try {
    robarCartas(estadoJugador, 1);
  } catch (errRobo) {
    console.error("Error al robar carta para el jugador:", errRobo);
  }

  try {
    actualizarUIFases();
    renderizarMano(estadoJugador);
    renderizarCampoJugador();
    renderizarCampoOponente();
    actualizarMarcadorLateral();
  } catch (errRender) {
    console.error("Error al actualizar UI tras turno IA:", errRender);
  }

  const msgTurno = estadoJuego.turno >= 2
    ? (isEn ? `Turn ${estadoJuego.turno}! You drew 1 card. Battle Phase enabled!` : `¡Turno ${estadoJuego.turno}! Robaste 1 carta. ¡Fase de Combate habilitada!`)
    : (isEn ? `Turn ${estadoJuego.turno}! You drew 1 card. Main Phase active.` : `¡Turno ${estadoJuego.turno}! Robaste 1 carta. Fase Principal activa.`);
  mostrarMensajeToast(msgTurno);
}

// ==========================================
// 14. CONTROL DE FASES Y BOTONES
// ==========================================
function actualizarUIFases() {
  const steps = ['phase-draw', 'phase-main', 'phase-battle', 'phase-end'];
  const fasesMap = { 'ROBO': 'phase-draw', 'PRINCIPAL': 'phase-main', 'BATALLA': 'phase-battle', 'FIN': 'phase-end' };

  steps.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });

  const activeId = fasesMap[estadoJuego.faseActual];
  if (activeId) {
    const activeEl = document.getElementById(activeId);
    if (activeEl) activeEl.classList.add('active');
  }

  const turnDisplay = document.getElementById('turn-display');
  if (turnDisplay) {
    turnDisplay.textContent = `TURNO ${estadoJuego.turno}`;
  }

  const turnPlayerDisplay = document.getElementById('turn-player-display');
  if (turnPlayerDisplay) {
    const isEn = configuracionJuego.idioma === 'en';
    if (estadoJuego.turnoDe === 'jugador') {
      const nombreUsuario = (typeof UserManager !== 'undefined' && UserManager.currentUser && UserManager.currentUser.username)
        || estadoJugador.nombre
        || "Red";
      turnPlayerDisplay.textContent = isEn
        ? `TURNO DE ${nombreUsuario.toUpperCase()}`
        : `TURNO DE ${nombreUsuario.toUpperCase()}`;
      turnPlayerDisplay.style.color = "#2ecc71";
    } else {
      const nombreRival = estadoOponente.nombre || "Blue";
      turnPlayerDisplay.textContent = isEn
        ? `TURNO DE ${nombreRival.toUpperCase()}`
        : `TURNO DE ${nombreRival.toUpperCase()}`;
      turnPlayerDisplay.style.color = "#ff4757";
    }
  }

  const isEnLang = configuracionJuego.idioma === 'en';
  const playerStatusEl = document.querySelector('footer.player-hud .hud-info .player-status');
  const oppStatusEl = document.querySelector('#opponent-side .hud-info .player-status');
  const nombreUsuario = (typeof UserManager !== 'undefined' && UserManager.currentUser && UserManager.currentUser.username)
    || estadoJugador.nombre
    || "Red";
  const nombreRival = estadoOponente.nombre || "Blue";

  if (playerStatusEl) {
    if (estadoJuego.turnoDe === 'jugador') {
      playerStatusEl.textContent = isEnLang ? `Turn of ${nombreUsuario}` : `Turno de ${nombreUsuario}`;
      playerStatusEl.classList.add('active-turn');
    } else {
      playerStatusEl.textContent = isEnLang ? "Waiting..." : "Esperando turno";
      playerStatusEl.classList.remove('active-turn');
    }
  }
  if (oppStatusEl) {
    if (estadoJuego.turnoDe === 'oponente') {
      oppStatusEl.textContent = isEnLang ? `Turn of ${nombreRival}` : `Turno de ${nombreRival}`;
      oppStatusEl.classList.add('active-turn');
    } else {
      oppStatusEl.textContent = isEnLang ? "Waiting..." : "Esperando turno";
      oppStatusEl.classList.remove('active-turn');
    }
  }

  const nextBtn = document.getElementById('btn-next-phase');
  if (nextBtn) {
    if (estadoJuego.faseActual === 'PRINCIPAL') {
      nextBtn.textContent = estadoJuego.turno >= 2 ? "A Fase Batalla ⚔️" : "Finalizar Turno 🏁";
      nextBtn.disabled = (estadoJuego.turnoDe !== 'jugador');
    } else if (estadoJuego.faseActual === 'BATALLA') {
      nextBtn.textContent = "Finalizar Turno 🏁";
      nextBtn.disabled = (estadoJuego.turnoDe !== 'jugador');
    } else if (estadoJuego.faseActual === 'FIN') {
      nextBtn.textContent = "Pasando al rival... ⏳";
      nextBtn.disabled = true;
    } else {
      nextBtn.textContent = "Siguiente Fase ⏭️";
    }
  }
}

function avanzarFase() {
  if (estadoJuego.turnoDe !== 'jugador') return;

  limpiarTargetingRivales();
  estadoJuego.atacanteSeleccionado = null;

  if (estadoJuego.faseActual === 'PRINCIPAL') {
    if (estadoJuego.turno < 2) {
      // En Turno 1 no se puede atacar, pasar directamente a FIN automáticamente
      verificarLimiteManoYPasar(() => {
        pasarAutomaticamenteAFin("Turno 1: No se puede atacar en el primer turno. Pasando turno automáticamente al rival Blue...");
      });
      return;
    } else {
      estadoJuego.faseActual = 'BATALLA';
      mostrarMensajeToast("Fase de Batalla: ¡Declara ataques con tus Pokémon en modo Ataque!");
      actualizarUIFases();
      renderizarCampoJugador();
      renderizarMano(estadoJugador);
    }
  } else if (estadoJuego.faseActual === 'BATALLA') {
    verificarLimiteManoYPasar(() => {
      pasarAutomaticamenteAFin("Fase Final: Pasando turno automáticamente al rival...");
    });
    return;
  } else if (estadoJuego.faseActual === 'FIN') {
    verificarLimiteManoYPasar(() => {
      if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
        MultiplayerManager.enviarAccion({ tipo: 'PASAR_FASE', fase: 'FIN' });
        estadoJuego.turnoDe = 'oponente';
        if (estadoOponente.mano) {
          estadoOponente.mano.push(null);
          renderizarManoOponente();
        }
        actualizarUIFases();
        mostrarMensajeToast("Turno del rival online...");
      } else {
        ejecutarTurnoIA();
      }
    });
  }
}

function pasarAutomaticamenteAFin(mensajeToast) {
  estadoJuego.faseActual = 'FIN';
  actualizarUIFases();
  renderizarCampoJugador();
  renderizarMano(estadoJugador);

  const btnNext = document.getElementById('btn-next-phase');
  if (btnNext) {
    btnNext.disabled = true;
    btnNext.textContent = "Pasando al rival... ⏳";
  }

  mostrarMensajeToast(mensajeToast);
  setTimeout(() => {
    if (estadoJuego.faseActual === 'FIN' && estadoJuego.turnoDe === 'jugador') {
      if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
        MultiplayerManager.enviarAccion({ tipo: 'PASAR_FASE', fase: 'FIN' });
        estadoJuego.turnoDe = 'oponente';
        if (estadoOponente.mano) {
          estadoOponente.mano.push(null);
          renderizarManoOponente();
        }
        actualizarUIFases();
        mostrarMensajeToast("Turno del rival online...");
      } else {
        ejecutarTurnoIA();
      }
    }
  }, 800);
}

// ==============================================================
// 14.1. LÍMITE DE MANO EN FIN DE TURNO (MÁXIMO 5 CARTAS)
// ==============================================================
function verificarLimiteManoYPasar(onCompletado) {
  if (estadoJugador.mano.length <= 5) {
    if (onCompletado) onCompletado();
    return;
  }

  // Abrir modal de descarte obligatorio
  const modal = document.getElementById('discard-modal');
  if (!modal) {
    if (onCompletado) onCompletado();
    return;
  }

  try {
    renderizarModalDescarte(onCompletado);
  } catch (err) {
    console.error("Error al renderizar modal de descarte:", err);
  }
  modal.classList.remove('hidden');
  AudioManager.reproducirSFX('hit');
}

function renderizarModalDescarte(onCompletado) {
  const modal = document.getElementById('discard-modal');
  const countEl = document.getElementById('discard-current-count');
  const neededEl = document.getElementById('discard-needed-count');
  const grid = document.getElementById('discard-cards-grid');
  const statusText = document.getElementById('discard-status-text');
  const btnConfirm = document.getElementById('btn-confirm-discard');

  const total = estadoJugador.mano.length;
  const porDescartar = Math.max(0, total - 5);

  if (countEl) countEl.textContent = total;
  if (neededEl) neededEl.textContent = porDescartar;

  if (porDescartar > 0) {
    if (statusText) {
      statusText.innerHTML = `⚠️ Debes descartar <b style="color:#ff4757;">${porDescartar}</b> carta(s) más para poder finalizar tu turno.`;
    }
    if (btnConfirm) {
      btnConfirm.disabled = true;
      btnConfirm.classList.remove('pulse');
    }
  } else {
    if (statusText) {
      statusText.innerHTML = `✔️ <b style="color:#2ed573;">¡Límite de 5 cartas cumplido!</b> Ya puedes finalizar tu turno.`;
    }
    if (btnConfirm) {
      btnConfirm.disabled = false;
      btnConfirm.classList.add('pulse');
    }
  }

  if (grid) {
    grid.innerHTML = '';
    estadoJugador.mano.forEach((carta, idx) => {
      const cObj = (typeof carta === 'object' && carta !== null) ? carta : (bdCartas[carta] || {});
      const clsFront = obtenerClaseFrontCarta(cObj);
      const item = document.createElement('div');
      item.className = `discard-card-item ${clsFront}`;
      
      const elKey = (cObj.elemento || '').toLowerCase();
      const tipoIcono = ICONOS_ELEMENTOS[elKey] || (cObj.tipoCarta === 'magia' || cObj.tipo === 'magia' ? '🪄' : (cObj.tipoCarta === 'trampa' || cObj.tipo === 'trampa' ? '🛡️' : '⚙️'));
      const statsTexto = cObj.tipoCarta === 'monstruo' || cObj.tipo === 'monstruo' ? `⚔️${cObj.atk || 0} 🛡️${cObj.def || 0}` : `${cObj.subtipo || cObj.categoria || cObj.tipoCarta || ''}`;
      const imgSource = cObj.imagenOficial || cObj.spriteCampo || cObj.spriteEstatico || cObj.imagen || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';

      item.innerHTML = `
        <span class="discard-card-badge">${idx + 1}</span>
        <img src="${imgSource}" alt="${cObj.nombre || ''}" class="discard-card-img" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'">
        <span class="discard-card-name" title="${cObj.nombre || ''}">${tipoIcono} ${cObj.nombre || ''}</span>
        <span class="discard-card-stats">${statsTexto}</span>
        <button class="discard-btn-action" type="button">Desechar 🪦</button>
      `;

      item.addEventListener('click', () => {
        // Descartar esta carta
        const descartadaId = estadoJugador.mano.splice(idx, 1)[0];
        estadoJugador.cementerio.push(descartadaId);

        const gySub = document.querySelector('#player-gy .slot-sub');
        if (gySub) gySub.textContent = estadoJugador.cementerio.length;

        const cDescartadaObj = (typeof descartadaId === 'object' && descartadaId !== null) ? descartadaId : (bdCartas[descartadaId] || {});
        AudioManager.reproducirSFX('card-place');
        renderizarMano(estadoJugador);
        actualizarMarcadorLateral();
        mostrarMensajeToast(`Descartaste a ${cDescartadaObj.nombre || 'carta'} al cementerio.`);

        if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline()) {
          MultiplayerManager.enviarAccion({ tipo: 'DESCARTAR_EXCESO', descartes: [descartadaId], manoCount: estadoJugador.mano.length });
          MultiplayerManager.sincronizarEstadoCampo();
        }

        renderizarModalDescarte(onCompletado);
      });

      grid.appendChild(item);
    });
  }

  if (btnConfirm) {
    btnConfirm.onclick = () => {
      if (estadoJugador.mano.length <= 5) {
        if (modal) modal.classList.add('hidden');
        if (onCompletado) onCompletado();
      }
    };
  }
}

// ==========================================
// 15. FIN DEL DUELO (VICTORIA / DERROTA)
// ==========================================
function comprobarFinDelDuelo() {
  if (estadoOponente.lp <= 0) {
    mostrarFinDelDuelo(true);
  } else if (estadoJugador.lp <= 0) {
    mostrarFinDelDuelo(false);
  }
}

function mostrarFinDelDuelo(esVictoria) {
  const modal = document.getElementById('game-over-modal');
  const icon = document.getElementById('game-over-icon');
  const title = document.getElementById('game-over-title');
  const desc = document.getElementById('game-over-desc');

  if (!modal) return;

  if (esVictoria) {
    icon.textContent = "🏆";
    title.textContent = "¡VICTORIA TOTAL!";
    title.style.color = "#feca57";
    desc.textContent = "¡Has derrotado a Blue y te coronas Campeón del Estadio de Poké-Oh!";
    sumarPuntosDuelo(5000, "¡BONUS DE VICTORIA FINAL!");
  } else {
    icon.textContent = "💀";
    title.textContent = "¡DERROTA!";
    title.style.color = "#ff4757";
    desc.textContent = "Tus Puntos de Vida han llegado a 0. ¡Mejora tu estrategia e inténtalo de nuevo!";
  }

  // Guardar resultado y estadísticas en la cuenta de usuario activa
  if (typeof UserManager !== 'undefined') {
    UserManager.registrarResultadoDuelo(esVictoria, marcadorDuelo.puntos);
  }

  // Reproducir banda sonora de final de batalla (Victory Theme de Pokémon Esmeralda) en bucle
  AudioManager.reproducirMusicaTema('victoria');

  modal.classList.remove('hidden');

  const btnRestart = document.getElementById('btn-restart-duel');
  if (btnRestart) {
    btnRestart.onclick = () => {
      modal.classList.add('hidden');
      reiniciarDuelo();
      iniciarPartida();
      AudioManager.reproducirSFX('hit-super');
    };
  }

  const btnMenu = document.getElementById('btn-game-over-menu');
  if (btnMenu) {
    btnMenu.onclick = () => {
      modal.classList.add('hidden');
      reiniciarDuelo();
      const menuOverlay = document.getElementById('main-menu-overlay');
      if (menuOverlay) menuOverlay.classList.remove('hidden');
      AudioManager.reproducirMusicaTema('menu');
      AudioManager.reproducirSFX('enter');
    };
  }
}

function reiniciarDuelo() {
  restaurarStatsBase(); // Garantiza que ninguna mejora de equipo persista entre partidas

  const lpConfig = configuracionJuego.lpInicial || 8000;
  estadoJugador.lp = lpConfig;
  estadoJugador.mano = [];
  estadoJugador.zonaMonstruos = [null, null, null, null, null];
  estadoJugador.zonaMagiasTrampas = [null, null, null, null, null];
  estadoJugador.cementerio = [];
  estadoJugador.mazo = generarMazoSegunDificultad(configuracionJuego.dificultadIA, true);

  // El Rival Blue comienza SIN cartas en el campo y construye su mazo según dificultad y el mazo de Red
  estadoOponente.lp = lpConfig;
  estadoOponente.mano = [];
  estadoOponente.zonaMonstruos = [null, null, null, null, null];
  estadoOponente.zonaMagiasTrampas = [null, null, null, null, null];
  estadoOponente.cementerio = [];
  estadoOponente.mazo = generarMazoSegunDificultad(configuracionJuego.dificultadIA, false, estadoJugador.mazo);

  estadoJuego.turno = 1;
  estadoJuego.turnoDe = 'jugador';
  estadoJuego.faseActual = 'PRINCIPAL';
  estadoJuego.atacanteSeleccionado = null;
  estadoJuego.haInvocadoMonstruoEsteTurno = false;

  marcadorDuelo.puntos = 0;
  marcadorDuelo.sacrificios = 0;
  marcadorDuelo.invocaciones = 0;
  marcadorDuelo.destruidos = 0;
  marcadorDuelo.danoTotal = 0;

  document.getElementById('player-lp-val').textContent = lpConfig;
  document.getElementById('opponent-lp-val').textContent = lpConfig;

  const gySub = document.querySelector('#player-gy .slot-sub');
  if (gySub) gySub.textContent = 0;

  const slotsMT = document.querySelectorAll('#player-side .spells-row .spell-trap-slot');
  slotsMT.forEach((s, i) => {
    s.classList.remove('occupied');
    s.innerHTML = `<span class="slot-badge">M / T</span><span class="slot-num">${i + 1}</span>`;
  });

  const slotsMTRival = document.querySelectorAll('#opponent-side .spells-row .spell-trap-slot');
  slotsMTRival.forEach((s, i) => {
    s.classList.remove('occupied');
    s.innerHTML = `<span class="slot-badge">M / T</span><span class="slot-num">${i + 1}</span>`;
  });

  barajarMazo(estadoJugador.mazo);
  barajarMazo(estadoOponente.mazo);
  robarCartas(estadoJugador, 5);
  robarCartas(estadoOponente, 5);

  actualizarUIFases();
  renderizarCampoJugador();
  renderizarCampoOponente();
  renderizarMano(estadoJugador);
  renderizarManoOponente();
  actualizarMarcadorLateral(configuracionJuego.idioma === 'en' ? "Duel Reset!" : "¡Duelo reiniciado!", 0);

  const inspector = document.getElementById('card-inspector');
  if (inspector) inspector.classList.add('hidden');

  const isEn = configuracionJuego.idioma === 'en';
  mostrarMensajeToast(isEn
    ? "Duel Reset! Turn 1: Main Phase (1 normal summon/turn; Red attacks from Turn 2)."
    : "¡Duelo reiniciado! Turno 1: Fase Principal (1 invocación por turno, Blue puede atacar ya; Red ataca en Turno 2).");
}

// ==========================================
// 16. MENÚ PRINCIPAL Y MODALES DE SISTEMA
// ==========================================
function inicializarMenuPrincipal() {
  const overlay = document.getElementById('main-menu-overlay');
  const btnPve = document.getElementById('btn-menu-pve');
  const btnPvp = document.getElementById('btn-menu-pvp');
  const btnShop = document.getElementById('btn-menu-shop');
  const btnSettings = document.getElementById('btn-menu-settings');

  const btnOpenSettings = document.getElementById('btn-open-settings');
  const btnReturnMenu = document.getElementById('btn-return-menu');

  const preGameModal = document.getElementById('pre-game-modal');
  const settingsModal = document.getElementById('settings-modal');
  const noticeModal = document.getElementById('notice-modal');

  // Modo Jugador vs IA: Abre modal de configuración previa
  if (btnPve) {
    btnPve.onclick = () => {
      if (typeof UserManager !== 'undefined' && !UserManager.currentUser) {
        UserManager.exigirAutenticacion("Debes iniciar sesión o registrar tu cuenta para jugar contra la IA.");
        return;
      }
      if (preGameModal) preGameModal.classList.remove('hidden');
      AudioManager.reproducirSFX('enter');
    };
  }

  // Modos Próximamente (Online / Tienda)
  const abrirNotice = (tituloEs, tituloEn, descEs, descEn, icono) => {
    if (!noticeModal) return;
    const isEn = configuracionJuego.idioma === 'en';
    const iconEl = document.getElementById('notice-icon');
    const titleEl = document.getElementById('notice-title');
    const descEl = document.getElementById('notice-desc');
    if (iconEl) iconEl.textContent = icono;
    if (titleEl) titleEl.textContent = isEn ? tituloEn : tituloEs;
    if (descEl) descEl.textContent = isEn ? descEn : descEs;
    noticeModal.classList.remove('hidden');
    AudioManager.reproducirSFX('enter');
  };

  if (btnPvp) {
    btnPvp.onclick = () => {
      if (typeof UserManager !== 'undefined' && !UserManager.currentUser) {
        UserManager.exigirAutenticacion("Debes iniciar sesión o registrar tu cuenta para jugar en línea.");
        return;
      }
      if (typeof MultiplayerManager !== 'undefined') {
        MultiplayerManager.abrirModalOnline();
      }
      AudioManager.reproducirSFX('enter');
    };
  }

  if (btnShop) {
    btnShop.onclick = () => abrirNotice(
      "Tienda de Cartas", "Card Shop",
      "La tienda de sobres de refuerzo y accesorios estará disponible próximamente.",
      "Booster packs and cosmetic store will be available soon.",
      "🛒"
    );
  }

  const btnCloseNotice = document.getElementById('btn-close-notice');
  if (btnCloseNotice) {
    btnCloseNotice.onclick = () => {
      if (noticeModal) noticeModal.classList.add('hidden');
    };
  }

  // Botón Ajustes desde el menú principal
  if (btnSettings) {
    btnSettings.onclick = () => {
      if (settingsModal) settingsModal.classList.remove('hidden');
      AudioManager.reproducirSFX('enter');
    };
  }

  // Botón Deck Builder desde el menú principal y barra lateral
  const btnMenuDeck = document.getElementById('btn-menu-deck');
  if (btnMenuDeck) {
    btnMenuDeck.onclick = () => {
      if (typeof UserManager !== 'undefined' && !UserManager.currentUser) {
        UserManager.exigirAutenticacion("Debes iniciar sesión o registrar tu cuenta para personalizar barajas.");
        return;
      }
      abrirDeckBuilder();
    };
  }
  const btnOpenDeckSidebar = document.getElementById('btn-open-deck-builder');
  if (btnOpenDeckSidebar) {
    btnOpenDeckSidebar.onclick = () => {
      if (typeof UserManager !== 'undefined' && !UserManager.currentUser) {
        UserManager.exigirAutenticacion("Debes iniciar sesión o registrar tu cuenta para personalizar barajas.");
        return;
      }
      abrirDeckBuilder();
    };
  }

  // Botón Reglas / Guía desde el menú principal y barra lateral
  const btnMenuRules = document.getElementById('btn-menu-rules');
  if (btnMenuRules) {
    btnMenuRules.onclick = () => abrirModalReglas();
  }
  const btnOpenRulesSidebar = document.getElementById('btn-open-rules');
  if (btnOpenRulesSidebar) {
    btnOpenRulesSidebar.onclick = () => abrirModalReglas();
  }

  // Acceso a Ajustes desde la barra lateral en todo momento
  if (btnOpenSettings) {
    btnOpenSettings.onclick = () => {
      if (settingsModal) settingsModal.classList.remove('hidden');
      AudioManager.reproducirSFX('enter');
    };
  }

  // Regresar al Menú Principal en todo momento
  if (btnReturnMenu) {
    btnReturnMenu.onclick = () => {
      if (overlay) overlay.classList.remove('hidden');
      AudioManager.reproducirMusicaTema('menu');
      AudioManager.reproducirSFX('enter');
    };
  }
}

function inicializarModalPrePartida() {
  const modal = document.getElementById('pre-game-modal');
  const sliderLp = document.getElementById('slider-setup-lp');
  const displayLp = document.getElementById('setup-lp-display');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const diffCards = document.querySelectorAll('.diff-card');
  const diffTag = document.getElementById('setup-diff-tag');
  const btnStart = document.getElementById('btn-start-duel');
  const btnCancel = document.getElementById('btn-cancel-pre-game');
  const btnCloseX = document.getElementById('btn-close-pre-game-x');
  const menuOverlay = document.getElementById('main-menu-overlay');

  if (!modal) return;

  const actualizarLp = (val) => {
    configuracionJuego.lpInicial = val;
    configuracionJuego.lpMax = val;
    if (displayLp) displayLp.textContent = `${val} LP`;
    if (sliderLp) sliderLp.value = val;

    presetBtns.forEach(btn => {
      const pVal = parseInt(btn.getAttribute('data-lp'));
      btn.classList.toggle('active', pVal === val);
    });
  };

  if (sliderLp) {
    sliderLp.addEventListener('input', (e) => {
      actualizarLp(parseInt(e.target.value));
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pVal = parseInt(btn.getAttribute('data-lp'));
      actualizarLp(pVal);
      AudioManager.reproducirSFX('enter');
    });
  });

  diffCards.forEach(card => {
    card.addEventListener('click', () => {
      diffCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const diff = card.getAttribute('data-diff');
      configuracionJuego.dificultadIA = diff;

      const isEn = configuracionJuego.idioma === 'en';
      if (diffTag) {
        diffTag.className = `setup-diff-tag diff-tag-${diff === 'facil' ? 'easy' : (diff === 'dificil' ? 'hard' : 'medium')}`;
        if (diff === 'facil') diffTag.textContent = isEn ? "Easy" : "Fácil";
        else if (diff === 'dificil') diffTag.textContent = isEn ? "Hard" : "Difícil";
        else diffTag.textContent = isEn ? "Medium" : "Medio";
      }

      AudioManager.reproducirSFX('enter');
    });
  });

  const btnEditDeck = document.getElementById('btn-edit-deck-from-setup');
  if (btnEditDeck) {
    btnEditDeck.onclick = () => {
      abrirDeckBuilder(configuracionJuego.mazoSeleccionadoIdx || 0);
    };
  }

  const cerrarPreGame = () => {
    modal.classList.add('hidden');
  };

  if (btnCancel) btnCancel.onclick = cerrarPreGame;
  if (btnCloseX) btnCloseX.onclick = cerrarPreGame;

  if (btnStart) {
    btnStart.onclick = () => {
      if (typeof UserManager !== 'undefined' && !UserManager.currentUser) {
        UserManager.exigirAutenticacion("Debes iniciar sesión o registrar tu cuenta para comenzar la partida.");
        return;
      }

      const idxMazo = configuracionJuego.mazoSeleccionadoIdx || 0;
      const mazoElegido = mazosJugador[idxMazo];
      if (!mazoElegido || !mazoElegido.cartas || mazoElegido.cartas.length !== 40) {
        const cant = mazoElegido && mazoElegido.cartas ? mazoElegido.cartas.length : 0;
        const msg = configuracionJuego.idioma === 'en'
          ? `The selected deck must have exactly 40 cards to duel (currently ${cant}/40). Please customize it in the Deck Builder.`
          : `El mazo seleccionado debe tener exactamente 40 cartas para jugar (actualmente tiene ${cant}/40). Compleméntalo en el Constructor de Barajas.`;
        mostrarMensajeToast(msg);
        abrirDeckBuilder(idxMazo);
        return;
      }

      modal.classList.add('hidden');
      if (menuOverlay) menuOverlay.classList.add('hidden');
      iniciarDuelo();
      AudioManager.reproducirSFX('hit-super');
    };
  }
}

function inicializarModalAjustes() {
  const modal = document.getElementById('settings-modal');
  const btnLangEs = document.getElementById('btn-lang-es');
  const btnLangEn = document.getElementById('btn-lang-en');

  const sliderMaster = document.getElementById('slider-vol-master');
  const valMaster = document.getElementById('val-vol-master');

  const chkMusic = document.getElementById('chk-music-active');
  const sliderMusic = document.getElementById('slider-vol-music');
  const valMusic = document.getElementById('val-vol-music');

  const chkSfx = document.getElementById('chk-sfx-active');
  const sliderSfx = document.getElementById('slider-vol-sfx');
  const valSfx = document.getElementById('val-vol-sfx');

  const btnMuteAll = document.getElementById('btn-mute-all');
  const btnSave = document.getElementById('btn-save-settings');
  const btnCloseX = document.getElementById('btn-close-settings-x');

  if (btnLangEs) {
    btnLangEs.onclick = () => {
      aplicarIdioma('es');
      AudioManager.reproducirSFX('enter');
    };
  }

  if (btnLangEn) {
    btnLangEn.onclick = () => {
      aplicarIdioma('en');
      AudioManager.reproducirSFX('enter');
    };
  }

  if (sliderMaster) {
    sliderMaster.addEventListener('input', (e) => {
      const v = parseInt(e.target.value);
      configuracionJuego.volumenMaster = v / 100;
      AudioManager.volumenMaster = v / 100;
      AudioManager.actualizarVolumenMusica();
      if (valMaster) valMaster.textContent = `${v}%`;
    });
  }

  if (chkMusic) {
    chkMusic.addEventListener('change', (e) => {
      AudioManager.musicaHabilitada = e.target.checked;
      if (AudioManager.musicaHabilitada && !AudioManager.silenciadoTotal) {
        const isMenuVisible = document.getElementById('main-menu-overlay') && !document.getElementById('main-menu-overlay').classList.contains('hidden');
        const tema = AudioManager.temaActual || (isMenuVisible ? 'menu' : 'batalla');
        AudioManager.reproducirMusicaTema(tema);
      } else {
        AudioManager.detenerMusica();
      }
      AudioManager.actualizarBotonesUI();
    });
  }

  if (sliderMusic) {
    sliderMusic.addEventListener('input', (e) => {
      const v = parseInt(e.target.value);
      configuracionJuego.volumenMusica = v / 100;
      AudioManager.volumenMusica = v / 100;
      AudioManager.actualizarVolumenMusica();
      if (valMusic) valMusic.textContent = `${v}%`;
    });
  }

  if (chkSfx) {
    chkSfx.addEventListener('change', (e) => {
      AudioManager.sfxHabilitado = e.target.checked;
      AudioManager.actualizarBotonesUI();
    });
  }

  if (sliderSfx) {
    sliderSfx.addEventListener('input', (e) => {
      const v = parseInt(e.target.value);
      configuracionJuego.volumenSFX = v / 100;
      AudioManager.volumenSFX = v / 100;
      if (valSfx) valSfx.textContent = `${v}%`;
    });
  }

  if (btnMuteAll) {
    btnMuteAll.onclick = () => {
      AudioManager.silenciadoTotal = !AudioManager.silenciadoTotal;
      const isEn = configuracionJuego.idioma === 'en';
      if (AudioManager.silenciadoTotal) {
        btnMuteAll.textContent = isEn ? "🔊 Unmute All" : "🔊 Reactivar Sonido";
        btnMuteAll.classList.add('muted');
        AudioManager.detenerMusica();
      } else {
        btnMuteAll.textContent = isEn ? "🔇 Mute All" : "🔇 Silenciar Todo";
        btnMuteAll.classList.remove('muted');
        if (AudioManager.musicaHabilitada) {
          const isMenuVisible = document.getElementById('main-menu-overlay') && !document.getElementById('main-menu-overlay').classList.contains('hidden');
          const tema = AudioManager.temaActual || (isMenuVisible ? 'menu' : 'batalla');
          AudioManager.reproducirMusicaTema(tema);
        }
      }
      AudioManager.actualizarBotonesUI();
    };
  }

  const cerrarSettings = () => {
    if (modal) modal.classList.add('hidden');
  };

  if (btnSave) btnSave.onclick = cerrarSettings;
  if (btnCloseX) btnCloseX.onclick = cerrarSettings;
}

// ==========================================
// 17. CONFIGURACIÓN INICIAL DEL DUELO
// ==========================================
function configurarZonasMonstruo() {
  const slotsMonstruos = document.querySelectorAll('#player-side .monsters-row .monster-slot');

  slotsMonstruos.forEach((slot, index) => {
    slot.setAttribute('data-slot-index', index);
    slot.addEventListener('dragover', manejarDragOver);
    slot.addEventListener('dragenter', manejarDragEnter);
    slot.addEventListener('dragleave', manejarDragLeave);
    slot.addEventListener('drop', manejarDropMonstruo);
  });
}

function configurarZonasMagiaTrampa() {
  const slotsMT = document.querySelectorAll('#player-side .spells-row .spell-trap-slot');

  slotsMT.forEach((slot, index) => {
    slot.setAttribute('data-slot-index', index);
    slot.addEventListener('dragover', manejarDragOver);
    slot.addEventListener('dragenter', manejarDragEnter);
    slot.addEventListener('dragleave', manejarDragLeave);
    slot.addEventListener('drop', manejarDropMagiaTrampa);
  });
}

function configurarBotonesAudio() {
  const btnBgm = document.getElementById('btn-toggle-bgm');
  if (btnBgm) {
    btnBgm.addEventListener('click', () => AudioManager.toggleMusica());
  }

  const btnSfx = document.getElementById('btn-toggle-sfx');
  if (btnSfx) {
    btnSfx.addEventListener('click', () => AudioManager.toggleSFX());
  }
}

function iniciarDuelo() {
  if (typeof UserManager !== 'undefined' && !UserManager.currentUser) {
    UserManager.exigirAutenticacion("Debes iniciar sesión o registrar tu cuenta para comenzar la partida.");
    return;
  }

  console.log("¡Duelo de Poké-Oh iniciado con éxito (151 Pokémon + Ítems multigeneración)!");

  // Restaurar stats base por seguridad
  restaurarStatsBase();

  const lpConfig = configuracionJuego.lpInicial || 8000;
  estadoJugador.lp = lpConfig;
  estadoOponente.lp = lpConfig;

  // Generar mazos según la dificultad configurada y mazo de Red
  estadoJugador.mazo = generarMazoSegunDificultad(configuracionJuego.dificultadIA, true);
  estadoOponente.mazo = generarMazoSegunDificultad(configuracionJuego.dificultadIA, false, estadoJugador.mazo);

  estadoJugador.mano = [];
  estadoJugador.zonaMonstruos = [null, null, null, null, null];
  estadoJugador.zonaMagiasTrampas = [null, null, null, null, null];
  estadoJugador.cementerio = [];

  estadoOponente.mano = [];
  estadoOponente.zonaMonstruos = [null, null, null, null, null];
  estadoOponente.zonaMagiasTrampas = [null, null, null, null, null];
  estadoOponente.cementerio = [];

  estadoJuego.turno = 1;
  estadoJuego.turnoDe = 'jugador';
  estadoJuego.faseActual = 'PRINCIPAL';
  estadoJuego.atacanteSeleccionado = null;
  estadoJuego.haInvocadoMonstruoEsteTurno = false;

  marcadorDuelo.puntos = 0;
  marcadorDuelo.sacrificios = 0;
  marcadorDuelo.invocaciones = 0;
  marcadorDuelo.destruidos = 0;
  marcadorDuelo.danoTotal = 0;

  document.getElementById('player-lp-val').textContent = lpConfig;
  document.getElementById('opponent-lp-val').textContent = lpConfig;

  // Barajar mazos y repartir 5 cartas iniciales a cada jugador
  barajarMazo(estadoJugador.mazo);
  barajarMazo(estadoOponente.mazo);
  robarCartas(estadoJugador, 5);
  robarCartas(estadoOponente, 5);

  renderizarCampoOponente();
  renderizarManoOponente();
  renderizarMano(estadoJugador);
  actualizarUIFases();
  actualizarMarcadorLateral(configuracionJuego.idioma === 'en' ? "Duel Started!" : "¡Comienza la partida!", 0);

  const inspector = document.getElementById('card-inspector');
  if (inspector) inspector.classList.add('hidden');

  if (AudioManager.musicaHabilitada && !AudioManager.silenciadoTotal) {
    AudioManager.iniciarMusicaBatalla();
  }

  const isEn = configuracionJuego.idioma === 'en';
  mostrarMensajeToast(isEn
    ? `Duel started! Turn 1: Main Phase (${lpConfig} LP, Difficulty: ${configuracionJuego.dificultadIA.toUpperCase()}). Red attacks from Turn 2.`
    : `¡Duelo iniciado! Turno 1: Fase Principal (${lpConfig} LP, Dificultad: ${configuracionJuego.dificultadIA.toUpperCase()}). Red ataca desde Turno 2.`);
}

// ==========================================
// 18. UTILIDAD DE ESCAPADO Y CONSTRUCTOR DE BARAJAS (DECK BUILDER)
// ==========================================
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

let mazoActivoBuilderIdx = 0;
let filtroColeccionCat = 'todos';
let filtroColeccionElem = 'todos';
let busquedaColeccion = '';

function inicializarDeckBuilder() {
  const modal = document.getElementById('deck-builder-modal');
  const btnCloseX = document.getElementById('btn-close-deck-builder-x');
  const btnClose = document.getElementById('btn-close-deck-builder');

  const btnRename = document.getElementById('btn-rename-deck');
  const inputName = document.getElementById('deck-name-input');
  const btnSave = document.getElementById('btn-save-current-deck');
  const btnAutofill = document.getElementById('btn-autofill-deck');
  const btnClear = document.getElementById('btn-clear-deck');

  const searchInput = document.getElementById('collection-search-input');
  const filterCat = document.getElementById('filter-collection-category');
  const filterElem = document.getElementById('filter-collection-element');

  if (btnCloseX) btnCloseX.onclick = cerrarDeckBuilder;
  if (btnClose) btnClose.onclick = cerrarDeckBuilder;

  if (btnRename && inputName) {
    btnRename.onclick = () => {
      const nuevoNombre = inputName.value.trim();
      if (nuevoNombre) {
        mazosJugador[mazoActivoBuilderIdx].nombre = nuevoNombre;
        guardarMazos(mazosJugador);
        renderizarPestanasDeckBuilder();
        renderizarSelectorMazosPrePartida();
        mostrarMensajeToast(configuracionJuego.idioma === 'en' ? "Deck renamed!" : "¡Nombre de baraja actualizado!");
      }
    };
    inputName.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        btnRename.click();
      }
    });
  }

  if (btnSave) {
    btnSave.onclick = () => guardarMazoActual();
  }

  if (btnAutofill) {
    btnAutofill.onclick = () => autocompletarMazoActual();
  }

  if (btnClear) {
    btnClear.onclick = () => vaciarMazoActual();
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      busquedaColeccion = e.target.value.toLowerCase().trim();
      renderizarColeccionDeckBuilder();
    });
  }

  if (filterCat) {
    filterCat.addEventListener('change', (e) => {
      filtroColeccionCat = e.target.value;
      renderizarColeccionDeckBuilder();
    });
  }

  if (filterElem) {
    filterElem.addEventListener('change', (e) => {
      filtroColeccionElem = e.target.value;
      renderizarColeccionDeckBuilder();
    });
  }
}

function abrirDeckBuilder(tabIdx = null) {
  const modal = document.getElementById('deck-builder-modal');
  if (!modal) return;

  if (typeof tabIdx === 'number' && tabIdx >= 0 && tabIdx < mazosJugador.length) {
    mazoActivoBuilderIdx = tabIdx;
  }

  renderizarPestanasDeckBuilder();
  renderizarMazoActualDeckBuilder();
  renderizarColeccionDeckBuilder();

  modal.classList.remove('hidden');
  AudioManager.reproducirSFX('enter');
}

function cerrarDeckBuilder() {
  const modal = document.getElementById('deck-builder-modal');
  if (modal) modal.classList.add('hidden');
  guardarMazos(mazosJugador);
  renderizarSelectorMazosPrePartida();
}

function renderizarPestanasDeckBuilder() {
  const container = document.getElementById('deck-builder-tabs');
  if (!container) return;

  container.innerHTML = '';
  mazosJugador.forEach((m, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `deck-tab-btn ${idx === mazoActivoBuilderIdx ? 'active' : ''}`;
    const isValid = m.cartas && m.cartas.length === 40;
    btn.innerHTML = `
      <span class="tab-deck-num">#${idx + 1}</span>
      <span class="tab-deck-name">${escapeHtml(m.nombre || `Mazo ${idx + 1}`)}</span>
      <span class="tab-deck-pill ${isValid ? 'pill-valid' : 'pill-invalid'}">${m.cartas ? m.cartas.length : 0}/40</span>
    `;
    btn.onclick = () => {
      // Guardar nombre actual si fue modificado
      const inputName = document.getElementById('deck-name-input');
      if (inputName && inputName.value.trim()) {
        mazosJugador[mazoActivoBuilderIdx].nombre = inputName.value.trim();
        guardarMazos(mazosJugador);
      }
      mazoActivoBuilderIdx = idx;
      renderizarPestanasDeckBuilder();
      renderizarMazoActualDeckBuilder();
      renderizarColeccionDeckBuilder();
      AudioManager.reproducirSFX('enter');
    };
    container.appendChild(btn);
  });
}

function renderizarMazoActualDeckBuilder() {
  const mazoActual = mazosJugador[mazoActivoBuilderIdx];
  if (!mazoActual) return;
  if (!Array.isArray(mazoActual.cartas)) mazoActual.cartas = [];

  const inputName = document.getElementById('deck-name-input');
  if (inputName) inputName.value = mazoActual.nombre || `Mazo ${mazoActivoBuilderIdx + 1}`;

  const countEl = document.getElementById('deck-cards-count');
  const badgeEl = document.getElementById('deck-counter-badge');
  const totalCartas = mazoActual.cartas.length;

  if (countEl) countEl.textContent = totalCartas;
  if (badgeEl) {
    badgeEl.classList.toggle('valid', totalCartas === 40);
    badgeEl.classList.toggle('warning', totalCartas !== 40);
  }

  // Desglose de tipos
  let mCount = 0;
  let sCount = 0;
  let tCount = 0;
  mazoActual.cartas.forEach(id => {
    const c = bdCartas[id];
    if (c) {
      if (c.tipoCarta === 'monstruo') mCount++;
      else if (c.tipoCarta === 'magia') sCount++;
      else if (c.tipoCarta === 'trampa') tCount++;
    }
  });

  const isEn = configuracionJuego.idioma === 'en';
  const breakdownEl = document.getElementById('deck-breakdown-text');
  if (breakdownEl) {
    breakdownEl.textContent = isEn
      ? `${mCount} Monsters • ${sCount} Spells • ${tCount} Traps`
      : `${mCount} Monstruos • ${sCount} Magias • ${tCount} Trampas`;
  }

  // Agrupar cartas por ID
  const conteo = {};
  mazoActual.cartas.forEach(id => {
    conteo[id] = (conteo[id] || 0) + 1;
  });

  const listEl = document.getElementById('deck-current-list');
  if (!listEl) return;
  listEl.innerHTML = '';

  const idsUnicos = Object.keys(conteo).map(k => parseInt(k));
  if (idsUnicos.length === 0) {
    listEl.innerHTML = `
      <div class="deck-empty-placeholder">
        <p>🎴 ${isEn ? "The deck is empty." : "La baraja está vacía."}</p>
        <small>${isEn ? "Click on cards from the collection on the right to add them (max 40 cards, max 3 copies each)." : "Haz clic en cartas de la colección a la derecha para agregarlas (máx. 40 cartas, máx. 3 copias de cada una)."}</small>
      </div>
    `;
    return;
  }

  // Ordenar: Monstruos (por ataque descendente), luego Magias, luego Trampas
  idsUnicos.sort((a, b) => {
    const ca = bdCartas[a];
    const cb = bdCartas[b];
    if (!ca || !cb) return 0;
    const ordenTipo = { 'monstruo': 1, 'magia': 2, 'trampa': 3 };
    if (ordenTipo[ca.tipoCarta] !== ordenTipo[cb.tipoCarta]) {
      return ordenTipo[ca.tipoCarta] - ordenTipo[cb.tipoCarta];
    }
    if (ca.tipoCarta === 'monstruo' && cb.tipoCarta === 'monstruo') {
      return cb.atk - ca.atk;
    }
    return ca.id - cb.id;
  });

  idsUnicos.forEach(id => {
    const c = bdCartas[id];
    if (!c) return;

    const row = document.createElement('div');
    const infoElem = c.tipoCarta === 'monstruo' ? (obtenerInfoTipo(c.elemento) || { icono: '⚪' }) : null;
    const elemCls = obtenerClaseFrontCarta(c);

    const fallbackSrc = c.spriteEstatico || c.imagenOficial || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    const artSrc = c.imagenOficial || c.spriteCampo || c.spriteEstatico || fallbackSrc;

    row.className = `deck-visual-card card-tipo-${c.tipoCarta} ${elemCls}`;
    row.setAttribute('data-id', c.id);

    row.innerHTML = `
      <div class="card-visual-header">
        <span class="card-visual-name">${escapeHtml(c.nombre)}</span>
        <span class="card-visual-type-icon">${infoElem ? infoElem.icono : (c.tipoCarta === 'magia' ? '🪄' : '🪤')}</span>
      </div>
      ${c.sacrificios > 0 ? `<div class="card-visual-tribute">⭐${c.sacrificios}</div>` : ''}
      <div class="card-visual-art-wrap">
        <img class="card-visual-art" src="${artSrc}" alt="${escapeHtml(c.nombre)}" onerror="this.onerror=null; this.src='${fallbackSrc}';" draggable="false">
      </div>
      <div class="card-visual-footer">
        ${c.tipoCarta === 'monstruo'
          ? `<span class="card-stat-atk">⚔️${c.atk}</span><span class="card-stat-def">🛡️${c.def}</span>`
          : `<span class="card-stat-spell">${c.tipoCarta === 'magia' ? (isEn ? 'SPELL' : 'MAGIA') : (isEn ? 'TRAP' : 'TRAMPA')}</span>`
        }
      </div>
      <div class="card-visual-controls">
        <button type="button" class="btn-deck-qty btn-minus" data-id="${c.id}" title="${isEn ? "Remove 1" : "Quitar 1"}">-</button>
        <span class="deck-qty-label">x${conteo[id]}</span>
        <button type="button" class="btn-deck-qty btn-plus" data-id="${c.id}" ${conteo[id] >= 3 || totalCartas >= 40 ? 'disabled' : ''} title="${isEn ? "Add 1" : "Agregar 1"}">+</button>
      </div>
    `;

    const btnMinus = row.querySelector('.btn-minus');
    const btnPlus = row.querySelector('.btn-plus');

    btnMinus.onclick = (e) => {
      e.stopPropagation();
      removerCartaDeMazo(id);
    };
    btnPlus.onclick = (e) => {
      e.stopPropagation();
      agregarCartaAMazo(id);
    };

    configurarInspectorHover(row, c, false, false);

    listEl.appendChild(row);
  });
}

function renderizarColeccionDeckBuilder() {
  const grid = document.getElementById('deck-collection-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const mazoActual = mazosJugador[mazoActivoBuilderIdx];
  const totalCartas = mazoActual ? mazoActual.cartas.length : 0;
  const isEn = configuracionJuego.idioma === 'en';

  let todas = Object.values(bdCartas);

  // Filtro por Categoría
  if (filtroColeccionCat === 'basico') {
    todas = todas.filter(c => c.tipoCarta === 'monstruo' && c.etapa === 'Básico');
  } else if (filtroColeccionCat === 'fase1') {
    todas = todas.filter(c => c.tipoCarta === 'monstruo' && (c.etapa === 'Fase 1' || c.sacrificios === 1));
  } else if (filtroColeccionCat === 'fase2') {
    todas = todas.filter(c => c.tipoCarta === 'monstruo' && (c.etapa === 'Fase 2' || c.sacrificios >= 2 || c.esLegendario));
  } else if (filtroColeccionCat === 'magia') {
    todas = todas.filter(c => c.tipoCarta === 'magia');
  } else if (filtroColeccionCat === 'trampa') {
    todas = todas.filter(c => c.tipoCarta === 'trampa');
  }

  // Filtro por Elemento
  if (filtroColeccionElem !== 'todos') {
    todas = todas.filter(c => c.tipoCarta === 'monstruo' && c.elemento === filtroColeccionElem);
  }

  // Filtro por Búsqueda
  if (busquedaColeccion) {
    todas = todas.filter(c => {
      const matchNom = c.nombre.toLowerCase().includes(busquedaColeccion);
      const matchElem = c.elemento && c.elemento.toLowerCase().includes(busquedaColeccion);
      const matchAtk = c.atk && c.atk.toString().includes(busquedaColeccion);
      return matchNom || matchElem || matchAtk;
    });
  }

  if (todas.length === 0) {
    grid.innerHTML = `
      <div class="deck-empty-placeholder" style="grid-column: 1 / -1;">
        <p>🔍 ${isEn ? "No cards found with the current filters." : "No se encontraron cartas con los filtros actuales."}</p>
      </div>
    `;
    return;
  }

  todas.forEach(c => {
    const copiasEnMazo = mazoActual.cartas.filter(id => id === c.id).length;
    const infoElem = c.tipoCarta === 'monstruo' ? (obtenerInfoTipo(c.elemento) || { icono: '⚪' }) : null;
    const elemCls = obtenerClaseFrontCarta(c);

    const fallbackSrc = c.spriteEstatico || c.imagenOficial || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
    const artSrc = c.imagenOficial || c.spriteCampo || c.spriteEstatico || fallbackSrc;

    const cardEl = document.createElement('div');
    cardEl.className = `deck-visual-card card-tipo-${c.tipoCarta} ${elemCls} ${copiasEnMazo >= 3 ? 'card-maxed' : ''}`;
    cardEl.setAttribute('data-id', c.id);

    cardEl.innerHTML = `
      <div class="card-visual-header">
        <span class="card-visual-name">${escapeHtml(c.nombre)}</span>
        <span class="card-visual-type-icon">${infoElem ? infoElem.icono : (c.tipoCarta === 'magia' ? '🪄' : '🪤')}</span>
      </div>
      ${c.sacrificios > 0 ? `<div class="card-visual-tribute">⭐${c.sacrificios}</div>` : ''}
      <div class="card-visual-art-wrap">
        <img class="card-visual-art" src="${artSrc}" alt="${escapeHtml(c.nombre)}" onerror="this.onerror=null; this.src='${fallbackSrc}';" draggable="false">
        <span class="collection-copy-pill ${copiasEnMazo >= 3 ? 'pill-full' : ''}">x${copiasEnMazo}/3</span>
      </div>
      <div class="card-visual-footer">
        ${c.tipoCarta === 'monstruo'
          ? `<span class="card-stat-atk">⚔️${c.atk}</span><span class="card-stat-def">🛡️${c.def}</span>`
          : `<span class="card-stat-spell">${c.tipoCarta === 'magia' ? (isEn ? 'SPELL' : 'MAGIA') : (isEn ? 'TRAP' : 'TRAMPA')}</span>`
        }
      </div>
      <button type="button" class="btn-visual-add ${copiasEnMazo >= 3 ? 'btn-maxed' : ''}" data-id="${c.id}" ${copiasEnMazo >= 3 || totalCartas >= 40 ? 'disabled' : ''}>
        ${copiasEnMazo >= 3 ? (isEn ? 'Max 3' : 'Máx. 3') : (isEn ? '+ Add' : '+ Añadir')}
      </button>
    `;

    const btnAdd = cardEl.querySelector('.btn-visual-add');
    btnAdd.onclick = (e) => {
      e.stopPropagation();
      agregarCartaAMazo(c.id);
    };

    // Al hacer clic en la tarjeta también agrega si es posible
    cardEl.onclick = () => {
      if (copiasEnMazo < 3 && totalCartas < 40) {
        agregarCartaAMazo(c.id);
      }
    };

    configurarInspectorHover(cardEl, c, false, false);

    grid.appendChild(cardEl);
  });
}

function agregarCartaAMazo(cartaId) {
  const mazoActual = mazosJugador[mazoActivoBuilderIdx];
  if (!mazoActual) return;
  const isEn = configuracionJuego.idioma === 'en';

  if (mazoActual.cartas.length >= 40) {
    mostrarMensajeToast(isEn ? "The deck already has 40 cards (max limit)." : "El mazo ya tiene el límite de 40 cartas.");
    return;
  }

  const conteo = mazoActual.cartas.filter(id => id === cartaId).length;
  if (conteo >= 3) {
    mostrarMensajeToast(isEn ? "Limit reached: Maximum 3 copies of this card in a deck." : "Límite alcanzado: Máximo 3 copias de esta carta en el mazo.");
    return;
  }

  mazoActual.cartas.push(cartaId);
  AudioManager.reproducirSFX('enter');

  renderizarPestanasDeckBuilder();
  renderizarMazoActualDeckBuilder();
  renderizarColeccionDeckBuilder();
}

function removerCartaDeMazo(cartaId) {
  const mazoActual = mazosJugador[mazoActivoBuilderIdx];
  if (!mazoActual) return;

  const idx = mazoActual.cartas.indexOf(cartaId);
  if (idx !== -1) {
    mazoActual.cartas.splice(idx, 1);
    AudioManager.reproducirSFX('hit');
    renderizarPestanasDeckBuilder();
    renderizarMazoActualDeckBuilder();
    renderizarColeccionDeckBuilder();
  }
}

function autocompletarMazoActual() {
  const mazoActual = mazosJugador[mazoActivoBuilderIdx];
  if (!mazoActual) return;
  const isEn = configuracionJuego.idioma === 'en';

  if (mazoActual.cartas.length >= 40) {
    mostrarMensajeToast(isEn ? "The deck already has 40 cards." : "El mazo ya cuenta con 40 cartas.");
    return;
  }

  const todasLasCartas = Object.values(bdCartas);
  const basicos = todasLasCartas.filter(c => c.tipoCarta === 'monstruo' && c.sacrificios === 0 && c.etapa === 'Básico').map(c => c.id);
  const evoluciones = todasLasCartas.filter(c => c.tipoCarta === 'monstruo' && (c.sacrificios > 0 || c.etapa !== 'Básico')).map(c => c.id);
  const magiasYEquipos = todasLasCartas.filter(c => c.tipoCarta === 'magia' || c.tipoCarta === 'trampa').map(c => c.id);

  let intentos = 0;
  while (mazoActual.cartas.length < 40 && intentos < 800) {
    intentos++;
    const countBasicos = mazoActual.cartas.filter(id => {
      const c = bdCartas[id];
      return c && c.tipoCarta === 'monstruo' && c.sacrificios === 0 && c.etapa === 'Básico';
    }).length;

    const countInvocaciones = mazoActual.cartas.filter(id => {
      const c = bdCartas[id];
      return c && c.tipoCarta === 'monstruo' && (c.sacrificios > 0 || c.etapa !== 'Básico');
    }).length;

    const countMagias = mazoActual.cartas.filter(id => {
      const c = bdCartas[id];
      return c && (c.tipoCarta === 'magia' || c.tipoCarta === 'trampa');
    }).length;

    // Proporción requerida: 20 Básicos, 5 Invocaciones/Evoluciones, 15 Magias/Equipos/Trampas
    let pool = basicos;
    if (countBasicos < 20) {
      pool = basicos;
    } else if (countInvocaciones < 5) {
      pool = evoluciones;
    } else if (countMagias < 15) {
      pool = magiasYEquipos;
    } else {
      pool = basicos;
    }

    const candId = pool[Math.floor(Math.random() * pool.length)];
    const copies = mazoActual.cartas.filter(id => id === candId).length;
    if (copies < 3) {
      mazoActual.cartas.push(candId);
    }
  }

  guardarMazos(mazosJugador);
  AudioManager.reproducirSFX('hit-super');
  renderizarPestanasDeckBuilder();
  renderizarMazoActualDeckBuilder();
  renderizarColeccionDeckBuilder();
  renderizarSelectorMazosPrePartida();

  mostrarMensajeToast(isEn ? "Deck completed to 40 cards (20 Monsters, 5 Summons, 15 Spells/Traps)!" : "¡Mazo autocompletado a 40 cartas (20 Monstruos, 5 Invocaciones, 15 Hechizos/Equipos/Trampas)!");
}

function vaciarMazoActual() {
  const mazoActual = mazosJugador[mazoActivoBuilderIdx];
  if (!mazoActual) return;
  const isEn = configuracionJuego.idioma === 'en';

  mazoActual.cartas = [];
  guardarMazos(mazosJugador);
  AudioManager.reproducirSFX('hit');

  renderizarPestanasDeckBuilder();
  renderizarMazoActualDeckBuilder();
  renderizarColeccionDeckBuilder();
  renderizarSelectorMazosPrePartida();

  mostrarMensajeToast(isEn ? "Deck cleared." : "Mazo vaciado.");
}

function guardarMazoActual() {
  const mazoActual = mazosJugador[mazoActivoBuilderIdx];
  if (!mazoActual) return;
  const isEn = configuracionJuego.idioma === 'en';

  const inputName = document.getElementById('deck-name-input');
  if (inputName && inputName.value.trim()) {
    mazoActual.nombre = inputName.value.trim();
  }

  guardarMazos(mazosJugador);
  renderizarPestanasDeckBuilder();
  renderizarSelectorMazosPrePartida();

  if (mazoActual.cartas.length === 40) {
    mostrarMensajeToast(isEn ? "Deck saved successfully (40/40)!" : "¡Baraja guardada correctamente con 40 cartas!");
    AudioManager.reproducirSFX('hit-super');
  } else {
    mostrarMensajeToast(isEn
      ? `Deck saved as draft (${mazoActual.cartas.length}/40 cards). Exactly 40 cards required to duel.`
      : `Baraja guardada como borrador (${mazoActual.cartas.length}/40 cartas). Se requieren exactamente 40 para jugar.`);
    AudioManager.reproducirSFX('enter');
  }
}

function renderizarSelectorMazosPrePartida() {
  const container = document.getElementById('setup-deck-options');
  if (!container) return;
  container.innerHTML = '';

  const isEn = configuracionJuego.idioma === 'en';

  mazosJugador.forEach((m, idx) => {
    const card = document.createElement('div');
    const isSelected = (idx === (configuracionJuego.mazoSeleccionadoIdx || 0));
    const isValid = m.cartas && m.cartas.length === 40;

    card.className = `deck-select-card ${isSelected ? 'active' : ''} ${!isValid ? 'incomplete' : ''}`;
    card.setAttribute('data-deck-idx', idx);

    let mCount = 0;
    let sCount = 0;
    let tCount = 0;
    if (m.cartas) {
      m.cartas.forEach(id => {
        const c = bdCartas[id];
        if (c) {
          if (c.tipoCarta === 'monstruo') mCount++;
          else if (c.tipoCarta === 'magia') sCount++;
          else if (c.tipoCarta === 'trampa') tCount++;
        }
      });
    }

    card.innerHTML = `
      <div class="deck-select-header">
        <span class="deck-select-num">Mazo #${idx + 1}</span>
        <span class="deck-select-status ${isValid ? 'status-ok' : 'status-warn'}">
          ${isValid ? '40 / 40 ✔️' : `⚠️ ${m.cartas ? m.cartas.length : 0}/40`}
        </span>
      </div>
      <div class="deck-select-name">${escapeHtml(m.nombre || `Mazo ${idx + 1}`)}</div>
      <div class="deck-select-breakdown">
        <span>👾 ${mCount}</span> • <span>🪄 ${sCount}</span> • <span>🪤 ${tCount}</span>
      </div>
    `;

    card.onclick = () => {
      configuracionJuego.mazoSeleccionadoIdx = idx;
      renderizarSelectorMazosPrePartida();
      AudioManager.reproducirSFX('enter');
    };

    container.appendChild(card);
  });
}

// ==========================================
// 19. MODAL DE REGLAMENTO E INSTRUCCIONES
// ==========================================
function inicializarModalReglas() {
  const modal = document.getElementById('rules-modal');
  const btnCloseX = document.getElementById('btn-close-rules-x');
  const btnClose = document.getElementById('btn-close-rules');
  const tabBtns = document.querySelectorAll('.rules-tab-btn');
  const panes = document.querySelectorAll('.rules-tab-pane');

  const cerrar = () => {
    if (modal) modal.classList.add('hidden');
  };

  if (btnCloseX) btnCloseX.onclick = cerrar;
  if (btnClose) btnClose.onclick = cerrar;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');

      AudioManager.reproducirSFX('enter');
    });
  });
}

function abrirModalReglas() {
  const modal = document.getElementById('rules-modal');
  if (modal) modal.classList.remove('hidden');
  AudioManager.reproducirSFX('enter');
}

// ==============================================================
// 20. CONEXIÓN CLOUD CON SUPABASE (BASE DE DATOS + REALTIME $0)
// ==============================================================
const SUPABASE_CONFIG = {
  url: 'https://ouduytcrgdcyftrzimrd.supabase.co',
  restUrl: 'https://ouduytcrgdcyftrzimrd.supabase.co/rest/v1',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZHV5dGNyZ2RjeWZ0cnppbXJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MTgxNjUsImV4cCI6MjEwODI5NDE2NX0.hWU-u4JdNUxXQgGVRvsk5PLccEycy0LlI7jNPFYOtZc'
};

const SupabaseCloud = {
  client: null,

  getClient() {
    if (!this.client && typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
      this.client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    }
    return this.client;
  },

  headers(extra = {}) {
    return Object.assign({
      'apikey': SUPABASE_CONFIG.anonKey,
      'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
      'Content-Type': 'application/json'
    }, extra);
  },

  async fetchAllUsers() {
    const res = await fetch(`${SUPABASE_CONFIG.restUrl}/usuarios?select=*&order=created_at.asc`, {
      headers: this.headers()
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  },

  async findUserByUsername(username) {
    const clean = encodeURIComponent(username.trim());
    const res = await fetch(`${SUPABASE_CONFIG.restUrl}/usuarios?username=ilike.${clean}&select=*`, {
      headers: this.headers()
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
  },

  async insertUser(userData) {
    const res = await fetch(`${SUPABASE_CONFIG.restUrl}/usuarios`, {
      method: 'POST',
      headers: this.headers({ 'Prefer': 'return=representation' }),
      body: JSON.stringify(userData)
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText || `HTTP ${res.status}`);
    }
    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : userData;
  },

  async updateUserByUsername(username, fields) {
    const clean = encodeURIComponent(username.trim());
    const res = await fetch(`${SUPABASE_CONFIG.restUrl}/usuarios?username=ilike.${clean}`, {
      method: 'PATCH',
      headers: this.headers({ 'Prefer': 'return=representation' }),
      body: JSON.stringify(fields)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  },

  async deleteUserByUsername(username) {
    const clean = encodeURIComponent(username.trim());
    const res = await fetch(`${SUPABASE_CONFIG.restUrl}/usuarios?username=ilike.${clean}`, {
      method: 'DELETE',
      headers: this.headers()
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return true;
  }
};

// ==============================================================
// 20.1. SISTEMA DE GESTIÓN DE USUARIOS (SUPABASE CLOUD + SHA-256)
// ==============================================================
function esHashSHA256(str) {
  return typeof str === 'string' && /^[a-f0-9]{64}$/i.test(str);
}

// Implementación estándar FIPS 180-4 SHA-256 sincrónica y multiplataforma (UTF-8 -> Hex 64 chars)
function hashPasswordSHA256(str) {
  const input = String(str ?? '');
  if (esHashSHA256(input)) return input.toLowerCase();

  const utf8 = unescape(encodeURIComponent(input));
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];
  const H = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];

  const msgLen = utf8.length;
  const wordLen = (((msgLen + 8) >> 6) + 1) << 4;
  const words = new Array(wordLen).fill(0);

  for (let i = 0; i < msgLen; i++) {
    words[i >> 2] |= utf8.charCodeAt(i) << (24 - (i % 4) * 8);
  }
  words[msgLen >> 2] |= 0x80 << (24 - (msgLen % 4) * 8);
  words[wordLen - 1] = msgLen * 8;

  const rotr = (n, x) => (x >>> n) | (x << (32 - n));
  const W = new Array(64);

  for (let i = 0; i < wordLen; i += 16) {
    for (let t = 0; t < 16; t++) W[t] = words[i + t] | 0;
    for (let t = 16; t < 64; t++) {
      const s0 = rotr(7, W[t - 15]) ^ rotr(18, W[t - 15]) ^ (W[t - 15] >>> 3);
      const s1 = rotr(17, W[t - 2]) ^ rotr(19, W[t - 2]) ^ (W[t - 2] >>> 10);
      W[t] = (W[t - 16] + s0 + W[t - 7] + s1) | 0;
    }

    let [a, b, c, d, e, f, g, h] = H;
    for (let t = 0; t < 64; t++) {
      const S1 = rotr(6, e) ^ rotr(11, e) ^ rotr(25, e);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + K[t] + W[t]) | 0;
      const S0 = rotr(2, a) ^ rotr(13, a) ^ rotr(22, a);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) | 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) | 0;
    }

    H[0] = (H[0] + a) | 0;
    H[1] = (H[1] + b) | 0;
    H[2] = (H[2] + c) | 0;
    H[3] = (H[3] + d) | 0;
    H[4] = (H[4] + e) | 0;
    H[5] = (H[5] + f) | 0;
    H[6] = (H[6] + g) | 0;
    H[7] = (H[7] + h) | 0;
  }

  return H.map(v => (v >>> 0).toString(16).padStart(8, '0')).join('');
}

var UserManager = {
  DB_KEY: 'pokeoh_users_db_v1',
  CURRENT_USER_KEY: 'pokeoh_session_user_v2',
  currentUser: null,

  init() {
    this.ensureDefaultUsers();
    this.loadCurrentUser();
    this.revisarDesconexionPrevia();
    this.renderUserUI();
    this.initEventListeners();
    this.sincronizarDesdeSupabase();

    if (!this.currentUser) {
      setTimeout(() => {
        this.exigirAutenticacion("¡Bienvenido a Poké-Oh! Inicia sesión o crea tu cuenta de duelista para comenzar.");
      }, 400);
    }
  },

  normalizarUsuario(u) {
    if (!u) return null;
    const rawPass = u.password || '';
    return {
      id: u.id || ('usr_' + Date.now().toString(36)),
      username: u.username,
      password: esHashSHA256(rawPass) ? rawPass.toLowerCase() : hashPasswordSHA256(rawPass),
      role: u.role || 'user',
      avatar: u.avatar || '🧢',
      createdAt: u.created_at || u.createdAt || new Date().toISOString(),
      stats: u.stats || { duelos: 0, victorias: 0, derrotas: 0, puntos: 0, rango: 'Aspirante' },
      mazos: Array.isArray(u.mazos) ? u.mazos : []
    };
  },

  async sincronizarDesdeSupabase() {
    try {
      const cloudUsers = await SupabaseCloud.fetchAllUsers();
      if (Array.isArray(cloudUsers) && cloudUsers.length > 0) {
        // Si algún usuario en la nube tenía contraseña en texto plano, codificarla en SHA-256 automáticamente
        for (const cu of cloudUsers) {
          if (cu && cu.username && cu.password && !esHashSHA256(cu.password)) {
            const hashed = hashPasswordSHA256(cu.password);
            cu.password = hashed;
            SupabaseCloud.updateUserByUsername(cu.username, { password: hashed }).catch(() => {});
          }
        }

        const normalized = cloudUsers.map(u => this.normalizarUsuario(u));
        this.saveUsers(normalized);

        if (this.currentUser) {
          const updatedMe = normalized.find(u => u.username.toLowerCase() === this.currentUser.username.toLowerCase());
          if (updatedMe) {
            this.currentUser = updatedMe;
            if (typeof cargarMazos === 'function') {
              mazosJugador = cargarMazos();
              if (typeof renderizarSelectorMazosPrePartida === 'function') renderizarSelectorMazosPrePartida();
              if (typeof renderizarPestanasDeckBuilder === 'function') renderizarPestanasDeckBuilder();
            }
          }
        }
        this.renderUserUI();
      }
    } catch (err) {
      console.warn("[Supabase] Modo offline / caché local activo:", err.message || err);
    }
  },

  async guardarMazosEnNube(mazos) {
    if (!this.currentUser || !this.currentUser.username) return;
    try {
      await SupabaseCloud.updateUserByUsername(this.currentUser.username, { mazos: mazos });
      const users = this.getAllUsers();
      const idx = users.findIndex(u => u.username.toLowerCase() === this.currentUser.username.toLowerCase());
      if (idx !== -1) {
        users[idx].mazos = JSON.parse(JSON.stringify(mazos));
        this.saveUsers(users);
      }
    } catch (err) {
      console.warn("[Supabase] Error sincronizando mazos en la nube:", err);
    }
  },

  exigirAutenticacion(mensaje = "Debes iniciar sesión o registrar tu cuenta para continuar.") {
    if (this.currentUser) return true;
    mostrarMensajeToast(mensaje);
    const modal = document.getElementById('user-modal');
    if (modal) modal.classList.remove('hidden');
    const tabLogin = document.getElementById('btn-tab-login');
    if (tabLogin) tabLogin.click();
    const loginMsg = document.getElementById('login-msg');
    if (loginMsg) {
      loginMsg.className = 'user-msg-banner error';
      loginMsg.textContent = mensaje;
      loginMsg.classList.remove('hidden');
    }
    return false;
  },

  revisarDesconexionPrevia() {
    const abandonoPrevio = localStorage.getItem('pokeoh_active_online_match');
    if (abandonoPrevio === 'true') {
      localStorage.removeItem('pokeoh_active_online_match');
      this.registrarResultadoDuelo(false, 0);
      setTimeout(() => {
        mostrarMensajeToast("Se registró una derrota por abandono/desconexión en la partida previa.");
      }, 1500);
    }
  },

  ensureDefaultUsers() {
    const raw = localStorage.getItem(this.DB_KEY);
    let users = [];
    try {
      users = raw ? JSON.parse(raw) : [];
    } catch (e) {
      users = [];
    }

    let modificado = false;

    // Migrar cualquier contraseña en texto plano existente en caché local a SHA-256
    users.forEach(u => {
      if (u && u.password && !esHashSHA256(u.password)) {
        u.password = hashPasswordSHA256(u.password);
        modificado = true;
      }
    });

    // Asegurar cuenta admin en caché local con hash SHA-256
    const hasAdmin = users.some(u => u.username && u.username.toLowerCase() === 'admin');
    if (!hasAdmin) {
      users.unshift({
        id: 'usr_admin',
        username: 'admin',
        password: 'fe081059b48d84051653f3c664d08379ee7bb1376f116331ec6e9da0ca8c9f77',
        role: 'admin',
        avatar: '👑',
        createdAt: new Date().toISOString(),
        stats: {
          duelos: 0,
          victorias: 0,
          derrotas: 0,
          puntos: 0,
          rango: 'Maestro Pokémon'
        },
        mazos: []
      });
      modificado = true;
    }

    if (modificado) {
      localStorage.setItem(this.DB_KEY, JSON.stringify(users));
    }
  },

  getAllUsers() {
    try {
      const raw = localStorage.getItem(this.DB_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  saveUsers(users) {
    localStorage.setItem(this.DB_KEY, JSON.stringify(users));
  },

  loadCurrentUser() {
    const saved = localStorage.getItem(this.CURRENT_USER_KEY);
    const users = this.getAllUsers();
    if (saved) {
      const found = users.find(u => u.username.toLowerCase() === saved.toLowerCase());
      if (found) {
        this.currentUser = found;
        return;
      }
    }
    // Si no hay sesión previa, permanecer desconectado (null). El admin no se auto-inicia.
    this.currentUser = null;
    localStorage.removeItem(this.CURRENT_USER_KEY);
  },

  async register(username, password) {
    const cleanUser = username.trim();
    if (cleanUser.length < 3) {
      return { ok: false, error: "El nombre de usuario debe tener al menos 3 caracteres." };
    }
    if (!password || password.length < 3) {
      return { ok: false, error: "La contraseña debe tener al menos 3 caracteres." };
    }

    const passwordHash = hashPasswordSHA256(password);

    // Comprobar en Supabase primero
    try {
      const existingCloud = await SupabaseCloud.findUserByUsername(cleanUser);
      if (existingCloud) {
        return { ok: false, error: `El usuario "${cleanUser}" ya existe en la base de datos. Elige otro nombre.` };
      }
    } catch (e) {
      // Si falla red, verificar en caché local
      const localUsers = this.getAllUsers();
      if (localUsers.some(u => u.username.toLowerCase() === cleanUser.toLowerCase())) {
        return { ok: false, error: `El usuario "${cleanUser}" ya existe. Elige otro nombre.` };
      }
    }

    const avatars = ['🧢', '⚡', '🔥', '💧', '🌿', '🔮', '🥊', '🎮'];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const defaultDecks = JSON.parse(JSON.stringify(MAZOS_DEFAULT));

    const payload = {
      username: cleanUser,
      password: passwordHash,
      role: 'user',
      avatar: randomAvatar,
      stats: {
        duelos: 0,
        victorias: 0,
        derrotas: 0,
        puntos: 0,
        rango: 'Aspirante'
      },
      mazos: defaultDecks
    };

    let createdUser = null;
    try {
      const cloudRow = await SupabaseCloud.insertUser(payload);
      createdUser = this.normalizarUsuario(cloudRow);
    } catch (err) {
      console.warn("[Supabase] Error registrando en nube, guardando localmente:", err);
      createdUser = this.normalizarUsuario(payload);
    }

    const users = this.getAllUsers().filter(u => u.username.toLowerCase() !== cleanUser.toLowerCase());
    users.push(createdUser);
    this.saveUsers(users);

    this.currentUser = createdUser;
    localStorage.setItem(this.CURRENT_USER_KEY, createdUser.username);
    this.renderUserUI();

    if (typeof cargarMazos === 'function') {
      mazosJugador = cargarMazos();
      mazoActivoBuilderIdx = 0;
      if (typeof renderizarSelectorMazosPrePartida === 'function') {
        renderizarSelectorMazosPrePartida();
      }
      if (typeof renderizarPestanasDeckBuilder === 'function') {
        renderizarPestanasDeckBuilder();
      }
    }

    return { ok: true, user: createdUser };
  },

  async login(username, password) {
    const cleanUser = username.trim();
    if (!cleanUser || !password) {
      return { ok: false, error: "Ingresa tu usuario y contraseña." };
    }

    const passwordHash = hashPasswordSHA256(password);

    let user = null;
    try {
      const cloudRow = await SupabaseCloud.findUserByUsername(cleanUser);
      if (cloudRow) {
        if (cloudRow.password && !esHashSHA256(cloudRow.password)) {
          const migratedHash = hashPasswordSHA256(cloudRow.password);
          cloudRow.password = migratedHash;
          SupabaseCloud.updateUserByUsername(cloudRow.username, { password: migratedHash }).catch(() => {});
        }
        user = this.normalizarUsuario(cloudRow);
      }
    } catch (err) {
      console.warn("[Supabase] Usando caché local para login:", err);
    }

    if (!user) {
      const users = this.getAllUsers();
      user = users.find(u => u.username.toLowerCase() === cleanUser.toLowerCase()) || null;
    }

    if (!user || (user.password !== passwordHash && user.password !== password)) {
      return { ok: false, error: "Usuario o contraseña incorrectos." };
    }

    user.password = passwordHash;

    // Si el usuario en Supabase aún no tenía sus 5 mazos inicializados, inicializarlos
    if (!esMazosValidos(user.mazos)) {
      const claveLocal = `pokeoh_user_decks_${user.username.toLowerCase().trim()}_v1`;
      let mazosIniciales = null;
      try {
        const rawLocal = localStorage.getItem(claveLocal);
        if (rawLocal) {
          const parsedLocal = JSON.parse(rawLocal);
          if (esMazosValidos(parsedLocal)) mazosIniciales = parsedLocal;
        }
      } catch (e) {}
      if (!mazosIniciales) {
        mazosIniciales = JSON.parse(JSON.stringify(MAZOS_DEFAULT));
      }
      user.mazos = mazosIniciales;
      SupabaseCloud.updateUserByUsername(user.username, { mazos: mazosIniciales }).catch(() => {});
    }

    const users = this.getAllUsers();
    const idx = users.findIndex(u => u.username.toLowerCase() === user.username.toLowerCase());
    if (idx !== -1) users[idx] = user;
    else users.push(user);
    this.saveUsers(users);

    this.currentUser = user;
    localStorage.setItem(this.CURRENT_USER_KEY, user.username);
    this.renderUserUI();

    if (typeof cargarMazos === 'function') {
      mazosJugador = cargarMazos();
      mazoActivoBuilderIdx = 0;
      if (typeof renderizarSelectorMazosPrePartida === 'function') {
        renderizarSelectorMazosPrePartida();
      }
      if (typeof renderizarPestanasDeckBuilder === 'function') {
        renderizarPestanasDeckBuilder();
      }
    }

    return { ok: true, user: user };
  },

  logout() {
    this.currentUser = null;
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.renderUserUI();

    if (typeof cargarMazos === 'function') {
      mazosJugador = cargarMazos();
      mazoActivoBuilderIdx = 0;
      if (typeof renderizarSelectorMazosPrePartida === 'function') {
        renderizarSelectorMazosPrePartida();
      }
      if (typeof renderizarPestanasDeckBuilder === 'function') {
        renderizarPestanasDeckBuilder();
      }
    }
  },

  async deleteUser(username) {
    if (!this.currentUser || this.currentUser.role !== 'admin') {
      return { ok: false, error: "Solo los administradores pueden eliminar usuarios." };
    }
    if (username.toLowerCase() === 'admin') {
      return { ok: false, error: "No se puede eliminar la cuenta del administrador principal." };
    }

    try {
      await SupabaseCloud.deleteUserByUsername(username);
    } catch (err) {
      console.warn("[Supabase] Error al eliminar en nube:", err);
    }

    let users = this.getAllUsers();
    users = users.filter(u => u.username.toLowerCase() !== username.toLowerCase());
    this.saveUsers(users);
    this.renderAdminTable();
    return { ok: true };
  },

  registrarResultadoDuelo(esVictoria, puntosGanados) {
    if (!this.currentUser) return;

    const users = this.getAllUsers();
    let user = users.find(u => u.username.toLowerCase() === this.currentUser.username.toLowerCase()) || this.currentUser;

    if (!user.stats) {
      user.stats = { duelos: 0, victorias: 0, derrotas: 0, puntos: 0 };
    }

    user.stats.duelos = (user.stats.duelos || 0) + 1;
    if (esVictoria) {
      user.stats.victorias = (user.stats.victorias || 0) + 1;
    } else {
      user.stats.derrotas = (user.stats.derrotas || 0) + 1;
    }
    user.stats.puntos = (user.stats.puntos || 0) + (puntosGanados || 0);

    // Calcular rango
    user.stats.rango = this.calcularRango(user.stats.puntos);

    this.saveUsers(users);
    this.currentUser = user;
    this.renderUserUI();

    // Sincronizar estadísticas en Supabase
    SupabaseCloud.updateUserByUsername(user.username, { stats: user.stats }).catch(err => {
      console.warn("[Supabase] Error guardando estadísticas en la nube:", err);
    });
  },

  calcularRango(puntos) {
    if (puntos >= 15000) return "Leyenda de la Liga 👑";
    if (puntos >= 8000) return "Maestro Poké-Oh 🌟";
    if (puntos >= 4000) return "Entrenador Avanzado ⚡";
    if (puntos >= 1500) return "Duelista Promesa ⚔️";
    return "Aspirante 🧢";
  },

  renderUserUI() {
    const user = this.currentUser;
    const nameElMenu = document.getElementById('menu-user-name');
    const avatarElMenu = document.getElementById('menu-user-avatar');
    const badgeElMenu = document.getElementById('menu-user-badge');

    const nameElSide = document.getElementById('sidebar-user-name');
    const avatarElSide = document.getElementById('sidebar-user-avatar');

    if (user) {
      if (nameElMenu) nameElMenu.textContent = user.username;
      if (avatarElMenu) avatarElMenu.textContent = user.avatar || '👤';
      if (badgeElMenu) {
        badgeElMenu.textContent = user.role === 'admin' ? 'ADMIN' : 'JUGADOR';
        badgeElMenu.style.background = user.role === 'admin' ? '#feca57' : '#54a0ff';
        badgeElMenu.style.color = '#1e272e';
      }

      if (nameElSide) nameElSide.textContent = user.username;
      if (avatarElSide) avatarElSide.textContent = user.avatar || '👤';
      estadoJugador.nombre = user.username;
    } else {
      if (nameElMenu) nameElMenu.textContent = "Iniciar Sesión";
      if (avatarElMenu) avatarElMenu.textContent = "👤";
      if (badgeElMenu) {
        badgeElMenu.textContent = "SIN SESIÓN";
        badgeElMenu.style.background = "#ff4757";
        badgeElMenu.style.color = "#ffffff";
      }

      if (nameElSide) nameElSide.textContent = "Iniciar Sesión";
      if (avatarElSide) avatarElSide.textContent = "👤";
      estadoJugador.nombre = "Invitado";
    }

    this.renderProfileTab();
    this.renderAdminTable();
  },

  renderProfileTab() {
    const user = this.currentUser;
    const tabAdmin = document.getElementById('btn-tab-admin');

    if (tabAdmin) {
      tabAdmin.style.display = (user && user.role === 'admin') ? 'inline-block' : 'none';
    }

    if (!user) {
      const tabLogin = document.getElementById('btn-tab-login');
      if (tabLogin) tabLogin.click();
      return;
    }

    const av = document.getElementById('profile-display-avatar');
    if (av) av.textContent = user.avatar || '👤';

    const usr = document.getElementById('profile-display-username');
    if (usr) usr.textContent = user.username;

    const rol = document.getElementById('profile-display-role');
    if (rol) rol.textContent = user.role === 'admin' ? 'ADMINISTRADOR' : 'DUELISTA';

    const fechaEl = document.getElementById('profile-display-date');
    if (fechaEl) {
      const fecha = new Date(user.createdAt || Date.now()).toLocaleDateString();
      fechaEl.textContent = `Miembro desde: ${fecha}`;
    }

    const duelos = user.stats?.duelos || 0;
    const wins = user.stats?.victorias || 0;
    const losses = user.stats?.derrotas || 0;
    const winrate = duelos > 0 ? Math.round((wins / duelos) * 100) : 0;

    const elDuels = document.getElementById('profile-stat-duels');
    if (elDuels) elDuels.textContent = duelos;
    const elWins = document.getElementById('profile-stat-wins');
    if (elWins) elWins.textContent = wins;
    const elLosses = document.getElementById('profile-stat-losses');
    if (elLosses) elLosses.textContent = losses;
    const elRate = document.getElementById('profile-stat-rate');
    if (elRate) elRate.textContent = `${winrate}%`;
    const elPts = document.getElementById('profile-stat-points');
    if (elPts) elPts.textContent = user.stats?.puntos || 0;
    const elRank = document.getElementById('profile-stat-rank');
    if (elRank) elRank.textContent = user.stats?.rango || 'Aspirante';
  },

  renderAdminTable() {
    const tbody = document.getElementById('admin-users-tbody');
    const countBadge = document.getElementById('admin-user-count');
    if (!tbody) return;

    const users = this.getAllUsers();
    if (countBadge) countBadge.textContent = `Total: ${users.length} usuarios`;

    tbody.innerHTML = '';
    users.forEach(u => {
      const tr = document.createElement('tr');
      const fecha = new Date(u.createdAt || Date.now()).toLocaleDateString();
      const esAdminPrincipal = u.username.toLowerCase() === 'admin';

      tr.innerHTML = `
        <td><b>${u.avatar || '👤'} ${u.username}</b></td>
        <td><span class="user-role-badge" style="background:${u.role === 'admin' ? '#feca57' : '#54a0ff'};color:#1e272e;">${u.role.toUpperCase()}</span></td>
        <td>${u.stats?.duelos || 0}</td>
        <td>${u.stats?.victorias || 0}</td>
        <td>${u.stats?.puntos || 0} pts</td>
        <td>${fecha}</td>
        <td>
          ${esAdminPrincipal 
            ? '<span style="color:#a4b0be;font-size:0.75rem;">(Principal)</span>' 
            : `<button class="btn-del-user" data-user="${u.username}">Eliminar</button>`}
        </td>
      `;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.btn-del-user').forEach(btn => {
      btn.addEventListener('click', async () => {
        const targetUser = btn.getAttribute('data-user');
        if (confirm(`¿Estás seguro de que deseas eliminar la cuenta de "${targetUser}" de Supabase?`)) {
          await this.deleteUser(targetUser);
          mostrarMensajeToast(`Usuario "${targetUser}" eliminado.`);
        }
      });
    });
  },

  initEventListeners() {
    const btnMenuUser = document.getElementById('btn-menu-user');
    const btnSideUser = document.getElementById('btn-sidebar-user');
    const modal = document.getElementById('user-modal');
    const btnCloseX = document.getElementById('btn-close-user-x');
    const btnClose = document.getElementById('btn-close-user');

    const abrir = () => {
      this.sincronizarDesdeSupabase();
      this.renderUserUI();
      if (modal) modal.classList.remove('hidden');
      AudioManager.reproducirSFX('enter');
    };

    const cerrar = () => {
      if (modal) modal.classList.add('hidden');
    };

    if (btnMenuUser) btnMenuUser.onclick = abrir;
    if (btnSideUser) btnSideUser.onclick = abrir;
    if (btnCloseX) btnCloseX.onclick = cerrar;
    if (btnClose) btnClose.onclick = cerrar;

    // Tabs de usuario
    const tabs = document.querySelectorAll('.user-nav-tabs .rules-tab-btn');
    const panes = document.querySelectorAll('.user-content-area .rules-tab-pane');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
        if (targetId === 'tab-user-admin') {
          this.sincronizarDesdeSupabase();
        }
        AudioManager.reproducirSFX('enter');
      });
    });

    // Iniciar Sesión Submit
    const btnSubmitLogin = document.getElementById('btn-submit-login');
    const inputLoginUser = document.getElementById('login-username');
    const inputLoginPass = document.getElementById('login-password');
    const loginMsg = document.getElementById('login-msg');

    if (btnSubmitLogin) {
      btnSubmitLogin.onclick = async () => {
        const u = inputLoginUser ? inputLoginUser.value : '';
        const p = inputLoginPass ? inputLoginPass.value : '';
        btnSubmitLogin.disabled = true;
        const res = await this.login(u, p);
        btnSubmitLogin.disabled = false;

        if (res.ok) {
          if (loginMsg) {
            loginMsg.className = 'user-msg-banner success';
            loginMsg.textContent = `¡Bienvenido de nuevo, ${res.user.username}!`;
            loginMsg.classList.remove('hidden');
          }
          mostrarMensajeToast(`Sesión iniciada como ${res.user.username} (Cloud)`);
          setTimeout(() => {
            if (loginMsg) loginMsg.classList.add('hidden');
            const tabProf = document.getElementById('btn-tab-profile');
            if (tabProf) tabProf.click();
            const modal = document.getElementById('user-modal');
            if (modal) modal.classList.add('hidden');
          }, 600);
        } else {
          if (loginMsg) {
            loginMsg.className = 'user-msg-banner error';
            loginMsg.textContent = res.error;
            loginMsg.classList.remove('hidden');
          }
          AudioManager.reproducirSFX('hit');
        }
      };
    }

    // Registrarse Submit
    const btnSubmitReg = document.getElementById('btn-submit-register');
    const inputRegUser = document.getElementById('reg-username');
    const inputRegPass = document.getElementById('reg-password');
    const inputRegConf = document.getElementById('reg-password-confirm');
    const regMsg = document.getElementById('reg-msg');

    if (btnSubmitReg) {
      btnSubmitReg.onclick = async () => {
        const u = inputRegUser ? inputRegUser.value : '';
        const p = inputRegPass ? inputRegPass.value : '';
        const c = inputRegConf ? inputRegConf.value : '';

        if (p !== c) {
          if (regMsg) {
            regMsg.className = 'user-msg-banner error';
            regMsg.textContent = "Las contraseñas no coinciden.";
            regMsg.classList.remove('hidden');
          }
          AudioManager.reproducirSFX('hit');
          return;
        }

        btnSubmitReg.disabled = true;
        const res = await this.register(u, p);
        btnSubmitReg.disabled = false;

        if (res.ok) {
          if (regMsg) {
            regMsg.className = 'user-msg-banner success';
            regMsg.textContent = `¡Cuenta "${res.user.username}" creada en Supabase con éxito!`;
            regMsg.classList.remove('hidden');
          }
          mostrarMensajeToast(`¡Cuenta creada en la nube! Bienvenido, ${res.user.username}`);
          setTimeout(() => {
            if (regMsg) regMsg.classList.add('hidden');
            const tabProf = document.getElementById('btn-tab-profile');
            if (tabProf) tabProf.click();
            const modal = document.getElementById('user-modal');
            if (modal) modal.classList.add('hidden');
          }, 600);
        } else {
          if (regMsg) {
            regMsg.className = 'user-msg-banner error';
            regMsg.textContent = res.error;
            regMsg.classList.remove('hidden');
          }
          AudioManager.reproducirSFX('hit');
        }
      };
    }

    // Logout
    const btnLogout = document.getElementById('btn-user-logout');
    if (btnLogout) {
      btnLogout.onclick = () => {
        this.logout();
        mostrarMensajeToast("Sesión cerrada.");
        const tabLogin = document.getElementById('btn-tab-login');
        if (tabLogin) tabLogin.click();
      };
    }
  }
};

// ==============================================================
// 20.2. ADAPTADOR DE SALA MULTIJUGADOR CON SUPABASE REALTIME ($0)
// ==============================================================
class SupabaseRoomAdapter {
  constructor(sbClient, options) {
    this.sb = sbClient;
    this.roomCode = (options.roomCode || Math.random().toString(36).substring(2, 6).toUpperCase());
    this.isHost = !!options.isHost;
    this.seat = this.isHost ? 0 : 1;
    this.lpInicial = Number(options.lpInicial) || 8000;
    this.myPlayer = {
      sessionId: 'sb_' + Math.random().toString(36).substring(2, 10),
      seat: this.seat,
      username: options.username || (this.seat === 0 ? 'Entrenador Red' : 'Entrenador Blue'),
      avatar: options.avatar || (this.seat === 0 ? '🔴' : '🔵'),
      lp: this.lpInicial
    };
    this.handlers = {};
    this.leaveCallback = null;
    this.errorCallback = null;
    this.gameStarted = false;
    this.turn = 1;
    this.turnSeat = 0;
    this.channel = null;
  }

  onMessage(type, cb) {
    this.handlers[type] = cb;
  }

  onLeave(cb) {
    this.leaveCallback = cb;
  }

  onError(cb) {
    this.errorCallback = cb;
  }

  emitLocal(type, payload) {
    if (this.handlers[type]) {
      this.handlers[type](payload);
    }
  }

  async connect() {
    return new Promise((resolve, reject) => {
      const channelName = `pokeoh_duel_${this.roomCode}`;
      this.channel = this.sb.channel(channelName, {
        config: {
          broadcast: { self: false },
          presence: { key: this.myPlayer.sessionId }
        }
      });

      this.channel
        .on('broadcast', { event: 'room_msg' }, ({ payload }) => {
          this.handleIncomingBroadcast(payload);
        })
        .on('presence', { event: 'leave' }, ({ leftPresences }) => {
          if (this.gameStarted && leftPresences && leftPresences.length > 0) {
            this.gameStarted = false;
            const leaving = leftPresences[0];
            this.emitLocal('game_over', {
              reason: 'disconnect',
              surrenderedSeat: this.seat === 0 ? 1 : 0,
              winnerSeat: this.seat,
              mensaje: `${leaving.username || 'El rival'} se ha desconectado. ¡Victoria otorgada!`
            });
          }
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await this.channel.track({
              sessionId: this.myPlayer.sessionId,
              seat: this.seat,
              username: this.myPlayer.username,
              avatar: this.myPlayer.avatar
            });

            setTimeout(() => {
              this.emitLocal('joined_room', {
                roomCode: this.roomCode,
                seat: this.seat,
                lpInicial: this.lpInicial,
                player: this.myPlayer
              });

              if (!this.isHost) {
                this.channel.send({
                  type: 'broadcast',
                  event: 'room_msg',
                  payload: {
                    msgType: 'guest_joined',
                    guestPlayer: this.myPlayer
                  }
                });
              }
            }, 80);

            resolve(this);
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            reject(new Error('No se pudo conectar al canal Realtime de Supabase.'));
          }
        });
    });
  }

  handleIncomingBroadcast(data) {
    if (!data || !data.msgType) return;

    if (data.msgType === 'guest_joined' && this.isHost && !this.gameStarted) {
      this.gameStarted = true;
      const matchData = {
        roomCode: this.roomCode,
        lpInicial: this.lpInicial,
        players: [this.myPlayer, data.guestPlayer],
        startingSeat: 0,
        turno: 1,
        fase: 'PRINCIPAL'
      };
      this.channel.send({
        type: 'broadcast',
        event: 'room_msg',
        payload: {
          msgType: 'match_start',
          matchData: matchData
        }
      });
      this.emitLocal('match_start', matchData);
    } else if (data.msgType === 'match_start' && !this.isHost && !this.gameStarted) {
      this.gameStarted = true;
      this.emitLocal('match_start', data.matchData);
    } else if (data.msgType === 'action') {
      this.emitLocal('action', data.payload);
    } else if (data.msgType === 'game_over') {
      this.gameStarted = false;
      this.emitLocal('game_over', data.payload);
    }
  }

  send(type, actionData) {
    if (!this.channel) return;

    if (type === 'action') {
      const payload = {
        senderSessionId: this.myPlayer.sessionId,
        senderSeat: this.seat,
        senderName: this.myPlayer.username,
        action: actionData
      };

      if (actionData.tipo === 'PASAR_FASE' && actionData.fase === 'FIN') {
        this.turnSeat = this.turnSeat === 0 ? 1 : 0;
        this.turn++;
        payload.nuevoTurno = this.turn;
        payload.nuevoTurnSeat = this.turnSeat;
        actionData.nuevoTurno = this.turn;
      }

      this.channel.send({
        type: 'broadcast',
        event: 'room_msg',
        payload: {
          msgType: 'action',
          payload: payload
        }
      });
    } else if (type === 'surrender' || type === 'deck_out') {
      this.gameStarted = false;
      const winnerSeat = this.seat === 0 ? 1 : 0;
      const gameOverPayload = {
        reason: type === 'surrender' ? 'surrender' : 'deck_out',
        surrenderedSeat: this.seat,
        winnerSeat: winnerSeat,
        mensaje: type === 'surrender'
          ? `${this.myPlayer.username} se ha rendido.`
          : `¡${this.myPlayer.username} se quedó sin cartas en su baraja (Deck Out)!`
      };
      this.channel.send({
        type: 'broadcast',
        event: 'room_msg',
        payload: {
          msgType: 'game_over',
          payload: gameOverPayload
        }
      });
      this.emitLocal('game_over', gameOverPayload);
    }
  }

  leave() {
    this.gameStarted = false;
    if (this.channel && this.sb) {
      try {
        this.sb.removeChannel(this.channel);
      } catch (e) {}
      this.channel = null;
    }
    if (this.leaveCallback) {
      this.leaveCallback(1000);
    }
  }
}

// ==============================================================
// 21. MULTIJUGADOR EN TIEMPO REAL (SUPABASE REALTIME + COLYSEUS)
// ==============================================================
const MultiplayerManager = {
  client: null,
  room: null,
  lobbyChannel: null,
  enPartidaOnline: false,
  usarSupabaseRealtime: true,
  miAsiento: 0,
  roomCode: null,
  serverUrl: null,

  init() {
    this.determinarServerUrl();
    this.initEventListeners();
  },

  determinarServerUrl() {
    if (window.location.protocol.startsWith('http')) {
      const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      this.serverUrl = `${proto}//${window.location.host}`;
    } else {
      this.serverUrl = 'ws://localhost:2567';
    }
  },

  getClient() {
    if (!this.client && window.Colyseus) {
      this.client = new window.Colyseus.Client(this.serverUrl);
    }
    return this.client;
  },

  estaEnPartidaOnline() {
    return this.enPartidaOnline && !!this.room;
  },

  abrirModalOnline() {
    if (typeof UserManager !== 'undefined' && !UserManager.currentUser) {
      UserManager.exigirAutenticacion("Debes iniciar sesión o registrar tu cuenta para jugar en línea.");
      return;
    }
    const modal = document.getElementById('pvp-online-modal');
    if (!modal) return;

    this.cambiarVista('options');
    modal.classList.remove('hidden');
    this.comprobarEstadoServidor();
  },

  cambiarVista(vista) {
    const viewOptions = document.getElementById('pvp-view-options');
    const viewWaiting = document.getElementById('pvp-view-waiting');

    if (vista === 'options') {
      if (viewOptions) viewOptions.classList.add('active');
      if (viewWaiting) viewWaiting.classList.remove('active');
    } else if (vista === 'waiting') {
      if (viewOptions) viewOptions.classList.remove('active');
      if (viewWaiting) viewWaiting.classList.add('active');
    }
  },

  async comprobarEstadoServidor() {
    const dot = document.getElementById('pvp-status-dot');
    const text = document.getElementById('pvp-status-text');

    try {
      const httpUrl = this.serverUrl.replace(/^ws/, 'http');
      const res = await fetch(`${httpUrl}/api/status`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        this.usarSupabaseRealtime = false;
        if (dot) dot.className = 'status-indicator-dot online';
        if (text) text.textContent = `Servidor Colyseus Activo (${this.serverUrl})`;
        return true;
      }
    } catch (e) {
      // Fallback automático a Supabase Realtime ($0 Cloud)
    }

    const sb = SupabaseCloud.getClient();
    if (sb) {
      this.usarSupabaseRealtime = true;
      if (dot) dot.className = 'status-indicator-dot online';
      if (text) text.textContent = `Servidor Cloud Supabase Realtime: En línea (24/7 Gratis)`;
      return true;
    }

    if (dot) dot.className = 'status-indicator-dot';
    if (text) text.textContent = `Servidor no detectado.`;
    return false;
  },

  async buscarPartidaRapida() {
    if (typeof UserManager !== 'undefined' && !UserManager.currentUser) {
      UserManager.exigirAutenticacion("Debes iniciar sesión o registrar tu cuenta para jugar online.");
      return;
    }

    const user = UserManager.currentUser || { username: 'Entrenador Red', avatar: '🔴' };

    if (this.usarSupabaseRealtime) {
      const sb = SupabaseCloud.getClient();
      if (!sb) {
        alert("El SDK de Supabase no está disponible.");
        return;
      }
      mostrarMensajeToast("Buscando oponente en Supabase Cloud...");

      // Matchmaking en canal público de lobby
      const lobby = sb.channel('pokeoh_public_matchmaking', {
        config: { presence: { key: user.username + '_' + Date.now() } }
      });
      this.lobbyChannel = lobby;

      lobby.subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') return;

        const state = lobby.presenceState();
        let waitingRoomCode = null;
        Object.values(state).forEach(presences => {
          presences.forEach(p => {
            if (p.waitingRoom && p.hostUser !== user.username) {
              waitingRoomCode = p.waitingRoom;
            }
          });
        });

        if (waitingRoomCode) {
          sb.removeChannel(lobby);
          this.lobbyChannel = null;
          await this.unirseConCodigo(waitingRoomCode);
        } else {
          const code = Math.random().toString(36).substring(2, 6).toUpperCase();
          await lobby.track({ waitingRoom: code, hostUser: user.username });
          this.roomCode = code;
          const adapter = new SupabaseRoomAdapter(sb, {
            roomCode: code,
            isHost: true,
            username: user.username,
            avatar: user.avatar,
            lpInicial: configuracionJuego.lpInicial
          });
          this.room = await adapter.connect();
          this.configurarEventosSala();
          const waitingCodeEl = document.getElementById('pvp-waiting-code');
          if (waitingCodeEl) waitingCodeEl.textContent = code;
          this.cambiarVista('waiting');
        }
      });
      return;
    }

    try {
      const client = this.getClient();
      if (!client) return;

      mostrarMensajeToast("Buscando oponente online...");
      this.room = await client.joinOrCreate('pokeoh_duel', {
        username: user.username,
        avatar: user.avatar,
        lpInicial: configuracionJuego.lpInicial,
        isPrivate: false
      });

      this.configurarEventosSala();
    } catch (err) {
      console.error("Error al buscar partida:", err);
      alert("Error al conectar con el servidor: " + (err.message || err));
    }
  },

  async crearSalaPrivada() {
    if (typeof UserManager !== 'undefined' && !UserManager.currentUser) {
      UserManager.exigirAutenticacion("Debes iniciar sesión o registrar tu cuenta para crear salas online.");
      return;
    }

    const code = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.roomCode = code;
    const user = UserManager.currentUser || { username: 'Entrenador Red', avatar: '🔴' };

    if (this.usarSupabaseRealtime) {
      try {
        const sb = SupabaseCloud.getClient();
        const adapter = new SupabaseRoomAdapter(sb, {
          roomCode: code,
          isHost: true,
          username: user.username,
          avatar: user.avatar,
          lpInicial: configuracionJuego.lpInicial
        });
        this.room = await adapter.connect();
        this.configurarEventosSala();

        const waitingCodeEl = document.getElementById('pvp-waiting-code');
        if (waitingCodeEl) waitingCodeEl.textContent = code;
        this.cambiarVista('waiting');
      } catch (err) {
        console.error("Error al crear sala en Supabase:", err);
        alert("Error al crear sala: " + (err.message || err));
      }
      return;
    }

    try {
      const client = this.getClient();
      if (!client) return;

      this.room = await client.joinOrCreate('pokeoh_duel', {
        username: user.username,
        avatar: user.avatar,
        lpInicial: configuracionJuego.lpInicial,
        roomCode: code,
        isPrivate: true
      });

      this.configurarEventosSala();

      const waitingCodeEl = document.getElementById('pvp-waiting-code');
      if (waitingCodeEl) waitingCodeEl.textContent = code;
      this.cambiarVista('waiting');
    } catch (err) {
      console.error("Error al crear sala:", err);
      alert("Error al crear sala en servidor: " + (err.message || err));
    }
  },

  async unirseConCodigo(codigo) {
    if (typeof UserManager !== 'undefined' && !UserManager.currentUser) {
      UserManager.exigirAutenticacion("Debes iniciar sesión o registrar tu cuenta para unirte a salas online.");
      return;
    }

    if (!codigo || codigo.trim().length === 0) {
      alert("Por favor ingresa el código de sala.");
      return;
    }

    const cleanCode = codigo.trim().toUpperCase();
    mostrarMensajeToast(`Conectando a la sala ${cleanCode}...`);
    const user = UserManager.currentUser || { username: 'Entrenador Blue', avatar: '🔵' };

    if (this.usarSupabaseRealtime) {
      try {
        const sb = SupabaseCloud.getClient();
        const adapter = new SupabaseRoomAdapter(sb, {
          roomCode: cleanCode,
          isHost: false,
          username: user.username,
          avatar: user.avatar,
          lpInicial: configuracionJuego.lpInicial
        });
        this.room = await adapter.connect();
        this.configurarEventosSala();
      } catch (err) {
        console.error("Error al unirse a la sala en Supabase:", err);
        alert(`No se pudo conectar a la sala "${cleanCode}".`);
      }
      return;
    }

    try {
      const client = this.getClient();
      if (!client) return;

      this.room = await client.joinOrCreate('pokeoh_duel', {
        username: user.username,
        avatar: user.avatar,
        roomCode: cleanCode,
        isPrivate: true
      });

      this.configurarEventosSala();
    } catch (err) {
      console.error("Error al unirse a la sala:", err);
      alert(`No se encontró ninguna sala con el código "${codigo}".`);
    }
  },

  configurarEventosSala() {
    if (!this.room) return;

    this.room.onMessage('joined_room', (data) => {
      this.miAsiento = data.seat;
      this.roomCode = data.roomCode;
      console.log(`[Online] Conectado en asiento ${this.miAsiento}, sala ${this.roomCode}`);
    });

    this.room.onMessage('match_start', (data) => {
      console.log("[Online] ¡Comienza el combate online!", data);
      this.iniciarDueloOnline(data);
    });

    this.room.onMessage('action', (payload) => {
      if (payload.senderSeat !== this.miAsiento) {
        this.aplicarAccionRival(payload.action);
      }
    });

    this.room.onMessage('game_over', (data) => {
      console.log("[Online] Fin de la partida recibido:", data);
      this.dueloTerminado = true;
      localStorage.removeItem('pokeoh_active_online_match');

      const soyGanador = (data.winnerSeat === this.miAsiento);
      mostrarFinDelDuelo(soyGanador);

      if (data.reason === 'disconnect') {
        mostrarMensajeToast(soyGanador
          ? "¡Tu rival se desconectó de la partida! Se le cuenta como derrota y a ti se te otorga la victoria 🏆"
          : "Te has desconectado de la partida. Derrota registrada.");
      } else if (data.reason === 'deck_out') {
        mostrarMensajeToast(soyGanador
          ? "¡Victoria! El rival se quedó sin cartas en su baraja (Deck Out)."
          : "¡Derrota! Te has quedado sin cartas en tu baraja (Deck Out).");
      } else if (data.mensaje) {
        mostrarMensajeToast(data.mensaje);
      }

      this.desconectar(true);
    });

    this.room.onError((code, message) => {
      console.error("[Online] Error de sala:", code, message);
      mostrarMensajeToast(`Error de conexión: ${message}`);
    });

    this.room.onLeave((code) => {
      console.log("[Online] Saliste de la sala.");
      this.enPartidaOnline = false;
      this.room = null;
    });
  },

  iniciarDueloOnline(data) {
    if (this.lobbyChannel) {
      const sb = SupabaseCloud.getClient();
      if (sb) {
        try { sb.removeChannel(this.lobbyChannel); } catch (e) {}
      }
      this.lobbyChannel = null;
    }

    this.enPartidaOnline = true;
    this.dueloTerminado = false;
    localStorage.setItem('pokeoh_active_online_match', 'true');

    const modalPvp = document.getElementById('pvp-online-modal');
    if (modalPvp) modalPvp.classList.add('hidden');
    const menu = document.getElementById('main-menu-overlay');
    if (menu) menu.classList.add('hidden');

    reiniciarDuelo();

    const p1 = data.players.find(p => p.seat === 0);
    const p2 = data.players.find(p => p.seat === 1);

    if (this.miAsiento === 0) {
      estadoJugador.nombre = p1?.username || "Jugador (Tú)";
      estadoOponente.nombre = p2?.username || "Rival Online";
    } else {
      estadoJugador.nombre = p2?.username || "Jugador (Tú)";
      estadoOponente.nombre = p1?.username || "Rival Online";
    }

    // Inicializar mano del oponente con 5 cartas cubiertas para ambos jugadores
    estadoOponente.mano = new Array(5).fill(null);
    renderizarManoOponente();

    const hudP = document.querySelector('#player-side .player-name');
    if (hudP) hudP.textContent = estadoJugador.nombre;
    const hudO = document.querySelector('#opponent-side .player-name');
    if (hudO) hudO.textContent = estadoOponente.nombre;

    AudioManager.reproducirMusicaTema('batalla');
    mostrarMensajeToast(`¡Duelo Online iniciado contra ${estadoOponente.nombre}!`);

    estadoJuego.turnoDe = (this.miAsiento === data.startingSeat) ? 'jugador' : 'oponente';
    actualizarUIFases();
    this.sincronizarEstadoCampo();
  },

  enviarAccion(accion) {
    if (this.estaEnPartidaOnline()) {
      this.room.send('action', accion);
    }
  },

  sincronizarEstadoCampo() {
    if (!this.estaEnPartidaOnline()) return;
    this.enviarAccion({
      tipo: 'SYNC_CAMPO',
      zonaMonstruos: estadoJugador.zonaMonstruos.map(m => m ? {
        id: m.id,
        posicion: m.posicion,
        haAtacado: !!m.haAtacado,
        atkMod: m.atkMod || 0,
        defMod: m.defMod || 0,
        equipos: m.equipos ? m.equipos.slice() : []
      } : null),
      zonaMagiasTrampas: estadoJugador.zonaMagiasTrampas.map(t => t ? {
        id: t.id,
        bocaAbajo: !!t.bocaAbajo,
        activa: !!t.activa
      } : null),
      lp: estadoJugador.lp,
      cementerio: estadoJugador.cementerio.slice(),
      mazoCount: estadoJugador.mazo.length,
      manoCount: estadoJugador.mano.length
    });
  },

  aplicarAccionRival(accion) {
    console.log("[Online] Aplicando acción rival:", accion);

    // 1. Sincronización exacta de combate y destrucción de cartas
    if (accion.tipo === 'RESOLVER_COMBATE') {
      const res = accion.resultado;
      const atacanteSlot = res.atacanteSlot;
      const targetSlot = res.targetSlot;

      // En la pantalla del receptor:
      // Atacante = rival (estadoOponente)
      // Objetivo = jugador local (estadoJugador)
      const mAtacante = estadoOponente.zonaMonstruos[atacanteSlot];
      const mTarget = (targetSlot !== null && targetSlot !== undefined) ? estadoJugador.zonaMonstruos[targetSlot] : null;

      if (mAtacante) {
        mAtacante.haAtacado = true;
      }

      const slotRivalElem = document.querySelector(`#opponent-side .monsters-row .monster-slot[data-slot-index="${atacanteSlot}"]`);
      const slotJugadorElem = (targetSlot !== null && targetSlot !== undefined)
        ? document.querySelector(`#player-side .monsters-row .monster-slot[data-slot-index="${targetSlot}"]`)
        : null;

      if (res.esDirecto) {
        estadoJugador.lp = res.lpObjetivoFinal;
        estadoOponente.lp = res.lpAtacanteFinal;
        const lpElem = document.getElementById('player-lp-val');
        if (lpElem) {
          lpElem.textContent = estadoJugador.lp;
          crearNumeroFlotante(`-${res.danoObjetivo} LP`, lpElem, 'damage');
        }
        if (mAtacante) {
          lanzarEfectoVisual(obtenerEfectoVisualAtaque(bdCartas[mAtacante.id]), lpElem);
        }
        AudioManager.reproducirSFX('hit-super');
        mostrarMensajeToast(`¡${estadoOponente.nombre} atacó directamente tus LP (-${res.danoObjetivo} LP)!`);
      } else {
        if (slotJugadorElem && mAtacante) {
          lanzarEfectoVisual(obtenerEfectoVisualAtaque(bdCartas[mAtacante.id]), slotJugadorElem);
        }

        if (res.destruirObjetivo && mTarget) {
          estadoJugador.cementerio.push(mTarget.id);
          estadoJugador.zonaMonstruos[targetSlot] = null;
          if (slotJugadorElem) {
            crearNumeroFlotante("DESTRUIDO", slotJugadorElem, 'damage');
          }
          AudioManager.reproducirSFX('hit-super');
          setTimeout(() => AudioManager.reproducirSFX('faint'), 200);
          mostrarMensajeToast(`¡El rival destruyó a tu ${bdCartas[mTarget.id].nombre}!`);
        }

        if (res.destruirAtacante && mAtacante) {
          estadoOponente.cementerio.push(mAtacante.id);
          estadoOponente.zonaMonstruos[atacanteSlot] = null;
          if (slotRivalElem) {
            crearNumeroFlotante("DESTRUIDO", slotRivalElem, 'damage');
          }
          AudioManager.reproducirSFX('hit');
          mostrarMensajeToast(`¡Tu monstruo contraatacó y destruyó a ${bdCartas[mAtacante.id].nombre} rival!`);
        }

        estadoJugador.lp = res.lpObjetivoFinal;
        estadoOponente.lp = res.lpAtacanteFinal;

        const pLpElem = document.getElementById('player-lp-val');
        if (pLpElem) pLpElem.textContent = estadoJugador.lp;
        const oLpElem = document.getElementById('opponent-lp-val');
        if (oLpElem) oLpElem.textContent = estadoOponente.lp;

        if (res.danoObjetivo > 0 && pLpElem) {
          crearNumeroFlotante(`-${res.danoObjetivo} LP`, pLpElem, 'damage');
        }
        if (res.danoAtacante > 0 && oLpElem) {
          crearNumeroFlotante(`-${res.danoAtacante} LP`, oLpElem, 'damage');
        }
      }

      const gyPlayer = document.querySelector('#player-gy .slot-sub');
      if (gyPlayer) gyPlayer.textContent = estadoJugador.cementerio.length;
      const gyOpp = document.querySelector('#opponent-gy .slot-sub');
      if (gyOpp) gyOpp.textContent = estadoOponente.cementerio.length;

      renderizarCampoJugador();
      renderizarCampoOponente();
      actualizarMarcadorLateral();
      comprobarFinDelDuelo();
      return;
    }

    // 2. Sincronización completa del campo rival
    if (accion.tipo === 'SYNC_CAMPO') {
      estadoOponente.zonaMonstruos = accion.zonaMonstruos.map(m => m ? {
        id: m.id,
        posicion: m.posicion,
        haAtacado: !!m.haAtacado,
        atkMod: m.atkMod || 0,
        defMod: m.defMod || 0,
        equipos: m.equipos ? m.equipos.slice() : []
      } : null);

      estadoOponente.zonaMagiasTrampas = accion.zonaMagiasTrampas.map(t => t ? {
        id: t.id,
        bocaAbajo: !!t.bocaAbajo,
        activa: !!t.activa
      } : null);

      estadoOponente.lp = accion.lp;
      if (accion.cementerio) {
        estadoOponente.cementerio = accion.cementerio.slice();
      }

      const oppLpVal = document.getElementById('opponent-lp-val');
      if (oppLpVal) oppLpVal.textContent = accion.lp;

      const oppGySub = document.querySelector('#opponent-gy .slot-sub');
      if (oppGySub) oppGySub.textContent = estadoOponente.cementerio.length;

      const oppDeckSub = document.querySelector('#opponent-deck .slot-sub');
      if (oppDeckSub && accion.mazoCount !== undefined) oppDeckSub.textContent = accion.mazoCount;

      if (typeof accion.manoCount === 'number') {
        estadoOponente.mano = new Array(Math.max(0, accion.manoCount)).fill(null);
      }

      renderizarCampoOponente();
      renderizarManoOponente();
      actualizarMarcadorLateral();
      comprobarFinDelDuelo();
      return;
    }

    // 3. Notificación de Derrota por Mazo Vacío (Deck Out)
    if (accion.tipo === 'DECK_OUT') {
      this.dueloTerminado = true;
      localStorage.removeItem('pokeoh_active_online_match');
      mostrarMensajeToast("¡El rival se quedó sin cartas en su baraja (Deck Out)! ¡Has ganado el duelo!");
      mostrarFinDelDuelo(true);
      return;
    }

    // 4. Invocación de monstruo
    if (accion.tipo === 'INVOCAR_MONSTRUO') {
      if (accion.sacrificios && Array.isArray(accion.sacrificios)) {
        accion.sacrificios.forEach(sacIdx => {
          const sacM = estadoOponente.zonaMonstruos[sacIdx];
          if (sacM) {
            estadoOponente.cementerio.push(sacM.id);
            estadoOponente.zonaMonstruos[sacIdx] = null;
          }
        });
        const oppGySub = document.querySelector('#opponent-gy .slot-sub');
        if (oppGySub) oppGySub.textContent = estadoOponente.cementerio.length;
      }

      const slotIndex = accion.slotIndex;
      const carta = accion.carta;
      const posicion = accion.posicion || 'ataque';

      estadoOponente.zonaMonstruos[slotIndex] = {
        id: carta.id,
        posicion: posicion,
        haAtacado: false,
        modAtk: 0,
        modDef: 0,
        equipos: []
      };

      if (typeof accion.manoCount === 'number') {
        estadoOponente.mano = new Array(Math.max(0, accion.manoCount)).fill(null);
      } else if (estadoOponente.mano && estadoOponente.mano.length > 0) {
        estadoOponente.mano.pop();
      }

      AudioManager.reproducirSFX('card-place');
      renderizarCampoOponente();
      renderizarManoOponente();
      mostrarMensajeToast(`${estadoOponente.nombre} invocó a ${carta.nombre} en modo ${posicion.toUpperCase()}.`);
    } else if (accion.tipo === 'CAMBIAR_POSICION') {
      const m = estadoOponente.zonaMonstruos[accion.slotIndex];
      if (m) {
        m.posicion = accion.nuevaPosicion;
        AudioManager.reproducirSFX('card-place');
        renderizarCampoOponente();
      }
    } else if (accion.tipo === 'JUGAR_MAGIA_EQUIPO') {
      if (typeof accion.manoCount === 'number') {
        estadoOponente.mano = new Array(Math.max(0, accion.manoCount)).fill(null);
      } else if (estadoOponente.mano && estadoOponente.mano.length > 0) {
        estadoOponente.mano.pop();
      }

      if (accion.bocaAbajo) {
        estadoOponente.zonaMagiasTrampas[accion.slotIndex] = {
          id: accion.carta.id,
          bocaAbajo: true
        };
        mostrarMensajeToast(`${estadoOponente.nombre} colocó una carta boca abajo en su zona M/T.`);
      } else {
        mostrarMensajeToast(`${estadoOponente.nombre} activó ${accion.carta.nombre}.`);
      }
      AudioManager.reproducirSFX('card-place');
      renderizarCampoOponente();
      renderizarManoOponente();
    } else if (accion.tipo === 'PASAR_FASE') {
      if (accion.fase === 'FIN') {
        estadoJuego.turnoDe = 'jugador';
        estadoJuego.turno = accion.nuevoTurno || (estadoJuego.turno + 1);
        estadoJuego.haInvocadoMonstruoEsteTurno = false;
        estadoJuego.faseActual = 'PRINCIPAL';

        estadoJugador.zonaMonstruos.forEach(m => { if (m) m.haAtacado = false; });
        estadoOponente.zonaMonstruos.forEach(m => { if (m) m.haAtacado = false; });

        const roboOk = robarCartas(estadoJugador, 1);
        actualizarUIFases();
        renderizarMano(estadoJugador);
        renderizarCampoJugador();
        renderizarCampoOponente();
        renderizarManoOponente();
        if (roboOk) {
          mostrarMensajeToast(`¡Tu turno (Turno ${estadoJuego.turno})! Robaste 1 carta.`);
        }
      }
    } else if (accion.tipo === 'DESCARTAR_EXCESO') {
      const count = accion.descartes?.length || 1;
      if (typeof accion.manoCount === 'number') {
        estadoOponente.mano = new Array(Math.max(0, accion.manoCount)).fill(null);
      } else if (estadoOponente.mano) {
        for (let i = 0; i < count && estadoOponente.mano.length > 0; i++) {
          estadoOponente.mano.pop();
        }
      }
      renderizarManoOponente();
      mostrarMensajeToast(`${estadoOponente.nombre} descartó ${count} carta(s) al cementerio por límite de mano.`);
    }
  },

  desconectar(esTerminacionNormal = false) {
    if (this.enPartidaOnline && !esTerminacionNormal && !this.dueloTerminado) {
      if (typeof UserManager !== 'undefined') {
        UserManager.registrarResultadoDuelo(false, 0);
      }
      if (this.room) {
        try { this.room.send('surrender'); } catch (e) {}
      }
      localStorage.removeItem('pokeoh_active_online_match');
      mostrarMensajeToast("Has abandonado la partida online. Se registró como derrota.");
    }

    if (this.lobbyChannel) {
      const sb = SupabaseCloud.getClient();
      if (sb) {
        try { sb.removeChannel(this.lobbyChannel); } catch (e) {}
      }
      this.lobbyChannel = null;
    }

    if (this.room) {
      try { this.room.leave(); } catch (e) {}
      this.room = null;
    }
    this.enPartidaOnline = false;
    this.dueloTerminado = true;
    localStorage.removeItem('pokeoh_active_online_match');
  },

  initEventListeners() {
    const btnQuick = document.getElementById('btn-pvp-quick');
    const btnCreate = document.getElementById('btn-pvp-create-private');
    const btnJoinCode = document.getElementById('btn-pvp-join-code');
    const inputCode = document.getElementById('pvp-room-code-input');
    const btnCancelWait = document.getElementById('btn-pvp-cancel-wait');
    const btnCloseX = document.getElementById('btn-close-pvp-x');
    const btnClose = document.getElementById('btn-close-pvp');
    const modal = document.getElementById('pvp-online-modal');

    const cerrar = () => {
      this.desconectar();
      if (modal) modal.classList.add('hidden');
    };

    if (btnQuick) btnQuick.onclick = () => this.buscarPartidaRapida();
    if (btnCreate) btnCreate.onclick = () => this.crearSalaPrivada();
    if (btnJoinCode) {
      btnJoinCode.onclick = () => {
        const c = inputCode ? inputCode.value : '';
        this.unirseConCodigo(c);
      };
    }
    if (btnCancelWait) {
      btnCancelWait.onclick = () => {
        this.desconectar();
        this.cambiarVista('options');
      };
    }
    if (btnCloseX) btnCloseX.onclick = cerrar;
    if (btnClose) btnClose.onclick = cerrar;
  }
};

// ==========================================
// ADAPTACIÓN A CELULARES Y TABLETAS (HORIZONTAL + DETECCIÓN DE ROTACIÓN + TOUCH DRAG)
// ==========================================
function esDispositivoMovilOTablet() {
  const ua = navigator.userAgent || '';
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) ||
                  (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua);
  const isIPadOS = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
                   (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  const minDim = Math.min(window.innerWidth || 0, window.innerHeight || 0);
  const maxDim = Math.max(window.innerWidth || 0, window.innerHeight || 0);
  return isMobileUA || isIPadOS || (isTouch && maxDim <= 1366) || minDim <= 1024;
}

function verificarOrientacionDispositivo() {
  const overlay = document.getElementById('rotate-device-overlay');
  if (!overlay) return;

  const vw = window.innerWidth || document.documentElement.clientWidth || 0;
  const vh = window.innerHeight || document.documentElement.clientHeight || 0;
  const esVertical = vh > vw;
  const esMovilTablet = esDispositivoMovilOTablet();

  if (esVertical && esMovilTablet) {
    overlay.classList.remove('hidden');
    document.body.classList.add('is-portrait-locked');
  } else {
    overlay.classList.add('hidden');
    document.body.classList.remove('is-portrait-locked');
  }

  ajustarEscalaResponsiva();
}

function ajustarEscalaResponsiva() {
  const gameContainer = document.querySelector('.game-container');
  if (!gameContainer) return;

  const vw = window.innerWidth || document.documentElement.clientWidth || 0;
  const vh = window.innerHeight || document.documentElement.clientHeight || 0;
  const esVertical = vh > vw;

  if (esVertical) {
    // Mientras está en vertical con el aviso activo, limpiar transformaciones
    gameContainer.style.position = '';
    gameContainer.style.top = '';
    gameContainer.style.left = '';
    gameContainer.style.width = '';
    gameContainer.style.height = '';
    gameContainer.style.maxWidth = '';
    gameContainer.style.maxHeight = '';
    gameContainer.style.transform = '';
    document.documentElement.style.removeProperty('--card-width');
    return;
  }

  const sidebar = document.getElementById('duel-sidebar');
  const sidebarColapsado = sidebar && sidebar.classList.contains('sidebar-collapsed');

  // Dimensiones base cómodas en horizontal para que el tablero y las cartas se vean completos sin recortes
  const minW = sidebarColapsado ? 760 : 1050;
  const minH = 625;

  if (vh < minH || vw < minW) {
    const scaleX = (vw - 8) / minW;
    const scaleY = (vh - 8) / minH;
    const scale = Math.max(0.35, Math.min(1, scaleX, scaleY));

    const targetW = Math.floor((vw - 8) / scale);
    const targetH = Math.floor((vh - 8) / scale);

    gameContainer.style.position = 'fixed';
    gameContainer.style.top = '50%';
    gameContainer.style.left = '50%';
    gameContainer.style.width = `${targetW}px`;
    gameContainer.style.height = `${targetH}px`;
    gameContainer.style.maxWidth = 'none';
    gameContainer.style.maxHeight = 'none';
    gameContainer.style.transformOrigin = 'center center';
    gameContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
    document.documentElement.style.setProperty('--card-width', '68px');
  } else {
    gameContainer.style.position = '';
    gameContainer.style.top = '';
    gameContainer.style.left = '';
    gameContainer.style.width = '';
    gameContainer.style.height = '';
    gameContainer.style.maxWidth = '';
    gameContainer.style.maxHeight = '';
    gameContainer.style.transform = '';
    document.documentElement.style.removeProperty('--card-width');
  }
}

function configurarTouchDragCarta(cartaDiv, cartaId, datosCarta, indexMano) {
  let startX = 0;
  let startY = 0;
  let draggingTouch = false;
  let ghostEl = null;
  let ultimoSlotResaltado = null;

  const limpiarSlotResaltado = () => {
    if (ultimoSlotResaltado) {
      ultimoSlotResaltado.classList.remove('slot-drag-over');
      ultimoSlotResaltado = null;
    }
  };

  cartaDiv.addEventListener('touchstart', (e) => {
    if (!e.touches || e.touches.length !== 1) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    draggingTouch = false;
  }, { passive: true });

  cartaDiv.addEventListener('touchmove', (e) => {
    if (!e.touches || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;

    if (!draggingTouch && Math.hypot(dx, dy) > 14) {
      if (datosCarta && datosCarta.tipoCarta === 'monstruo' && estadoJuego.haInvocadoMonstruoEsteTurno) {
        mostrarAvisoYaInvocoEsteTurno(datosCarta, cartaDiv);
      }
      draggingTouch = true;
      cartaDiv.classList.add('dragging');
      if (datosCarta && datosCarta.sacrificios > 0 && !estadoJuego.haInvocadoMonstruoEsteTurno) {
        resaltarMonstruosSacrificables(true);
      }
      ghostEl = cartaDiv.cloneNode(true);
      ghostEl.style.position = 'fixed';
      ghostEl.style.width = '68px';
      ghostEl.style.height = '95px';
      ghostEl.style.pointerEvents = 'none';
      ghostEl.style.opacity = '0.88';
      ghostEl.style.zIndex = '90000';
      ghostEl.style.transform = 'translate(-50%, -50%) scale(1.05)';
      document.body.appendChild(ghostEl);
    }

    if (draggingTouch) {
      if (e.cancelable) e.preventDefault();
      if (ghostEl) {
        ghostEl.style.left = `${touch.clientX}px`;
        ghostEl.style.top = `${touch.clientY}px`;
      }

      const elemBajoDedo = document.elementFromPoint(touch.clientX, touch.clientY);
      const slotDestino = elemBajoDedo ? elemBajoDedo.closest('#player-side .monster-slot, #player-side .spell-trap-slot') : null;
      if (slotDestino !== ultimoSlotResaltado) {
        limpiarSlotResaltado();
        if (slotDestino) {
          slotDestino.classList.add('slot-drag-over');
          ultimoSlotResaltado = slotDestino;
        }
      }
    }
  }, { passive: false });

  const finalizarTouch = (e) => {
    if (!draggingTouch) return;
    draggingTouch = false;
    cartaDiv._touchDraggedReciente = true;
    setTimeout(() => { cartaDiv._touchDraggedReciente = false; }, 350);

    cartaDiv.classList.remove('dragging');
    resaltarMonstruosSacrificables(false);
    limpiarSlotResaltado();

    if (ghostEl && ghostEl.parentNode) {
      ghostEl.parentNode.removeChild(ghostEl);
    }
    ghostEl = null;

    const touch = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0] : null;
    if (!touch) return;

    const elemBajoDedo = document.elementFromPoint(touch.clientX, touch.clientY);
    const monsterSlot = elemBajoDedo ? elemBajoDedo.closest('#player-side .monster-slot') : null;
    const spellSlot = elemBajoDedo ? elemBajoDedo.closest('#player-side .spell-trap-slot') : null;

    const fakeEvent = {
      preventDefault: () => {},
      dataTransfer: {
        getData: () => JSON.stringify({ cartaId, indexMano })
      }
    };

    if (monsterSlot) {
      manejarDropMonstruo.call(monsterSlot, fakeEvent);
    } else if (spellSlot) {
      manejarDropMagiaTrampa.call(spellSlot, fakeEvent);
    } else if (datosCarta && datosCarta.tipoCarta === 'monstruo' && estadoJuego.haInvocadoMonstruoEsteTurno) {
      mostrarAvisoYaInvocoEsteTurno(datosCarta, cartaDiv);
    }
  };

  cartaDiv.addEventListener('touchend', finalizarTouch);
  cartaDiv.addEventListener('touchcancel', finalizarTouch);
}

function estaEnPantallaCompleta() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}

function actualizarBotonesFullscreenUI() {
  const isFull = estaEnPantallaCompleta();
  const isEn = configuracionJuego.idioma === 'en';

  const menuFsIcon = document.getElementById('menu-fs-icon');
  const menuFsText = document.getElementById('menu-fs-text');
  if (menuFsIcon) menuFsIcon.textContent = isFull ? '↩️' : '⛶';
  if (menuFsText) menuFsText.textContent = isFull ? (isEn ? 'Exit Full' : 'Salir Full') : (isEn ? 'Fullscreen' : 'Pantalla Full');

  const sideFsIcon = document.getElementById('sidebar-fs-icon');
  const sideFsText = document.getElementById('sidebar-fs-text');
  if (sideFsIcon) sideFsIcon.textContent = isFull ? '↩️' : '⛶';
  if (sideFsText) sideFsText.textContent = isFull ? (isEn ? 'EXIT FULL' : 'SALIR FULL') : (isEn ? 'FULLSCREEN' : 'PANTALLA FULL');

  const btnArenaFs = document.getElementById('btn-arena-fullscreen');
  if (btnArenaFs) {
    btnArenaFs.innerHTML = isFull ? '↩️ <span>Salir Full</span>' : '⛶ <span>Full</span>';
  }
}

async function toggleFullscreenJuego() {
  try {
    if (!estaEnPantallaCompleta()) {
      const el = document.documentElement;
      if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      }
      if (window.screen && window.screen.orientation && typeof window.screen.orientation.lock === 'function') {
        window.screen.orientation.lock('landscape').catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  } catch (e) {
    console.warn("No se pudo alternar pantalla completa:", e);
  }
  actualizarBotonesFullscreenUI();
  setTimeout(ajustarEscalaResponsiva, 100);
}

function inicializarAdaptacionMovilYRotacion() {
  // Botones de acceso rápido en la barra central (Panel Lateral y Pantalla Completa)
  const phaseControls = document.querySelector('.phase-controls');
  const sidebar = document.getElementById('duel-sidebar');
  if (phaseControls && sidebar && !document.getElementById('btn-toggle-sidebar-mobile')) {
    const btnToggle = document.createElement('button');
    btnToggle.type = 'button';
    btnToggle.id = 'btn-toggle-sidebar-mobile';
    btnToggle.className = 'btn-toggle-sidebar-mobile';
    btnToggle.innerHTML = '📊 <span>Panel</span>';
    btnToggle.title = 'Mostrar / Ocultar Panel Lateral';
    btnToggle.addEventListener('click', () => {
      sidebar.classList.toggle('sidebar-collapsed');
      const oculto = sidebar.classList.contains('sidebar-collapsed');
      btnToggle.innerHTML = oculto ? '📊 <span>Mostrar Panel</span>' : '📊 <span>Panel</span>';
      ajustarEscalaResponsiva();
    });
    phaseControls.insertBefore(btnToggle, phaseControls.firstChild);
  }

  if (phaseControls && !document.getElementById('btn-arena-fullscreen')) {
    const btnFsArena = document.createElement('button');
    btnFsArena.type = 'button';
    btnFsArena.id = 'btn-arena-fullscreen';
    btnFsArena.className = 'btn-arena-fullscreen';
    btnFsArena.innerHTML = '⛶ <span>Full</span>';
    btnFsArena.title = 'Alternar Pantalla Completa';
    btnFsArena.addEventListener('click', toggleFullscreenJuego);
    phaseControls.appendChild(btnFsArena);
  }

  const btnMenuFs = document.getElementById('btn-menu-fullscreen');
  if (btnMenuFs) btnMenuFs.addEventListener('click', toggleFullscreenJuego);

  const btnSideFs = document.getElementById('btn-sidebar-fullscreen');
  if (btnSideFs) btnSideFs.addEventListener('click', toggleFullscreenJuego);

  document.addEventListener('fullscreenchange', () => {
    actualizarBotonesFullscreenUI();
    setTimeout(ajustarEscalaResponsiva, 100);
  });
  document.addEventListener('webkitfullscreenchange', () => {
    actualizarBotonesFullscreenUI();
    setTimeout(ajustarEscalaResponsiva, 100);
  });

  // Ocultar el inspector al tocar fuera de una carta en pantallas táctiles
  document.addEventListener('touchstart', (e) => {
    const inspector = document.getElementById('card-inspector');
    if (!inspector || inspector.classList.contains('hidden')) return;
    if (!e.target.closest('.card-slot, .deck-visual-card')) {
      inspector.classList.add('hidden');
    }
  }, { passive: true });

  const dispararVerificacion = () => {
    verificarOrientacionDispositivo();
    setTimeout(verificarOrientacionDispositivo, 120);
    setTimeout(verificarOrientacionDispositivo, 320);
  };

  window.addEventListener('resize', dispararVerificacion);
  window.addEventListener('orientationchange', dispararVerificacion);
  if (window.screen && window.screen.orientation && typeof window.screen.orientation.addEventListener === 'function') {
    window.screen.orientation.addEventListener('change', dispararVerificacion);
  }
  if (window.matchMedia) {
    try {
      const mql = window.matchMedia('(orientation: portrait)');
      if (typeof mql.addEventListener === 'function') {
        mql.addEventListener('change', dispararVerificacion);
      } else if (typeof mql.addListener === 'function') {
        mql.addListener(dispararVerificacion);
      }
    } catch (e) {}
  }

  dispararVerificacion();
}

// Inicialización de la aplicación completa
function inicializarJuegoCompleto() {
  inicializarAdaptacionMovilYRotacion();
  configurarZonasMonstruo();
  configurarZonasMagiaTrampa();
  configurarBotonesAudio();
  inicializarModalTablaTipos();

  inicializarDeckBuilder();
  inicializarModalReglas();
  renderizarSelectorMazosPrePartida();

  inicializarMenuPrincipal();
  inicializarModalPrePartida();
  inicializarModalAjustes();

  // Inicializar Sistema de Usuarios y Multijugador
  UserManager.init();
  MultiplayerManager.init();

  aplicarIdioma('es');

  const btnNextPhase = document.getElementById('btn-next-phase');
  if (btnNextPhase) {
    btnNextPhase.addEventListener('click', avanzarFase);
  }

  // Preparar tablero en segundo plano para que se vea completo detrás del menú
  reiniciarDuelo();

  // Iniciar sonido de fondo al primer clic o interacción del usuario en pantalla
  const iniciarAudioInicial = () => {
    if (AudioManager.musicaHabilitada && !AudioManager.silenciadoTotal) {
      const isMenuVisible = document.getElementById('main-menu-overlay') && !document.getElementById('main-menu-overlay').classList.contains('hidden');
      AudioManager.reproducirMusicaTema(isMenuVisible ? 'menu' : 'batalla');
    }
  };
  document.body.addEventListener('click', iniciarAudioInicial, { once: true });
  document.body.addEventListener('touchstart', iniciarAudioInicial, { once: true });
  document.body.addEventListener('keydown', iniciarAudioInicial, { once: true });
}

// Iniciar tan pronto como el DOM esté disponible (sin esperar la carga de imágenes externas)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarJuegoCompleto);
} else {
  inicializarJuegoCompleto();
}

// Control estricto de desconexión / abandono de partida online
window.addEventListener('beforeunload', () => {
  if (typeof MultiplayerManager !== 'undefined' && MultiplayerManager.estaEnPartidaOnline() && !MultiplayerManager.dueloTerminado) {
    try {
      MultiplayerManager.room.send('surrender');
    } catch (e) {}
    if (typeof UserManager !== 'undefined') {
      UserManager.registrarResultadoDuelo(false, 0);
    }
    localStorage.removeItem('pokeoh_active_online_match');
  }
});
