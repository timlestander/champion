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
import {
  uiReducer,
  playersReducer,
  challengeReducer,
  championsReducer,
  activityReducer
} from './store/reducers';
import { gameInfoReducer } from './store/reducers/game-info.reducer';
import { ScoreboardComponent } from './game/scoreboard/scoreboard.component';
import { AdminComponent } from './game/admin/admin.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MainComponent } from './game/main/main.component';

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
  declarations: [
    AppComponent,
    StartComponent,
    GameComponent,
    FeedComponent,
    ScoreboardComponent,
    AdminComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({
      activity: activityReducer,
      players: playersReducer,
      gameInfo: gameInfoReducer,
      challenge: challengeReducer,
      ui: uiReducer,
      champions: championsReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  providers: [SocketService, RouterGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
