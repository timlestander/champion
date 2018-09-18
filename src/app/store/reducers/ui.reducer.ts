import { Action } from '@ngrx/store';
import { UIInterface } from '../../interfaces';
import * as UIActions from '../actions/ui.actions';

const initialState: UIInterface = {
  idle: true,
  connected: false,
  startCountdown: false,
  bettingCountdown: false,
  responsePhase: false,
  challenged: false
};

export function uiReducer(
  state: UIInterface = initialState,
  action: UIActions.Actions
) {
  switch (action.type) {
    case UIActions.START_COUNTDOWN:
      return { ...initialState, idle: false, startCountdown: true };
    case UIActions.SET_RESPONSE_PHASE:
      return { ...initialState, idle: false, responsePhase: true };
    case UIActions.SET_CHALLENGED:
      return { ...state, challenged: true };
    case UIActions.RESPONDED:
      return { ...state, challenged: false };
    default:
      return state;
  }
}
