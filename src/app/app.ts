import { Component, signal } from '@angular/core';
import {PlayerTag} from './components/player-tag/player-tag';
import {RouterOutlet} from '@angular/router';
import {GatherPlayers} from './components/gather-players/gather-players';
import {RoleSelection} from './components/role-selection/role-selection';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
