import { Injectable } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  public seconds: number = 0;
  public countdown$: Observable<number>;
  public countdownSubscription: Subscription;

  public init(seconds: number): void {
    this.seconds = seconds;
    this.countdown$ = interval(1000).pipe(take(seconds));

    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    this.countdownSubscription = this.countdown$.subscribe(
      (s: number) => --this.seconds,
      (error: any) => console.log(error),
      () => console.log('Countdown completed')
    );
  }
}
