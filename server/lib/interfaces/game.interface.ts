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
  socketId: string;
  response: boolean | null;
  name: string;
}

export interface BetInterface {
  amount: number;
  betId: string;
  socketId: string;
}

export interface PlayerInterface {
  name: string;
  socketId: string;
  score: number;
}
