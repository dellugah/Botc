import { Component, signal } from '@angular/core';
import {PlayerTag} from './components/player-tag/player-tag';

@Component({
  selector: 'app-root',
  imports: [PlayerTag],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
