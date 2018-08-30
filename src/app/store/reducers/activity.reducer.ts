import { Action } from '@ngrx/store';
import { ActivityInterface } from '../../interfaces/activity.interface';
import * as ActivityActions from '../actions/activity.actions';

const initialState: ActivityInterface[] = [
  {
    text: 'Fake player1 joined the game',
    icon: 'fas fa-user-plus',
    when: 'A few seconds ago'
  },
  {
    text: 'Unnamed placer bet on Tim',
    icon: 'fas fa-money-check-alt',
    when: '5 minutes ago'
  },
  {
    text: 'Not real player joined the game',
    icon: 'fas fa-user-plus',
    when: '7 minutes ago'
  }
];

export function activityReducer(
  state: ActivityInterface[] = initialState,
  action: ActivityActions.Actions
) {
  switch (action.type) {
    case ActivityActions.ADD_ACTIVITY:
      return [...state, action.payload];
    default:
      return state;
  }
}
