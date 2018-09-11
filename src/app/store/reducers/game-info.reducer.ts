import { Action } from '@ngrx/store';
import { GameInfoInterface } from '../../interfaces/game-info.interface';
import * as GameInfoActions from '../actions/game-info.actions';

const initialState: GameInfoInterface = {
  host: '',
  socketId: '',
  isHost: false,
  gameId: ''
};

export function gameInfoReducer(
  state: GameInfoInterface = initialState,
  action: GameInfoActions.Actions
) {
  switch (action.type) {
    case GameInfoActions.LOAD_GAME_STATE:
      return {
        ...state,
        gameId: action.payload.gameId,
        isHost: action.payload.isHost,
        host: action.payload.host,
        socketId: action.payload.socketId
      };

    default:
      return state;
  }
}
