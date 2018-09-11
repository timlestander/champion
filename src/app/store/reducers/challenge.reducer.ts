import { Action } from '@ngrx/store';
import { ChallengeInterface } from '../../interfaces';
import * as ChallengeActions from '../actions/challenge.actions';

const initialState: ChallengeInterface = {
  title: '',
  description: '',
  winScore: 0,
  loseScore: 0
};

export function challengeReducer(
  state: ChallengeInterface = initialState,
  action: ChallengeActions.Actions
) {
  switch (action.type) {
    case ChallengeActions.LOAD_CHALLENGE_DATA:
      return action.payload;
    default:
      return state;
  }
}
