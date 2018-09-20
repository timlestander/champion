import { Component, OnInit, Input } from '@angular/core';
import {
  ChallengeInterface,
  ChampionInterface,
  UIInterface,
  GameInfoInterface
} from '../../interfaces';
import { SocketService } from '../../services/socket.service';
import { ModalService } from '../../services/modal.service';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import * as UIActions from '../../store/actions/ui.actions';
import * as ActivityActions from '../../store/actions/activity.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input()
  public champions: ChampionInterface[];

  @Input()
  public challenge: ChallengeInterface;

  @Input()
  public ui: UIInterface;

  @Input()
  public gameInfo: GameInfoInterface;

  constructor(
    private socketService: SocketService,
    private store: Store<AppState>,
    private modalService: ModalService
  ) {}

  public respond(value: boolean): void {
    this.socketService.emit('sendResponse', {
      response: value,
      gameId: this.gameInfo.gameId,
      socketId: this.gameInfo.socketId
    });
    this.store.dispatch(new UIActions.Responded());
    this.modalService.close();
  }

  ngOnInit() {}
}
