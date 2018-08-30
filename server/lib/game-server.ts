import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import {
  GameInterface,
  PlayerInterface,
  CreateGamePayload,
  JoinGamePayload
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
        socket.emit('gameCreated', this.games[gameId]);
      });

      socket.on('joinGame', (payload: JoinGamePayload) => {
        const { name, gameId } = payload;
        if (gameId in this.games) {
          console.log("Let's join");
          socket.join(gameId);
          const player: PlayerInterface = {
            name: name,
            socketId: socket.id,
            score: 1000
          };
          this.games[gameId].players.push(player);
          this.io.to(gameId).emit('playerJoined', player);
          socket.emit('gameJoined', this.games[gameId]);
        } else {
          console.log('NOT THIS TIME BITCH');
        }
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
}