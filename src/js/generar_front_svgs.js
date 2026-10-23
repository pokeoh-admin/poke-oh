const fs = require('fs');
const path = require('path');

const imgDir = path.resolve(__dirname, '..', 'img');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

function buildSvg(config) {
  const {
    bgColors,       // [c0, c60, c100]
    frameColors,    // [c0, c35, c70, c100]
    accentColors,   // [c0, c100]
    crestSvg,
    decorSvg
  } = config;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="110" height="154" viewBox="0 0 110 154">
  <defs>
    <!-- Background Radial Gradient -->
    <radialGradient id="bg" cx="50%" cy="45%" r="75%">
      <stop offset="0%" stop-color="${bgColors[0]}"/>
      <stop offset="60%" stop-color="${bgColors[1]}"/>
      <stop offset="100%" stop-color="${bgColors[2]}"/>
    </radialGradient>

    <!-- Outer Frame Linear Gradient -->
    <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${frameColors[0]}"/>
      <stop offset="35%" stop-color="${frameColors[1]}"/>
      <stop offset="70%" stop-color="${frameColors[2]}"/>
      <stop offset="100%" stop-color="${frameColors[3]}"/>
    </linearGradient>

    <!-- Accent / Crest Gradient -->
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${accentColors[0]}"/>
      <stop offset="100%" stop-color="${accentColors[1]}"/>
    </linearGradient>

    <!-- Subtle Glow Filter -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.8" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Base Card Background with Rounded Corners -->
  <rect width="110" height="154" rx="8" fill="url(#bg)"/>

  <!-- Outer Metallic Themed Frame -->
  <rect x="2" y="2" width="106" height="150" rx="8" fill="none" stroke="url(#frameGrad)" stroke-width="2.5"/>

  <!-- Inner Pinstripe Border -->
  <rect x="5.5" y="5.5" width="99" height="143" rx="5" fill="none" stroke="url(#accentGrad)" stroke-opacity="0.38" stroke-width="0.8"/>

  <!-- Top Title Bar Underlay -->
  <rect x="7" y="7" width="96" height="17" rx="3.5" fill="#000000" fill-opacity="0.45" stroke="url(#accentGrad)" stroke-opacity="0.25" stroke-width="0.6"/>

  <!-- Center Artwork Frame Box -->
  <rect x="8" y="26" width="94" height="88" rx="4" fill="#000000" fill-opacity="0.22" stroke="url(#frameGrad)" stroke-opacity="0.55" stroke-width="1.2"/>
  <rect x="10.5" y="28.5" width="89" height="83" rx="3" fill="none" stroke="url(#accentGrad)" stroke-opacity="0.25" stroke-width="0.6"/>

  <!-- Bottom Stats / Description Underlay -->
  <rect x="7" y="116" width="96" height="31" rx="3.5" fill="#000000" fill-opacity="0.55" stroke="url(#accentGrad)" stroke-opacity="0.25" stroke-width="0.6"/>

  <!-- Themed Crest and Decorative Vectors -->
  <g class="themed-decor">
    ${crestSvg}
    ${decorSvg}
  </g>
</svg>
`;
}

const templates = {
  // 1. FUEGO
  front_fuego: {
    bgColors: ['#381012', '#1e0607', '#080001'],
    frameColors: ['#FFF3A8', '#FF6B6B', '#EE5253', '#8B0000'],
    accentColors: ['#FFA502', '#FF4757'],
    crestSvg: `
      <!-- Fire Top Crest -->
      <path d="M55 4 C57 9 61 13 58 17 C55 15 55 13 53 16 C50 12 53 7 55 4 Z" fill="url(#accentGrad)" filter="url(#glow)"/>
    `,
    decorSvg: `
      <!-- Fiery Flares -->
      <path d="M7 138 Q14 124 11 117 Q15 125 21 134 Q18 120 27 115 Q25 127 30 140 Z" fill="url(#accentGrad)" opacity="0.3"/>
      <path d="M103 138 Q96 124 99 117 Q95 125 89 134 Q92 120 83 115 Q85 127 80 140 Z" fill="url(#accentGrad)" opacity="0.3"/>
      <!-- Embers -->
      <polygon points="18,36 19,38 21,39 19,40 18,42 17,40 15,39 17,38" fill="#FFA502" opacity="0.75"/>
      <polygon points="92,36 93,38 95,39 93,40 92,42 91,40 89,39 91,38" fill="#FFA502" opacity="0.75"/>
      <polygon points="17,100 18,102 20,103 18,104 17,106 16,104 14,103 16,102" fill="#FF4757" opacity="0.6"/>
      <polygon points="93,100 94,102 96,103 94,104 93,106 92,104 90,103 92,102" fill="#FF4757" opacity="0.6"/>
    `
  },

  // 2. AGUA
  front_agua: {
    bgColors: ['#08203e', '#051326', '#01060e'],
    frameColors: ['#DFF9FB', '#48DBFB', '#0ABDE3', '#003B7B'],
    accentColors: ['#70A1FF', '#1E90FF'],
    crestSvg: `
      <!-- Droplet Top Crest -->
      <path d="M55 4 C58 9 61 13 61 16 A6 6 0 0 1 49 16 C49 13 52 9 55 4 Z" fill="url(#accentGrad)" filter="url(#glow)"/>
    `,
    decorSvg: `
      <!-- Water Waves at bottom -->
      <path d="M7 136 Q22 127 42 135 T78 132 T103 138 L103 146 L7 146 Z" fill="url(#accentGrad)" opacity="0.22"/>
      <!-- Bubbles -->
      <circle cx="18" cy="46" r="3" fill="none" stroke="#70A1FF" stroke-width="0.8" opacity="0.65"/>
      <circle cx="92" cy="42" r="3.5" fill="none" stroke="#70A1FF" stroke-width="0.8" opacity="0.65"/>
      <circle cx="17" cy="98" r="2.5" fill="none" stroke="#70A1FF" stroke-width="0.8" opacity="0.55"/>
      <circle cx="93" cy="94" r="3" fill="none" stroke="#70A1FF" stroke-width="0.8" opacity="0.55"/>
      <!-- Tidal corner arcs -->
      <path d="M7 16 A10 10 0 0 1 17 6" fill="none" stroke="#48DBFB" stroke-width="1.2" opacity="0.5"/>
      <path d="M103 16 A10 10 0 0 0 93 6" fill="none" stroke="#48DBFB" stroke-width="1.2" opacity="0.5"/>
    `
  },

  // 3. PLANTA
  front_planta: {
    bgColors: ['#0e2a14', '#07190b', '#020803'],
    frameColors: ['#E4FDE1', '#2ED573', '#10AC84', '#0B4226'],
    accentColors: ['#7BED9F', '#2ECC71'],
    crestSvg: `
      <!-- Sprout Leaf Top Crest -->
      <path d="M55 4 C59 8 59 14 55 18 C51 14 51 8 55 4 Z" fill="url(#accentGrad)" filter="url(#glow)"/>
    `,
    decorSvg: `
      <!-- Leaf Vine spirals along borders -->
      <path d="M7 18 C12 22 12 30 7 34" fill="none" stroke="#2ED573" stroke-width="1.2" opacity="0.65"/>
      <path d="M103 18 C98 22 98 30 103 34" fill="none" stroke="#2ED573" stroke-width="1.2" opacity="0.65"/>
      <!-- Little leaves -->
      <path d="M16 128 C23 124 27 132 20 135 C17 134 16 130 16 128 Z" fill="#2ED573" opacity="0.35"/>
      <path d="M94 128 C87 124 83 132 90 135 C93 134 94 130 94 128 Z" fill="#2ED573" opacity="0.35"/>
      <!-- Foliage corners -->
      <path d="M7 6 Q14 12 17 6" fill="none" stroke="#7BED9F" stroke-width="1" opacity="0.6"/>
      <path d="M103 6 Q96 12 93 6" fill="none" stroke="#7BED9F" stroke-width="1" opacity="0.6"/>
    `
  },

  // 4. ELECTRICO
  front_electrico: {
    bgColors: ['#2e2507', '#1a1503', '#080601'],
    frameColors: ['#FFFDE4', '#FECA57', '#FFA502', '#8B5E00'],
    accentColors: ['#FFEAA7', '#F1C40F'],
    crestSvg: `
      <!-- Lightning Top Crest -->
      <polygon points="56,3 51,10 55,10 53,18 59,9 55,9" fill="url(#accentGrad)" filter="url(#glow)"/>
    `,
    decorSvg: `
      <!-- Jagged electric lightning side bolts -->
      <path d="M6 38 L11 45 L8 48 L13 58 L10 61 L14 72" fill="none" stroke="#FFEAA7" stroke-width="1.3" opacity="0.75" filter="url(#glow)"/>
      <path d="M104 38 L99 45 L102 48 L97 58 L100 61 L96 72" fill="none" stroke="#FFEAA7" stroke-width="1.3" opacity="0.75" filter="url(#glow)"/>
      <!-- Electric sparks -->
      <polygon points="18,130 20,132 23,133 20,134 18,136 17,134 14,133 17,132" fill="#FECA57" opacity="0.8"/>
      <polygon points="92,130 93,132 96,133 93,134 92,136 90,134 88,133 90,132" fill="#FECA57" opacity="0.8"/>
    `
  },

  // 5. TIERRA
  front_tierra: {
    bgColors: ['#2c1708', '#180b03', '#0a0401'],
    frameColors: ['#FFEAA7', '#E67E22', '#D35400', '#6E2C00'],
    accentColors: ['#F39C12', '#CD6133'],
    crestSvg: `
      <!-- Mountain Earth Top Crest -->
      <polygon points="55,4 62,17 48,17" fill="url(#accentGrad)" filter="url(#glow)"/>
      <polygon points="60,8 66,17 55,17" fill="url(#accentGrad)" opacity="0.7"/>
    `,
    decorSvg: `
      <!-- Tectonic Fissure Lines -->
      <path d="M7 65 L12 72 L9 79 L13 86 L10 93" fill="none" stroke="#E67E22" stroke-width="1.2" opacity="0.65"/>
      <path d="M103 65 L98 72 L101 79 L97 86 L100 93" fill="none" stroke="#E67E22" stroke-width="1.2" opacity="0.65"/>
      <!-- Terracotta angular corner brackets -->
      <polygon points="6,6 16,6 6,16" fill="#D35400" opacity="0.5"/>
      <polygon points="104,6 94,6 104,16" fill="#D35400" opacity="0.5"/>
      <polygon points="6,148 16,148 6,138" fill="#D35400" opacity="0.5"/>
      <polygon points="104,148 94,148 104,138" fill="#D35400" opacity="0.5"/>
    `
  },

  // 6. ROCA
  front_roca: {
    bgColors: ['#1e2328', '#111417', '#050607'],
    frameColors: ['#F1F2F6', '#CED6E0', '#747D8C', '#2F3542'],
    accentColors: ['#DFE4EA', '#57606F'],
    crestSvg: `
      <!-- Crystal Geode Top Crest -->
      <polygon points="55,4 62,10 55,17 48,10" fill="url(#accentGrad)" filter="url(#glow)"/>
    `,
    decorSvg: `
      <!-- Angular Rock Facets in Corners -->
      <polygon points="7,7 18,7 7,18" fill="#747D8C" opacity="0.65"/>
      <polygon points="103,7 92,7 103,18" fill="#747D8C" opacity="0.65"/>
      <polygon points="7,147 18,147 7,136" fill="#747D8C" opacity="0.65"/>
      <polygon points="103,147 92,147 103,136" fill="#747D8C" opacity="0.65"/>
      <!-- Stone shard lines -->
      <line x1="8" y1="50" x2="8" y2="70" stroke="#CED6E0" stroke-width="1.5" opacity="0.5"/>
      <line x1="102" y1="50" x2="102" y2="70" stroke="#CED6E0" stroke-width="1.5" opacity="0.5"/>
    `
  },

  // 7. HIELO
  front_hielo: {
    bgColors: ['#081f33', '#04101c', '#01050a'],
    frameColors: ['#FFFFFF', '#A0E7E5', '#70A1FF', '#1E3799'],
    accentColors: ['#DFF9FB', '#48DBFB'],
    crestSvg: `
      <!-- Snowflake Top Crest -->
      <line x1="55" y1="3" x2="55" y2="17" stroke="#DFF9FB" stroke-width="1.4" filter="url(#glow)"/>
      <line x1="48" y1="10" x2="62" y2="10" stroke="#DFF9FB" stroke-width="1.4" filter="url(#glow)"/>
      <line x1="50" y1="5" x2="60" y2="15" stroke="#DFF9FB" stroke-width="1.1"/>
      <line x1="50" y1="15" x2="60" y2="5" stroke="#DFF9FB" stroke-width="1.1"/>
    `,
    decorSvg: `
      <!-- Hanging Icicles -->
      <polygon points="14,26 17,35 20,26" fill="#A0E7E5" opacity="0.6"/>
      <polygon points="90,26 93,35 96,26" fill="#A0E7E5" opacity="0.6"/>
      <!-- Frost sparkles -->
      <polygon points="18,128 20,131 23,132 20,133 18,136 17,133 14,132 17,131" fill="#FFFFFF" opacity="0.8"/>
      <polygon points="92,128 94,131 97,132 94,133 92,136 91,133 88,132 91,131" fill="#FFFFFF" opacity="0.8"/>
    `
  },

  // 8. LUCHA
  front_lucha: {
    bgColors: ['#2d0f11', '#180608', '#080102'],
    frameColors: ['#FFD269', '#FF6348', '#EE5253', '#7B1113'],
    accentColors: ['#FFA502', '#EB4D4B'],
    crestSvg: `
      <!-- Martial Cross Crest -->
      <circle cx="55" cy="10" r="5" fill="none" stroke="url(#accentGrad)" stroke-width="1.5" filter="url(#glow)"/>
      <line x1="49" y1="4" x2="61" y2="16" stroke="url(#accentGrad)" stroke-width="1.4"/>
      <line x1="61" y1="4" x2="49" y2="16" stroke="url(#accentGrad)" stroke-width="1.4"/>
    `,
    decorSvg: `
      <!-- Martial Impact Slashes -->
      <polygon points="7,40 13,36 11,46" fill="#EE5253" opacity="0.65"/>
      <polygon points="103,40 97,36 99,46" fill="#EE5253" opacity="0.65"/>
      <!-- Combat Studs -->
      <circle cx="12" cy="12" r="1.5" fill="#FFD269" opacity="0.9"/>
      <circle cx="98" cy="12" r="1.5" fill="#FFD269" opacity="0.9"/>
      <circle cx="12" cy="142" r="1.5" fill="#FFD269" opacity="0.9"/>
      <circle cx="98" cy="142" r="1.5" fill="#FFD269" opacity="0.9"/>
    `
  },

  // 9. VENENO
  front_veneno: {
    bgColors: ['#230d2d', '#130619', '#06010a'],
    frameColors: ['#F8EFBA', '#D980FA', '#8854D0', '#431668'],
    accentColors: ['#E056FD', '#9B59B6'],
    crestSvg: `
      <!-- Toxic Droplet Top Crest -->
      <path d="M55 4 C59 8 62 13 60 17 C58 19 52 19 50 17 C48 13 51 8 55 4 Z" fill="url(#accentGrad)" filter="url(#glow)"/>
    `,
    decorSvg: `
      <!-- Corrosive Toxic Bubbles -->
      <circle cx="15" cy="55" r="3" fill="#D980FA" opacity="0.45"/>
      <circle cx="95" cy="60" r="3.5" fill="#D980FA" opacity="0.45"/>
      <circle cx="17" cy="95" r="2.5" fill="#D980FA" opacity="0.45"/>
      <circle cx="93" cy="98" r="3" fill="#D980FA" opacity="0.45"/>
      <!-- Miasma curve lines -->
      <path d="M7 25 Q12 32 7 38" fill="none" stroke="#D980FA" stroke-width="1.2" opacity="0.6"/>
      <path d="M103 25 Q98 32 103 38" fill="none" stroke="#D980FA" stroke-width="1.2" opacity="0.6"/>
    `
  },

  // 10. PSIQUICO
  front_psiquico: {
    bgColors: ['#2b0b2e', '#160418', '#070108'],
    frameColors: ['#FDEB71', '#FDA7DF', '#B53471', '#531034'],
    accentColors: ['#FF9FF3', '#E056FD'],
    crestSvg: `
      <!-- Astral Mind Eye Top Crest -->
      <path d="M47 10 Q55 4 63 10 Q55 16 47 10 Z" fill="none" stroke="url(#accentGrad)" stroke-width="1.5" filter="url(#glow)"/>
      <circle cx="55" cy="10" r="2.2" fill="url(#accentGrad)"/>
    `,
    decorSvg: `
      <!-- Astral 4-point stars -->
      <polygon points="18,36 19,39 22,40 19,41 18,44 17,41 14,40 17,39" fill="#FF9FF3" opacity="0.75"/>
      <polygon points="92,36 93,39 96,40 93,41 92,44 91,41 88,40 91,39" fill="#FF9FF3" opacity="0.75"/>
      <polygon points="17,130 18,133 21,134 18,135 17,138 16,135 13,134 16,133" fill="#FF9FF3" opacity="0.7"/>
      <polygon points="93,130 94,133 97,134 94,135 93,138 92,135 89,134 92,133" fill="#FF9FF3" opacity="0.7"/>
    `
  },

  // 11. BICHO
  front_bicho: {
    bgColors: ['#19260c', '#0e1605', '#040701'],
    frameColors: ['#F5F6FA', '#C4E538', '#A3CB38', '#2C5E1A'],
    accentColors: ['#7BED9F', '#6AB04C'],
    crestSvg: `
      <!-- Beetle Carapace Antennae Crest -->
      <ellipse cx="55" cy="11" rx="3.5" ry="4.5" fill="url(#accentGrad)" filter="url(#glow)"/>
      <path d="M52 7 C49 3 46 3 44 4" fill="none" stroke="url(#accentGrad)" stroke-width="1.2"/>
      <path d="M58 7 C61 3 64 3 66 4" fill="none" stroke="url(#accentGrad)" stroke-width="1.2"/>
    `,
    decorSvg: `
      <!-- Chitin Hexagonal Grid Accents -->
      <polygon points="11,48 15,46 19,48 19,52 15,54 11,52" fill="none" stroke="#A3CB38" stroke-width="0.9" opacity="0.6"/>
      <polygon points="99,48 95,46 91,48 91,52 95,54 99,52" fill="none" stroke="#A3CB38" stroke-width="0.9" opacity="0.6"/>
      <polygon points="11,88 15,86 19,88 19,92 15,94 11,92" fill="none" stroke="#A3CB38" stroke-width="0.9" opacity="0.6"/>
      <polygon points="99,88 95,86 91,88 91,92 95,94 99,92" fill="none" stroke="#A3CB38" stroke-width="0.9" opacity="0.6"/>
    `
  },

  // 12. FANTASMA
  front_fantasma: {
    bgColors: ['#18132e', '#0e0b1c', '#05030b'],
    frameColors: ['#E056FD', '#9980FA', '#5758BB', '#231F4F'],
    accentColors: ['#C7ECEE', '#8C7AE6'],
    crestSvg: `
      <!-- Ghost Flame Wisp Crest -->
      <path d="M55 4 C59 8 61 13 57 18 C55 16 54 14 52 17 C48 12 51 7 55 4 Z" fill="url(#accentGrad)" filter="url(#glow)"/>
    `,
    decorSvg: `
      <!-- Spectral Wisps -->
      <path d="M11 65 Q15 60 13 55 Q17 58 14 62 Z" fill="#9980FA" opacity="0.5"/>
      <path d="M99 65 Q95 60 97 55 Q93 58 96 62 Z" fill="#9980FA" opacity="0.5"/>
      <!-- Phantom Eyes -->
      <ellipse cx="20" cy="132" rx="2.5" ry="1.2" fill="#C7ECEE" opacity="0.6"/>
      <ellipse cx="90" cy="132" rx="2.5" ry="1.2" fill="#C7ECEE" opacity="0.6"/>
    `
  },

  // 13. DRAGON
  front_dragon: {
    bgColors: ['#0d1733', '#070c1c', '#02040a'],
    frameColors: ['#55E6C1', '#00D2D3', '#4834D4', '#1B1464'],
    accentColors: ['#3DC1D3', '#22A6B3'],
    crestSvg: `
      <!-- Dragon Horns Crest -->
      <path d="M55 4 L58 10 L64 7 L61 13 L65 14 L55 19 L45 14 L49 13 L46 7 L52 10 Z" fill="url(#accentGrad)" filter="url(#glow)"/>
    `,
    decorSvg: `
      <!-- Dragonscale Chevrons -->
      <path d="M8 44 L13 47 L8 50" fill="none" stroke="#00D2D3" stroke-width="1.3" opacity="0.65"/>
      <path d="M8 52 L13 55 L8 58" fill="none" stroke="#00D2D3" stroke-width="1.3" opacity="0.65"/>
      <path d="M102 44 L97 47 L102 50" fill="none" stroke="#00D2D3" stroke-width="1.3" opacity="0.65"/>
      <path d="M102 52 L97 55 L102 58" fill="none" stroke="#00D2D3" stroke-width="1.3" opacity="0.65"/>
    `
  },

  // 14. HADA
  front_hada: {
    bgColors: ['#2e1029', '#190716', '#080107'],
    frameColors: ['#FFF3B0', '#FF9FF3', '#ED4C67', '#6D1438'],
    accentColors: ['#FD79A8', '#FFB8B8'],
    crestSvg: `
      <!-- Starlight Fairy Tiara Crest -->
      <polygon points="55,3 57,9 64,10 59,15 60,21 55,17 50,21 51,15 46,10 53,9" fill="url(#accentGrad)" filter="url(#glow)"/>
    `,
    decorSvg: `
      <!-- Fairy Stardust -->
      <polygon points="18,34 19,37 22,38 19,39 18,42 17,39 14,38 17,37" fill="#FFF3B0" opacity="0.8"/>
      <polygon points="92,34 93,37 96,38 93,39 92,42 91,39 88,38 91,37" fill="#FFF3B0" opacity="0.8"/>
      <polygon points="17,126 18,129 21,130 18,131 17,134 16,131 13,130 16,129" fill="#FFF3B0" opacity="0.75"/>
      <polygon points="93,126 94,129 97,130 94,131 93,134 92,131 89,130 92,129" fill="#FFF3B0" opacity="0.75"/>
    `
  },

  // 15. NORMAL
  front_normal: {
    bgColors: ['#1c2126', '#101316', '#060708'],
    frameColors: ['#FFFFFF', '#CED6E0', '#747D8C', '#2F3542'],
    accentColors: ['#DFE4EA', '#A4B0BE'],
    crestSvg: `
      <!-- Poké-Core Classic Crest -->
      <circle cx="55" cy="10" r="5" fill="none" stroke="url(#accentGrad)" stroke-width="1.4" filter="url(#glow)"/>
      <circle cx="55" cy="10" r="2" fill="url(#accentGrad)"/>
    `,
    decorSvg: `
      <!-- Precision Linear Chamfers -->
      <line x1="8" y1="20" x2="8" y2="40" stroke="#CED6E0" stroke-width="1.3" opacity="0.55"/>
      <line x1="102" y1="20" x2="102" y2="40" stroke="#CED6E0" stroke-width="1.3" opacity="0.55"/>
      <polygon points="9,9 14,9 9,14" fill="#CED6E0" opacity="0.7"/>
      <polygon points="101,9 96,9 101,14" fill="#CED6E0" opacity="0.7"/>
      <polygon points="9,145 14,145 9,140" fill="#CED6E0" opacity="0.7"/>
      <polygon points="101,145 96,145 101,140" fill="#CED6E0" opacity="0.7"/>
    `
  },

  // 16. EQUIPO (Equipment Cards)
  front_equipo: {
    bgColors: ['#2b190a', '#180d04', '#090401'],
    frameColors: ['#FFF3B0', '#F39C12', '#D35400', '#78281F'],
    accentColors: ['#F1C40F', '#E67E22'],
    crestSvg: `
      <!-- Crossed Swords & Shield Emblem Crest -->
      <path d="M51 6 L59 14 M59 6 L51 14" stroke="url(#accentGrad)" stroke-width="1.8" filter="url(#glow)"/>
      <circle cx="55" cy="10" r="3" fill="#FFEAA7" stroke="#D35400" stroke-width="1"/>
    `,
    decorSvg: `
      <!-- Forged Steel Armor Corner Brackets with Rivets -->
      <polygon points="6,6 18,6 18,10 10,10 10,18 6,18" fill="url(#frameGrad)"/>
      <circle cx="12" cy="12" r="1.3" fill="#FFFFFF"/>
      <polygon points="104,6 92,6 92,10 100,10 100,18 104,18" fill="url(#frameGrad)"/>
      <circle cx="98" cy="12" r="1.3" fill="#FFFFFF"/>
      <polygon points="6,148 18,148 18,144 10,144 10,136 6,136" fill="url(#frameGrad)"/>
      <circle cx="12" cy="142" r="1.3" fill="#FFFFFF"/>
      <polygon points="104,148 92,148 92,144 100,144 100,136 104,136" fill="url(#frameGrad)"/>
      <circle cx="98" cy="142" r="1.3" fill="#FFFFFF"/>
      <!-- Weapon Blade Lines -->
      <line x1="7" y1="50" x2="7" y2="70" stroke="#F1C40F" stroke-width="1.5" opacity="0.6"/>
      <line x1="103" y1="50" x2="103" y2="70" stroke="#F1C40F" stroke-width="1.5" opacity="0.6"/>
    `
  },

  // 17. MAGIA (Spell Cards)
  front_magia: {
    bgColors: ['#062420', '#031412', '#010605'],
    frameColors: ['#A8FF78', '#1DD1A1', '#10AC84', '#0B5345'],
    accentColors: ['#55E6C1', '#00D2D3'],
    crestSvg: `
      <!-- Mystic Arcane Rune Eye Crest -->
      <circle cx="55" cy="10" r="5" fill="none" stroke="url(#accentGrad)" stroke-width="1.4" filter="url(#glow)"/>
      <polygon points="55,5 59,12 51,12" fill="url(#accentGrad)"/>
    `,
    decorSvg: `
      <!-- Arcane Spell Circles in Corners with Runes -->
      <circle cx="14" cy="14" r="4.5" fill="none" stroke="#1DD1A1" stroke-width="0.8" opacity="0.75"/>
      <polygon points="14,10 17,14 14,18 11,14" fill="#1DD1A1" opacity="0.65"/>
      <circle cx="96" cy="14" r="4.5" fill="none" stroke="#1DD1A1" stroke-width="0.8" opacity="0.75"/>
      <polygon points="96,10 99,14 96,18 93,14" fill="#1DD1A1" opacity="0.65"/>
      <circle cx="14" cy="140" r="4.5" fill="none" stroke="#1DD1A1" stroke-width="0.8" opacity="0.75"/>
      <polygon points="14,136 17,140 14,144 11,140" fill="#1DD1A1" opacity="0.65"/>
      <circle cx="96" cy="140" r="4.5" fill="none" stroke="#1DD1A1" stroke-width="0.8" opacity="0.75"/>
      <polygon points="96,136 99,140 96,144 93,140" fill="#1DD1A1" opacity="0.65"/>
      <!-- Magic Wand Star Glyphs -->
      <circle cx="55" cy="70" r="28" fill="none" stroke="#1DD1A1" stroke-opacity="0.12" stroke-width="1.5" stroke-dasharray="3,3"/>
    `
  },

  // 18. TRAMPA (Trap Cards)
  front_trampa: {
    bgColors: ['#280a29', '#160417', '#070108'],
    frameColors: ['#FF7675', '#E84393', '#9B59B6', '#4A154B'],
    accentColors: ['#FD79A8', '#E056FD'],
    crestSvg: `
      <!-- Trap Reticle / Trigger Sigil Crest -->
      <circle cx="55" cy="10" r="5" fill="none" stroke="url(#accentGrad)" stroke-width="1.4" filter="url(#glow)"/>
      <line x1="49" y1="10" x2="61" y2="10" stroke="url(#accentGrad)" stroke-width="1.4"/>
      <line x1="55" y1="4" x2="55" y2="16" stroke="url(#accentGrad)" stroke-width="1.4"/>
    `,
    decorSvg: `
      <!-- Serrated Trap Jaws / Hazard Slashes -->
      <polygon points="6,45 12,48 6,51" fill="#E84393" opacity="0.75"/>
      <polygon points="6,55 12,58 6,61" fill="#E84393" opacity="0.75"/>
      <polygon points="6,65 12,68 6,71" fill="#E84393" opacity="0.75"/>
      <polygon points="104,45 98,48 104,51" fill="#E84393" opacity="0.75"/>
      <polygon points="104,55 98,58 104,61" fill="#E84393" opacity="0.75"/>
      <polygon points="104,65 98,68 104,71" fill="#E84393" opacity="0.75"/>
      <!-- Ambush reticle dots -->
      <circle cx="14" cy="14" r="1.8" fill="#FF7675" opacity="0.85"/>
      <circle cx="96" cy="14" r="1.8" fill="#FF7675" opacity="0.85"/>
      <circle cx="14" cy="140" r="1.8" fill="#FF7675" opacity="0.85"/>
      <circle cx="96" cy="140" r="1.8" fill="#FF7675" opacity="0.85"/>
    `
  }
};

let count = 0;
for (const [name, cfg] of Object.entries(templates)) {
  const svgContent = buildSvg(cfg);
  const outPath = path.join(imgDir, `${name}.svg`);
  fs.writeFileSync(outPath, svgContent, 'utf8');
  console.log(`✓ Generado: ${name}.svg`);
  count++;
}

console.log(`\n¡Éxito! Se han generado ${count} archivos SVG frontales en: ${imgDir}`);
