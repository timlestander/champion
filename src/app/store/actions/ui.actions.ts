import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { UIInterface } from '../../interfaces';

export const START_COUNTDOWN = '[UI] Start countdown';

export class StartCountdown implements Action {
  readonly type = START_COUNTDOWN;

  constructor(public payload?: any) {}
}

export type Actions = StartCountdown;
