import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public showModal: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  public open(): void {
    this.showModal.next(true);
  }

  public close(): void {
    this.showModal.next(false);
  }
}
