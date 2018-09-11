import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ChallengeInterface } from '../../interfaces/challenge.interface';

export const LOAD_CHALLENGE_DATA = '[CHALLENGE] Load challenge data';

export class LoadChallengeData implements Action {
  readonly type = LOAD_CHALLENGE_DATA;

  constructor(public payload: ChallengeInterface) {}
}

export type Actions = LoadChallengeData;
