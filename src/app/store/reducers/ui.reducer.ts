import { Action } from '@ngrx/store';
import { UIInterface } from '../../interfaces';
import * as UIActions from '../actions/ui.actions';

const initialState: UIInterface = {
  idle: true,
  betPhase: false,
  challengeOverview: false,
  responsePhase: false,
  initPhase: false,
  challenged: false,
  competitionPhase: false
};

export function uiReducer(
  state: UIInterface = initialState,
  action: UIActions.Actions
) {
  switch (action.type) {
    case UIActions.START_COUNTDOWN:
      return { ...initialState, idle: false, initPhase: true };
    case UIActions.SET_RESPONSE_PHASE:
      return {
        ...initialState,
        idle: false,
        responsePhase: true,
        challengeOverview: true
      };
    case UIActions.SET_CHALLENGED:
      return { ...state, challenged: true };
    case UIActions.RESPONDED:
      return { ...state, challenged: false };
    case UIActions.SET_BET_PHASE:
      return {
        ...state,
        responsePhase: false,
        betPhase: true,
        challenged: false
      };
    case UIActions.BET_PLACED:
      return {
        ...state,
        betPhase: false
      };
    case UIActions.BETTING_FINISHED:
      return {
        ...state,
        betPhase: false,
        competitionPhase: true
      };
    case UIActions.CHALLENGE_ENDED:
      return initialState;
    default:
      return state;
  }
}
