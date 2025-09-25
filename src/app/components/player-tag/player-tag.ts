import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Players} from '../../classes/Players';
import {Demons, Minions, Outsiders, Role, Roles, Townsfolk, WakeFirstNight, WakeOtherNights} from '../../classes/Role';
import {Player} from '../../classes/Player';
import {FormsModule} from '@angular/forms';
import {GameLogic} from '../../classes/GameLogic';
import {Edit} from '../../classes/Edit';
import {RoleSelection} from '../role-selection/role-selection';

@Component({
  selector: 'app-player-tag',
  imports: [
    FormsModule,
    RoleSelection
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

  constructor(protected playerList: Players, protected edit : Edit) {
    super(playerList);
  }

  ngOnInit() {
    this.buildWakePlayerSequence();
  }

  ngOnDestroy() {
    this.roundPlayers = new Map();
  }

  changeRole(player : Player) : void {
    this.edit.player = player;
  }

  protected readonly Demons = Demons;
}
