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
  }

  ngOnInit() {}
}
