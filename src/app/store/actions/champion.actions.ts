import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ChampionInterface } from '../../interfaces';

export const SET_CHAMPIONS = '[CHAMPION] Set champions';

export class SetChampions implements Action {
  readonly type = SET_CHAMPIONS;

  constructor(public payload: ChampionInterface[]) {}
}

export type Actions = SetChampions;
