const path = require('path');
const express = require('express');
const cors = require('cors');
const { listen } = require('@colyseus/tools');
const config = require('@colyseus/tools').default;
const { PokeOhRoom } = require('./rooms/PokeOhRoom');

const PORT = Number(process.env.PORT || 2567);

const appConfig = config({
  initializeGameServer: (gameServer) => {
    // Definir la sala de duelos de Poké-Oh!
    // Filtrada por código de sala (roomCode) y privacidad (isPrivate)
    gameServer
      .define('pokeoh_duel', PokeOhRoom)
      .filterBy(['roomCode', 'isPrivate']);

    console.log('[Colyseus] Sala "pokeoh_duel" registrada exitosamente.');
  },

  initializeExpress: (app) => {
    app.use(cors());
    app.use(express.json());

    // Servir los archivos estáticos del frontend (HTML, CSS, JS, Assets)
    app.use(express.static(path.resolve(__dirname)));

    // Ruta de estado del servidor
    app.get('/api/status', (req, res) => {
      res.json({
        nombre: 'Poké-Oh! Duel Engine Server',
        estado: 'online',
        puerto: PORT,
        timestamp: new Date().toISOString()
      });
    });

    console.log('[Express] Servidor web estático y API configurados.');
  },

  beforeListen: () => {
    console.log('[Colyseus] Iniciando transporte WebSocket...');
  }
});

// Arrancar el servidor en el puerto 2567
listen(appConfig, PORT).then(() => {
  console.log(`
=============================================================
   ⚡ POKÉ-OH! - SERVIDOR MULTIJUGADOR ONLINE (COLYSEUS) ⚡
=============================================================
  🌐 Servidor Local:    http://localhost:${PORT}
  📡 WebSocket Server:  ws://localhost:${PORT}
  🎮 Modo de Juego:     2 Jugadores Online (Punto a Punto)
=============================================================
  Para jugar online:
  1. Abre http://localhost:${PORT} en dos pestañas o navegadores.
  2. Inicia sesión o juega como invitado.
  3. Haz clic en "2 JUGADORES ONLINE" en el menú principal.
  4. Crea una sala o únete mediante el código de sala.
=============================================================
`);
}).catch((err) => {
  console.error('[Error] Fallo al iniciar el servidor Colyseus:', err);
});

