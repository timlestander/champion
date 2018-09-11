import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SocketService } from '../../services/socket.service';
import { GameInfoInterface } from '../../interfaces/game-info.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @Input()
  public gameInfo: Observable<GameInfoInterface>;

  constructor(private socketService: SocketService) {}

  ngOnInit() {}

  public nextChallenge(): void {
    this.gameInfo.pipe(take(1)).subscribe((state: GameInfoInterface) => {
      this.socketService.emit('startChallenge', {
        gameId: state.gameId,
        socketId: state.socketId
      });
    });
  }
}
