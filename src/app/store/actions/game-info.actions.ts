import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { GameInfoInterface } from '../../interfaces/game-info.interface';

export const LOAD_GAME_STATE = '[GAME] Load game state';

export class LoadGameState implements Action {
  readonly type = LOAD_GAME_STATE;

  constructor(public payload: GameInfoInterface) {}
}

export type Actions = LoadGameState;
