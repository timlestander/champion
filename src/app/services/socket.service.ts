import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: socketIo.client.Socket;
  connected$ = new BehaviorSubject<boolean>(false);

  constructor() {
    console.log('IN socket construcotr');
    this.socket = socketIo(
      environment.socket.baseUrl,
      environment.socket.config
    );
    // TODO: MAKE CONSTANTS
    this.socket.on('connect', () => this.connected$.next(true));
    this.socket.on('disconnect', () => this.connected$.next(false));
  }

  public join(room: string): void {
    // Auto rejoin a room on reconnect
    console.log('CHECKPOINT');
    this.connected$.subscribe(connected => {
      console.log(connected);
      if (connected) {
        this.socket.emit('join', { room });
      }
    });
  }

  public disconnect(): void {
    this.socket.disconnect();
    this.connected$.next(false);
  }

  public emit(event: string, data?: any): void {
    console.group();
    console.log('---- SOCKET OUTGOING ----');
    console.log('Action: ', event);
    console.log('Payload: ', data);
    console.groupEnd();

    this.socket.emit(event, data);
  }

  public listen(event: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(event, data => {
        console.group();
        console.log('----- SOCKET INBOUND -----');
        console.log('Action: ', event);
        console.log('Payload: ', data);
        console.groupEnd();
        observer.next(data);
      });
      return () => this.socket.off(event);
    });
  }
}
