import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SocketService } from './services/socket.service';
import { StartComponent } from './start/start.component';
import { GameComponent } from './game/game.component';
import { FeedComponent } from './game/feed/feed.component';
import { RouterGuardService } from './services/router.guard';
import { StoreModule } from '@ngrx/store';
import { activityReducer } from './store/reducers/activity.reducer';

const appRoutes: Routes = [
  {
    path: 'game',
    component: GameComponent,
    canActivate: [RouterGuardService]
  },
  {
    path: '',
    component: StartComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  declarations: [AppComponent, StartComponent, GameComponent, FeedComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ activity: activityReducer })
  ],
  providers: [SocketService, RouterGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
