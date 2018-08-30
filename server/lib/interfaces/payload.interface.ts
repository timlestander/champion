export interface CreateGamePayload {
  name: string;
}

export interface JoinGamePayload {
  name: string;
  gameId: string;
}
