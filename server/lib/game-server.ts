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
          gameId: gameId,
          players: [
            {
              socketId: socket.id,
              name: payload.name,
              score: 1000
            }
          ]
        };
        socket.join(gameId);
        this.io.to(gameId).emit('playerJoined', this.games[gameId].players[0]);
        socket.emit('joinedGame', {
          ...this.games[gameId],
          isHost: true,
          socketId: socket.id
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
          this.io.to(gameId).emit('playerJoined', player);
          socket.emit('joinedGame', {
            ...this.games[gameId],
            isHost: false,
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
          this.games[gameId].players
        );
        this.games[gameId].champions = champions;
        console.log(this.games[gameId].champions);
        if (socketId === this.games[gameId].host) {
          this.io.to(gameId).emit('challengeStarted', { challenge, champions });

          setTimeout(() => {
            this.io.to(gameId).emit('responsePhase');
            this.io.to(champions[0].socketId).emit('challenged');
            this.io.to(champions[1].socketId).emit('challenged');
          }, 3000);
        }
      });

      socket.on('sendResponse', (payload: any) => {
        const { gameId, socketId, response } = payload;
        console.log(gameId);
        const idx: number = this.games[gameId].champions.findIndex(
          (champion: any) => champion.socketId === socketId
        );
        this.games[gameId].champions[idx].response = response;
        this.io
          .to(gameId)
          .emit('championResponded', this.games[gameId].champions[idx]);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  public getApp(): express.Application {
    return this.app;
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

  private drawPlayers(players: PlayerInterface[]) {
    return [
      {
        ...players[0],
        response: null
      },
      {
        ...players[1],
        response: null
      }
    ];
  }
}

const allChallenges: ChallengeInterface[] = [
  {
    title: 'Ölhäv',
    description: 'Vem kan häva en 33cl öl snabbast?',
    winScore: 300,
    loseScore: 100,
    playerCount: 2
  },
  {
    title: 'Armhävningar',
    description: 'Vem kan göra flest armhävningar?',
    winScore: 200,
    loseScore: 50,
    playerCount: 2
  },
  {
    title: '',
    description: 'Vem kan springa runt huset snabbast?',
    winScore: 500,
    loseScore: 200,
    playerCount: 2
  }
];
