import {Component, OnInit} from '@angular/core';
import {Players} from '../../classes/Players';
import {Roles} from '../../classes/Role';
import {Player} from '../../classes/Player';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-player-tag',
  imports: [],
  templateUrl: './player-tag.html',
  styleUrl: './player-tag.css'
})

export class PlayerTag implements OnInit{
  players: Players = new Players();

  constructor(players: Players) {
    this.players = players;
  }

  ngOnInit() {

    //CHANGE ONCE CHARACTER MUSTER IS IMPLEMENTED
    let player: Player;
    Object.values(Roles).forEach(role => {
      player = new Player(role);
      console.log(player.playerRole.roleImage);
      this.players.players.push(player);
    })
  }

  protected readonly Roles = Roles;
}
