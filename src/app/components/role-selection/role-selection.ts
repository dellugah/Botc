import { Component } from '@angular/core';
import {Demons, Minions, Outsiders, Roles, Townsfolk, TroubleBrewing} from '../../classes/Role';

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
}
