import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
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
export class GatherPlayers implements AfterViewInit {

  protected readonly Roles = Roles;
  activeMenu : PlayerMenu = PlayerMenu.MAIN_MENU;
  playerName : string = "";


  constructor(protected players: Players, protected router: Router,
              protected edit : Edit, private cdr: ChangeDetectorRef
  ) {
    this.players = players;
  }

  ngAfterViewInit(): void {
    console.log("resting players");
    for (let i = 0; i < this.players.players.length; i++) {
      const original = this.players.players[i];
      const reset = new Player(original.playerName);
      reset.buildRole(Roles.NONE);
      this.players.players.splice(i, 1, reset);
    }
    this.activeMenu = PlayerMenu.MAIN_MENU
    this.cdr.detectChanges();
  }

  addPlayer(): void {
    this.activeMenu = PlayerMenu.NAMING_PLAYER;
  }

  backToMenu(): void {
    if(this.edit.player != null){
      this.edit.player = null;
    }
    this.activeMenu = PlayerMenu.MAIN_MENU;
  }

  playGame() : void{
    this.edit.player = null;
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

  deletePlayer(player: Player | null): void {
    if (player != null) {
      this.players.players = this.players.players.filter(p => p !== player);
      this.edit.player = null;
      this.activeMenu = PlayerMenu.MAIN_MENU;
    }
  }

}

export enum PlayerMenu {
  NAMING_PLAYER = 1,
  ASSIGNING_ROLE = 2,
  MAIN_MENU = 0
}
