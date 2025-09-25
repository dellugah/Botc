import { Component } from '@angular/core';
import {CommentPlayer} from '../../classes/Edit';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-comment-board',
  imports: [
    FormsModule
  ],
  templateUrl: './comment-board.html',
  styleUrl: './comment-board.css'
})
export class CommentBoard {

  constructor(protected comment : CommentPlayer | null) {
  }

  get playerComments(): string {
    return this.comment?.player?.comments ?? '';
  }


  set playerComments(val: string) {
    if (this.comment?.player) {
      this.comment.player.comments = val;
    }
  }

}
