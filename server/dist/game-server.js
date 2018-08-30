"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express = require("express");
const socketIo = require("socket.io");
class GameServer {
    constructor() {
        this.games = {};
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    createApp() {
        this.app = express();
    }
    createServer() {
        this.server = http_1.createServer(this.app);
    }
    config() {
        this.port = process.env.PORT || GameServer.PORT;
    }
    sockets() {
        this.io = socketIo(this.server);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Running server on port ' + this.port);
        });
        this.io.on('connect', socket => {
            console.log('Client connected.');
            socket.on('createGame', (payload) => {
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
            socket.on('joinGame', (payload) => {
                const { name, gameId } = payload;
                if (gameId in this.games) {
                    socket.join(gameId);
                    const player = {
                        name: name,
                        socketId: socket.id,
                        score: 1000
                    };
                    this.games[gameId].players.push(player);
                    this.io.to(gameId).emit('playerJoined', player);
                    socket.emit('gameJoined', this.games[gameId]);
                }
                else {
                    console.log('NOT THIS TIME BITCH');
                }
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
    getApp() {
        return this.app;
    }
    generateCode() {
        let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
        let gameId = '';
        for (let x = 0; x < 4; x++) {
            gameId += letters[Math.floor(Math.random() * letters.length)];
        }
        if (gameId in this.games)
            this.generateCode();
        return gameId;
    }
}
GameServer.PORT = 3000;
exports.GameServer = GameServer;
//# sourceMappingURL=game-server.js.map