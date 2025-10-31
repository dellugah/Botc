import {Component, OnDestroy, OnInit} from '@angular/core';
import {Players} from '../../classes/Players';
import {Demons, Minions, Outsiders, Roles, Townsfolk} from '../../classes/Role';
import {FormsModule} from '@angular/forms';
import {GameLogic} from '../../classes/GameLogic';
import {CommentPlayer, Edit} from '../../classes/Edit';
import {RoleSelection} from '../role-selection/role-selection';
import {CommentBoard} from '../comment-board/comment-board';
import {AbilityPage} from '../ability-page/ability-page';

@Component({
  selector: 'app-player-tag',
  imports: [
    FormsModule,
    RoleSelection,
    CommentBoard,
    AbilityPage
  ],
  templateUrl: './player-tag.html',
  styleUrl: './player-tag.css'
})

export class PlayerTag extends GameLogic implements OnInit, OnDestroy {

  protected readonly Roles = Roles;
  protected readonly Object = Object;
  protected readonly Townsfolk = Townsfolk;
  protected readonly Outsider = Outsiders;
  protected readonly Minion = Minions;
  protected readonly Outsiders = Outsiders;
  protected readonly Demons = Demons;


  openedPlayer: any | null = null;
  closeTimer: ReturnType<typeof setTimeout> | null = null;


  constructor(protected playerList: Players, protected edit : Edit, protected comment : CommentPlayer ) {
    super(playerList);
  }

  ngOnInit() {
    this.players.buildWakePlayerSequence(this.roundCounter);
    this.wakePlayerSequence();
  }

  ngOnDestroy() {
    this.players.resetMap();
  }

  toggleOptions(player: any) {
    // toggle open/close
    this.openedPlayer = this.openedPlayer === player ? null : player;

    // clear previous timer
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }

    // start a new timer only if opened
    if (this.openedPlayer) {
      this.closeTimer = setTimeout(() => {
        this.openedPlayer = null;
        this.closeTimer = null;
      }, 5000);
    }
  }
}
