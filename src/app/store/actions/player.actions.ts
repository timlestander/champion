import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { PlayerInterface } from '../../interfaces';

export const PLAYER_JOINED = '[PLAYER] Joined';
export const SET_PLAYERS = '[PLAYER] Set players';

export class PlayerJoined implements Action {
  readonly type = PLAYER_JOINED;

  constructor(public payload: PlayerInterface) {}
}

export class SetPlayers implements Action {
  readonly type = SET_PLAYERS;

  constructor(public payload: PlayerInterface[]) {}
}

export type Actions = PlayerJoined | SetPlayers;
