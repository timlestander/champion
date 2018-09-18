import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { ChampionInterface } from '../../interfaces';

export const SET_CHAMPIONS = '[CHAMPION] Set champions';
export const SET_CHAMPION_RESPONSE = '[CHAMPION] Set champion response';

export class SetChampions implements Action {
  readonly type = SET_CHAMPIONS;

  constructor(public payload: ChampionInterface[]) {}
}

export class SetChampionResponse implements Action {
  readonly type = SET_CHAMPION_RESPONSE;

  constructor(public payload: ChampionInterface) {}
}
export type Actions = SetChampions | SetChampionResponse;
