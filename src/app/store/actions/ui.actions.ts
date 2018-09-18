import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { UIInterface } from '../../interfaces';

export const START_COUNTDOWN = '[UI] Start countdown';
export const SET_RESPONSE_PHASE = '[UI] Set response phase';
export const SET_CHALLENGED = '[UI] Set challenged';
export const RESPONDED = '[UI] Responded';

export class StartCountdown implements Action {
  readonly type = START_COUNTDOWN;

  constructor(public payload?: any) {}
}

export class SetResponsePhase implements Action {
  readonly type = SET_RESPONSE_PHASE;

  constructor(public payload?: any) {}
}

export class SetChallenged implements Action {
  readonly type = SET_CHALLENGED;

  constructor(public payload?: any) {}
}

export class Responded implements Action {
  readonly type = RESPONDED;

  constructor(public payload?: any) {}
}

export type Actions =
  | StartCountdown
  | SetResponsePhase
  | SetChallenged
  | Responded;
