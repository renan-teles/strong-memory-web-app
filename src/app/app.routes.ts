import { Routes } from '@angular/router';
import { StartGamePage } from './features/game/pages/start-game/start-game.page';
import { WordSuggestionPage } from './features/words/pages/word-suggestion/word-suggestion.page';
import { AboutGamePage } from './features/game/pages/about-game/about-game.page';
import { HowToPlayPage } from './features/game/pages/how-to-play/how-to-play.page';
import { PlayGamePage } from './features/game/pages/play-game/play-game.page';
import { PlayerPanelPage } from './features/users/player/pages/player-panel/player-panel.page';
import { RegisteredWordsPage } from './features/words/pages/registered-words/registered-words.page';

export const routes: Routes = [

  /* Game Routes */
  {
    path: 'game/start',
    component: StartGamePage,
  },
  {
    path: 'game/about',
    component: AboutGamePage,
  },
  {
    path: 'game/how-to-play',
    component: HowToPlayPage,
  },
  {
    path: 'game/play',
    component: PlayGamePage,
  },


  /* Player Routes */
  {
    path: 'player/panel',
    component: PlayerPanelPage,
  },


  /* Words Routes */
  {
    path: 'words/registered',
    component: RegisteredWordsPage,
  },
  {
    path: 'words/suggestion',
    component: WordSuggestionPage,
  },


  /* Default Routes */
  { path: '', redirectTo: 'game/start', pathMatch: 'full' },
  { path: '**', component: StartGamePage },
  
];
