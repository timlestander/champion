import {
  ActivityInterface,
  PlayerInterface,
  ChallengeInterface,
  UIInterface,
  GameInfoInterface,
  ChampionInterface
} from '../interfaces';

export interface AppState {
  readonly activity: ActivityInterface[];
  readonly players: PlayerInterface[];
  readonly challenge: ChallengeInterface;
  readonly ui: UIInterface;
  readonly gameInfo: GameInfoInterface;
  readonly champions: ChampionInterface[];
}
