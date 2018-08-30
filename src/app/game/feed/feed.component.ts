import { Component, OnInit } from '@angular/core';
import { ActivityInterface } from '../../interfaces/activity.interface';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { SocketService } from '../../services/socket.service';
import * as ActivityActions from '../../store/actions/activity.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public activities: Observable<ActivityInterface[]>;

  constructor(
    private socketService: SocketService,
    private store: Store<AppState>
  ) {
    this.activities = this.store.select('activity');

    this.socketService.listen('playerJoined').subscribe(player => {
      this.store.dispatch(
        new ActivityActions.AddActivity(this.createJoinActivity(player))
      );
    });
  }

  ngOnInit() {}

  private createJoinActivity(player: any): ActivityInterface {
    let text: string = `${player.name} joined the game`;
    let when: string = moment(Date()).fromNow();
    let icon: string = 'icon';
    return { text, when, icon };
  }
}
