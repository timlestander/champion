import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {
  UIInterface,
  ChampionInterface,
  ChallengeInterface,
  GameInfoInterface
} from '../../interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { CountdownService } from '../../services/countdown.service';
import { SocketService } from '../../services/socket.service';
import * as UIActions from '../../store/actions/ui.actions';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @Input()
  public champions: ChampionInterface[];

  @Input()
  public challenge: ChallengeInterface;

  @Input()
  public gameInfo: GameInfoInterface;

  @Input()
  public ui: UIInterface;

  constructor(
    private socketService: SocketService,
    private countdownService: CountdownService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}
}
