import { Action } from '@ngrx/store';
import { PlayerInterface } from '../../interfaces';
import * as PlayerActions from '../actions/player.actions';

const initialState: PlayerInterface[] = [];

export function playerReducer(
  state: PlayerInterface[] = initialState,
  action: PlayerActions.Actions
) {
  switch (action.type) {
    case PlayerActions.PLAYER_JOINED:
      return [...state, action.payload];
    default:
      return state;
  }
}
