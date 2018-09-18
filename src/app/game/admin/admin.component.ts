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
  public gameInfo: GameInfoInterface;

  constructor(private socketService: SocketService) {}

  ngOnInit() {}

  public nextChallenge(): void {
    this.socketService.emit('startChallenge', {
      gameId: this.gameInfo.gameId,
      socketId: this.gameInfo.socketId
    });
  }
}
