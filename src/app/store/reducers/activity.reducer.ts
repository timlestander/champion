import { Action } from '@ngrx/store';
import { ActivityInterface } from '../../interfaces/activity.interface';
import * as ActivityActions from '../actions/activity.actions';

const initialState: ActivityInterface[] = [];

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
