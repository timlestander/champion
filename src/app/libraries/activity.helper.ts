import {
  ActivityInterface,
  PlayerInterface,
  ChampionInterface
} from '../interfaces';
import * as moment from 'moment';

export class ActivityHelper {
  constructor() {}

  static createJoinActivity(player: PlayerInterface): ActivityInterface {
    let text: string = `${player.name} joined the game`;
    let when: Date = new Date();
    let icon: string = 'fas fa-user-plus';
    return { text, when, icon };
  }

  static createResponseActivity(
    champion: ChampionInterface
  ): ActivityInterface {
    let text: string = champion.response
      ? `${champion.name} accepted the challenge.`
      : `${champion.name} declined the challenge`;
    let when: Date = new Date();
    let icon: string = champion.response
      ? 'fas fa-thumbs-up'
      : 'fas fa-thumbs-down';
    return { text, when, icon };
  }

  static newChallengeActivity(): ActivityInterface {
    let text: string = 'New challenge initiated.';
    let when: Date = new Date();
    let icon: string = 'fas fa-bolt';
    return { text, when, icon };
  }

  static createBetActivity(data: any): ActivityInterface {
    let text: string = `${data.player} placed bet on $${data.amount}`;
    let when: Date = new Date();
    let icon: string = 'fas fa-money-check-alt';
    return { text, when, icon };
  }

  static createWinnerActivity(name: string): ActivityInterface {
    let text: string = `${name} won the last challenge.`;
    let when: Date = new Date();
    let icon: string = 'fas fa-trophy';
    return { text, when, icon };
  }
}
