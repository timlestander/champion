import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import * as ActivityActions from '../store/actions/activity.actions';
import { ActivityInterface } from '../interfaces/activity.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public notifications: string[] = [];

  constructor(
    private socketService: SocketService,
    private store: Store<AppState>
  ) {
    this.socketService.listen('gameCreated').subscribe(data => {
      console.log('GAME CREATED', data);
    });

    this.socketService.listen('gameJoined').subscribe(data => {
      console.log('You joined a game. Nice one.', data);
    });
  }

  ngOnInit() {}
}
