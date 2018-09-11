import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UIInterface, ChampionInterface } from '../../interfaces';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { CountdownService } from '../../services/countdown.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  public ui: Observable<UIInterface>;
  public champions: Observable<ChampionInterface>;

  constructor(
    private countdownService: CountdownService,
    private store: Store<AppState>
  ) {
    this.ui = this.store.select('ui');
    this.champions = this.store.select('champion');
  }

  ngOnInit() {}
}
