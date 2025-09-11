import {Component, OnInit} from '@angular/core';
import {Players} from '../../classes/Players';
import {Role, Roles} from '../../classes/Role';
import {Player} from '../../classes/Player';
import {NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-player-tag',
  imports: [
    FormsModule
  ],
  templateUrl: './player-tag.html',
  styleUrl: './player-tag.css'
})

export class PlayerTag implements OnInit{
  players: Players = new Players();

  protectedPlayer: Player | null = null;
  poisonedPlayer: Player | null = null;
  markedForDeathPlayer: Player | null = null;


  constructor(players: Players) {
    this.players = players;
  }

  ngOnInit() {

    //CHANGE ONCE CHARACTER MUSTER IS IMPLEMENTED
    let player: Player;
    Object.values(Roles).forEach(role => {
      player = new Player(role);
      this.players.players.push(player);
    })
  }

  protected readonly Roles = Roles;

  monkTarget(self: Player, player: Player): void {
    if(!self.isPoisoned && !self.isDrunk){
      Object.values(this.players.players).forEach(p => {
        if(p.isProtected){
          p.isProtected = false;
        }
      })
      player.isProtected = true;
    }
  }

  poisonerTarget(player: Player): void {
      Object.values(this.players.players).forEach(p => {
        if (p.isPoisoned) {
          p.isPoisoned = false;
        }
      })
    player.isPoisoned = true;
  }

  registerAs(self: Player, role: Roles): void {

    let selfRole: Role = new Role(self.playerRole.roleName);
    let selectedRole: Role = new Role(role);

    if(self.isPoisoned) self.registeredAs = selfRole;
    else self.registeredAs = selectedRole;

    console.log(self.playerRole.roleName);
  }

  markForDeath(self: Player, player: Player | null): void {
    if(!self.isPoisoned && !self.isDrunk){
      Object.values(this.players.players).forEach(p => {
        if(p.isMarkedForDeath){
          p.isMarkedForDeath = false;
        }
      })
      if (player) { //test for null
        player.isMarkedForDeath = true;
      }
    }
  }


  protected readonly Object = Object;
}
