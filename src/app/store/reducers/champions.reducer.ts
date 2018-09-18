import { Action } from '@ngrx/store';
import { ChampionInterface } from '../../interfaces';
import * as ChampionActions from '../actions/champion.actions';

const initialState: ChampionInterface[] = [];

export function championsReducer(
  state: ChampionInterface[] = initialState,
  action: ChampionActions.Actions
) {
  switch (action.type) {
    case ChampionActions.SET_CHAMPIONS:
      return action.payload;
    case ChampionActions.SET_CHAMPION_RESPONSE:
      const idx: number = state.findIndex(
        (champion: ChampionInterface) =>
          champion.socketId === action.payload.socketId
      );
      return [...state.slice(0, idx), action.payload, ...state.slice(idx + 1)];
    default:
      return state;
  }
}
