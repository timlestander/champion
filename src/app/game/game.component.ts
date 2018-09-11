import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketService } from '../services/socket.service';
import { CountdownService } from '../services/countdown.service';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import * as ActivityActions from '../store/actions/activity.actions';
import * as GameInfoActions from '../store/actions/game-info.actions';
import * as PlayerActions from '../store/actions/player.actions';
import * as ChampionActions from '../store/actions/champion.actions';
import {
  PlayerInterface,
  ActivityInterface,
  GameInfoInterface,
  ChallengeInterface
} from '../interfaces';
import * as ChallengeActions from '../store/actions/challenge.actions';
import * as UIActions from '../store/actions/ui.actions';
import * as moment from 'moment';

const START_COUNTDOWN_TIME: number = 10;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public gameInfo: Observable<GameInfoInterface>;
  public view: string = 'GAME';

  constructor(
    private countdownService: CountdownService,
    private socketService: SocketService,
    private store: Store<AppState>
  ) {
    this.gameInfo = this.store.select('gameInfo');

    this.socketService
      .listen('joinedGame')
      .subscribe((gameInfo: GameInfoInterface) => {
        this.store.dispatch(new GameInfoActions.LoadGameState(gameInfo));
      });

    this.socketService
      .listen('playerJoined')
      .subscribe((player: PlayerInterface) => {
        this.store.dispatch(new PlayerActions.PlayerJoined(player));
      });

    this.socketService.listen('playerJoined').subscribe(player => {
      this.store.dispatch(
        new ActivityActions.AddActivity(this.createJoinActivity(player))
      );
    });

    this.socketService
      .listen('challengeStarted')
      // .subscribe((challenge: ChallengeInterface) => {
      .subscribe((data: any) => {
        this.store.dispatch(
          new ChallengeActions.LoadChallengeData(data.challenge)
        );
        this.store.dispatch(new UIActions.StartCountdown());
        this.store.dispatch(new ChampionActions.SetChampions(data.challengers));
        this.countdownService.init(START_COUNTDOWN_TIME);
      });
  }

  public setActive(view: string): void {
    this.view = view;
  }

  private createJoinActivity(player: any): ActivityInterface {
    let text: string = `${player.name} joined the game`;
    let when: string = moment(new Date()).fromNow();
    let icon: string = 'fas fa-user-plus';
    return { text, when, icon };
  }

  ngOnInit() {}
}
