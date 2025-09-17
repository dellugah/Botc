import { Component } from '@angular/core';
import {Players} from '../../classes/Players';
import {Player} from '../../classes/Player';
import {Role, Roles} from '../../classes/Role';

@Component({
  selector: 'app-gather-players',
  imports: [],
  templateUrl: './gather-players.html',
  styleUrl: './gather-players.css'
})
export class GatherPlayers {

  constructor(protected players: Players) {
    this.players = players;
  }

  addPlayer(): void {
    let player : Player = new Player();
    this.players.players.push(player);
  }


  namePlayer(player: Player, name: string): void {
    player.playerName = name;
  }

  assignedRole(player: Player, role: Roles): void {
    player.playerRole = new Role(role);
  }

}
