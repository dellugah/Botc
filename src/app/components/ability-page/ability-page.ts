import { Component } from '@angular/core';
import {Players} from '../../classes/Players';

@Component({
  selector: 'app-ability-page',
  imports: [],
  templateUrl: './ability-page.html',
  styleUrl: './ability-page.css'
})
export class AbilityPage {

  constructor(protected players : Players) {

  }
}
