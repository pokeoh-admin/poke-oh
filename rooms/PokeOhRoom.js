const { Room } = require('colyseus');

/**
 * PokeOhRoom - Sala de Duelo Multijugador Táctico en Tiempo Real
 * Sincroniza partidas 1v1 entre dos jugadores humanos.
 */
class PokeOhRoom extends Room {
  onCreate(options) {
    this.maxClients = 2;
    this.roomCode = (options.roomCode || Math.random().toString(36).substring(2, 6).toUpperCase());
    this.isPrivate = !!options.isPrivate;
    this.lpInicial = Number(options.lpInicial) || 8000;

    this.setMetadata({
      roomCode: this.roomCode,
      isPrivate: this.isPrivate,
      lpInicial: this.lpInicial
    });

    // Estado de la sala
    this.players = new Map();
    this.gameStarted = false;
    this.turn = 1;
    this.turnSeat = 0; // 0 = Jugador 1 (Red), 1 = Jugador 2 (Blue)
    this.currentPhase = 'PRINCIPAL';

    // Manejador de Registro de Datos del Jugador (Nombre, Avatar, Mazo)
    this.onMessage('player_info', (client, data) => {
      const player = this.players.get(client.sessionId);
      if (player) {
        player.username = data.username || player.username;
        player.avatar = data.avatar || player.avatar;
        player.deckName = data.deckName || 'Baraja Estándar';
        player.ready = true;
      }

      this.verificarInicioPartida();
    });

    // Manejador de Acciones Tácticas del Juego
    // (Invocación, Ataque, Cambio de Posición, Magias, Trampas, Fases, Descarte)
    this.onMessage('action', (client, actionData) => {
      const player = this.players.get(client.sessionId);
      if (!player) return;

      const payload = {
        senderSessionId: client.sessionId,
        senderSeat: player.seat,
        senderName: player.username,
        action: actionData
      };

      // Control de sincronización de turnos en servidor
      if (actionData.tipo === 'PASAR_FASE') {
        this.currentPhase = actionData.fase;
        if (actionData.fase === 'FIN') {
          // Cambiar turno al otro jugador
          this.turnSeat = this.turnSeat === 0 ? 1 : 0;
          this.turn++;
          this.currentPhase = 'PRINCIPAL';
          payload.nuevoTurno = this.turn;
          payload.nuevoTurnSeat = this.turnSeat;
        }
      } else if (actionData.tipo === 'DESCARTAR_EXCESO') {
        payload.descartes = actionData.descartes;
      }

      // Retransmitir la acción a todos los clientes conectados en la sala
      this.broadcast('action', payload);
    });

    // Manejador de Chat Rápido / Emotes
    this.onMessage('chat', (client, chatData) => {
      const player = this.players.get(client.sessionId);
      if (!player) return;

      this.broadcast('chat', {
        senderSeat: player.seat,
        senderName: player.username,
        texto: chatData.texto,
        esEmote: !!chatData.esEmote
      });
    });

    // Manejador de Rendición
    this.onMessage('surrender', (client) => {
      const player = this.players.get(client.sessionId);
      if (!player) return;

      this.gameStarted = false;
      const winnerSeat = player.seat === 0 ? 1 : 0;
      const winnerPlayer = Array.from(this.players.values()).find(p => p.seat === winnerSeat);
      const winnerName = winnerPlayer ? winnerPlayer.username : 'Rival';

      this.broadcast('game_over', {
        reason: 'surrender',
        surrenderedSeat: player.seat,
        winnerSeat: winnerSeat,
        mensaje: `${player.username} se ha rendido. ¡Victoria para ${winnerName}!`
      });
    });

    // Manejador de Derrota por Mazo Vacío (Deck Out)
    this.onMessage('deck_out', (client) => {
      const player = this.players.get(client.sessionId);
      if (!player) return;

      this.gameStarted = false;
      const winnerSeat = player.seat === 0 ? 1 : 0;
      const winnerPlayer = Array.from(this.players.values()).find(p => p.seat === winnerSeat);
      const winnerName = winnerPlayer ? winnerPlayer.username : 'Rival';

      this.broadcast('game_over', {
        reason: 'deck_out',
        surrenderedSeat: player.seat,
        winnerSeat: winnerSeat,
        mensaje: `¡${player.username} se ha quedado sin cartas en su baraja (Deck Out)! ¡Victoria para ${winnerName}!`
      });
    });

    console.log(`[PokeOhRoom] Sala creada. Código: ${this.roomCode} | Privada: ${this.isPrivate}`);
  }

  onJoin(client, options) {
    const seat = this.players.size === 0 ? 0 : 1;
    const username = options.username || (seat === 0 ? 'Entrenador Red' : 'Entrenador Blue');
    const avatar = options.avatar || (seat === 0 ? '🔴' : '🔵');

    const playerData = {
      sessionId: client.sessionId,
      seat: seat,
      username: username,
      avatar: avatar,
      lp: this.lpInicial,
      ready: false
    };

    this.players.set(client.sessionId, playerData);

    // Enviar confirmación al cliente recién conectado con su asiento y código de sala
    client.send('joined_room', {
      roomCode: this.roomCode,
      seat: seat,
      lpInicial: this.lpInicial,
      player: playerData
    });

    console.log(`[PokeOhRoom] Jugador conectado: ${username} (Asiento ${seat}) en sala ${this.roomCode}`);

    this.verificarInicioPartida();
  }

  verificarInicioPartida() {
    if (this.players.size === 2 && !this.gameStarted) {
      this.gameStarted = true;

      const playerList = Array.from(this.players.values()).sort((a, b) => a.seat - b.seat);

      // Notificar a ambos jugadores que la partida comienza
      this.broadcast('match_start', {
        roomCode: this.roomCode,
        lpInicial: this.lpInicial,
        players: playerList,
        startingSeat: 0, // El Jugador 1 (asiento 0) inicia en Turno 1
        turno: this.turn,
        fase: this.currentPhase
      });

      console.log(`[PokeOhRoom] ¡Duelo iniciado en sala ${this.roomCode}! ${playerList[0].username} vs ${playerList[1].username}`);
    }
  }

  onLeave(client, consented) {
    const leavingPlayer = this.players.get(client.sessionId);
    if (!leavingPlayer) return;

    console.log(`[PokeOhRoom] Jugador desconectado: ${leavingPlayer.username} (Asiento ${leavingPlayer.seat})`);
    this.players.delete(client.sessionId);

    if (this.gameStarted) {
      this.gameStarted = false;
      const remainingPlayer = Array.from(this.players.values())[0];
      if (remainingPlayer) {
        this.broadcast('game_over', {
          reason: 'disconnect',
          surrenderedSeat: leavingPlayer.seat,
          winnerSeat: remainingPlayer.seat,
          mensaje: `${leavingPlayer.username} se ha desconectado. ¡Victoria para ${remainingPlayer.username}!`
        });
      }
    }
  }

  onDispose() {
    console.log(`[PokeOhRoom] Sala ${this.roomCode} destruida.`);
  }
}

module.exports = { PokeOhRoom };

