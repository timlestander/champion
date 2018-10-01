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
  ChallengeInterface,
  ChampionInterface,
  UIInterface
} from '../interfaces';
import * as ChallengeActions from '../store/actions/challenge.actions';
import * as UIActions from '../store/actions/ui.actions';
import * as moment from 'moment';
import { ModalService } from '../services/modal.service';
import {
  START_COUNTDOWN_TIME,
  RESPONSE_COUNTDOWN_TIME,
  BETTING_COUNTDOWN_TIME
} from '../../../constants';
import { ActivityHelper } from '../libraries/activity.helper';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public gameInfo$: Observable<GameInfoInterface>;
  public ui$: Observable<UIInterface>;
  public champions$: Observable<ChampionInterface[]>;
  public challenge$: Observable<ChallengeInterface>;
  public players$: Observable<PlayerInterface[]>;

  public view: string = 'GAME';
  public showModal: boolean = false;

  constructor(
    private countdownService: CountdownService,
    private socketService: SocketService,
    private store: Store<AppState>,
    private modalService: ModalService
  ) {
    this.gameInfo$ = this.store.select('gameInfo');
    this.champions$ = this.store.select('champions');
    this.ui$ = this.store.select('ui');
    this.challenge$ = this.store.select('challenge');
    this.players$ = this.store.select('players');

    this.modalService.showModal.subscribe((status: boolean) => {
      this.showModal = status;
    });

    this.socketService
      .listen('playerJoined')
      .subscribe((player: PlayerInterface) => {
        this.store.dispatch(new PlayerActions.PlayerJoined(player));
        this.store.dispatch(
          new ActivityActions.AddActivity(
            ActivityHelper.createJoinActivity(player)
          )
        );
      });

    this.socketService.listen('challengeStarted').subscribe((data: any) => {
      this.store.dispatch(
        new ChallengeActions.LoadChallengeData(data.challenge)
      );
      this.store.dispatch(new UIActions.StartCountdown());
      this.store.dispatch(new ChampionActions.SetChampions(data.champions));
      this.countdownService.init(START_COUNTDOWN_TIME);
    });

    this.socketService.listen('responsePhase').subscribe((data: any) => {
      this.store.dispatch(new UIActions.SetResponsePhase());
      this.store.dispatch(
        new ActivityActions.AddActivity(ActivityHelper.newChallengeActivity())
      );
      this.countdownService.init(RESPONSE_COUNTDOWN_TIME);
    });

    this.socketService.listen('challenged').subscribe(() => {
      this.store.dispatch(new UIActions.SetChallenged());
      this.modalService.open();
    });

    this.socketService.listen('betPhase').subscribe(() => {
      this.store.dispatch(new UIActions.SetBetPhase());
      this.countdownService.init(BETTING_COUNTDOWN_TIME);
      this.modalService.open();
    });

    this.socketService.listen('bettingFinished').subscribe(() => {
      this.store.dispatch(new UIActions.BettingFinished());
      this.modalService.close();
    });

    this.socketService
      .listen('championResponded')
      .subscribe((champion: ChampionInterface) => {
        this.store.dispatch(new ChampionActions.SetChampionResponse(champion));
        this.store.dispatch(
          new ActivityActions.AddActivity(
            ActivityHelper.createResponseActivity(champion)
          )
        );
      });

    this.socketService
      .listen('updateScores')
      .subscribe((players: PlayerInterface[]) => {
        this.store.dispatch(new PlayerActions.UpdateScores(players));
      });

    this.socketService.listen('betPlaced').subscribe((data: any) => {
      this.store.dispatch(
        new ActivityActions.AddActivity(ActivityHelper.createBetActivity(data))
      );
    });

    this.socketService.listen('challengeEnded').subscribe((data: any) => {
      this.store.dispatch(
        new ActivityActions.AddActivity(
          ActivityHelper.createWinnerActivity(data.name)
        )
      );
      this.store.dispatch(new UIActions.ChallengeEnded());
      this.store.dispatch(new ChampionActions.ResetChampions());
    });
  }

  public setActive(view: string): void {
    this.view = view;
  }

  ngOnInit() {}
}
