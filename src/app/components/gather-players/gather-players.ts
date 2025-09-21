import {Component} from '@angular/core';
import {Edit} from '../../classes/Edit';
import {Players} from '../../classes/Players';
import {Player} from '../../classes/Player';
import {Role, Roles} from '../../classes/Role';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {RoleSelection} from '../role-selection/role-selection';

@Component({
  selector: 'app-gather-players',
  imports: [
    FormsModule,
    RoleSelection
  ],
  templateUrl: './gather-players.html',
  styleUrl: './gather-players.css'
})
export class GatherPlayers {

  protected readonly PlayerMenu = PlayerMenu;
  activeMenu : PlayerMenu = PlayerMenu.MAIN_MENU;
  playerName : string = "";


  constructor(protected players: Players, protected router: Router,
              protected edit : Edit) {
    this.players = players;
  }

  addPlayer(): void {
    this.activeMenu = PlayerMenu.NAMING_PLAYER;
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
    console.log("editing role for player");
    console.log(this.edit.player?.playerRole?.roleImage?.toLowerCase());
    this.edit.player = player;
    this.activeMenu = PlayerMenu.ASSIGNING_ROLE;
  }

  resetRole(player: Player | null): void {
    if (player != null) {
      player.buildRole(Roles.NONE);
    } else {
      return;
    }
  }
  protected readonly Roles = Roles;
}

export enum PlayerMenu {
  NAMING_PLAYER = 1,
  ASSIGNING_ROLE = 2,
  MAIN_MENU = 0
}
