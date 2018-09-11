import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  public name: string = '';
  public code: string = '';
  public view: string = 'join';

  constructor(private socketService: SocketService, private router: Router) {
    this.socketService.listen('joinedGame').subscribe(data => {
      console.log('You joined a game', data);
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
