import { Component } from '@angular/core';
import {CommentPlayer} from '../../classes/Edit';
import {FormsModule} from '@angular/forms';
import {Players} from '../../classes/Players';

@Component({
  selector: 'app-comment-board',
  imports: [
    FormsModule
  ],
  templateUrl: './comment-board.html',
  styleUrl: './comment-board.css'
})
export class CommentBoard {

  constructor(protected players : Players) {
  }

  get playerComments(): string {
    return this.players.selectedPlayer?.comments ?? '';
  }


  set playerComments(val: string) {
    if (this.players.selectedPlayer) {
      this.players.selectedPlayer.comments = val;
    }
  }

}
