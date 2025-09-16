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

    //CHANGE ONCE GATHER PLAYERS IS DONE
    let player: Player;

    player = new Player(Roles.IMP);
    player.playerName = "Alice";
    this.players.players.push(player);

    player = new Player(Roles.SPY);
    player.playerName = "Bob";
    this.players.players.push(player);

    player = new Player(Roles.RECLUSE);
    player.playerName = "Charlie";
    this.players.players.push(player);

    player = new Player(Roles.EMPATH);
    player.playerName = "Dave";
    this.players.players.push(player);

    player = new Player(Roles.SLAYER);
    player.playerName = "Eve";
    this.players.players.push(player);

    player = new Player(Roles.MONK);
    player.playerName = "Frank";
    this.players.players.push(player);

    player = new Player(Roles.VIRGIN);
    player.playerName = "Grace";
    this.players.players.push(player);

    player = new Player(Roles.UNDERTAKER);
    player.playerName = "Harry";
    this.players.players.push(player);

    this.buildWakePlayerSequence();
    console.log(this.wakePlayer);
  }
}
