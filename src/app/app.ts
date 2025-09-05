import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PlayerTag} from './components/player-tag/player-tag';

@Component({
  selector: 'app-root',
  imports: [PlayerTag],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
