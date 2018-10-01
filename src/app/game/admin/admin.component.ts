import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SocketService } from '../../services/socket.service';
import {
  GameInfoInterface,
  UIInterface,
  ChampionInterface
} from '../../interfaces';
import * as ActivityAction from '../../store/actions/activity.actions';
import { ActivityHelper } from '../../libraries/activity.helper';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @Input()
  public gameInfo: GameInfoInterface;

  @Input()
  public ui: UIInterface;

  @Input()
  public champions: ChampionInterface[];

  constructor(
    private socketService: SocketService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  public nextChallenge(): void {
    this.socketService.emit('startChallenge', {
      gameId: this.gameInfo.gameId,
      socketId: this.gameInfo.socketId
    });
  }

  public setWinner(champion: ChampionInterface): void {
    this.socketService.emit('setWinner', {
      socketId: champion.socketId,
      name: champion.name,
      gameId: this.gameInfo.gameId
    });
  }
}
