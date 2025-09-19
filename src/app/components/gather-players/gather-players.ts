import {Component} from '@angular/core';
import {Players} from '../../classes/Players';
import {Player} from '../../classes/Player';
import {Role, Roles} from '../../classes/Role';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gather-players',
  imports: [
    FormsModule
  ],
  templateUrl: './gather-players.html',
  styleUrl: './gather-players.css'
})
export class GatherPlayers {

  protected readonly PlayerMenu = PlayerMenu;
  activeMenu : PlayerMenu = PlayerMenu.MAIN_MENU;
  playerName : string = "";

  playerToEdit : Player | null = null;


  constructor(protected players: Players, protected router: Router) {
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

  backToMenu(): void {

    this.activeMenu = PlayerMenu.MAIN_MENU;
  }

  playGame() : void{
    this.router.navigate(['/player-tag'])
  }
  add(): void {
    if(this.playerName == ""){
      alert("Please enter a name");
    }
    else{
      let p = new Player(this.playerName);
      p.playerRole = new Role(Roles.NONE);
      p.registeredAs = new Role(Roles.NONE);
      this.players.players.unshift(p);
      this.playerName = "";
    }
  }

  selectedRole(player: Player): void {
    this.playerToEdit = player;
    this.activeMenu = PlayerMenu.ASSIGNING_ROLE;
  }
}

export enum PlayerMenu {
  NAMING_PLAYER = 1,
  ASSIGNING_ROLE = 2,
  MAIN_MENU = 0
}
