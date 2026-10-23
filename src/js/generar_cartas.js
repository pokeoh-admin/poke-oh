// Script para generar la base de datos completa de las 151 cartas de Pokémon y todos los ítems
const fs = require('fs');
const path = require('path');

const pokemonRaw = [
  [1, "Bulbasaur", "bulbasaur", "planta", "Básico", 0, 1000, 1200, 4, "Pokémon Básico. La semilla en su lomo crece absorbiendo la luz del sol.", "Semilla tenaz y resistente"],
  [2, "Ivysaur", "ivysaur", "planta", "Fase 1", 1, 1600, 1500, 5, "Evolución de Bulbasaur. El capullo en su espalda florece liberando aroma dulce.", "Fase 1: Requiere 1 Sacrificio"],
  [3, "Venusaur", "venusaur", "planta", "Fase 2", 2, 2500, 2500, 7, "Evolución Suprema. Su enorme flor absorbe energía solar para liberar Rayo Solar.", "Fase 2: Requiere 2 Sacrificios"],
  [4, "Charmander", "charmander", "fuego", "Básico", 0, 1100, 900, 4, "Pokémon Básico. La llama de su cola arde con vigor según sus emociones.", "Fuego equilibrado y rápido"],
  [5, "Charmeleon", "charmeleon", "fuego", "Fase 1", 1, 1700, 1300, 5, "Evolución de Charmander. Rasga a sus enemigos con afiladas garras candentes.", "Fase 1: Requiere 1 Sacrificio"],
  [6, "Charizard", "charizard", "fuego", "Fase 2", 2, 2800, 2300, 8, "Evolución Suprema. Escupe llamaradas capaces de derretir rocas enormes.", "Fase 2: Requiere 2 Sacrificios"],
  [7, "Squirtle", "squirtle", "agua", "Básico", 0, 900, 1400, 4, "Pokémon Básico. Dispara chorros de agua y se guarece en su duro caparazón.", "Alta defensa de caparazón"],
  [8, "Wartortle", "wartortle", "agua", "Fase 1", 1, 1500, 1800, 5, "Evolución de Squirtle. Su cola peluda es símbolo de longevidad y destreza marina.", "Fase 1: Requiere 1 Sacrificio"],
  [9, "Blastoise", "blastoise", "agua", "Fase 2", 2, 2600, 2700, 8, "Evolución Suprema. Dispara potentes cañones de agua capaces de perforar acero.", "Fase 2: Muralla marina y cañones"],
  [10, "Caterpie", "caterpie", "bicho", "Básico", 0, 400, 500, 1, "Pokémon Gusano. Libera un hedor desagradable por sus antenas rojas.", "Básico veloz de inicio"],
  [11, "Metapod", "metapod", "bicho", "Fase 1", 0, 300, 1600, 3, "Pokémon Capullo. Su coraza de acero endurecido resiste todo impacto frontal.", "Gran armadura defensiva"],
  [12, "Butterfree", "butterfree", "bicho", "Fase 2", 1, 1700, 1400, 5, "Evolución de Metapod. Esparce polvos somníferos y venenosos batiendo sus alas.", "Fase 2: Polvos debilitantes"],
  [13, "Weedle", "weedle", "bicho", "Básico", 0, 500, 400, 1, "Pokémon Oruga. Tiene un aguijón afilado en su cabeza cargado de ponzoña.", "Picadura venenosa básica"],
  [14, "Kakuna", "kakuna", "bicho", "Fase 1", 0, 300, 1500, 3, "Pokémon Capullo. Permanece inmóvil esperando su evolución final.", "Coraza defensiva"],
  [15, "Beedrill", "beedrill", "bicho", "Fase 2", 1, 1900, 1200, 5, "Evolución de Kakuna. Vuela velozmente acribillando con tres potentes aguijones.", "Fase 2: Ataque triple aguijón"],
  [16, "Pidgey", "pidgey", "normal", "Básico", 0, 800, 700, 2, "Pokémon Pájaro. Docil y rápido, levanta ráfagas de arena con sus alas.", "Pájaro veloz básico"],
  [17, "Pidgeotto", "pidgeotto", "normal", "Fase 1", 0, 1300, 1000, 4, "Evolución de Pidgey. Vigila su amplio territorio y ataca en picado.", "Garra voladora certera"],
  [18, "Pidgeot", "pidgeot", "normal", "Fase 2", 1, 2200, 1800, 6, "Evolución Suprema. Vuela a Mach 2 desatando tornados devastadores.", "Fase 2: Requiere 1 Sacrificio"],
  [19, "Rattata", "rattata", "normal", "Básico", 0, 700, 600, 2, "Pokémon Ratón. Roedor ágil cuyos colmillos afilados crecen continuamente.", "Mordisco hiperveloz"],
  [20, "Raticate", "raticate", "normal", "Fase 1", 0, 1500, 1100, 4, "Evolución de Rattata. Su Hipercolmillo es capaz de quebrar estructuras de hormigón.", "Fase 1: Devastador colmillo"],
  [21, "Spearow", "spearow", "normal", "Básico", 0, 900, 600, 2, "Pokémon Pajarito. Muy agresivo, emite graznidos chirriantes para intimidar.", "Picotazo agresivo"],
  [22, "Fearow", "fearow", "normal", "Fase 1", 1, 1800, 1200, 5, "Evolución de Spearow. Su enorme pico le permite cazar en vuelo rasante.", "Fase 1: Requiere 1 Sacrificio"],
  [23, "Ekans", "ekans", "veneno", "Básico", 0, 900, 800, 3, "Pokémon Serpiente. Se enrosca en silencio para emboscar a sus presas.", "Constricción venenosa"],
  [24, "Arbok", "arbok", "veneno", "Fase 1", 1, 1800, 1400, 5, "Evolución de Ekans. El dibujo intimidatorio de su vientre paraliza de terror.", "Fase 1: Mirada petrificante"],
  [25, "Pikachu", "pikachu", "electrico", "Básico", 0, 1200, 800, 4, "Pokémon Ratón Eléctrico. Almacena electricidad en sus mofletes y lanza rayos.", "Eléctrico rápido icónico"],
  [26, "Raichu", "raichu", "electrico", "Fase 1", 1, 2100, 1500, 6, "Evolución de Pikachu. Su cola actúa como toma de tierra para descargas de 100.000 voltios.", "Fase 1: Requiere 1 Sacrificio"],
  [27, "Sandshrew", "sandshrew", "tierra", "Básico", 0, 900, 1300, 3, "Pokémon Ratón. Se hace una bola impenetrable para rodar por el desierto.", "Coraza arenosa resistente"],
  [28, "Sandslash", "sandslash", "tierra", "Fase 1", 1, 1800, 1900, 5, "Evolución de Sandshrew. Sus púas dorsales y garras causan cortes desgarradores.", "Fase 1: Púas de combate"],
  [29, "Nidoran♀", "nidoranf", "veneno", "Básico", 0, 800, 900, 3, "Pokémon Pin Veneno. Aunque pequeña, sus púas desprenden toxinas potentes.", "Púa tóxica femenina"],
  [30, "Nidorina", "nidorina", "veneno", "Fase 1", 0, 1400, 1300, 4, "Evolución de Nidoran♀. Tranquila y protectora, emite ondas ultrasónicas.", "Defensa tóxica serena"],
  [31, "Nidoqueen", "nidoqueen", "veneno", "Fase 2", 2, 2400, 2300, 7, "Evolución Suprema. Escamas como roca maciza que protegen el nido con furia.", "Fase 2: Requiere 2 Sacrificios"],
  [32, "Nidoran♂", "nidoranm", "veneno", "Básico", 0, 900, 800, 3, "Pokémon Pin Veneno. Mueve las orejas en todas direcciones y ataca con su cuerno.", "Cuerno punzante viril"],
  [33, "Nidorino", "nidorino", "veneno", "Fase 1", 0, 1500, 1200, 4, "Evolución de Nidoran♂. Su cuerno es más duro que el diamante y perfora acero.", "Fase 1: Embestida veloz"],
  [34, "Nidoking", "nidoking", "veneno", "Fase 2", 2, 2500, 2100, 7, "Evolución Suprema. Su colosal cola es capaz de derribar torres de transmisión.", "Fase 2: Requiere 2 Sacrificios"],
  [35, "Clefairy", "clefairy", "hada", "Básico", 0, 900, 1200, 3, "Pokémon Hada. Su ternura mágica brilla a la luz de la luna llena.", "Encanto lunar enigmático"],
  [36, "Clefable", "clefable", "hada", "Fase 1", 1, 1900, 2000, 6, "Evolución de Clefairy. Se desplaza dando ligeros saltos flotantes sobre el agua.", "Fase 1: Resonancia mágica"],
  [37, "Vulpix", "vulpix", "fuego", "Básico", 0, 900, 1000, 3, "Pokémon Zorro. Nace con una cola blanca que luego se multiplica en seis colas ígneas.", "Fuego fatuo hechicero"],
  [38, "Ninetales", "ninetales", "fuego", "Fase 1", 1, 2100, 2000, 6, "Evolución de Vulpix. Cuenta la leyenda que sus 9 colas encierran poderes místicos eternos.", "Fase 1: Fuego místico milenario"],
  [39, "Jigglypuff", "jigglypuff", "normal", "Básico", 0, 800, 1100, 3, "Pokémon Globo. Entona una dulce melodía capaz de dormir al más fiero rival.", "Canto hipnótico profundo"],
  [40, "Wigglytuff", "wigglytuff", "normal", "Fase 1", 1, 1800, 1900, 6, "Evolución de Jigglypuff. Su pelaje esponjoso es suave y puede inflarse gigantescamente.", "Fase 1: Muralla acolchada"],
  [41, "Zubat", "zubat", "veneno", "Básico", 0, 700, 700, 2, "Pokémon Murciélago. Carente de ojos, surca cuevas mediante ondas ultrasónicas.", "Vuelo ultrasónico cavernoso"],
  [42, "Golbat", "golbat", "veneno", "Fase 1", 1, 1600, 1400, 5, "Evolución de Zubat. Sus cuatro colmillos perforan la piel para drenar energía vital.", "Fase 1: Mordisco vampírico"],
  [43, "Oddish", "oddish", "planta", "Básico", 0, 800, 1000, 3, "Pokémon Hierbajo. Durante el día se entierra en el suelo dejando solo sus hojas visibles.", "Hierba noctámbula fresca"],
  [44, "Gloom", "gloom", "planta", "Fase 1", 0, 1300, 1400, 4, "Evolución de Oddish. La miel pegajosa de su boca emite un olor pestilente abrumador.", "Fase 1: Olor paralizante"],
  [45, "Vileplume", "vileplume", "planta", "Fase 2", 2, 2300, 2100, 7, "Evolución Suprema. Posee los pétalos más grandes del mundo cargados de polen venenoso.", "Fase 2: Requiere 2 Sacrificios"],
  [46, "Paras", "paras", "bicho", "Básico", 0, 900, 900, 3, "Pokémon Hongo. Dos setas parásitas Tochukaso crecen sobre su lomo.", "Esporas micológicas"],
  [47, "Parasect", "parasect", "bicho", "Fase 1", 1, 1700, 1600, 5, "Evolución de Paras. La seta gigante ha tomado el control total del insecto huésped.", "Fase 1: Espora hipnótica"],
  [48, "Venonat", "venonat", "bicho", "Básico", 0, 800, 800, 3, "Pokémon Insecto. Sus grandes ojos compuestos actúan como radares infrarrojos.", "Ojos radar certeros"],
  [49, "Venomoth", "venomoth", "bicho", "Fase 1", 1, 1800, 1500, 5, "Evolución de Venonat. Sus alas desprenden escamas de polvo tóxico fosforescente.", "Fase 1: Polvo fosforescente"],
  [50, "Diglett", "diglett", "tierra", "Básico", 0, 700, 400, 2, "Pokémon Topo. Cava túneles a gran velocidad bajo la superficie terrestre.", "Túnel subterráneo sigiloso"],
  [51, "Dugtrio", "dugtrio", "tierra", "Fase 1", 0, 1600, 1000, 4, "Evolución de Diglett. Un trío formidable que desencadena sismos de magnitud colosal.", "Fase 1: Triple terremoto"],
  [52, "Meowth", "meowth", "normal", "Básico", 0, 800, 700, 3, "Pokémon Gato. Adora los objetos brillantes y lanza su ataque Día de Pago.", "Garras y monedas brillantes"],
  [53, "Persian", "persian", "normal", "Fase 1", 1, 1600, 1200, 5, "Evolución de Meowth. Felino de porte aristocrático con una gema roja reluciente.", "Fase 1: Agilidad felina"],
  [54, "Psyduck", "psyduck", "agua", "Básico", 0, 900, 900, 3, "Pokémon Pato. Cuando su jaqueca se vuelve insoportable, desata poderes telequinéticos.", "Dolor de cabeza psíquico"],
  [55, "Golduck", "golduck", "agua", "Fase 1", 1, 1900, 1600, 6, "Evolución de Psyduck. Nada a velocidad prodigiosa y su frente brilla con poder místico.", "Fase 1: Nadador telequinético"],
  [56, "Mankey", "mankey", "lucha", "Básico", 0, 1100, 600, 3, "Pokémon Mono Cerdo. Se enfurece por cualquier motivo atacando a diestro y siniestro.", "Furia simia desatada"],
  [57, "Primeape", "primeape", "lucha", "Fase 1", 1, 2000, 1200, 5, "Evolución de Mankey. Su furia constante acelera su pulso y multiplica su pegada.", "Fase 1: Furia destructora"],
  [58, "Growlithe", "growlithe", "fuego", "Básico", 0, 1200, 900, 4, "Pokémon Perrito. Valiente y leal, ladra y arroja fuego para defender a su entrenador.", "Canino ígneo leal"],
  [59, "Arcanine", "arcanine", "fuego", "Fase 1", 2, 2500, 2000, 7, "Evolución de Growlithe. Legendario por su belleza y velocidad majestuosa al galope.", "Fase 1 Legendaria: 2 Sacrificios"],
  [60, "Poliwag", "poliwag", "agua", "Básico", 0, 800, 800, 3, "Pokémon Renacuajo. La espiral de su vientre transparente es su órgano interno visible.", "Espiral acuática giratoria"],
  [61, "Poliwhirl", "poliwhirl", "agua", "Fase 1", 0, 1400, 1300, 4, "Evolución de Poliwag. Puede vivir tanto en agua como en tierra y dar puñetazos certeros.", "Puño de agua veloz"],
  [62, "Poliwrath", "poliwrath", "agua", "Fase 2", 2, 2400, 2300, 7, "Evolución Suprema. Músculos de puro acero que jamás se agotan nadando.", "Fase 2: Puño dinámico"],
  [63, "Abra", "abra", "psiquico", "Básico", 0, 600, 500, 2, "Pokémon Psíquico. Duerme 18 horas al día y se teletransporta en cuanto siente peligro.", "Teletransporte evasivo"],
  [64, "Kadabra", "kadabra", "psiquico", "Fase 1", 0, 1700, 1100, 4, "Evolución de Abra. Sujeta una cuchara de plata para amplificar ondas alfa mentales.", "Fase 1: Psicorrayo cortante"],
  [65, "Alakazam", "alakazam", "psiquico", "Fase 2", 2, 2700, 1600, 7, "Evolución Suprema. Su cerebro descomunal tiene un coeficiente intelectual de 5000.", "Fase 2: Mente suprema"],
  [66, "Machop", "machop", "lucha", "Básico", 0, 1200, 800, 3, "Pokémon Peleador. Entrena levantando rocas para perfeccionar todos sus músculos.", "Fuerza bruta marcial"],
  [67, "Machoke", "machoke", "lucha", "Fase 1", 1, 1800, 1400, 5, "Evolución de Machop. Lleva un cinturón de poder para controlar su descomunal fuerza.", "Fase 1: Cinturón de fuerza"],
  [68, "Machamp", "machamp", "lucha", "Fase 2", 2, 2700, 2100, 7, "Evolución Suprema. Sus cuatro brazos musculosos lanzan 1000 golpes en dos segundos.", "Fase 2: Ráfaga de cuatro puños"],
  [69, "Bellsprout", "bellsprout", "planta", "Básico", 0, 900, 700, 3, "Pokémon Flor. Su tallo delgado y flexible se balancea para esquivar golpes.", "Látigo cepa elástico"],
  [70, "Weepinbell", "weepinbell", "planta", "Fase 1", 0, 1500, 1100, 4, "Evolución de Bellsprout. Segrega un ácido cáustico que disuelve cualquier defensa.", "Fase 1: Ácido corrosivo"],
  [71, "Victreebel", "victreebel", "planta", "Fase 2", 2, 2300, 1800, 7, "Evolución Suprema. Atrae a sus presas con un aroma a miel y las devora de un bocado.", "Fase 2: Hoja afilada carnívora"],
  [72, "Tentacool", "tentacool", "agua", "Básico", 0, 800, 1100, 3, "Pokémon Medusa. Su cuerpo es casi todo agua y flota lanzando rayos desde sus gemas.", "Tentáculos paralizantes"],
  [73, "Tentacruel", "tentacruel", "agua", "Fase 1", 1, 1900, 2300, 6, "Evolución de Tentacool. Con 80 tentáculos atrapa y envenena a sus presas en el mar.", "Fase 1: Muralla marina tóxica"],
  [74, "Geodude", "geodude", "roca", "Básico", 0, 1000, 1500, 3, "Pokémon Roca. Se confunde con piedras normales y rueda ladera abajo para embestir.", "Dureza de piedra maciza"],
  [75, "Graveler", "graveler", "roca", "Fase 1", 1, 1600, 2000, 5, "Evolución de Geodude. Desciende montañas rodando a gran velocidad arrollando todo.", "Fase 1: Rodillo demoledor"],
  [76, "Golem", "golem", "roca", "Fase 2", 2, 2500, 2600, 7, "Evolución Suprema. Ni siquiera la dinamita puede perforar su coraza pétrea.", "Fase 2: Terremoto macizo"],
  [77, "Ponyta", "ponyta", "fuego", "Básico", 0, 1100, 800, 3, "Pokémon Caballo Fuego. Sus pezuñas son diez veces más duras que el diamante.", "Galope de fuego ágil"],
  [78, "Rapidash", "rapidash", "fuego", "Fase 1", 1, 2000, 1400, 6, "Evolución de Ponyta. Galopa a 240 km/h envuelto en una deslumbrante estela de llamas.", "Fase 1: Cuerno ígneo veloz"],
  [79, "Slowpoke", "slowpoke", "agua", "Básico", 0, 800, 1200, 3, "Pokémon Atontado. Tarda cinco segundos en sentir dolor si le muerden la cola.", "Paciencia imperturbable"],
  [80, "Slowbro", "slowbro", "agua", "Fase 1", 1, 1800, 2200, 6, "Evolución de Slowpoke. Un Shellder mordió su cola dotándolo de poderes psíquicos.", "Fase 1: Defensa psíquica masiva"],
  [81, "Magnemite", "magnemite", "electrico", "Básico", 0, 900, 1100, 3, "Pokémon Imán. Flota en el aire gracias a un potente campo electromagnético.", "Atracción magnética"],
  [82, "Magneton", "magneton", "electrico", "Fase 1", 1, 1900, 1700, 5, "Evolución de Magnemite. Tres unidades unidas generan ondas de radio que colapsan aparatos.", "Fase 1: Triataque eléctrico"],
  [83, "Farfetch'd", "farfetchd", "normal", "Básico", 0, 1200, 1000, 4, "Pokémon Pato Salvaje. Blande un puerro como si fuera una afilada espada samurái.", "Espadachín con puerro"],
  [84, "Doduo", "doduo", "normal", "Básico", 0, 1100, 700, 3, "Pokémon Ave Gemela. Sus dos cabezas se turnan para dormir y vigilar siempre.", "Doble pico veloz"],
  [85, "Dodrio", "dodrio", "normal", "Fase 1", 1, 2000, 1200, 6, "Evolución de Doduo. Tres cerebros trazan tácticas simultáneas para correr a 100 km/h.", "Fase 1: Pico taladro triple"],
  [86, "Seel", "seel", "agua", "Básico", 0, 800, 1100, 3, "Pokémon León Marino. Cubierto de piel azulina densa, nada feliz en aguas heladas.", "Cuerno ártico frío"],
  [87, "Dewgong", "dewgong", "agua", "Fase 1", 1, 1800, 2100, 6, "Evolución de Seel. Su cuerpo blanco como la nieve se camufla en icebergs polares.", "Fase 1: Rayo aurora helado"],
  [88, "Grimer", "grimer", "veneno", "Básico", 0, 900, 900, 3, "Pokémon Lodo. Nació en aguas residuales contaminadas por residuos químicos.", "Lodo tóxico espeso"],
  [89, "Muk", "muk", "veneno", "Fase 1", 1, 2000, 1900, 6, "Evolución de Grimer. El olor pútrido de su cuerpo marchita plantas a su paso.", "Fase 1: Bomba de fango letal"],
  [90, "Shellder", "shellder", "agua", "Básico", 0, 800, 1500, 3, "Pokémon Bivalvo. Su dura concha resiste cualquier ataque y muerde con fuerza.", "Concha defensiva férrea"],
  [91, "Cloyster", "cloyster", "agua", "Fase 1", 1, 1900, 2700, 6, "Evolución de Shellder. Su concha diamantina dispara pinchos gigantes de hielo.", "Fase 1: Muralla carámbano"],
  [92, "Gastly", "gastly", "fantasma", "Básico", 0, 900, 600, 3, "Pokémon Gas. El 95% de su cuerpo es vapor tóxico que adormece a quien lo inhala.", "Gas espectral venenoso"],
  [93, "Haunter", "haunter", "fantasma", "Fase 1", 0, 1600, 1000, 4, "Evolución de Gastly. Su lengua helada paraliza de terror a quien lame en la oscuridad.", "Lengüetazo espectral"],
  [94, "Gengar", "gengar", "fantasma", "Fase 2", 1, 2500, 1800, 6, "Evolución Suprema. Se oculta en las sombras de las habitaciones para asustar.", "Fase 2: Sombra siniestra"],
  [95, "Onix", "onix", "roca", "Básico", 1, 1400, 2500, 5, "Pokémon Serpiente Roca. Cava a gran velocidad devorando rocas y tierra.", "Coloso de piedra macizo"],
  [96, "Drowzee", "drowzee", "psiquico", "Básico", 0, 900, 1100, 3, "Pokémon Hipnosis. Adormece a las personas para alimentarse de sus sueños felices.", "Hipnosis comedora de sueños"],
  [97, "Hypno", "hypno", "psiquico", "Fase 1", 1, 1800, 2000, 6, "Evolución de Drowzee. El vaivén de su péndulo sume en un trance eterno.", "Fase 1: Péndulo hipnótico"],
  [98, "Krabby", "krabby", "agua", "Básico", 0, 1200, 1000, 3, "Pokémon Cangrejo. Sus pinzas son poderosas tenazas que atrapan con 1000 kg de presión.", "Tenazas de playa fuertes"],
  [99, "Kingler", "kingler", "agua", "Fase 1", 1, 2200, 1900, 6, "Evolución de Krabby. Su enorme pinza izquierda tiene una fuerza demoledora de 10.000 CV.", "Fase 1: Martillazo demoledor"],
  [100, "Voltorb", "voltorb", "electrico", "Básico", 0, 900, 800, 3, "Pokémon Bola. Parece una Poké Ball y explota al menor roce con electricidad estática.", "Autodestrucción eléctrica"],
  [101, "Electrode", "electrode", "electrico", "Fase 1", 1, 1600, 1500, 5, "Evolución de Voltorb. Almacena tanta energía eléctrica que puede estallar a voluntad.", "Fase 1: Explosión fulminante"],
  [102, "Exeggcute", "exeggcute", "planta", "Básico", 0, 800, 1100, 3, "Pokémon Huevo. Seis huevos conectados telepáticamente que se protegen en grupo.", "Enlace telepático vegetal"],
  [103, "Exeggutor", "exeggutor", "planta", "Fase 1", 2, 2400, 1900, 7, "Evolución de Exeggcute. Cada una de sus tres cabezas tiene mente propia e hipnotiza.", "Fase 1: Fuerza bomba huevo"],
  [104, "Cubone", "cubone", "tierra", "Básico", 0, 900, 1200, 3, "Pokémon Solitario. Lleva el cráneo de su madre y llora amargamente a la luna.", "Hueso huesomerang"],
  [105, "Marowak", "marowak", "tierra", "Fase 1", 1, 1800, 2000, 5, "Evolución de Cubone. Ha superado el dolor blandiendo su hueso con maestría letal.", "Fase 1: Hueso veloz diestro"],
  [106, "Hitmonlee", "hitmonlee", "lucha", "Básico", 1, 2100, 1200, 5, "Pokémon Patada. Sus piernas elásticas golpean a distancia con patadas demoledoras.", "Especialista en patadas"],
  [107, "Hitmonchan", "hitmonchan", "lucha", "Básico", 1, 1900, 1500, 5, "Pokémon Puñetazo. Domina los puños de fuego, trueno y hielo con velocidad de relámpago.", "Especialista en puñetazos"],
  [108, "Lickitung", "lickitung", "normal", "Básico", 0, 1100, 1500, 4, "Pokémon Lengüetazo. Su lengua de dos metros limpia y paraliza a los oponentes.", "Lengua extensa paralizante"],
  [109, "Koffing", "koffing", "veneno", "Básico", 0, 900, 1300, 3, "Pokémon Gas Veneno. Su cuerpo hinchado libera gas fétido y tóxico inflamable.", "Gas pestilente espeso"],
  [110, "Weezing", "weezing", "veneno", "Fase 1", 1, 1800, 2100, 6, "Evolución de Koffing. Dos cuerpos unidos que mezclan vapores letales de descomposición.", "Fase 1: Niebla venenosa doble"],
  [111, "Rhyhorn", "rhyhorn", "tierra", "Básico", 0, 1200, 1600, 4, "Pokémon Clavos. Su cuerpo de roca maciza embiste en línea recta destrozando todo.", "Embestida de cuerno macizo"],
  [112, "Rhydon", "rhydon", "tierra", "Fase 1", 2, 2400, 2200, 7, "Evolución de Rhyhorn. Su cuerno taladro perfora diamantes y aguanta magma ardiente.", "Fase 1: Taladro perforador"],
  [113, "Chansey", "chansey", "normal", "Básico", 1, 800, 2500, 5, "Pokémon Huevo. Pone huevos deliciosos y cuida con cariño a heridos en combate.", "Muralla sanadora colosal"],
  [114, "Tangela", "tangela", "planta", "Básico", 0, 1100, 1700, 4, "Pokémon Enredadera. Su cuerpo está cubierto de lianas azules que atrapan a sus rivales.", "Lianas enredaderas densas"],
  [115, "Kangaskhan", "kangaskhan", "normal", "Básico", 1, 2000, 1800, 6, "Pokémon Padres. Protege a su cría en la bolsa ventral y combate ferozmente.", "Furia maternal implacable"],
  [116, "Horsea", "horsea", "agua", "Básico", 0, 800, 900, 3, "Pokémon Dragón de Agua. Escupe tinta negra para despistar a sus depredadores.", "Tinta de agua veloz"],
  [117, "Seadra", "seadra", "agua", "Fase 1", 1, 1700, 1600, 5, "Evolución de Horsea. Sus afiladas púas dorsales causan adormecimiento por veneno.", "Fase 1: Hidrobomba marina"],
  [118, "Goldeen", "goldeen", "agua", "Básico", 0, 900, 800, 3, "Pokémon Pez Dorado. Nada con gracia como una bailarina y golpea con su cuerno.", "Nado elegante con cuerno"],
  [119, "Seaking", "seaking", "agua", "Fase 1", 1, 1800, 1400, 5, "Evolución de Goldeen. En otoño perfora rocas de ríos para desovar.", "Fase 1: Cornada taladro"],
  [120, "Staryu", "staryu", "agua", "Básico", 0, 900, 1000, 3, "Pokémon Estrella. Su núcleo central rojo brilla al ritmo de las estrellas nocturnas.", "Giro rápido de estrella"],
  [121, "Starmie", "starmie", "agua", "Fase 1", 1, 2100, 1900, 6, "Evolución de Staryu. Su núcleo brilla en siete colores y emite señales al cosmos.", "Fase 1: Rayo gema cósmico"],
  [122, "Mr. Mime", "mrmime", "psiquico", "Básico", 0, 1100, 1800, 4, "Pokémon Barrera. Crea muros invisibles de energía condensando el aire con sus dedos.", "Barrera invisible protectora"],
  [123, "Scyther", "scyther", "bicho", "Básico", 1, 2200, 1600, 6, "Pokémon Mantis. Sus guadañas afiladas cortan árboles de un tajo con velocidad ninja.", "Corte guadaña fulgurante"],
  [124, "Jynx", "jynx", "hielo", "Básico", 1, 1800, 1300, 5, "Pokémon Forma Humana. Danza rítmicamente seduciendo y congelando a sus enemigos.", "Beso amoroso congelante"],
  [125, "Electabuzz", "electabuzz", "electrico", "Básico", 1, 2100, 1400, 5, "Pokémon Eléctrico. Hace girar sus brazos para cargar electricidad de alto voltaje.", "Puño trueno atronador"],
  [126, "Magmar", "magmar", "fuego", "Básico", 1, 2100, 1400, 5, "Pokémon Escupefuego. Su cuerpo arde a 1200 °C y se cura sumergiéndose en lava.", "Llamarada abrasadora pura"],
  [127, "Pinsir", "pinsir", "bicho", "Básico", 1, 2200, 1600, 6, "Pokémon Escarabajo. Sus enormes pinzas desgarran troncos y parten a oponentes.", "Pinza guillotina brutal"],
  [128, "Tauros", "tauros", "normal", "Básico", 1, 2100, 1700, 6, "Pokémon Toro Bravo. Azota sus tres colas para impulsarse en embestidas furiosas.", "Embestida astada demoledora"],
  [129, "Magikarp", "magikarp", "agua", "Básico", 0, 200, 400, 1, "Pokémon Pez. Famoso por su debilidad legendaria y sus inútiles salpicones.", "Salpicón inofensivo"],
  [130, "Gyarados", "gyarados", "agua", "Fase 1", 2, 2800, 2100, 7, "Evolución de Magikarp. Furia destructora desatada que arrasa ciudades enteras.", "Fase 1 Suprema: 2 Sacrificios"],
  [131, "Lapras", "lapras", "agua", "Básico", 1, 2000, 2300, 6, "Pokémon Transporte. De corazón noble, surca mares gélidos cantando con dulzura.", "Canto helado protector"],
  [132, "Ditto", "ditto", "normal", "Básico", 0, 1000, 1000, 3, "Pokémon Transformación. Puede reorganizar su estructura celular en cualquier Pokémon.", "Metamorfosis celular total"],
  [133, "Eevee", "eevee", "normal", "Básico", 0, 1000, 1000, 3, "Pokémon Evolución. Su ADN inestable le permite evolucionar en diversas formas elementales.", "Potencial evolutivo infinito"],
  [134, "Vaporeon", "vaporeon", "agua", "Fase 1", 1, 2200, 2100, 6, "Evolución de Eevee. Su estructura celular es similar al agua y puede fundirse en ella.", "Fase 1: Hidropulso fundente"],
  [135, "Jolteon", "jolteon", "electrico", "Fase 1", 1, 2300, 1600, 6, "Evolución de Eevee. Cada pelo de su pelaje se transforma en una aguja eléctrica.", "Fase 1: Pin misil relámpago"],
  [136, "Flareon", "flareon", "fuego", "Fase 1", 1, 2400, 1700, 6, "Evolución de Eevee. Almacena aire en su cuerpo para exhalar fuego a 1700 °C.", "Fase 1: Fuego abrasador"],
  [137, "Porygon", "porygon", "normal", "Básico", 0, 1100, 1200, 4, "Pokémon Virtual. El primer Pokémon creado íntegramente mediante código informático.", "Código cibernético puro"],
  [138, "Omanyte", "omanyte", "roca", "Básico", 0, 900, 1400, 3, "Pokémon Fósil. Caracol prehistórico que nadaba en mares antiguos con diez tentáculos.", "Concha fosilizada marina"],
  [139, "Omastar", "omastar", "roca", "Fase 1", 1, 2100, 2200, 6, "Evolución de Omanyte. Sus afilados colmillos circulares desgarran conchas duras.", "Fase 1: Picotazo espiral"],
  [140, "Kabuto", "kabuto", "roca", "Básico", 0, 900, 1300, 3, "Pokémon Fósil. Artrópodo antiguo que se oculta bajo una concha casi indestructible.", "Caparazón fósil ancestral"],
  [141, "Kabutops", "kabutops", "roca", "Fase 1", 1, 2300, 1800, 6, "Evolución de Kabuto. Depredador implacable con guadañas cortantes como bisturís.", "Fase 1: Guadaña marina fósil"],
  [142, "Aerodactyl", "aerodactyl", "roca", "Básico", 1, 2400, 1600, 6, "Pokémon Fósil. Terrible reptil alado extinto que dominaba los cielos jurásicos.", "Rey volador prehistórico"],
  [143, "Snorlax", "snorlax", "normal", "Básico", 2, 2400, 2600, 7, "Pokémon Dormilón. Su estómago procesa cualquier alimento y su peso aplasta rivales.", "Coloso durmiente pesado"],
  [144, "Articuno", "articuno", "hielo", "Legendario", 2, 2600, 2700, 8, "Ave Legendaria del Frío. Congela la humedad del aire con cada batir de sus alas.", "Legendario: Ventisca eterna"],
  [145, "Zapdos", "zapdos", "electrico", "Legendario", 2, 2800, 2400, 8, "Ave Legendaria del Rayo. Aparece entre nubes de tormenta disparando truenos dorados.", "Legendario: Trueno supremo"],
  [146, "Moltres", "moltres", "fuego", "Legendario", 2, 2800, 2400, 8, "Ave Legendaria del Fuego. Ilumina el cielo nocturno con alas de fuego radiante.", "Legendario: Llamarada inmortal"],
  [147, "Dratini", "dratini", "dragon", "Básico", 0, 900, 900, 3, "Pokémon Dragón. Crece mudando su piel mística y habita en lagos de aguas puras.", "Místico dragón infante"],
  [148, "Dragonair", "dragonair", "dragon", "Fase 1", 1, 1800, 1600, 5, "Evolución de Dratini. Sus orbes de cristal alteran el clima con energía mística.", "Fase 1: Furia de dragón mística"],
  [149, "Dragonite", "dragonite", "dragon", "Fase 2", 2, 3000, 2600, 8, "Evolución Suprema. Da la vuelta al mundo en 16 horas y rescata barcos en zozobra.", "Fase 2: Coloso dragón benevolente"],
  [150, "Mewtwo", "mewtwo", "psiquico", "Legendario", 2, 3200, 2800, 9, "Pokémon Genético Legendario. Creado en laboratorio alterando el ADN original de Mew.", "Legendario Supremo: Onda mental destructora"],
  [151, "Mew", "mew", "psiquico", "Legendario", 2, 2600, 2600, 8, "Pokémon Singular Legendario. Se dice que posee la composición genética de todos los Pokémon.", "Legendario Singular: Génesis cósmico"]
];

const itemsRaw = [
  // --- MÁGICAS: OBJETOS Y PARTIDARIOS ---
  {
    id: 201,
    nombre: "Poción Max",
    slug: "max-potion",
    itemPng: "max-potion.png",
    tipoCarta: "magia",
    subtipo: "Objeto",
    claseCss: "spell-card",
    descripcion: "Carta de Entrenador (Mágica). Restaura 2000 Puntos de Vida (LP) a tu marcador de salud de inmediato.",
    descripcionCorta: "+2000 LP al jugador"
  },
  {
    id: 202,
    nombre: "Hiperpoción",
    slug: "hyper-potion",
    itemPng: "hyper-potion.png",
    tipoCarta: "magia",
    subtipo: "Objeto",
    claseCss: "spell-card",
    descripcion: "Carta de Entrenador (Mágica). Restaura 1500 Puntos de Vida (LP) a tu salud.",
    descripcionCorta: "+1500 LP al jugador"
  },
  {
    id: 203,
    nombre: "Caramelo Raro",
    slug: "rare-candy",
    itemPng: "rare-candy.png",
    tipoCarta: "magia",
    subtipo: "Objeto",
    claseCss: "spell-card",
    descripcion: "Carta de Entrenador (Mágica). Otorga +400 ATK permanente a un Pokémon en tu campo y roba 1 carta.",
    descripcionCorta: "+400 ATK y roba 1 carta"
  },
  {
    id: 204,
    nombre: "Inv. Profesor Oak",
    slug: "oaks-letter",
    itemPng: "oaks-letter.png",
    tipoCarta: "magia",
    subtipo: "Partidario",
    claseCss: "spell-card",
    descripcion: "Carta de Entrenador (Partidario). Roba inmediatamente 2 cartas adicionales de tu mazo a la mano.",
    descripcionCorta: "Roba 2 cartas del mazo"
  },
  {
    id: 205,
    nombre: "Ultra Ball",
    slug: "ultra-ball",
    itemPng: "ultra-ball.png",
    tipoCarta: "magia",
    subtipo: "Objeto",
    claseCss: "spell-card",
    descripcion: "Carta de Entrenador (Mágica). Busca en tu mazo y roba 2 Pokémon para añadirlos a tu mano.",
    descripcionCorta: "Roba 2 cartas Pokémon"
  },
  {
    id: 206,
    nombre: "Master Ball",
    slug: "master-ball",
    itemPng: "master-ball.png",
    tipoCarta: "magia",
    subtipo: "Objeto",
    claseCss: "spell-card",
    descripcion: "Carta Legendaria (Mágica). Captura sin fallo: roba inmediatamente la carta más poderosa de tu mazo.",
    descripcionCorta: "Roba el mejor monstruo"
  },
  {
    id: 207,
    nombre: "Restaura Todo",
    slug: "full-restore",
    itemPng: "full-restore.png",
    tipoCarta: "magia",
    subtipo: "Objeto",
    claseCss: "spell-card",
    descripcion: "Carta de Entrenador (Mágica). Sana completamente los estados y regenera 2500 LP al jugador.",
    descripcionCorta: "+2500 LP al jugador"
  },
  {
    id: 208,
    nombre: "Baya Zidra",
    slug: "sitrus-berry",
    itemPng: "sitrus-berry.png",
    tipoCarta: "magia",
    subtipo: "Objeto",
    claseCss: "spell-card",
    descripcion: "Carta de Objeto Baya. Deliciosa baya silvestre que restaura 1000 LP a tu salud de inmediato.",
    descripcionCorta: "+1000 LP al jugador"
  },
  {
    id: 209,
    nombre: "Repartir Experiencia",
    slug: "exp-share",
    itemPng: "exp-share.png",
    tipoCarta: "magia",
    subtipo: "Objeto",
    claseCss: "spell-card",
    descripcion: "Carta de Entrenador (Mágica). Comparte energía: otorga +300 ATK a todos los Pokémon en tu campo.",
    descripcionCorta: "+300 ATK a todos tus Pokémon"
  },
  {
    id: 210,
    nombre: "Revivir Máximo",
    slug: "max-revive",
    itemPng: "max-revive.png",
    tipoCarta: "magia",
    subtipo: "Objeto",
    claseCss: "spell-card",
    descripcion: "Carta de Entrenador (Mágica). Rescata un Pokémon de tu Cementerio y regrésalo a tu mano.",
    descripcionCorta: "Rescata 1 carta del GY"
  },
  {
    id: 211,
    nombre: "Elixir Máximo",
    slug: "max-elixir",
    itemPng: "max-elixir.png",
    tipoCarta: "magia",
    subtipo: "Objeto",
    claseCss: "spell-card",
    descripcion: "Carta de Entrenador (Mágica). Llena de energía tu mano: roba inmediatamente 2 cartas del mazo.",
    descripcionCorta: "Roba 2 cartas del mazo"
  },
  {
    id: 212,
    nombre: "Poké Flauta",
    slug: "poke-flute",
    itemPng: "poke-flute.png",
    tipoCarta: "magia",
    subtipo: "Objeto",
    claseCss: "spell-card",
    descripcion: "Carta Mágica Clásica. Su melodía reactiva a un Pokémon en tu campo para que pueda atacar de nuevo.",
    descripcionCorta: "Reactiva un Pokémon"
  },

  // --- MÁGICAS DE EQUIPO (OBJETOS EQUIPABLES) ---
  {
    id: 220,
    nombre: "Piedra Trueno",
    slug: "thunder-stone",
    itemPng: "thunder-stone.png",
    tipoCarta: "magia",
    subtipo: "Equipo",
    claseCss: "spell-card",
    descripcion: "Carta de Equipo (Mágica). Aumenta en +500 el ATK permanente de un Pokémon que controles en el campo.",
    descripcionCorta: "+500 ATK a un Pokémon"
  },
  {
    id: 221,
    nombre: "Piedra Fuego",
    slug: "fire-stone",
    itemPng: "fire-stone.png",
    tipoCarta: "magia",
    subtipo: "Equipo",
    claseCss: "spell-card",
    descripcion: "Carta de Equipo (Mágica). Imbuye llamas incandescentes otorgando +600 ATK a un Pokémon en campo.",
    descripcionCorta: "+600 ATK a un Pokémon"
  },
  {
    id: 222,
    nombre: "Piedra Agua",
    slug: "water-stone",
    itemPng: "water-stone.png",
    tipoCarta: "magia",
    subtipo: "Equipo",
    claseCss: "spell-card",
    descripcion: "Carta de Equipo (Mágica). Otorga un flujo defensivo cristalino de +600 DEF a un Pokémon en campo.",
    descripcionCorta: "+600 DEF a un Pokémon"
  },
  {
    id: 223,
    nombre: "Piedra Hoja",
    slug: "leaf-stone",
    itemPng: "leaf-stone.png",
    tipoCarta: "magia",
    subtipo: "Equipo",
    claseCss: "spell-card",
    descripcion: "Carta de Equipo (Mágica). Otorga vitalidad vegetal equilibrada: +400 ATK y +400 DEF a tu Pokémon.",
    descripcionCorta: "+400 ATK / +400 DEF"
  },
  {
    id: 224,
    nombre: "Cinta Elegida",
    slug: "choice-band",
    itemPng: "choice-band.png",
    tipoCarta: "magia",
    subtipo: "Equipo",
    claseCss: "spell-card",
    descripcion: "Carta de Equipo Competitiva. Otorga un incremento descomunal de +800 ATK al Pokémon equipado.",
    descripcionCorta: "+800 ATK al monstruo"
  },
  {
    id: 225,
    nombre: "Pañuelo Elegido",
    slug: "choice-scarf",
    itemPng: "choice-scarf.png",
    tipoCarta: "magia",
    subtipo: "Equipo",
    claseCss: "spell-card",
    descripcion: "Carta de Equipo Competitiva. Otorga +400 ATK y gran velocidad de combate a tu Pokémon.",
    descripcionCorta: "+400 ATK al monstruo"
  },
  {
    id: 226,
    nombre: "Restos",
    slug: "leftovers",
    itemPng: "leftovers.png",
    tipoCarta: "magia",
    subtipo: "Equipo",
    claseCss: "spell-card",
    descripcion: "Carta de Equipo Competitiva. Deliciosos restos que regeneran 500 LP al jugador al activarse.",
    descripcionCorta: "+500 LP y resistencia"
  },
  {
    id: 227,
    nombre: "Banda Focus",
    slug: "focus-sash",
    itemPng: "focus-sash.png",
    tipoCarta: "magia",
    subtipo: "Equipo",
    claseCss: "spell-card",
    descripcion: "Carta de Equipo Competitiva. Otorga +800 DEF extrema para sobrevivir a golpes letales.",
    descripcionCorta: "+800 DEF protectora"
  },
  {
    id: 228,
    nombre: "Chaleco Asalto",
    slug: "assault-vest",
    itemPng: "assault-vest.png",
    tipoCarta: "magia",
    subtipo: "Equipo",
    claseCss: "spell-card",
    descripcion: "Carta de Equipo Táctico. Otorga una inmensa muralla de +1000 DEF a tu Pokémon en el campo.",
    descripcionCorta: "+1000 DEF colosal"
  },
  {
    id: 229,
    nombre: "Casco Dentado",
    slug: "rocky-helmet",
    itemPng: "rocky-helmet.png",
    tipoCarta: "magia",
    subtipo: "Equipo",
    claseCss: "spell-card",
    descripcion: "Carta de Equipo Defensiva. Si el Pokémon es atacado, el atacante sufre 600 LP de daño reflejado.",
    descripcionCorta: "Daño reflejado al atacante"
  },
  {
    id: 230,
    nombre: "Vidasfera",
    slug: "life-orb",
    itemPng: "life-orb.png",
    tipoCarta: "magia",
    subtipo: "Equipo",
    claseCss: "spell-card",
    descripcion: "Carta de Equipo Ofensiva. Aumenta drásticamente en +700 el ATK del Pokémon equipado.",
    descripcionCorta: "+700 ATK de impacto"
  },
  {
    id: 231,
    nombre: "Mineral Evolutivo",
    slug: "eviolite",
    itemPng: "eviolite.png",
    tipoCarta: "magia",
    subtipo: "Equipo",
    claseCss: "spell-card",
    descripcion: "Carta de Equipo Defensiva. Otorga +700 DEF adicional a cualquier Pokémon en tu campo.",
    descripcionCorta: "+700 DEF a tu Pokémon"
  },

  // --- TRAMPAS: RESPUESTA, CONTRAATAQUE Y ESTADO ---
  {
    id: 240,
    nombre: "Protección",
    slug: "protective-pads",
    itemPng: "protective-pads.png",
    tipoCarta: "trampa",
    subtipo: "Respuesta",
    claseCss: "trap-card",
    descripcion: "Carta Trampa (Respuesta). Se activa cuando el rival declara un ataque para cancelar por completo su ofensiva.",
    descripcionCorta: "Niega el ataque rival"
  },
  {
    id: 241,
    nombre: "Manto Espejo",
    slug: "mirror-herb",
    itemPng: "mirror-herb.png",
    tipoCarta: "trampa",
    subtipo: "Contraataque",
    claseCss: "trap-card",
    descripcion: "Carta Trampa (Contraataque). Devuelve el daño recibido en batalla directamente a los LP del rival.",
    descripcionCorta: "Devuelve daño a rival"
  },
  {
    id: 242,
    nombre: "Contador",
    slug: "focus-band",
    itemPng: "focus-band.png",
    tipoCarta: "trampa",
    subtipo: "Contraataque",
    claseCss: "trap-card",
    descripcion: "Carta Trampa (Contraataque). Devuelve el impacto con el doble de fuerza infligiendo 800 LP de daño al rival.",
    descripcionCorta: "-800 LP al rival atacante"
  },
  {
    id: 243,
    nombre: "Paralizador",
    slug: "paralyze-heal",
    itemPng: "paralyze-heal.png",
    tipoCarta: "trampa",
    subtipo: "Estado",
    claseCss: "trap-card",
    descripcion: "Carta Trampa (Estado). El Pokémon atacante rival queda inmovilizado y no podrá atacar su siguiente turno.",
    descripcionCorta: "Inmoviliza al atacante"
  },
  {
    id: 244,
    nombre: "Trampa Rocas",
    slug: "hard-stone",
    itemPng: "hard-stone.png",
    tipoCarta: "trampa",
    subtipo: "Campo",
    claseCss: "trap-card",
    descripcion: "Carta Trampa de Campo. Rocas flotantes que dañan en 600 LP al rival cuando invoca un nuevo Pokémon.",
    descripcionCorta: "-600 LP al invocar el rival"
  },
  {
    id: 245,
    nombre: "Púas Tóxicas",
    slug: "poison-barb",
    itemPng: "poison-barb.png",
    tipoCarta: "trampa",
    subtipo: "Campo",
    claseCss: "trap-card",
    descripcion: "Carta Trampa de Campo. Esparce púas envenenadas reduciendo en -400 el ATK de los monstruos del rival.",
    descripcionCorta: "-400 ATK a monstruos rivales"
  },
  {
    id: 246,
    nombre: "Polvo Brillo",
    slug: "bright-powder",
    itemPng: "bright-powder.png",
    tipoCarta: "trampa",
    subtipo: "Evasión",
    claseCss: "trap-card",
    descripcion: "Carta Trampa (Evasión). Deslumbra al atacante: el ataque falla y el rival sufre 500 LP de confusión.",
    descripcionCorta: "Desvía ataque y -500 LP"
  },
  {
    id: 247,
    nombre: "Sustituto",
    slug: "poke-doll",
    itemPng: "poke-doll.png",
    tipoCarta: "trampa",
    subtipo: "Protección",
    claseCss: "trap-card",
    descripcion: "Carta Trampa (Protección). Invoca un muñeco sustituto que absorbe por completo el impacto del ataque rival.",
    descripcionCorta: "Absorbe ataque rival"
  },
  {
    id: 248,
    nombre: "Detección",
    slug: "scope-lens",
    itemPng: "scope-lens.png",
    tipoCarta: "trampa",
    subtipo: "Respuesta",
    claseCss: "trap-card",
    descripcion: "Carta Trampa (Respuesta). Anticipa el movimiento rival, niega el ataque y roba 1 carta adicional.",
    descripcionCorta: "Niega ataque y roba 1"
  }
];

let jsCode = `// ==========================================================
// BASE DE DATOS COMPLETA DE CARTAS DE POKÉ-OH! (151 POKÉMON + ITEMS)
// ==========================================================

const bdCartas = {
`;

// Generar los 151 Pokémon
pokemonRaw.forEach(p => {
  const [pokedexId, nombre, slug, elemento, etapa, sacrificios, atk, def, nivel, desc, descCorta] = p;
  const claseCss = sacrificios > 0 ? (etapa === 'Legendario' ? 'monster-card tribute-card legendary-card' : 'monster-card tribute-card') : 'monster-card';

  jsCode += `  ${pokedexId}: {
    id: ${pokedexId},
    pokedexId: ${pokedexId},
    nombre: "${nombre}",
    slug: "${slug}",
    elemento: "${elemento}",
    tipoCarta: "monstruo",
    etapa: "${etapa}",
    sacrificios: ${sacrificios},
    atk: ${atk},
    def: ${def},
    nivel: ${nivel},
    claseCss: "${claseCss}",
    imagenOficial: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedexId}.png",
    spriteCampo: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokedexId}.gif",
    spriteEstatico: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedexId}.png",
    descripcion: "${desc.replace(/"/g, '\\"')}",
    descripcionCorta: "${descCorta.replace(/"/g, '\\"')}"
  },
`;
});

// Generar Ítems (Mágicas, Equipos, Trampas)
itemsRaw.forEach(item => {
  const imagenOficial = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.itemPng}`;
  jsCode += `  ${item.id}: {
    id: ${item.id},
    nombre: "${item.nombre}",
    slug: "${item.slug}",
    tipoCarta: "${item.tipoCarta}",
    subtipo: "${item.subtipo}",
    claseCss: "${item.claseCss}",
    imagenOficial: "${imagenOficial}",
    spriteCampo: "${imagenOficial}",
    spriteEstatico: "${imagenOficial}",
    descripcion: "${item.descripcion.replace(/"/g, '\\"')}",
    descripcionCorta: "${item.descripcionCorta.replace(/"/g, '\\"')}"
  },
`;
});

jsCode += `};

// Exportar globalmente para navegador o Node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = bdCartas;
}
`;

const rutaSalida = path.join(__dirname, 'cartas.js');
fs.writeFileSync(rutaSalida, jsCode, 'utf8');
console.log('¡cartas.js generado con éxito en ' + rutaSalida + '! Total de cartas:', pokemonRaw.length + itemsRaw.length);

