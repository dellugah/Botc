import { Component } from '@angular/core';
import {Demons, Minions, Outsiders, Roles, Townsfolk, TroubleBrewing} from '../../classes/Role';
import {Edit} from '../../classes/Edit';
import {Router} from '@angular/router';

@Component({
  selector: 'app-role-selection',
  imports: [],
  templateUrl: './role-selection.html',
  styleUrl: './role-selection.css'
})
export class RoleSelection {

    protected readonly Object = Object;
    protected readonly TroubleBrewing = TroubleBrewing;
    protected readonly Roles = Roles;
    protected readonly Minions = Minions;
    protected readonly Demons = Demons;
    protected readonly Townsfolk = Townsfolk;
    protected readonly Outsiders = Outsiders;

    constructor(protected edit : Edit, protected router : Router) {
    }

    protected selectRole(role : string) : void {
      Object.values(Roles).forEach(r => {
        if (r.valueOf() == role) this.edit.player?.buildRole(r);
      })
      if (this.router.url == "/player-tag" ) this.edit.player = null; //reset player if in-game
    }
}
