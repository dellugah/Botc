import { Component } from '@angular/core';
import {TroubleBrewing} from '../../classes/Role';

@Component({
  selector: 'app-role-selection',
  imports: [],
  templateUrl: './role-selection.html',
  styleUrl: './role-selection.css'
})
export class RoleSelection {

    protected readonly Object = Object;
    protected readonly TroubleBrewing = TroubleBrewing;
}
