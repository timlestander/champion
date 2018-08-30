export interface GameInterface {
  host: any;
  gameId: string;
  activeChallenge?: ActiveChallengeInterface;
  players: PlayerInterface[];
}

export interface ActiveChallengeInterface {
  challenge: ChallengeInterface;
  players: ChallengePlayerInterface[];
  bets: ChallengeBetInterface[];
}

export interface ChallengeInterface {
  title: string;
  description: string;
  winScore: number;
  loseScore: number;
  playerCount: number;
  responseTime: Date;
}

export interface ChallengePlayerInterface {
  socketId: any;
  response: boolean | null;
  name: string;
}

export interface ChallengeBetInterface {
  betAmount: number;
  bet: any;
  socket: any;
}

export interface PlayerInterface {
  name: string;
  socketId: any;
  score: number;
}
