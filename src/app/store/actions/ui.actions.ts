import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { UIInterface } from '../../interfaces';

export const START_COUNTDOWN = '[UI] Start countdown';
export const SET_RESPONSE_PHASE = '[UI] Set response phase';
export const SET_CHALLENGED = '[UI] Set challenged';
export const RESPONDED = '[UI] Responded';
export const SET_BET_PHASE = '[UI] Set bet phase';
export const BET_PLACED = '[UI] Bet placed';
export const BETTING_FINISHED = '[UI] Betting finished';
export const CHALLENGE_ENDED = '[UI] Challenge ended';

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

export class SetBetPhase implements Action {
  readonly type = SET_BET_PHASE;

  constructor(public payload?: any) {}
}

export class BetPlaced implements Action {
  readonly type = BET_PLACED;

  constructor(public payload?: any) {}
}

export class BettingFinished implements Action {
  readonly type = BETTING_FINISHED;

  constructor(public payload?: any) {}
}

export class ChallengeEnded implements Action {
  readonly type = CHALLENGE_ENDED;

  constructor(public payload?: any) {}
}

export type Actions =
  | StartCountdown
  | SetResponsePhase
  | SetChallenged
  | Responded
  | SetBetPhase
  | BetPlaced
  | BettingFinished
  | ChallengeEnded;
