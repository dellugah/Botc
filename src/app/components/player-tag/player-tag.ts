import {Component, OnDestroy, OnInit} from '@angular/core';
import {Players} from '../../classes/Players';
import {Demons, Minions, Outsiders, Roles, Townsfolk} from '../../classes/Role';
import {FormsModule} from '@angular/forms';
import {GameLogic} from '../../classes/GameLogic';
import {CommentPlayer, Edit} from '../../classes/Edit';
import {RoleSelection} from '../role-selection/role-selection';
import {CommentBoard} from '../comment-board/comment-board';

@Component({
  selector: 'app-player-tag',
  imports: [
    FormsModule,
    RoleSelection,
    CommentBoard
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

  constructor(protected playerList: Players, protected edit : Edit, protected comment : CommentPlayer ) {
    super(playerList);
  }

  ngOnInit() {
    this.buildWakePlayerSequence();
  }

  ngOnDestroy() {
    this.roundPlayers = new Map();
  }

  protected readonly Demons = Demons;
}
