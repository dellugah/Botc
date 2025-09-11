import { Component, signal } from '@angular/core';
import {PlayerTag} from './components/player-tag/player-tag';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [PlayerTag, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
