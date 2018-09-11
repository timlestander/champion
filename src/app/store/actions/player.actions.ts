import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { PlayerInterface } from '../../interfaces';

export const PLAYER_JOINED = '[PLAYER] Joined';

export class PlayerJoined implements Action {
  readonly type = PLAYER_JOINED;

  constructor(public payload: PlayerInterface) {}
}

export type Actions = PlayerJoined;
