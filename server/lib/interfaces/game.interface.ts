export interface GameInterface {
  host: string;
  gameId: string;
  players: PlayerInterface[];
  challenge?: ChallengeInterface;
  champions?: ChampionInterface[];
  bets?: BetInterface[];
}

export interface ChallengeInterface {
  title: string;
  description: string;
  winScore: number;
  loseScore: number;
  playerCount: number;
}

export interface ChampionInterface {
  socketId: any;
  response: boolean | null;
  name: string;
}

export interface BetInterface {
  betAmount: number;
  bet: any;
  socket: any;
}

export interface PlayerInterface {
  name: string;
  socketId: any;
  score: number;
}
