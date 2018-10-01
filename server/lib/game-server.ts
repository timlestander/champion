import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import {
  GameInterface,
  PlayerInterface,
  CreateGamePayload,
  JoinGamePayload,
  NextChallengePayload,
  ChallengeInterface,
  ChampionInterface
} from './interfaces';

import {
  START_COUNTDOWN_TIME,
  RESPONSE_COUNTDOWN_TIME,
  BETTING_COUNTDOWN_TIME
} from '../../constants';

export class GameServer {
  public static readonly PORT: number = 3000;
  private app: express.Application;
  private server: Server;
  private io: socketIo.Server;
  private port: string | number;
  private games: { [s: string]: GameInterface } = {};

  constructor() {
    this.createApp();
    this.config();
    this.createServer();
    this.sockets();
    this.listen();
  }

  private createApp(): void {
    this.app = express();
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || GameServer.PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server);
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port ' + this.port);
    });

    this.io.on('connect', socket => {
      console.log('Client connected.');

      socket.on('createGame', (payload: CreateGamePayload) => {
        let gameId = this.generateCode();
        this.games[gameId] = {
          host: socket.id,
          gameId,
          players: [
            {
              socketId: socket.id,
              name: payload.name,
              score: 1000
            }
          ],
          bets: []
        };
        socket.join(gameId);
        this.io.to(gameId).emit('playerJoined', this.games[gameId].players[0]);
        socket.emit('joinedGame', {
          ...this.games[gameId],
          isHost: true,
          socketId: socket.id,
          name: payload.name
        });
      });

      socket.on('joinGame', (payload: JoinGamePayload) => {
        const { name, gameId } = payload;
        if (gameId in this.games) {
          socket.join(gameId);
          const player: PlayerInterface = {
            name: name,
            socketId: socket.id,
            score: 1000
          };
          this.games[gameId].players.push(player);
          console.log(this.games[gameId].players);
          this.io.to(gameId).emit('playerJoined', player);
          socket.emit('joinedGame', {
            ...this.games[gameId],
            isHost: false,
            name,
            socketId: socket.id
          });
        } else {
          console.log('NOT THIS TIME BITCH');
        }
      });

      socket.on('startChallenge', (payload: NextChallengePayload) => {
        const { gameId, socketId } = payload;
        const challenge: ChallengeInterface =
          allChallenges[Math.floor(Math.random() * allChallenges.length)];
        const champions: ChampionInterface[] = this.drawPlayers(
          this.games[gameId].players,
          challenge.playerCount
        );
        this.games[gameId].champions = champions;
        this.games[gameId].bets = [];
        if (socketId === this.games[gameId].host) {
          this.io.to(gameId).emit('challengeStarted', { challenge, champions });

          setTimeout(() => {
            this.io.to(gameId).emit('responsePhase');
            champions.forEach((champion: ChampionInterface) => {
              this.io.to(champion.socketId).emit('challenged');
            });

            setTimeout(() => {
              if (!this.allPlayersResponded(gameId)) {
                this.setNoResponsesToDecline(gameId);
                this.io.to(gameId).emit('betPhase');
              }

              setTimeout(() => {
                this.io.to(gameId).emit('bettingFinished');
              }, BETTING_COUNTDOWN_TIME * 1000);
            }, RESPONSE_COUNTDOWN_TIME * 1000);
          }, START_COUNTDOWN_TIME * 1000);
        }
      });

      socket.on('sendResponse', (payload: any) => {
        const { gameId, socketId, response } = payload;
        const idx: number = this.games[gameId].champions.findIndex(
          (champion: any) => champion.socketId === socketId
        );
        this.games[gameId].champions[idx].response = response;
        this.io
          .to(gameId)
          .emit('championResponded', this.games[gameId].champions[idx]);

        if (this.allPlayersResponded(gameId)) {
          this.io.to(gameId).emit('betPhase');
          console.log('Init betphase from all players answered');
        }
      });

      socket.on('placeBet', (payload: any) => {
        const { gameId, socketId, betId, amount, name } = payload;
        this.games[gameId].bets.push({
          socketId,
          betId,
          amount
        });
        this.io.to(gameId).emit('betPlaced', { name, amount });
        if (
          this.games[gameId].bets.length === this.games[gameId].players.length
        ) {
          this.io.to(gameId).emit('bettingFinished');
        }
      });

      socket.on('setWinner', (payload: any) => {
        const { gameId, socketId, name } = payload;
        this.io.to(gameId).emit('challengeEnded', { name });
        this.updateScores(gameId, socketId);
        this.io.to(gameId).emit('updateScores', this.games[gameId].players);
        console.log(gameId);
        console.log(socketId);
        console.log(name);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
  }

  private updateScores(gameId: string, winnerId: string): void {
    this.games[gameId].bets.forEach((bet: any) => {
      this.games[gameId].players.forEach((player: any) => {
        if (bet.socketId === player.socketId) {
          if (bet.betId === winnerId) {
            player.score += bet.amount;
          } else {
            player.score -= bet.amount;
          }
        }
      });
    });
  }

  private allPlayersResponded(gameId: string) {
    let result: boolean = true;
    this.games[gameId].champions.forEach((champion: ChampionInterface) => {
      if (champion.response === null) {
        result = false;
      }
    });
    console.log('All players responded?: ' + result);
    return result;
  }

  private setNoResponsesToDecline(gameId: string) {
    this.games[gameId].champions.forEach((champion: ChampionInterface) => {
      if (champion.response === null) {
        champion.response = false;
        this.io.to(gameId).emit('championResponded', champion);
      }
    });
  }

  private generateCode(): string {
    let letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
    let gameId: string = '';
    for (let x = 0; x < 4; x++) {
      gameId += letters[Math.floor(Math.random() * letters.length)];
    }
    if (gameId in this.games) this.generateCode();

    return gameId;
  }

  private drawPlayers(
    players: PlayerInterface[],
    amount: number
  ): ChampionInterface[] {
    if (amount >= players.length) {
      amount = players.length;
    }
    const shuffled = players.sort(() => 0.5 * Math.random()).splice(0, amount);
    let champions: ChampionInterface[] = [];
    // Could and should be improved
    shuffled.forEach(player => {
      champions.push({
        socketId: player.socketId,
        name: player.name,
        response: null
      });
    });
    return champions;
  }
}

const allChallenges: ChallengeInterface[] = [
  {
    title: 'Ölhäv',
    description: 'Vem kan häva en 33cl öl snabbast?',
    winScore: 300,
    loseScore: 100,
    playerCount: 100
  },
  {
    title: 'Armhävningar',
    description: 'Vem kan göra flest armhävningar?',
    winScore: 200,
    loseScore: 50,
    playerCount: 100
  },
  {
    title: 'Snabbspring',
    description: 'Vem kan springa runt huset snabbast?',
    winScore: 500,
    loseScore: 200,
    playerCount: 1
  },
  {
    title: 'Beer pong',
    description:
      'Vilka vinner ett klassiskt game av beeo pong? House rules gäller.',
    winScore: 1000,
    loseScore: 500,
    playerCount: 1
  },
  {
    title: 'Europeiska huvudstäder',
    description:
      'Vem kan nämna flest europeiska huvudstäder? Varannan huvudstad nämns med betänketid som ni bestämmer.',
    winScore: 200,
    loseScore: 100,
    playerCount: 5
  }
];
