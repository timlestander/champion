import { Action } from '@ngrx/store';
import { ChampionInterface } from '../../interfaces';
import * as ChampionActions from '../actions/champion.actions';

const initialState: ChampionInterface[] = [];

export function championReducer(
  state: ChampionInterface[] = initialState,
  action: ChampionActions.Actions
) {
  switch (action.type) {
    case ChampionActions.SET_CHAMPIONS:
      return action.payload;
    default:
      return state;
  }
}
