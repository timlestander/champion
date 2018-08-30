import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SocketService } from './socket.service';

@Injectable()
export class RouterGuardService implements CanActivate {
  constructor(public socketService: SocketService, public router: Router) {}
  canActivate(): boolean {
    if (!this.socketService.connected$) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
