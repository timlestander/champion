import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import * as GameInfoActions from '../store/actions/game-info.actions';
import * as PlayerActions from '../store/actions/player.actions';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  public name: string = '';
  public code: string = '';
  public view: string = 'join';

  constructor(
    private socketService: SocketService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.socketService.listen('joinedGame').subscribe(data => {
      this.store.dispatch(new GameInfoActions.LoadGameState(data));
      this.store.dispatch(new PlayerActions.SetPlayers(data.players));
      console.log('HERE?');
      console.log(data);
      this.router.navigateByUrl('/game');
    });
  }

  ngOnInit() {}

  public createGame(): void {
    this.socketService.emit('createGame', { name: this.name });
    this.router.navigateByUrl('/game');
  }

  public joinGame(): void {
    this.socketService.emit('joinGame', {
      name: this.name,
      gameId: this.code.toUpperCase()
    });
  }

  public setView(view: string) {
    this.view = view;
  }
}
