import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ActivityInterface } from '../../interfaces/activity.interface';

export const ADD_ACTIVITY = '[ACTIVITY] Add';

export class AddActivity implements Action {
  readonly type = ADD_ACTIVITY;

  constructor(public payload: ActivityInterface) {}
}

export type Actions = AddActivity;
