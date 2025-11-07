import { Component } from '@angular/core';
import {Players} from '../../classes/Players';
import {Player} from '../../classes/Player';
import {FormsModule} from '@angular/forms';
import {Roles} from '../../classes/Role';

@Component({
  selector: 'app-ability-page',
  imports: [
    FormsModule
  ],
  templateUrl: './ability-page.html',
  styleUrl: './ability-page.css'
})
export class AbilityPage {

  constructor(protected players : Players) {
  }

  insertString(player : string) : void {
    this.players.selectedPlayer!.comments += player + " "
  }

  get playerComments(): string {
    return this.players.selectedPlayer?.comments ?? '';
  }


  set playerComments(val: string) {
    if (this.players.selectedPlayer) {
      this.players.selectedPlayer.comments = val;
    }
  }

  protected readonly Roles = Roles;
}
