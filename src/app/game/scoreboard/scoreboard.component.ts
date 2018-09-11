import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { SocketService } from '../../services/socket.service';
import * as PlayerActions from '../../store/actions/player.actions';
import { PlayerInterface } from '../../interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  public players: Observable<PlayerInterface[]>;
  constructor(
    private socketService: SocketService,
    private store: Store<AppState>
  ) {
    this.players = this.store.select('player');
  }

  ngOnInit() {}
}
