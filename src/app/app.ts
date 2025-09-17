import { Component, signal } from '@angular/core';
import {PlayerTag} from './components/player-tag/player-tag';
import {RouterOutlet} from '@angular/router';
import {GatherPlayers} from './components/gather-players/gather-players';

@Component({
  selector: 'app-root',
  imports: [GatherPlayers],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
