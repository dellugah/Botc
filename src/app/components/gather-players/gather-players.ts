import { Component } from '@angular/core';
import {Players} from '../../classes/Players';
import {Player} from '../../classes/Player';
import {Role, Roles} from '../../classes/Role';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-gather-players',
  imports: [
    FormsModule
  ],
  templateUrl: './gather-players.html',
  styleUrl: './gather-players.css'
})
export class GatherPlayers {

  activeMenu : PlayerMenu = PlayerMenu.MAIN_MENU;
  playerName : string = "";


  constructor(protected players: Players) {
    this.players = players;
  }

  addPlayer(): void {
    this.activeMenu = PlayerMenu.NAMING_PLAYER;
  }


  namePlayer(player: Player, name: string): void {
    player.playerName = name;
  }

  assignedRole(player: Player, role: Roles): void {
    player.playerRole = new Role(role);
  }

  doneButton(): void {
    this.activeMenu = PlayerMenu.MAIN_MENU;
  }
  add(): void {
    if(this.playerName == ""){
      alert("Please enter a name");
    }
    else{
      this.players.players.unshift(new Player(this.playerName));
      this.playerName = "";
    }
  }
  protected readonly PlayerMenu = PlayerMenu;
}

export enum PlayerMenu {
  NAMING_PLAYER = 1,
  ASSIGNING_ROLE = 2,
  MAIN_MENU = 0
}
