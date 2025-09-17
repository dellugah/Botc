import {Component, OnInit} from '@angular/core';
import {Players} from '../../classes/Players';
import {Minions, Outsiders, Role, Roles, Townsfolk, wakeFirstNight, wakeOtherNights} from '../../classes/Role';
import {Player} from '../../classes/Player';
import {FormsModule} from '@angular/forms';
import {gameLogic} from '../../classes/gameLogic';

@Component({
  selector: 'app-player-tag',
  imports: [
    FormsModule
  ],
  templateUrl: './player-tag.html',
  styleUrl: './player-tag.css'
})

export class PlayerTag extends gameLogic implements OnInit{

  protected readonly Roles = Roles;
  protected readonly Object = Object;
  protected readonly Townsfolk = Townsfolk;
  protected readonly Outsider = Outsiders;
  protected readonly Minion = Minions;
  protected readonly Outsiders = Outsiders;

  constructor(protected playerList: Players) {
    super(playerList);
  }

  ngOnInit() {

    this.buildWakePlayerSequence();
    console.log(this.wakePlayer);
  }
}
